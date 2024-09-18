Qualtrics.SurveyEngine.addOnload(function()
{
	// Setting variables
	let aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
    let aspectMap = JSON.parse(aspectMapString);
	let questionId = this.questionId;
    let $ = jQuery;
	console.log(aspectMap);
	console.log(questionId);
	
	// Important the length of the aspect and the statements must be the same
	let choices = this.getQuestionInfo().Choices;
	console.log(choices);
	
	let regex = />([^<]+)</;
	for (const choiceKey in choices) {
		const text = choices[choiceKey].Text
		let matchedKey = text.match(regex)[1];
		const aspectObj = aspectMap.find(element => element.name === matchedKey);
		const markers = aspectObj["markers"];
		console.log(markers);
		
		let row = '#' + questionId + ' .' + questionId + '-' + choiceKey + '-track';
		let choiceRow = $(row);
		
		for (var position in markers) {
			// Crear un elemento de marcador
			let title = markers[position];
			var markerElement = $('<div title="' + title + '" class="marker" style="left: ' + position + '"></div>');
			// Agregar el marcador a la opción
			choiceRow.append(markerElement);
		};
    };
	
	
	/*Codigo viejito pero bueno, como el reggaeton */
	/*
	var markers = ["25%", "50%", "75%"];
	
	markers.forEach((element) => console.log(element))
	
	// Obtener la referencia a la pregunta actual
    var questionId = this.questionId;
	console.log(questionId);
    var $ = jQuery;
	
	var choices = this.getQuestionInfo().Choices;
	
	for (const choice in choices) {
		var row = '#' + questionId + ' .' + questionId + '-' + choice + '-track';
		var choiceRow = $(row);
		console.log(row);
		console.log(choiceRow);
		console.log(choice);

		markers.forEach(function(element, index) {
				// Crear un elemento de marcador
		        var markerElement = $('<div title="Hello world" class="marker" style="left: ' + element + '"></div>');
			        // Agregar el marcador a la opción
				choiceRow.append(markerElement);
		});
    };*/
	});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});