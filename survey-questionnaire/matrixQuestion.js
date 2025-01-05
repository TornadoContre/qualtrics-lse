Qualtrics.SurveyEngine.addOnload(function () {
	function updateAspectMap(newAspectMap) {
		aspectMapString = JSON.stringify(newAspectMap);
		Qualtrics.SurveyEngine.setEmbeddedData('aspectMapString', aspectMapString);
	}

	// Setting variables
	let $ = jQuery;
	const personalQuestion = true; // true if is a 'personal' question. false for political/societary question
	const nameKey = personalQuestion ? "personalName" : "socialName";
	const responseKey = personalQuestion ? "personalResponseValue" : "socialResponseValue";
	let aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
	let aspectMap = JSON.parse(aspectMapString);
	let questionId = this.questionId;
	let choices = this.getQuestionInfo().Choices;

	let regex = />([^<]+)</;
	for (const choiceKey in choices) {
		// Extract text from the div block
		let text = choices[choiceKey].Text;
		text = text.replace(" <sup>&#9432;</sup>", "");
		const matchedKey = text.match(regex);
		if (!matchedKey) {
			// Choice without extra markers
			continue;
		}

		// Set track style
		let track = $('#' + questionId + ' .' + questionId + '-' + choiceKey + '-track');
		track.css('z-index', 1002);
		track.css('opacity', 1);

		// Find aspect object
		let elementChoiceId = nameKey + "-choiceId"; // Useful for the 'other' aspect
		let aspectObj = aspectMap.find(element => element.name === matchedKey[1] && (!Object.hasOwn(element, elementChoiceId) || element[elementChoiceId] === choiceKey));
		if (!aspectObj) { continue; }
		aspectObj[elementChoiceId] = choiceKey;
		updateAspectMap(aspectMap);

		// 2. Capture response value
		// 2.1 Capture the slider value
		var slider = $('input[type=text].' + questionId + '-' + choiceKey + '-result');
		slider.on('input change', function () {
			aspectObj[responseKey] = $(this).val();
			updateAspectMap(aspectMap);
		});

		// 2.2 Capture the input value
		var inputText = $('input[type=text].QR-' + questionId + '-' + choiceKey + '-TEXT');
		aspectObj[nameKey] = '';
		if (inputText.length > 0) {
			inputText.on('input change', function () {
				aspectObj[nameKey] = $(this).val();
				updateAspectMap(aspectMap);
			});
		} else {
			aspectObj[nameKey] = aspectObj["name"];
			updateAspectMap(aspectMap);
		}
	};
});

Qualtrics.SurveyEngine.addOnReady(function () {
	/*Place your JavaScript here to run when the page is fully displayed*/
	// Setting variables
	let $ = jQuery;
	var that = this;

	// Hide next button and place fake one
	this.hideNextButton();
	let input = $('<input id="NextButton" type="button">')
		.addClass("NextButton Button")
		.attr("aria-label", "Next")
		.attr("name", "NextButton")
		.val("→");
	$("#Buttons").append(input);

	// Validate 'Others' condition
	input.click(function () {
		setTimeout(function () {
			const aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
			const aspectMap = JSON.parse(aspectMapString);
			const othersAspects = aspectMap.filter((item) => item.name === 'Other (please specify)');
			var isValid = true;
			othersAspects.forEach(aspect => {
				if (aspect.personalName !== undefined && aspect.personalResponseValue !== undefined) {
					if (aspect.personalName === "" && aspect.personalResponseValue === "0") {
						void (0);
					}
					else if (aspect.personalName !== "" && aspect.personalResponseValue !== "0") {
						void (0);
					}
					else {
						isValid = false;
					}
				}
				if (aspect.socialName !== undefined && aspect.socialResponseValue !== undefined) {
					if (aspect.socialName === "" && aspect.socialResponseValue === "0") {
						void (0);
					}
					else if (aspect.socialName !== "" && aspect.socialResponseValue !== "0") {
						void (0);
					}
					else {
						isValid = false;
					}
				}
			});

			if (isValid) {
				that.clickNextButton();
			} else {
				const msg = Qualtrics.SurveyEngine.getEmbeddedData('otherError');
				$('div[id="QR~' + that.questionId + '~VALIDATION"]').html(msg).css("display", "block");
				$('html, body').animate({
					scrollTop: $('div[id="QR~' + that.questionId + '~VALIDATION"]').offset().top
				}, 800);
			}
		}, 5);
	})

	// Overflow
	$(".QuestionBody").css('overflow', 'visible');
	$(".BorderColor").css('overflow', 'visible');
});

Qualtrics.SurveyEngine.addOnUnload(function () {
	/*Place your JavaScript here to run when the page is unloaded*/

});