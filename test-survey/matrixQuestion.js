Qualtrics.SurveyEngine.addOnload(function () {
    // Setting variables
    let aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
    let aspectMap = JSON.parse(aspectMapString);
    let questionId = this.questionId;
    let $ = jQuery;
    let choices = this.getQuestionInfo().Choices;

    let regex = />([^<]+)</;
    for (const choiceKey in choices) {
		console.log(choiceKey);
		// Extract text from the div block
        const text = choices[choiceKey].Text
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
		let handleId = '#' + questionId + ' .' + questionId + '-' + choiceKey + '-handle';
		let tooltipId = '#' + questionId + '-' + choiceKey + '-tooltip';
		console.log(tooltipId);
		let handle =  $(handleId);
		handle.append('<div id=' + tooltipId + ' class="mensaje">' + msg + '</div>')
		var tooltip = $(tooltipId);
		console.log(tooltip);
		
		// Applies the marker into slider
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
        var slider = $('input[type=text].' + questionId + '-' + choiceKey + '-result');
        var sliderValue = slider.val();

        slider.on('input change', function () {
            sliderValue = $(this).val();
            aspectObj["responseValue"] = sliderValue;
			aspectMapString = JSON.stringify(aspectMap);
			Qualtrics.SurveyEngine.setEmbeddedData('aspectMapString', aspectMapString);
			
			console.log(tooltip);
			
			// Shows the tooltip
			setTimeout(() => {
				tooltip.addClass("show");
			}, 10); // Pequeño retraso para permitir la renderización

			// Remove tooltip after some time
			setTimeout(() => {
				tooltip.removeClass('show');
			}, 2000);
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
	
	console.log("OnListo");
	// TODO: Clean code and update logic
	// Mutation object settings
	const callback = function (mutationsList, observer) {
		for (const mutation of mutationsList) {
			if (mutation.type === "attributes" & mutation.attributeName === "aria-valuenow") {
				let target = mutation.target;
				var msg = "A message. A long one? Maybe.";
				const val = parseInt(target.ariaValueNow);
				if (val > 25 & val < 50) {
					msg = "You are between 25 and 50";
				} else if (val >= 50 & val < 75) {
					msg = "Big numbers eh?";
				} else if (val >= 75) {
					msg = "Let's go reach 100!!";
				}
				for (const children of target.children) {
					// TODO: Just use useful divs
					let handleId = children.id.replaceAll("~", "-");
					let tooltipId = handleId.replaceAll("handle", "tooltip");
					
					let handle = $(" ." + handleId);
					handle.append('<div id=' + tooltipId + ' class="mensaje">' + msg + '</div>')
					
					let tooltip = $('#'+tooltipId);
					// Shows the tooltip
					setTimeout(() => {
						tooltip.addClass("show");
					}, 10); // Pequeño retraso para permitir la renderización

					// Remove tooltip after some time
					setTimeout(() => {
						tooltip.removeClass('show');
						tooltip.remove();
					}, 2000);
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
		let row = '#' + questionId + ' .' + questionId + '-' + choiceKey + '-track';
        let choiceRow = $(row);
		let observer = new MutationObserver(callback);
		//observer.observe(choiceRow[0], config);
	}

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});