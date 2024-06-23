Qualtrics.SurveyEngine.addOnload(function () {
	/*Place your JavaScript here to run when the page loads*/
	function percentageVariation(value) {
		let variation = Math.random();
		console.log(variation);
		return Math.floor((1 + variation) * value);
	}
	// Setting variables
	let aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
	let aspectMap = JSON.parse(aspectMapString);
	let uniquePairsString = Qualtrics.SurveyEngine.getEmbeddedData("uniquePairsString");
	let uniquePairs = JSON.parse(uniquePairsString);

	let pairCase = ["A", "B"];
	const pairNameSuffix = "_pairName_";
	const pairValueSuffix = "_pairValue_";
	const pairNewValueSuffix = "_pairNewValue_";
	uniquePairs.map((pair, i) => {
		pair.map((element, j) => {
			Qualtrics.SurveyEngine.setEmbeddedData(i + pairNameSuffix + pairCase[j], aspectMap[element].name)
			Qualtrics.SurveyEngine.setEmbeddedData(i + pairValueSuffix + pairCase[j], aspectMap[element].responseValue)
			const newValue = percentageVariation(parseInt(aspectMap[element].responseValue));
			Qualtrics.SurveyEngine.setEmbeddedData(i + pairNewValueSuffix + pairCase[j], newValue)
		})
	})


});

Qualtrics.SurveyEngine.addOnReady(function () {
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
	/*Place your JavaScript here to run when the page is unloaded*/

});