Qualtrics.SurveyEngine.addOnload(function () {
	// Setting variables
	let aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
	let aspectMap = JSON.parse(aspectMapString);
	let questionId = this.questionId;
	let $ = jQuery;
	let choices = this.getQuestionInfo().Choices;

	let regex = />([^<]+)</;
	for (const choiceKey in choices) {
		// Extract text from the div block
		const text = choices[choiceKey].Text;
		const matchedKey = text.match(regex);
		if (!matchedKey) {
			// Choice without extra markers
			continue;
		}

		// Finds which element match
		let aspectObj = aspectMap.find(element => element.name === matchedKey[1]);
		const markers = aspectObj["markers"];

		// Tooltip in handler
		let msg = "Hola, soy un mensaje que se mueve!";
		let tooltipId = questionId + '-' + choiceKey + '-tooltip';
		let handle = $('#' + questionId + ' .' + questionId + '-' + choiceKey + '-handle');
		handle.addClass("hover-trigger");
		handle.append('<div id=' + tooltipId + ' class="mensaje">' + msg + '</div>');

		// Applies the marker into slider
		let row = '#' + questionId + ' .' + questionId + '-' + choiceKey + '-track';
		let choiceRow = $(row);

		for (var position in markers) {
			// Crear un elemento de marcador
			let title = markers[position];
			//var markerElement = $('<div title="' + title + '" class="marker" style="left: ' + position + '"></div>');
			// Agregar el marcador a la opción
			//choiceRow.append(markerElement);
		};

		// Capture the slider value
		var slider = $('input[type=text].' + questionId + '-' + choiceKey + '-result');
		var sliderValue = slider.val();

		slider.on('input change', function () {
			aspectObj["responseValue"] = $(this).val();
			aspectMapString = JSON.stringify(aspectMap);
			Qualtrics.SurveyEngine.setEmbeddedData('aspectMapString', aspectMapString);
		});
	};

});

Qualtrics.SurveyEngine.addOnReady(function () {
	/*Place your JavaScript here to run when the page is fully displayed*/
	// Setting variables
	let aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
	let aspectMap = JSON.parse(aspectMapString);
	let questionId = this.questionId;
	let $ = jQuery;
	let timerStarted = Array(aspectMap.length).fill(false);

	// Mutation object settings
	const callback = function (mutationsList, observer) {
		for (const mutation of mutationsList) {
			if (mutation.type === "attributes" && mutation.attributeName === "aria-valuenow") {
				let target = mutation.target;
				const value = parseInt(target.ariaValueNow);
				if (value == 0) {
					continue;
				}

				const aspectId = target.id.replace('track', 'text');
				const aspectName = $("[id='" + aspectId + "']")[0].textContent.strip();
				let aspectObj = aspectMap.find(element => element.name === aspectName);
				const aspectIndex = aspectMap.indexOf(aspectObj);
				if (aspectIndex === -1) { continue; }
				const markers = aspectObj["markers"];
				var msg = "";
				for (const markerRange in markers) {
					let lowerBound = markerRange.split('-').map(Number)[0]
					let upperBound = markerRange.split('-').map(Number)[1];
					if (lowerBound < value && value <= upperBound) {
						msg = markers[markerRange];
						break;
					}
				}

				for (const children of target.children) {
					if (!children.id.includes('handle')) {
						continue;
					}
					let tooltipId = children.id.replaceAll("~", "-").replaceAll("handle", "tooltip");
					let tooltip = $('#' + tooltipId);

					// Updates the message value
					setTimeout(() => {
						tooltip.text(msg);
					}, 10) // Little timer to allow renderization

					if (!timerStarted[aspectIndex]) {
						// Shows the tooltip
						setTimeout(() => {
							timerStarted[aspectIndex] = true;
							tooltip.addClass("show");
						}, 10);
						// Remove tooltip after some time
						setTimeout(() => {
							timerStarted[aspectIndex] = false;
							tooltip.removeClass('show');
						}, 3000);
					}
				}
			}
		}
	}
	const config = { attributes: true };

	// Important: the length of the aspect and the statements must be the same
	let choices = this.getQuestionInfo().Choices;

	let regex = />([^<]+)</;
	for (const choiceKey in choices) {
		// Extracts text from the div block
		const text = choices[choiceKey].Text
		const matchedKey = text.match(regex);
		if (!matchedKey) {
			// Choice without extra markers
			continue;
		}

		// Sets the observer
		let choiceRow = $('#' + questionId + ' .' + questionId + '-' + choiceKey + '-track');
		let observer = new MutationObserver(callback);
		observer.observe(choiceRow[0], config);
	}

});

Qualtrics.SurveyEngine.addOnUnload(function () {
	/*Place your JavaScript here to run when the page is unloaded*/

});
