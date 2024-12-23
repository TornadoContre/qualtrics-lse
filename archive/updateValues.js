Qualtrics.SurveyEngine.addOnload(function () {
	/*Place your JavaScript here to run when the page loads*/
	function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }

    function factorial(n) {
        if (n == 0 || n == 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
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

	function getRandomSign(valueA, valueB) {
		if (Math.min(valueA, valueB) === 0) {
			return 1;
		} else if (Math.max(valueA, valueB) === 100) {
			return -1;
		} else {
			return Math.random() > 0.5 ? 1 : -1;
		}
	}

	// Return a random integer between 1 and 10
	function getRandomMagnitude() {
		const rand = Math.random();
		const maxMagnitude = 10;
		const minMagnitude = 1;
		let magnitude = (maxMagnitude - minMagnitude) * rand + minMagnitude;
		return Math.round(magnitude);
	}

	function applyRandomMagnitude(value, magnitude, sign) {
		var newValue = value + magnitude * sign;
		newValue = Math.min(100, newValue);
		newValue = Math.max(0, newValue);
		return newValue;
	}

	// Setting variables
	let personalQuestion = true; // true if is a 'personal' question. false for political/societary question
	let nameKey = personalQuestion ? 'personalName' : 'socialName';
	let responseKey = personalQuestion ? 'personalResponseValue' : 'socialResponseValue';
	let aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
	let aspectMap = JSON.parse(aspectMapString);
	//let uniquePairsString = Qualtrics.SurveyEngine.getEmbeddedData("uniquePairsString");
	//let uniquePairs = JSON.parse(uniquePairsString);

	// Remove empty aspects
	aspectMap = aspectMap.filter((aspect) => aspect[nameKey] ? aspect[nameKey] !== '' : false);
	console.log(aspectMap);

	const increaseArrow = '&#8680&nbsp';
	const decreaseArrow = '&#8678&nbsp';

	let pairCase = ["A", "B"];
	const pairNameSuffix = "_pairName_";
	const pairValueSuffix = "_pairValue_";
	const pairNewValueSuffix = "_pairNewValue_";
	const pairSpanSuffix = "_pairSpan_";
	const pairArrowsSuffix = "_pairArrows_";

	// Let's pair things
    let numberOfPairs = parseInt("${e://Field/numberOfPairs}");
    let uniquePairs = createUniquePairs(aspectMap, numberOfPairs);
    let uniquePairsString = JSON.stringify(uniquePairs);
    Qualtrics.SurveyEngine.setEmbeddedData("uniquePairsString", uniquePairsString);

	uniquePairs.map((pair, i) => {
		i = i + 1;
		let aValue = parseInt(aspectMap[pair[0]][responseKey]);
		let bValue = parseInt(aspectMap[pair[1]][responseKey]);
		let sign = getRandomSign(aValue, bValue);
		pair.map((element, j) => {
			const oldValue = parseInt(aspectMap[element][responseKey]);
			const magnitude = getRandomMagnitude();
			const newValue = applyRandomMagnitude(oldValue, magnitude, sign);
			const arrow = sign > 0 ? increaseArrow : decreaseArrow;
			const arrows = arrow.repeat(magnitude);

			Qualtrics.SurveyEngine.setEmbeddedData(i + pairNameSuffix + pairCase[j], aspectMap[element][nameKey])
			Qualtrics.SurveyEngine.setEmbeddedData(i + pairValueSuffix + pairCase[j], oldValue);
			Qualtrics.SurveyEngine.setEmbeddedData(i + pairNewValueSuffix + pairCase[j], newValue);
			Qualtrics.SurveyEngine.setEmbeddedData(i + pairSpanSuffix + pairCase[j], aspectMap[element].span);
			Qualtrics.SurveyEngine.setEmbeddedData(i + pairArrowsSuffix + pairCase[j], arrows);
		})
	})
});

Qualtrics.SurveyEngine.addOnReady(function () {
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
	/*Place your JavaScript here to run when the page is unloaded*/

});