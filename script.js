var allPlotData={};

var d3 = Plotly.d3;

function addPlots(){
  //Plot COVID-19 data
  d3.text("https://raw.githubusercontent.com/freemanbach/Python/master/python3/covid/worlddata/spain/spa_death_data.csv", 
  function(data){ 
    processCSVString("covidChart", data,false, "Date","No of Covid Patients","No of deaths in Spain"); 
  } );
  d3.text("https://raw.githubusercontent.com/freemanbach/Python/master/python3/covid/worlddata/spain/spa_hosp_data.csv", 
  function(data){ 
    processCSVString("covidChart", data,false, "Date","No of Covid Patients","No of hospitalizations in Spain"); 
  } );

  //Plot Stock market data
  d3.text("https://raw.githubusercontent.com/freemanbach/itec225/main/financedata/src/aapl/aapl_high_data.csv", 
  function(data){ 
    processCSVString("stockChart", data,true, "Date","Highest Stock Value","Apple Daily Highest Stock Value"); 
  } );
}
function processCSVString(chartDiv, text, hasHeader, xLabel,yLabel,yTraceName) {
  var rows = d3.csv.parseRows(text);
  var startI = hasHeader? 1: 0;
  var x = [], y = [];
  for (var i=startI; i<rows.length; i++) {
    row = rows[i];
    var v = parseFloat(row[1])
    if (v!=0){
      x.push(row[0]);
      y.push(v);
    }
  }
  makePlotly(chartDiv, x, y,  xLabel,yLabel,yTraceName);
}

function makePlotly(chartDiv, x, y, xLabel,yLabel,yTraceName){
  if (!(chartDiv in allPlotData)){
    allPlotData[chartDiv]={}
  }
  allPlotData[chartDiv][yTraceName]={
    x: x,
    y: y,
    name: yTraceName,
    mode: 'lines',
    connectgaps: true
  };
  var traces = [];
  for (var key in allPlotData[chartDiv]) {
    traces.push(allPlotData[chartDiv][key]);
  }
  var node = d3.select("div[id='"+chartDiv+"']").node();
  Plotly.newPlot(node, traces,
    {//layout
      xaxis: {
        title: xLabel
      },
      yaxis: {
        fixedrange: true,
        title: yLabel
      },
      showlegend: true
    },
    {//options
      displayModeBar: false
    });
};

addPlots();
