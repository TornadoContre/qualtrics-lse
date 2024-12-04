Qualtrics.SurveyEngine.addOnload(function () {
    /*Place your JavaScript here to run when the page loads*/
    let $ = jQuery;
    const questionId = this.questionId;
    
    for (const choiceKey in this.getQuestionInfo().Choices) {
        // Captures if multiple choice was answered
        $('input[id="QR~' + questionId + '~' + choiceKey + '"]').on('input change', function () {
            $("input[id='hidden-input']").prop("checked", true);
        });
    }

});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});