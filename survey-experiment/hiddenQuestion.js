Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
    const questionId = this.questionId;
    const $ = jQuery;

    // Hide question
    $('div[id="' + questionId + '"]').css("display", "none");

    // Change input id to make it recognizable
	for (const choiceKey in this.getQuestionInfo().Choices) {
        $('input[id="QR~'+ questionId + '~' + choiceKey +'"]').attr("id", "hidden-input");
        $('input[id="QR~'+ questionId + '~' + choiceKey +'"]').attr("old-id", "hidden-input");
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