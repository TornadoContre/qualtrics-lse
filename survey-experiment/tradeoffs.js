Qualtrics.SurveyEngine.addOnload(function () {
    /*Place your JavaScript here to run when the page loads*/
    let questionId = this.questionId;
    let $ = jQuery;
    $(".InputText").hide() // hide text input box

    /* To allow use full width of the option */
    let choices = this.getQuestionInfo().Choices;
    for (const choiceKey in choices) {
        let elementId = "#" + questionId + "-" + choiceKey + "-label";
        $(elementId + " span").css({ "width": "100%", "text-align": "center" });
    }
});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/
    jQuery(".QuestionBody").css('overflow', 'visible');
    jQuery(".BorderColor").css('overflow', 'visible');
});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});