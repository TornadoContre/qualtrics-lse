Qualtrics.SurveyEngine.addOnload(function () {
    /*Place your JavaScript here to run when the page loads*/
    function reorderSubsets(array) {
        const subsetTrue = array.filter(item => item.subset);
        const subsetFalse = array.filter(item => !item.subset);

        function shuffleArray(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        const shuffledSubsetTrue = shuffleArray(subsetTrue);

        return [...subsetFalse, ...shuffledSubsetTrue];
    }

    /* Aspects definition */
    // When the subset is setted to "true", it belongs to the subset that will be reordered (randomly) and put at the end.
    var aspectMap = [
        { "subset": true, "name": "Health", "span": "Health Description", "markers": { "0-25": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "25-50": "Another lorem Ipsum is simply dummy text of the printing and typesetting industry.", "50-75": "Other lorem Ipsum is simply dummy text of the printing and typesetting industry.", "75-100": "sth100 sth100." } },
        { "subset": false, "name": "Quality of the Built Environment", "span": "Quality of the Built Environment Description", "markers": { "0-20": "sth1", "20-40": "sth2", "40-80": "sth3", "80-100": "sth4" } },
        { "subset": true, "name": "Social Relationships", "span": "Fulfilling and meaningful social relationships. This includes things such as being able to enjoy the love, care and support of family and friends, being able to respect, value and appreciate people around you, and being able to meet socially with friends, relatives or work colleagues. This may also extend so a meaningful relationship with a pet or other animal.", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75", "75-100": "sth100 sth100." } },
        { "subset": false, "name": "Status & Recognition", "span": "Status and Recognition Description", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75", "75-100": "sth100 sth100." } },
        { "subset": true, "name": "Happiness & Emotional Life", "span": "Happiness/Mental Health/Emotional Life Description", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75", "75-100": "sth100 sth100." } },
        { "subset": false, "name": "Safety & Security", "span": "This includes not being assaulted (including sexual and domestic assault)", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75", "75-100": "sth100 sth100." } },
        { "subset": true, "name": "Income & Financial Security", "span": "Income & Financial Security Description", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75", "75-100": "sth100 sth100." } },
        { "subset": false, "name": "Leisure, Free Time & Hobbies", "span": "Leisure/Free Time/Hobbies Description", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75", "75-100": "sth100 sth100." } },
        { "subset": false, "name": "Political Participation & Voice", "span": "This means the capacity to speak up and be heard, from homes to houses of parliament, and to shape and share in discussions, discourse, and decisions that affect themThis includes being able to influence decisions affecting your country and/or local area.", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75", "75-100": "sth100 sth100." } },
        { "subset": true, "name": "Agency, Self-Determination & Control over one's life", "span": "This means the capacity to make decisions about one’s own life and act on them to achieve a desired outcome, free of violence, retribution, or fearThis includes being able to decide for yourself how to live your life. For example, to pursue your own goals in line with your aims and values, rather than being determined by others. It also includes the freedom to move by yourself and to meet and associate with others based on your own choice.", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75", "75-100": "sth100 sth100." } },
        { "subset": false, "name": "Education, Knowledge & Understanding", "span": "Education, Knowledge & Understanding Description", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75", "75-100": "sth100 sth100." } },
        { "subset": false, "name": "Meaningful Occupation & Activities", "span": "This includes the quality of a job or other occupations, in terms of how rewarding these are to you. For example, an occupation may be rewarding because it allows you to do something for others, allows you to be creative, challenges you in a positive sense, creates a sense of security and stability,  or because you enjoy doing it for another reason.", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75", "75-100": "sth100 sth100." } },
        { "subset": true, "name": "Freedom from Discrimination & Repression", "span": "This includes being able to live your identity, including gender, ethnic, and sexual identity, and to express your views, including political and religious views without having to fear discrimination or repression.", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75", "75-100": "sth100 sth100." } },
        { "subset": false, "name":"Quality of the Natural Environment", "span": "This includes the presence, diversity and quality of green spaces, such as mountains, canyons, forests, meadows and grasslands, and larger parks, but also rivers, lakes, coastal areas, as well as the quality of the air in your area. Pollution and destruction means lower quality.", "markers": { "0-25": "There is no nature or it is of very poor quality/very polluted or destroyed.", "25-50": "There is some nature, but not a lot and/or of rather poor quality/somewhat polluted or destroyed.", "50-75": "There is good quality natural environment, even if somewhat polluted/destructed.", "75-100": "There is a lot of good quality natural environment, with very little or no pollution or destruction." } },
    ]

    const otherArray = [
        { "name": "Other (please specify)", "span": "" },
        { "name": "Other (please specify)", "span": "" },
    ]
    aspectMap = reorderSubsets(aspectMap);
    aspectMap = [...aspectMap, ...otherArray];

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