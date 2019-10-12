// Global variables
var t = 0;
var testX = 0;
var n = 0;
var x = [];
var y = []; 
var v = [];

var tmin = +document.getElementById('minRange').value * Math.PI;
var tmax = +document.getElementById('maxRange').value * Math.PI;


function calc_x(t,testX) {
  return Math.sin(t) * ( Math.E ** Math.cos(t) - 2 * Math.cos (4 * t) - Math.sin(t/12) ** 5 );
 
}
function calc_y(t) {
  return Math.cos(t) * ( Math.E ** Math.cos(t) - 2 * Math.cos (4 * t) - Math.sin(t/12) ** 5 );
}

function calculate() {
  tmin = +document.getElementById('minRange').value * Math.PI;
  tmax = +document.getElementById('maxRange').value * Math.PI;
 
  $("#output-range").text('Range for t: \n'+tmin.toFixed(2)+" "+tmax.toFixed(2));
  var tt = 0;
  var i = 0;
 
  for (tt = tmin; tt <= tmax; tt++) {
    t = tt;    
    x[i] = calc_x(t);    
    y[i] = calc_y(t);    
    v[i] = [x[i], y[i]];   
    i++;
  }
  n = i - 1;
  
}

function displayValues()
{
  var strX = "";
  var strY = "";
  var b = "<br>";
    
    //s = "x = " + x[i] + " | y = " + y[i];
    
  
    
    for (var i = 0; i <= n; i++)
    {
      strX += " x = " + x[i].toFixed(2)+b;
      strY += " y = " + y[i].toFixed(2)+b;
    }
  $("#output-x-coords").html(strX);
  $("#output-y-coords").html(strY);
}

function plotHC()
{
   calculate();
   chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'scatter',
                marginRight: 130,
                marginBottom: 25
            },
            title: {
                text: 'Butterfly Curve',
                x: -20 //center
            },
            xAxis: {
                title: {
                    text: 'X'
                }
            },
            yAxis: {
                title: {
                    text: 'Y'
                }   
            }, 
       
       plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    }
                }
            },
       
       series: [{
                name: 'Y Values',
                color: 'rgba(223, 83, 83, .5)',
                data: v
       }]                
   })      
}

$('#calculate').click( function() {
  calculate();
  displayValues();    
});

$('#scatterPlot').click( function() {
  calculate();
  displayValues();
  clearSCR();
  plotHC();   
});
$('#prettyPlot').click( function() {
  calculate();
  displayValues();
  clearSCR();
  plot();   
});

$('#clear').click( function() {
  clearSCR(); 
});

function plot(){
  functionPlot({
    target: '#butterfly-curve',
    yAxis: {domain: [-4.428571429, 4.428571429]},
    xAxis: {domain: [-7, 7]},
    data: [{
      x: 'sin(t) * (exp(cos(t)) - 2 cos(4t) - sin(t/12)^5)',
      y: 'cos(t) * (exp(cos(t)) - 2 cos(4t) - sin(t/12)^5)',
      range: [tmin, tmax],
      fnType: 'parametric',
      graphType: 'polyline'
    }]
  })
  $("#butterfly-label").text("Maybe the most beautiful equation math has to offer!");
}

function clearSCR(){
  $("#butterfly-curve").empty();
  $("#intro-label").text("");
  $("#butterfly-label").text("");
  $("#output-x-coords").text("");
  $("#output-y-coords").text("");
  $("#container").empty();
  $("#output-range").text("");
}

