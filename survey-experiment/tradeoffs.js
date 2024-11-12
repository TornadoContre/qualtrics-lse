Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	let questionId = this.questionId;
    let $ = jQuery;
	$(".InputText").hide() // hide text input box

    /* To allow use full width of the option */
	let choices = this.getQuestionInfo().Choices;
	for (const choiceKey in choices) {
        let elementId = "#"+ questionId + "-" + choiceKey + "-label";
		$(elementId + " span").css({"width":"100%"});
        
        let tooltipObj = $(elementId + " span.tooltip")[0];
        let tooltipText = tooltipObj.getAttribute("data-text");
        if (tooltipText === "") {
            tooltipObj.removeAttribute("data-text");
            tooltipObj.removeClassName("tooltip");
        }
	}
});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/
    jQuery(".QuestionBody").css('overflow', 'visible');
    jQuery(".BorderColor").css('overflow', 'visible');
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});