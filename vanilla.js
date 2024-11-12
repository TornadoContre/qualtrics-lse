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
    /*let firstPar = uniquePairs[0];
    firstPar.map((element) => {
        console.log(aspectMap[element].name)
    })*/
    
    for (let i = -11; i <= 111; i++) {
        for (let j = 0; j <= 4; j++) {
            console.log(i, applyRandomMagnitude(i))
        }   
    }
}

function imprimirHtmlAspectos(N) {
    console.log("##### Tabla de aspectos ##### ")
    for (let i = 1; i <= N; i++) {
        console.log(`<p style="color:#2980b9;"><span data-text="\${e://Field/aspectSpan${i}}" class="matrix-tooltip">\${e://Field/aspectName${i}} <sup>&#9432;</sup></span></p>`);
    }
}

function imprimirHtml50Tradeoffs(N) {
    console.log("##### 50 Trade Offs #####")
    for (let i = 1; i <= N; i++) {
        console.log(`<span class="matrix-tooltip" style="color:#2980b9;" data-text="\${e://Field/${i}_pairSpan_A}"><b>\${e://Field/${i}_pairName_A}</b> <sup>&#9432;</sup></span> <br /> Old Value: \${e://Field/${i}_pairValue_A} <br /> New Value: \$e{ round( ( e://Field/${i}_pairValue_A ) * ( 1 - e://Field/percentageTradeOff ) , 0 ) } <br /> Difference: \$e{ round( ( e://Field/${i}_pairValue_A ) * ( 1 - e://Field/percentageTradeOff ) , 0 ) - ( e://Field/${i}_pairValue_A ) }`);
        console.log(`<span class="matrix-tooltip" style="color:#2980b9;" data-text="\${e://Field/${i}_pairSpan_B}"><b>\${e://Field/${i}_pairName_B}</b> <sup>&#9432;</sup></span> <br /> Old Value: \${e://Field/${i}_pairValue_B}`);
        console.log("");
    }
}

imprimirHtmlAspectos(14)