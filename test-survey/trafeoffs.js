Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	let questionId = this.questionId;
    let $ = jQuery;
	$(".InputText").hide() // hide text input box

    /* To allow use full width of the option */
	let choices = this.getQuestionInfo().Choices;
	for (const choiceKey in choices) {
		$("#"+this.questionId + "-" + choiceKey + "-label" + " span").css({"width":"100%"});
	}

});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});