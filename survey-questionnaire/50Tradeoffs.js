Qualtrics.SurveyEngine.addOnload(function () {
	/*Place your JavaScript here to run when the page loads*/
	// Setting variables
	const pairNumber = 1;
	const type_ = "general"; // Values: `general` or `policy`
	let questionId = this.questionId;
	let $ = jQuery;
	const firstChoiceKey = 1;
	const secondChoiceKey = 2;
	const percentageTradeOff = parseFloat(Qualtrics.SurveyEngine.getEmbeddedData("percentageTradeOff"));
	let aValue = parseInt(Qualtrics.SurveyEngine.getEmbeddedData(pairNumber + "_" + type_ + "50TradePairValue_A"));
	let modifiedValue = Math.round(parseInt(Qualtrics.SurveyEngine.getEmbeddedData(pairNumber + "_" + type_ + "50TradePairValue_A")) * (1 - percentageTradeOff));
	let bValue = parseInt(Qualtrics.SurveyEngine.getEmbeddedData(pairNumber + "_" + type_ + "50TradePairValue_B"));

	// Custom start
	this.setChoiceValue(firstChoiceKey, modifiedValue);
	this.setChoiceValue(secondChoiceKey, bValue);

	// Disable Track, remove Handle and add slider format
	let firstTrack = $("#" + questionId + " ." + questionId + "-" + firstChoiceKey + "-track");
	let firstHandle = $("#" + questionId + " ." + questionId + "-" + firstChoiceKey + "-handle");
	let firstInput = $("#" + questionId + " ." + questionId + "-" + firstChoiceKey + "-result");
	firstTrack.css({ "pointer-events": "none", "height": "25px" })
	firstHandle.css("display", "none");
	firstInput.css("display", "none");
	firstTrack.addClass("slider");
	firstTrack[0].style.setProperty("--gradient-start", modifiedValue + "%")
	firstTrack[0].style.setProperty("--gradient-end", aValue + "%")
	firstTrack[0].style.setProperty("--color-1", "#FF7F7F")
	firstTrack[0].style.setProperty("--color-2", "red")

	// Add first track messages
	function addMessage(track, msg, idNumber, leftPosition) {
		let msgId = questionId + "~MSG~" + idNumber;
		let msjElement = $("<div></div>").attr("id", msgId).text(msg).addClass("mensaje").addClass("show");
		msjElement.css({
			"text-align": "center",
			"width": "fit-content",
			"left": Math.min(Math.max(11, leftPosition), 90) + "%"
		})
		let arrowId = questionId + "~ARR~" + idNumber;
		let arrow = leftPosition < 10 ? "<p>&#8592</p>" : "<p>&#8592 &#8592 &#8592</p>";
		let arrowElement = $("<div></div>").attr("id", arrowId).addClass("mensaje").addClass("show").append(arrow);
		arrowElement.css({
			"text-align": "center",
			"width": "fit-content",
			"left": Math.min(Math.max(6, leftPosition), 85) + "%",
			"bottom": "-150%",
			"background": "transparent",
			"color": "black",
			"font-size": "25px"
		});
		track.append(msjElement)
		track.append(arrowElement)
	}
	const trackWidth = firstTrack.width() - firstHandle.outerWidth()
	let middlePoint = (aValue - modifiedValue) / 2;
	let msg = "Decrease from " + aValue + " to " + modifiedValue;
	let msgLeft = parseInt((aValue - middlePoint));
	addMessage(firstTrack, msg, 1, msgLeft);

	// Set second Track style
	let secondTrack = $("#" + questionId + " ." + questionId + "-" + secondChoiceKey + "-track");
	let handleTrack = $("#" + questionId + " ." + questionId + "-" + secondChoiceKey + "-handle");
	handleTrack.css("margin-top", "3px")
	secondTrack.css({
		"height": "10px",
		"background": "linear-gradient(to right, gray 0% min(var(--gradient-start), var(--gradient-end)), var(--color-1) min(var(--gradient-start), var(--gradient-end)) max(var(--gradient-start), var(--gradient-end)), var(--color-2) max(var(--gradient-start), var(--gradient-end)) 100%)"
	})
	secondTrack[0].style.setProperty("--gradient-start", bValue + "%")
	secondTrack[0].style.setProperty("--gradient-end", bValue + "%")
	secondTrack[0].style.setProperty("--color-1", "blue")
	secondTrack[0].style.setProperty("--color-2", "#ADD8E6")

	$(".QuestionBody BorderColor").css('overflow', 'visible');
});

Qualtrics.SurveyEngine.addOnReady(function () {
	/*Place your JavaScript here to run when the page is fully displayed*/
	// Setting variables
	const pairNumber = 1;
	const type_ = "general"; // Values: `general` or `policy`
	
	let $ = jQuery;
	let questionId = this.questionId;
	const secondChoiceKey = 2;
	let bValue = parseInt(Qualtrics.SurveyEngine.getEmbeddedData(pairNumber + "_" + type_ + "50TradePairValue_B"))

	// Function
	const callback = function (mutationsList, observer) {
		for (const mutation of mutationsList) {
			if (mutation.type === "attributes" && mutation.attributeName === "aria-valuenow") {
				let target = mutation.target;
				const currentValue = parseInt(target.getAttribute("aria-valuenow"));
				let finalValue = currentValue;
				if (currentValue < bValue) {
					finalValue = bValue
				}
				target.style.setProperty("--gradient-end", finalValue + "%")
				//let inputValue = $("#" + questionId + " ." + questionId + "-" + secondChoiceKey + "-true-result");
				//inputValue.attr("value", finalValue)
			}
		}
	}

	// Set the observer
	const config = { attributes: true };
	let secondTrack = $("#" + questionId + " ." + questionId + "-" + secondChoiceKey + "-track");
	if (secondTrack.length > 0) {
		let observer = new MutationObserver(callback)
		observer.observe(secondTrack[0], config)
	}

	// Overflow
	$(".QuestionBody").css('overflow', 'visible');
	$(".BorderColor").css('overflow', 'visible');
});

Qualtrics.SurveyEngine.addOnUnload(function () {
	/*Place your JavaScript here to run when the page is unloaded*/

});