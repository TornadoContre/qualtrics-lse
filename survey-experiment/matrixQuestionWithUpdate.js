Qualtrics.SurveyEngine.addOnload(function () {
	function updateAspectMap(newAspectMap) {
		aspectMapString = JSON.stringify(newAspectMap);
		Qualtrics.SurveyEngine.setEmbeddedData('aspectMapString', aspectMapString);
	}

	// Setting variables
	let personalQuestion = false; // true if is a 'personal' question. false for political/societary question
	let nameKey = personalQuestion ? 'personalName' : 'socialName';
	let responseKey = personalQuestion ? 'personalResponseValue' : 'socialResponseValue';
	let markersKey = personalQuestion ? "personalMarkers": "socialMarkers";
	let aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
	let aspectMap = JSON.parse(aspectMapString);
	let questionId = this.questionId;
	let $ = jQuery;
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
		let handleTrack = $("#" + questionId + " ." + questionId + "-" + choiceKey + "-handle");
		let track = $("#" + questionId + " ." + questionId + "-" + choiceKey + "-track");

		handleTrack.attr('style', function(i, estilo) {
			return (estilo || '') + 'border-color: #F44336 !important;';
		});

		handleTrack.css("margin-top", "3px");
		track.css({
			"height": "10px",
			"background": "linear-gradient(to right, gray 0% min(var(--gradient-start), var(--gradient-end)), var(--color-1) min(var(--gradient-start), var(--gradient-end)) max(var(--gradient-start), var(--gradient-end)), var(--color-2) max(var(--gradient-start), var(--gradient-end)) 100%)",
			"z-index": 1002,
			"opacity": 1,
		});
		track[0].style.setProperty("--gradient-start", "0%");
		track[0].style.setProperty("--gradient-end", "0%");
		track[0].style.setProperty("--color-1", "#F44336");
		track[0].style.setProperty("--color-2", "#0000002e");

		// Find aspect object
		let elementChoiceId = nameKey + "-choiceId"; // Useful for the 'other' aspect
		let aspectObj = aspectMap.find(element => element.name === matchedKey[1] && (!Object.hasOwn(element, elementChoiceId) || element[elementChoiceId] === choiceKey));
		if (!aspectObj) { continue; }
		aspectObj[elementChoiceId] = choiceKey;
		updateAspectMap(aspectMap);

		// 1. Set markers
		const markers = aspectObj[markersKey];
		if (markers) {
			const keyStartsWith0 = Object.keys(markers).find(key => key.startsWith("0"));

			// Tooltip in handler
			let msg = markers[keyStartsWith0];
			let tooltipId = questionId + '-' + choiceKey + '-tooltip';
			handleTrack.addClass("hover-trigger");
			handleTrack.append('<div id=' + tooltipId + ' class="mensaje">' + msg + '</div>');

		}

		// 2. Capture response value
		// 2.1 Capture the slider value
		var slider = $('input[type=text].' + questionId + '-' + choiceKey + '-result');
		slider.on('input change', function () {
			aspectObj[responseKey] = $(this).val();
			updateAspectMap(aspectMap);
			if ($(this).val() > 0) {
				$("input[id='hidden-input']").prop("checked", true);
			}
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
	let disableMarkers = false; // Set to 'true' to disable markers
	let personalQuestion = false; // true if is a 'personal' question. false for political/societary question
	let markersKey = personalQuestion ? "personalMarkers": "socialMarkers";
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
				const value = parseInt(target.getAttribute("aria-valuenow"));
				target.style.setProperty("--gradient-end", value + "%");

				const aspectId = target.id.replace('track', 'text');
				let aspectName = $("[id='" + aspectId + "']")[0].textContent.strip();
				aspectName = aspectName.replace(" ⓘ", "");
				let aspectObj = aspectMap.find(element => element.name === aspectName);
				const aspectIndex = aspectMap.indexOf(aspectObj);
				if (aspectIndex === -1) { continue; }
				const markers = aspectObj[markersKey];
				var msg = "";
				for (const markerRange in markers) {
					let lowerBound = markerRange.split('-').map(Number)[0]
					let upperBound = markerRange.split('-').map(Number)[1];
					//let upperCondition = upperBound === 100 ? value <= upperBound : value < upperBound;
					let upperCondition = value <= upperBound;
					if (lowerBound < value && upperCondition) {
						msg = markers[markerRange];
						break;
					}
				}

				if (value === 0) { continue; }

				for (const children of target.children) {
					if (!children.id.includes('handle')) {
						continue;
					}

					let tooltipId = children.id.replaceAll("~", "-").replaceAll("handle", "tooltip");
					let tooltip = $('#' + tooltipId);

					// Updates the message value
					setTimeout(() => {
						tooltip.text(msg);
						if (value >= 90) {
							const m = (60 - 47) / (100 - 90);
							const y = Math.round((value - 90) * m + 47, 3);
							tooltip.css('transform', "translateX(-" + y + "%)");
						} else if (value <= 10) {
							const m = (30 - 47) / (0 - 10);
							const y = Math.round((value - 10) * m + 47, 3);
							tooltip.css('transform', "translateX(-" + y + "%)");
						} else {
							tooltip.css('transform', 'translateX(-47%)');
						}
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
						}, 2100);
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
		let text = choices[choiceKey].Text;
		text = text.replace(" <sup>&#9432;</sup>", "");
		const matchedKey = text.match(regex);
		if (!matchedKey) {
			// Choice without extra markers
			continue;
		}

		// Sets the observer
		if (!disableMarkers) {
			let choiceRow = $('#' + questionId + ' .' + questionId + '-' + choiceKey + '-track');
			let observer = new MutationObserver(callback);
			observer.observe(choiceRow[0], config);
		} else {
			// Removes div with tooltip message
			$("#" + questionId + '-' + choiceKey + '-tooltip').remove();
		}
	}

	// Overflow
	$("#Questions").css('overflow', 'visible')
	$(".QuestionBody").css('overflow', 'visible');
	$(".BorderColor").css('overflow', 'visible');
});

Qualtrics.SurveyEngine.addOnUnload(function () {
	/*Place your JavaScript here to run when the page loads*/
	function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }

    function factorial(n) {
        if (n === 0 || n === 1) {
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
	const increaseArrow = '&#8680&nbsp';
	const decreaseArrow = '&#8678&nbsp';
	const pairCase = ["A", "B"];
	const pairNameSuffix = "PairName_";
	const pairValueSuffix = "PairValue_";
	const pairNewValueSuffix = "PairNewValue_";
	const pairSpanSuffix = "PairSpan_";
	const pairArrowsSuffix = "PairArrows_";
	const personalQuestionOptions = [true, false]; // true if is a 'personal' question. false for political/societary question
	const tradeOffTypes = ["Trade", "50Trade"];

	const percentageTradeOff = parseFloat(Qualtrics.SurveyEngine.getEmbeddedData("percentageTradeOff"));
	const numberOfPairs = parseInt("${e://Field/numberOfPairs}"); // Must be the max value between the number of pairs in each section
	const aspectMapString = Qualtrics.SurveyEngine.getEmbeddedData('aspectMapString');
	const aspectMap = JSON.parse(aspectMapString);
	
	for(const personalQuestion of personalQuestionOptions) {
		let sectionKey = personalQuestion ? '_general' : '_policy'
		let nameKey = personalQuestion ? 'personalName' : 'socialName';
		let responseKey = personalQuestion ? 'personalResponseValue' : 'socialResponseValue';
		let spanKey = personalQuestion ? "personalDescription": "socialDescription";

		// Remove empty aspects
		let localAspectMap = aspectMap.filter((aspect) => aspect[nameKey] ? aspect[nameKey] !== '' : false);

		tradeOffTypes.forEach((tradeOffType) => {
			// Let's pair things
			let uniquePairs = createUniquePairs(localAspectMap, numberOfPairs);
			uniquePairs.forEach((pair, i) => {
				i = i + 1;
				let aValue = parseInt(localAspectMap[pair[0]][responseKey]);
				let bValue = parseInt(localAspectMap[pair[1]][responseKey]);
				let sign = getRandomSign(aValue, bValue);
				pair.map((element, j) => {
					const oldValue = parseInt(localAspectMap[element][responseKey]);
					if (tradeOffType === "Trade") {
						const magnitude = getRandomMagnitude();
						var newValue = applyRandomMagnitude(oldValue, magnitude, sign);
						const arrow = sign > 0 ? increaseArrow : decreaseArrow;
						const arrows = arrow.repeat(magnitude);
						
						Qualtrics.SurveyEngine.setEmbeddedData(i + sectionKey + tradeOffType + pairArrowsSuffix + pairCase[j], arrows);
					} else {
						if (pairCase[j] === "A") {
							var newValue = Math.round(parseInt(oldValue) * (1 - percentageTradeOff));
						}
					}
					Qualtrics.SurveyEngine.setEmbeddedData(i + sectionKey + tradeOffType + pairNameSuffix + pairCase[j], localAspectMap[element][nameKey])
					if (localAspectMap[element][spanKey] && localAspectMap[element][spanKey] !== "") {
						Qualtrics.SurveyEngine.setEmbeddedData(i + sectionKey + tradeOffType + pairSpanSuffix + pairCase[j], localAspectMap[element][spanKey]);
					}
					Qualtrics.SurveyEngine.setEmbeddedData(i + sectionKey + tradeOffType + pairValueSuffix + pairCase[j], oldValue);
					if (newValue !== undefined || newValue === 0) {
						Qualtrics.SurveyEngine.setEmbeddedData(i + sectionKey + tradeOffType + pairNewValueSuffix + pairCase[j], newValue);
					}
					
				})
			})
		})
	}
});