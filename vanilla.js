function applyRandomMagnitude(value) {
    const variation = Math.random();
    const maxMagnitude = 10;
    const minMagnitude = 0;
    let magnitude = (maxMagnitude - minMagnitude) * variation + minMagnitude;
    
    let sign = Math.random() > 0.5 ? 1 : -1;
    sign = value == 0 ? 1 : sign;
    sign = value == 100 ? -1 : sign;
    
    magnitude = sign * Math.round(magnitude);
    var newValue = value + magnitude;
    newValue = Math.min(100, newValue);
    newValue = Math.max(0, newValue);
    
    return newValue
}

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
    
    if (array.length <= 1 || totalPairs > totalCombinations) {
        throw new Error("Not enough elements. Max combinations: " + totalCombinations);
    }

    let pairs = new Set();

    // Creates unique pares
    while (pairs.size < totalPairs) {
        let i = getRandomIndex(array.length);
        let j = getRandomIndex(array.length);

        // Checks that i != j and pai (i, j) is unique
        if (i !== j) {
            let pair = [i, j].sort((a, b) => a - b).toString();
            pairs.add(pair);
        }
    }

    // Array as array of pairs
    return Array.from(pairs).map(pair => pair.split(',').map(Number));
}

function testAspect() {
    var aspectMap = [
        { "name": "Physical Health", "span": "Salud Física", "markers": { "25%": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "50%": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "75%": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." } },
        { "name": "Quality of the Environment", "span": "Calidad del ambiente", "markers": { "20%": "sth1", "40%": "sth2", "80%": "sth3" } },
        { "name": "Social", "span": "Social", "markers": { "25%": "sth25", "50%": "sth50", "75%": "sth75" } },
        { "name": "Asp1", "span": "Asp1 Span", "markers": { "25%": "sth25", "50%": "sth50", "75%": "sth75" } },
        { "name": "Asp2", "span": "Asp2 Span", "markers": { "25%": "sth25", "50%": "sth50", "75%": "sth75" } },
    ]
    let numberOfPairs = 5;
    
    let uniquePairs = createUniquePairs(aspectMap, numberOfPairs);
    console.log(uniquePairs);
    uniquePairs.map((pair) => {
        console.log("#####");
        pair.map((element, idx) => {
            console.log(aspectMap[element].name, "| Indice:", idx)
        })
    })
    
    for (let i = -11; i <= 111; i++) {
        for (let j = 0; j <= 4; j++) {
            console.log(i, applyRandomMagnitude(i))
        }   
    }
}

function imprimirHtmlAspectos(N, personal) {
    const spanSuffix = personal ? "Personal" : "Social";
    console.log("##### Tabla de aspectos ##### ")
    for (let i = 1; i <= N; i++) {
        console.log(`<p style="color:#2980b9;"><span data-text="\${e://Field/aspectSpan${spanSuffix}${i}}" class="matrix-tooltip">\${e://Field/aspectName${i}} <sup>&#9432;</sup></span></p>`);
    }
}

function imprimirHtmlTradeoffs(N, type_) {
    console.log(`##### Trade Offs: ${type_} #####`)
    for (let i = 1; i <= N; i++) {
        console.log(`<div style="text-align: left; margin-bottom: 10px; font-weight: bold; font-size: 22px;">Option 1</div><span data-text="\${e://Field/${i}_${type_}TradePairSpan_A}" class="tooltip"><b>\${e://Field/${i}_${type_}TradePairName_A}</b></span> <br /> <br />Old Value: \${e://Field/${i}_${type_}TradePairValue_A} <br /> New value: \${e://Field/${i}_${type_}TradePairNewValue_A} <br /> Difference: \$e{ e://Field/${i}_${type_}TradePairNewValue_A - e://Field/${i}_${type_}TradePairValue_A} <br /> <strong>\${e://Field/${i}_${type_}TradePairArrows_A}</strong><br /><center><input style="--gradient-start: \${e://Field/${i}_${type_}TradePairValue_A}%; --gradient-end: \${e://Field/${i}_${type_}TradePairNewValue_A}%; --color-1: #FF7F7F; --color-2: red; float: none" class="slider" list="tickmarks" max="100" min="0" step="1" type="range" value=""/><div class="sliderticks"><p>0</p><p>10</p><p>20</p><p>30</p><p>40</p><p>50</p><p>60</p><p>70</p><p>80</p><p>90</p><p>100</p></div></center>`);
        console.log(`<div style="text-align: left; margin-bottom: 10px; font-weight: bold; font-size: 22px;">Option 2</div><span data-text="\${e://Field/${i}_${type_}TradePairSpan_B}" class="tooltip"><b>\${e://Field/${i}_${type_}TradePairName_B}</b></span> <br /> <br />Old Value: \${e://Field/${i}_${type_}TradePairValue_B} <br /> New value: \${e://Field/${i}_${type_}TradePairNewValue_B} <br /> Difference: \$e{ e://Field/${i}_${type_}TradePairNewValue_B - e://Field/${i}_${type_}TradePairValue_B} <br /> <strong>\${e://Field/${i}_${type_}TradePairArrows_B}</strong><br /><center><input style="--gradient-start: \${e://Field/${i}_${type_}TradePairValue_B}%; --gradient-end: \${e://Field/${i}_${type_}TradePairNewValue_B}%; --color-1: #ADD8E6; --color-2: blue; float: none" class="slider" list="tickmarks" max="100" min="0" step="1" type="range" value=""/><div class="sliderticks"><p>0</p><p>10</p><p>20</p><p>30</p><p>40</p><p>50</p><p>60</p><p>70</p><p>80</p><p>90</p><p>100</p></div></center>`);
        console.log("");
    }
}

function imprimirHtml50Tradeoffs(N, type_) {
    console.log("##### 50 Trade Offs #####")
    for (let i = 1; i <= N; i++) {
        console.log(`<span class="matrix-tooltip" style="color:#2980b9;" data-text="\${e://Field/${i}_${type_}50TradePairSpan_A}"><b>\${e://Field/${i}_${type_}50TradePairName_A}</b> <sup>&#9432;</sup></span> <br /> Old Value: \${e://Field/${i}_${type_}50TradePairValue_A} <br /> New Value: \${e://Field/${i}_${type_}50TradePairNewValue_A} <br /> Difference: \$e{ e://Field/${i}_${type_}50TradePairNewValue_A - e://Field/${i}_${type_}50TradePairValue_A }`);
        console.log(`<span class="matrix-tooltip" style="color:#2980b9;" data-text="\${e://Field/${i}_${type_}50TradePairSpan_B}"><b>\${e://Field/${i}_${type_}50TradePairName_B}</b> <sup>&#9432;</sup></span> <br /> Old Value: \${e://Field/${i}_${type_}50TradePairValue_B}`);
        console.log("");
    }
}

function imprimirEmbeddedVariables(N) {
    console.log("##### Embedded Variables #####")
    const sections = ["general", "policy"];
    const tradeOffTypes = ["Trade", "50Trade"];
    const pairCase = ["A", "B"];
    sections.forEach((sectionKey) => {
        tradeOffTypes.forEach((tradeOffType) => {
            for(let i = 1; i <= N; i++) {
                pairCase.forEach((pair) => {
                    console.log(`${i}_${sectionKey}${tradeOffType}PairName_${pair}`)
                    console.log(`${i}_${sectionKey}${tradeOffType}PairValue_${pair}`)
                    console.log(`${i}_${sectionKey}${tradeOffType}PairNewValue_${pair}`)
                    //console.log(`${i}_${sectionKey}${tradeOffType}PairSpan_${pair}`)
                    //console.log(`${i}_${sectionKey}${tradeOffType}PairArrows_${pair}`)
                })
                console.log("")
            }
        })
    })
}

function imprimirEmbeddedBVariables50(N) {
    const sections = ["general", "policy"];
    sections.forEach((section) => {
        for (let i = 1; i <= N; i++) {
            console.log(`\${e://Field/${i}_${section}50TradePairValue_B}`)
        }
    })
}

//imprimirHtmlTradeoffs(3, "general")
//imprimirHtmlTradeoffs(3, "policy")
//imprimirHtml50Tradeoffs(3, "general")
imprimirHtml50Tradeoffs(3, "policy")
//imprimirEmbeddedBVariables50(3)
//imprimirHtmlAspectos(14, true)
//imprimirHtmlAspectos(14, false)
