Qualtrics.SurveyEngine.addOnload(function () {
    // Setting variables
    let aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
    let aspectMap = JSON.parse(aspectMapString);
    let questionId = this.questionId;
    let $ = jQuery;

    // Important the length of the aspect and the statements must be the same
    let choices = this.getQuestionInfo().Choices;

    let regex = />([^<]+)</;
    for (const choiceKey in choices) {
        const text = choices[choiceKey].Text
        const matchedKey = text.match(regex);
        if (!matchedKey) {
            // Choice without extra markers
            continue;
        }

        let aspectObj = aspectMap.find(element => element.name === matchedKey[1]);
        const markers = aspectObj["markers"];

        let row = '#' + questionId + ' .' + questionId + '-' + choiceKey + '-track';
        let choiceRow = $(row);

        for (var position in markers) {
            // Crear un elemento de marcador
            let title = markers[position];
            var markerElement = $('<div title="' + title + '" class="marker" style="left: ' + position + '"></div>');
            // Agregar el marcador a la opción
            choiceRow.append(markerElement);
        };

        // Capture the slider value
        //"input[type=text].QID125-3-result"
        var slider = $('input[type=text].' + questionId + '-' + choiceKey + '-result');
        var sliderValue = slider.val();

        slider.on('input change', function () {
            sliderValue = $(this).val();
            aspectObj["responseValue"] = sliderValue;
            aspectMapString = JSON.stringify(aspectMap);
            Qualtrics.SurveyEngine.setEmbeddedData('aspectMapString', aspectMapString);
        });
    };

});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});