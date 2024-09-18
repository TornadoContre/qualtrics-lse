Qualtrics.SurveyEngine.addOnload(function () {
    /*Place your JavaScript here to run when the page loads*/
    /* Aspects definition */
    var aspectMap = [
        { "name": "Physical Health", "span": "Physical Health Description", "markers": { "0-25": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "25-50": "Another lorem Ipsum is simply dummy text of the printing and typesetting industry.", "50-75": "Other lorem Ipsum is simply dummy text of the printing and typesetting industry." , "75-100": "sth100 sth100."} },
        { "name": "Quality of the Built Environment", "span": "Quality of the Built Environment Description", "markers": { "0-20": "sth1", "20-40": "sth2", "40-80": "sth3" , "80-100": "sth4"} },
        { "name": "Social Relationships", "span": "Fulfilling and meaningful social relationships. This includes things such as being able to enjoy the love, care and support of family and friends, being able to respect, value and appreciate people around you, and being able to meet socially with friends, relatives or work colleagues. This may also extend so a meaningful relationship with a pet or other animal.", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
        { "name": "Status and Recognition", "span": "Status and Recognition Description", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
        { "name": "Happiness/Mental Health/Emotional Life", "span": "Happiness/Mental Health/Emotional Life Description", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
		{ "name": "Safety and Security", "span": "This includes not being assaulted (including sexual and domestic assault)", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
		{ "name": "Income & Financial Security", "span": "Income & Financial Security Description", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
		{ "name": "Leisure/Free Time/Hobbies", "span": "Leisure/Free Time/Hobbies Description", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
		{ "name": "Political Participation/Voice", "span": "This means the capacity to speak up and be heard, from homes to houses of parliament, and to shape and share in discussions, discourse, and decisions that affect themThis includes being able to influence decisions affecting your country and/or local area.", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
		{ "name": "Agency/Self-Determination/Control over your life", "span": "This means the capacity to make decisions about one’s own life and act on them to achieve a desired outcome, free of violence, retribution, or fearThis includes being able to decide for yourself how to live your life. For example, to pursue your own goals in line with your aims and values, rather than being determined by others. It also includes the freedom to move by yourself and to meet and associate with others based on your own choice.", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
		{ "name": "Education, Knowledge & Understanding", "span": "Education, Knowledge & Understanding Description", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
		{ "name": "Employment/Meaningful Occupation", "span": "This includes the quality of employment or other occuption, in terms of how rewarding it is financially and/or emotionally, how secure or stable this is, the quality of the working conditions or working environment (physical and social), and any other benefits from the occupation, such as social security.", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
		{ "name": "Freedom from Discrimination & Repression", "span": "This includes being able to live your identity, including gender, ethnic, and sexual identity, and to express your views, including political and religious views without having to fear discrimination or repression.", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
		{ "name": "Quality of the Natural Environment", "span": "Quality of the Natural Environment Description", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
		{ "name": "Other (please specify)", "span": "" },
		{ "name": "Other (please specify)", "span": "" },
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