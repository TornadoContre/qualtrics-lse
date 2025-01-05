Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	// Setting variables
	let $ = jQuery;
	const questionId = this.questionId;
	const choices = this.getQuestionInfo().Choices;

	for (const choiceKey in choices) {
		let handleTrack = $("#" + questionId + " ." + questionId + "-" + choiceKey + "-handle");
		let track = $("#" + questionId + " ." + questionId + "-" + choiceKey + "-track");

		handleTrack.css("margin-top", "3px");
		track.css({
			"height": "10px",
			"background": "linear-gradient(to right, gray 0% min(var(--gradient-start), var(--gradient-end)), var(--color-1) min(var(--gradient-start), var(--gradient-end)) max(var(--gradient-start), var(--gradient-end)), var(--color-2) max(var(--gradient-start), var(--gradient-end)) 100%)",
			"opacity": 1,
		});
		track[0].style.setProperty("--gradient-start", "0%");
		track[0].style.setProperty("--gradient-end", "0%");
		track[0].style.setProperty("--color-1", "blue");
		track[0].style.setProperty("--color-2", "#ADD8E6");

	}	

	// Overflow
	$("#Questions").css('overflow', 'visible');
	$(".QuestionBody").css('overflow', 'visible');
	$(".BorderColor").css('overflow', 'visible');

});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/
	// Setting variables
	let $ = jQuery;
	const config = { attributes: true };
	const questionId = this.questionId;	
	const choices = this.getQuestionInfo().Choices;
	
	// Function
	const callback = function (mutationsList, observer) {
		for (const mutation of mutationsList) {
			if (mutation.type === "attributes" && mutation.attributeName === "aria-valuenow") {
				let target = mutation.target;
				const currentValue = parseInt(target.getAttribute("aria-valuenow"));
				target.style.setProperty("--gradient-end", currentValue + "%");
			}
		}
	}

	// Set the observer
	for (const choiceKey in choices) {
		let track = $("#" + questionId + " ." + questionId + "-" + choiceKey + "-track");
		if (track.length > 0) {
			let observer = new MutationObserver(callback);
			observer.observe(track[0], config);
		}
	}

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});