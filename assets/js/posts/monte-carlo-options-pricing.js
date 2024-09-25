var params = { S0: 100, K: 100, r: 0.15, sigma: 0.05, T: 100, N: 100 };
var layout = {
    showlegend: false,
    autosize: true,
    hovermode: false,
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)',
}

const config = {
    displayModeBar: false,
    transition: {
        duration: 500,
        easing: 'cubic-in-out'
    },
    frame: {
        duration: 500
    },
    responsive: true, staticPlot: false
};

var meanSlider, meanValue, sigmaSlider, sigmaValue, daysSlider, daysValue;
meanSlider = document.getElementById("mean-slider");
meanValue = document.getElementById("mean-slider-value");
sigmaSlider = document.getElementById("sigma-slider");
sigmaValue = document.getElementById("sigma-slider-value");
daysSlider = document.getElementById("days-slider");
daysValue = document.getElementById("days-slider-value");
tracesSlider = document.getElementById("traces-slider");
tracesValue = document.getElementById("traces-slider-value");
meanSlider.value = params.r;
sigmaSlider.value = params.sigma;
daysSlider.value = params.T;
tracesSlider.value = params.N;
meanValue.innerHTML = Math.round((meanSlider.valueAsNumber) * 100) + "%";
sigmaValue.innerHTML = Math.round((sigmaSlider.valueAsNumber) * 100) + "%";
daysValue.innerHTML = daysSlider.value;
tracesValue.innerHTML = tracesSlider.value;
({data, layout} = simulate());
var generateData = generate();
Plotly.newPlot("plot-0", {data : [data], layout}, config);
Plotly.newPlot("plot-1", {data : generateData, layout}, config);
// var callPrice = 0;
// for(timeSeries in generateData){
//     callPrice += Math.exp(-0.05*100) * Math.max(0, timeSeries[timeSeries.length - 1] - params.K);
// }
// document.getElementById("mean-call-price").innerHTML = callPrice / generateData.length;

meanSlider.onchange = function() {
    meanValue.innerHTML = Math.round((this.valueAsNumber) * 100) + "%";
    params.r = this.valueAsNumber;
    update();
}

sigmaSlider.onchange = function() {
    sigmaValue.innerHTML = Math.round((this.valueAsNumber) * 100) + "%";
    params.sigma = this.valueAsNumber
    update();
}

daysSlider.onchange = function() {
    daysValue.innerHTML = Math.round(this.valueAsNumber);
    params.T = this.valueAsNumber;
    update();
}

tracesSlider.onchange = function() {
    tracesValue.innerHTML = Math.round(this.valueAsNumber);
    params.N = this.valueAsNumber;
    generateData = generate();
    // var callPrice = 0;
    // for(timeSeries in generateData){
    //     callPrice += Math.exp(-0.05*params.N) * Math.max(0, timeSeries[timeSeries.length - 1] - params.K);
    // }
    // document.getElementById("mean-call-price").innerHTML = callPrice / generateData.length;
    Plotly.newPlot("plot-1", {data : generateData, layout}, config);
}

function update() {
    ({data, layout} = simulate());
    Plotly.animate("plot-0", {data : [data], layout}, config);
}

function generate() {
    var X = [];
    var Y = [];
    const N = params.N;
    const S0 = params.S0;
    const K = params.K;
    const r = 0.05;
    const sigma = 0.2;
    const T = 100;
    var timeSeries = [];
    var colors = [];
    while (colors.length < 100) {
        do {
            var color = Math.floor((Math.random()*1000000)+1);
        } while (colors.indexOf(color) >= 0);
        colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
    var mn = 10000; var mx = -1;
    for(let n = 0; n < N; n++){
        for(let t = 0; t < T; t++){
            let Z = gaussian();
            X[t] = t;
            S_t = S0 * Math.exp((r - 0.5 * sigma * sigma) * (t/365) + sigma * Math.sqrt(t/365) * Z);
            // y = Math.exp(-r * t) * (S_t - K);
            // Y[t] = (t > 0 ? (y + Y[t-1]) : y);
            Y[t] = S_t - K;
            mn = Math.min(mn, Y[t]);
            mx = Math.max(mx, Y[t]);
        }
        var data = {
            x: X,
            y: Y.map((x) => x + S0),
            mode: 'line',
            line: {
                color: colors[n],
                simplify: false
            }
        }
        timeSeries.push(data);
    }
    layout.yaxis.range = [50, 150];
    // const margin = (mx - mn) * 0.1;
    // var layout = {
    //     showlegend: false,
    //     autosize: true,
    //     hovermode: false,
    //     paper_bgcolor:'rgba(0,0,0,0)',
    //     plot_bgcolor:'rgba(0,0,0,0)',
    //     yaxis: {
    //         range: [mn -margin, mx + margin]
    //     },
    //     xaxis: {
    //         range: [0, 100]
    //     }
    // }
    return timeSeries;
}

function simulate() {
    var X = [];
    var Y = [];
    var mx = -1; var mn = 10000;
    const S0 = params.S0;
    const K = params.K;
    const r = meanSlider.value;
    const sigma = sigmaSlider.value;
    const T = daysSlider.value;
    for(let t = 0; t < T; t++){
        let Z = gaussian();
        X[t] = t;
        Y[t] = S0 * Math.exp((r - 0.5 * sigma * sigma) * (t/365) + sigma * Math.sqrt(t/365) * Z);
        mx = Math.max(mx, Y[t]);
        mn = Math.min(mn, Y[t]);
    }
    var data = {
        x: X,
        y: Y,
        mode: 'line',
        line: {
            color: 'blue',
            simplify: false
        }
    }
    const margin = (mx - mn) * 0.1;
    const range = [mn - margin, mx + margin];
    layout = {
        showlegend: false,
        autosize: true,
        hovermode: false,
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        yaxis: {
            range: range
        }
    }
    return {data, layout};
}

// function testPlotly(){
//     X = []; Y = [];
//     for(let i = 0; i < 10; i++){
//         X[i] = i;
//         Y[i] = Math.random() * 100;
//     }
//     data = {
//         x: X,
//         y: Y,   
//         mode: 'bar',
//         line: {
//             color: 'red',
//             simplify: false
//         }
//     }
//     layout = {
//         showlegend: false,
//         autosize: true,
//         hovermode: false,
//         paper_bgcolor:'rgba(0,0,0,0)',
//         plot_bgcolor:'rgba(0,0,0,0)',
//         yaxis: {
//             range: [0, 100]
//         },
//         xaxis: {
//             range: [0, 10]
//         }
//     }
//     return {data, layout};
// }

function gaussian() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}