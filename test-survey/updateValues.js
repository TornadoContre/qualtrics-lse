Qualtrics.SurveyEngine.addOnload(function () {
	/*Place your JavaScript here to run when the page loads*/
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
		return newValue
	}

	// Setting variables
	let personalResponse = true // true if is a 'personal' question. false for political/societary question
	let responseKey = personalResponse ? 'personalResponseValue' : 'socialResponseValue';
	let aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
	let aspectMap = JSON.parse(aspectMapString);
	let uniquePairsString = Qualtrics.SurveyEngine.getEmbeddedData("uniquePairsString");
	let uniquePairs = JSON.parse(uniquePairsString);

	const increaseArrow = '&#8680&nbsp';
	const decreaseArrow = '&#8678&nbsp';

	let pairCase = ["A", "B"];
	const pairNameSuffix = "_pairName_";
	const pairValueSuffix = "_pairValue_";
	const pairNewValueSuffix = "_pairNewValue_";
	const pairSpanSuffix = "_pairSpan_";
	const pairArrowsSuffix = "_pairArrows_";

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

			Qualtrics.SurveyEngine.setEmbeddedData(i + pairNameSuffix + pairCase[j], aspectMap[element].name)
			Qualtrics.SurveyEngine.setEmbeddedData(i + pairValueSuffix + pairCase[j], oldValue);
			Qualtrics.SurveyEngine.setEmbeddedData(i + pairNewValueSuffix + pairCase[j], newValue);
			Qualtrics.SurveyEngine.setEmbeddedData(i + pairSpanSuffix + pairCase[j], aspectMap[element].span);
			Qualtrics.SurveyEngine.setEmbeddedData(i + pairArrowsSuffix + pairCase[j], arrows);
		})
	})

	console.log(uniquePairs);
	console.log(aspectMap);


});

Qualtrics.SurveyEngine.addOnReady(function () {
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
	/*Place your JavaScript here to run when the page is unloaded*/

});