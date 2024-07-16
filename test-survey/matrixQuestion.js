Qualtrics.SurveyEngine.addOnload(function () {
	// Setting variables
	let aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
	let aspectMap = JSON.parse(aspectMapString);
	let questionId = this.questionId;
	let $ = jQuery;
	let choices = this.getQuestionInfo().Choices;

	let regex = />([^<]+)</;
	for (const choiceKey in choices) {
		// Extract text from the div block
		const text = choices[choiceKey].Text;
		const matchedKey = text.match(regex);
		if (!matchedKey) {
			// Choice without extra markers
			continue;
		}

		// Finds which element match
		let aspectObj = aspectMap.find(element => element.name === matchedKey[1]);
		const markers = aspectObj["markers"];
		const keyStartsWith0 = Object.keys(markers).find(key => key.startsWith("0"));
		
		let track = $('#' + questionId + ' .' + questionId + '-' + choiceKey + '-track');
		track.css('z-index', 1002);
		track.css('opacity', 1);
		
		// Tooltip in handler
		let msg = markers[keyStartsWith0];
		let tooltipId = questionId + '-' + choiceKey + '-tooltip';
		let handle = $('#' + questionId + ' .' + questionId + '-' + choiceKey + '-handle');
		handle.addClass("hover-trigger");
		handle.append('<div id=' + tooltipId + ' class="mensaje">' + msg + '</div>');

		// Capture the slider value
		var slider = $('input[type=text].' + questionId + '-' + choiceKey + '-result');

		slider.on('input change', function () {
			aspectObj["responseValue"] = $(this).val();
			aspectMapString = JSON.stringify(aspectMap);
			Qualtrics.SurveyEngine.setEmbeddedData('aspectMapString', aspectMapString);
		});
	};
	$(".QuestionBody.BorderColor").css('overflow', 'visible');

});

Qualtrics.SurveyEngine.addOnReady(function () {
	/*Place your JavaScript here to run when the page is fully displayed*/
	// Setting variables
	let aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
	let aspectMap = JSON.parse(aspectMapString);
	let questionId = this.questionId;
	let $ = jQuery;
	let timerStarted = Array(aspectMap.length).fill(false);

	// Mutation object settings
	const callback = function (mutationsList, observer) {
		for (const mutation of mutationsList) {
			if (mutation.type === "attributes" && mutation.attributeName === "aria-valuenow") {
				let target = mutation.target;
				const value = parseInt(target.getAttribute("aria-valuenow"));

				const aspectId = target.id.replace('track', 'text');
				const aspectName = $("[id='" + aspectId + "']")[0].textContent.strip();
				let aspectObj = aspectMap.find(element => element.name === aspectName);
				const aspectIndex = aspectMap.indexOf(aspectObj);
				if (aspectIndex === -1) { continue; }
				const markers = aspectObj["markers"];
				var msg = "";
				for (const markerRange in markers) {
					let lowerBound = markerRange.split('-').map(Number)[0]
					let upperBound = markerRange.split('-').map(Number)[1];
					//let upperCondition = upperBound === 100 ? value <= upperBound : value < upperBound;
					let upperCondition = value <= upperBound;
					if (lowerBound < value && upperCondition) {
						msg = markers[markerRange];
						break;
					}
				}

				if (value === 0) {continue; }

				for (const children of target.children) {
					if (!children.id.includes('handle')) {
						continue;
					}
					
					let tooltipId = children.id.replaceAll("~", "-").replaceAll("handle", "tooltip");
					let tooltip = $('#' + tooltipId);

					// Updates the message value
					setTimeout(() => {
						tooltip.text(msg);
					}, 10) // Little timer to allow renderization

					if (!timerStarted[aspectIndex]) {
						// Shows the tooltip
						setTimeout(() => {
							timerStarted[aspectIndex] = true;
							tooltip.addClass("show");
						}, 10);
						// Remove tooltip after some time
						setTimeout(() => {
							timerStarted[aspectIndex] = false;
							tooltip.removeClass('show');
						}, 3000);
					}
				}
			}
		}
	}
	const config = { attributes: true };

	// Important: the length of the aspect and the statements must be the same
	let choices = this.getQuestionInfo().Choices;

	let regex = />([^<]+)</;
	for (const choiceKey in choices) {
		// Extracts text from the div block
		const text = choices[choiceKey].Text
		const matchedKey = text.match(regex);
		if (!matchedKey) {
			// Choice without extra markers
			continue;
		}

		// Sets the observer
		let choiceRow = $('#' + questionId + ' .' + questionId + '-' + choiceKey + '-track');
		let observer = new MutationObserver(callback);
		observer.observe(choiceRow[0], config);
	}

});

Qualtrics.SurveyEngine.addOnUnload(function () {
	/*Place your JavaScript here to run when the page is unloaded*/

});