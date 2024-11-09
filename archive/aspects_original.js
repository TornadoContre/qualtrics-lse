Qualtrics.SurveyEngine.addOnload(function () {
    /*Place your JavaScript here to run when the page loads*/
    function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }

    function factorial(n) {
        if (n == 0 || n == 1) {
            return 1
        } else {
            return n * factorial(n - 1)
        }
    }

    function createUniquePairs(array, totalPairs) {
        // Check we have enough elements
        const K = 2;
        const elements = array.length;
        let totalCombinations = (factorial(elements) / (factorial(K) * factorial(elements - K)));

        if (elements <= 1 || totalPairs > totalCombinations) {
            throw new Error("Not enough elements. Max combinations: " + totalCombinations);
        }

        let pairs = new Set();

        // Creates unique pares
        while (pairs.size < totalPairs) {
            let i = getRandomIndex(elements);
            let j = getRandomIndex(elements);

            // Checks that i != j and pai (i, j) is unique
            if (i !== j) {
                let pair = [i, j].sort((a, b) => a - b).toString();
                pairs.add(pair);
            }
        }

        // Array as array of pairs
        return [...pairs].map(pair => pair.split(',').map(Number));
    }

    /* Aspects definition */
    var aspectMap = [
        { "name": "Physical Health", "span": "Salud Física", "markers": { "0-25": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "25-50": "Another lorem Ipsum is simply dummy text of the printing and typesetting industry.", "50-75": "Other lorem Ipsum is simply dummy text of the printing and typesetting industry." , "75-100": "sth100 sth100."} },
        { "name": "Quality of the Environment", "span": "Calidad del ambiente", "markers": { "0-20": "sth1", "20-40": "sth2", "40-80": "sth3" , "80-100": "sth4"} },
        { "name": "Social", "span": "Social", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
        { "name": "Asp1", "span": "Asp1 Span", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
        { "name": "Asp2", "span": "Asp2 Span", "markers": { "0-25": "sth25", "25-50": "sth50", "50-75": "sth75" , "75-100": "sth100 sth100."} },
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

    // Let's pair things
    let numberOfPairs = parseInt("${e://Field/numberOfPairs}");
    let uniquePairs = createUniquePairs(aspectMap, numberOfPairs);
    let uniquePairsString = JSON.stringify(uniquePairs);
    Qualtrics.SurveyEngine.setEmbeddedData("uniquePairsString", uniquePairsString);
});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});