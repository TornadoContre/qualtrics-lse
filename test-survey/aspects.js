Qualtrics.SurveyEngine.addOnload(function () {
    /*Place your JavaScript here to run when the page loads*/
    /* Aspects definition */
    var aspectMap = [
        { "name": "Physical Health", "span": "Salud Física", "markers": { "0-25": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "25-50": "Another lorem Ipsum is simply dummy text of the printing and typesetting industry.", "50-75": "Other lorem Ipsum is simply dummy text of the printing and typesetting industry." , "75-100": "sth100 sth100."} },
        { "name": "Quality of the Environment", "span": "Calidad del ambiente", "markers": { "0-20": "sth1", "20-40": "sth2", "40-80": "sth3" , "80-100": "sth4"} },
        { "name": "Social", "span": "Social", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
        { "name": "Asp1", "span": "Asp1 Span", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
        { "name": "Asp2", "span": "Asp2 Span", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
        { "name": "Other (please specify)", "span": ""},
        { "name": "Other (please specify)", "span": ""},
    ]

    var aspectMapString = JSON.stringify(aspectMap);
    Qualtrics.SurveyEngine.setEmbeddedData('aspectMapString', aspectMapString);

    const namePrefix = "aspectName";
    const spanPrefix = "aspectSpan";
    const markersPrefix = "aspectMarkers";
    aspectMap.map(function (element, idx) {
        let i = idx + 1;
        Qualtrics.SurveyEngine.setEmbeddedData(namePrefix + i, element["name"]);
        Qualtrics.SurveyEngine.setEmbeddedData(spanPrefix + i, element["span"]);
        Qualtrics.SurveyEngine.setEmbeddedData(markersPrefix + i, JSON.stringify(element["markers"]));
        i++
    })
});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});