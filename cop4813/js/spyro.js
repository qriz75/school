// needed to load javascript into DOM
window.onload = function() {
  
  //global variables
  var color = "";
  var gold = "#FFD700";

  let width = 800,
    height = 800,
    PR = window.devicePixelRatio || 1,
    scaledWidth = width * PR,
    scaledHeight = height * PR,
    showCircles = true,
    loopTime = 1000,
    tickTime = 10,
    R = 150,
    r = 52,
    l = 0.6,
    p = l * r,
    k = r / R,
    t;

  let backContext = d3.select('canvas#circle')
    .attrs({
      width: scaledWidth,
      height: scaledHeight,
    })
    .styles({
      width: `${width}px`,
      height: `${height}px`
    })
    .node().getContext("2d");

  let context = d3.select('canvas#spiro')
    .attrs({
      width: scaledWidth,
      height: scaledHeight,
    })
    .styles({
      width: `${width}px`,
      height: `${height}px`
    })
    .node().getContext("2d");

  let contextIMG = d3.select('canvas#image')
    .attrs({
      width: scaledWidth,
      height: scaledHeight,
    })
    .styles({
      width: `${width}px`,
      height: `${height}px`
    })
    .node().getContext("2d");

  backContext.scale(PR, PR);
  context.scale(PR, PR);
  contextIMG.scale(PR, PR);

  function pinPoint(angle) {
    return [
      (R * (((1 - k) * (Math.cos(angle))) + (l * k * Math.cos(((1 - k) / k) * angle)))) + (width / 2),
      (R * (((1 - k) * (Math.sin(angle))) - (l * k * Math.sin(((1 - k) / k) * angle)))) + (height / 2)
    ]
  }

  let p0 = [(width / 2) + (R - r) + p, height / 2];

  backContext.strokeStyle = 'gray';
  backContext.fillStyle = 'rgba(255, 255, 255, 0.2)';




  context.strokeStyle = getRandomColor();

  function initCircles() {

    p = l * r;
    k = r / R;
    p0 = [(width / 2) + (R - r) + p, height / 2];

    backContext.clearRect(0, 0, width, height);

    backContext.beginPath();
    backContext.arc(width / 2, height / 2, R, 0, Math.PI * 2);
    backContext.stroke();
   

    backContext.beginPath();
    backContext.arc((R - r) * Math.cos(0) + (width / 2), (R - r) * Math.sin(0) + (height / 2), Math.abs(r), 0, Math.PI * 2);
    backContext.fill();

    backContext.fillStyle = getRandomColor();
    backContext.beginPath();
    backContext.arc(...p0, 3, 0, Math.PI * 2);
    backContext.fill();

    backContext.fillStyle = 'rgba(255, 255, 255, 0.2)';
  }

  d3.select('#bigCircle').on('input', () => {
    R = d3.select('#bigCircle').node().value;
    initCircles();
  });

  d3.select('#smallCircle').on('input', () => {
    r = d3.select('#smallCircle').node().value;
    initCircles();
  });

  d3.select('#p').on('input', () => {
    l = d3.select('#p').node().value;
    initCircles();
  });

  d3.select('#loopTime').on('input', () => {
    loopTime = d3.select('#loopTime').node().value;
  });

  d3.select('#showCircles').on('click', () => {
    showCircles = d3.select('#showCircles').node().checked;
    initCircles();
    if (showCircles == false) backContext.clearRect(0, 0, width, height);
  });

  initCircles();

  d3.select('#draw').on('click', () => {
   // d3.selectAll('#draw, #showCircles, #gold, #random, #rainbow, #sliders input').attr('disabled', 1);
    t = d3.interval((e) => {
      let a = (e / loopTime) * Math.PI * 2;
      let xy = pinPoint(a);

      if (showCircles == true) {
        backContext.clearRect(0, 0, width, height);

        backContext.beginPath();
        backContext.arc(width / 2, height / 2, R, 0, Math.PI * 2);
        backContext.stroke();
        

        backContext.beginPath();
        backContext.arc((R - r) * Math.cos(a) + (width / 2), (R - r) * Math.sin(a) + (height / 2), Math.abs(r), 0, Math.PI * 2);
        backContext.fill();



        backContext.fillStyle = getRandomColor();
        backContext.beginPath();
        backContext.arc(...xy, 3, 0, Math.PI * 2);
        backContext.fill();

        backContext.fillStyle = 'rgba(255, 255, 255, 0.2)';
      }

      context.beginPath();
      context.moveTo(...p0);
      context.lineTo(...xy);
      context.stroke();
     

      p0 = xy;

    }, tickTime);
  });

  d3.select('#save').on('click', () => {
    t.stop();
    d3.select('#save button').attr('disabled', 1);

    contextIMG.fillStyle = 'black';
    contextIMG.fillRect(0, 0, width, height);
    contextIMG.drawImage(d3.select('#spiro').node(), 0, 0, width, height);

    let image = d3.select('#image').node().toDataURL();
    d3.select('#save').node().href = image;
    d3.select('#save').node().download = "spiro.png";
  });

  d3.select('#stop').on('click', () => {
    if (typeof(t) == 'object') t.stop();
    d3.selectAll('#draw, #showCircles, #save button, #sliders input').attr('disabled', null);
  });

  d3.select('#gold').on('click', () => {
   
    context.strokeStyle = gold;
    backContext.fillStyle = gold;
  });

  d3.select('#random').on('click', () => {
    
    context.strokeStyle = getRandomColor();
    backContext.fillStyle = getRandomColor();
  });

  d3.select('#rainbow').on('click', () => {
   
    context.strokeStyle = makeGradient(context);
    backContext.fillStyle = makeGradient(context);
  });

  d3.select('#reset').on('click', () => {
    if (typeof(t) == 'object') t.stop();

    showCircles = true;
    R = 150;
    r = 52;
    l = 0.6;
    p = l * r;
    k = r / R;
    loopTime = 2000;

    p0 = [(width / 2) + (R - r) + p, height / 2];
    backContext.clearRect(0, 0, width, height);
    context.clearRect(0, 0, width, height);
    initCircles();

    d3.selectAll('#draw, #showCircles, #save button, #sliders input').attr('disabled', null);
    showCircles = d3.select('#showCircles').node().checked = true;
    d3.select('#bigCircle').node().value = 150;
    d3.select('#smallCircle').node().value = 52;
    d3.select('#p').node().value = 0.6;
    d3.select('#loopTime').node().value = 200;
  });
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function makeGradient(context) {
  var gradient = context.createLinearGradient(10, 0, 500, 0);
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(1 / 6, 'orange');
  gradient.addColorStop(2 / 6, 'yellow');
  gradient.addColorStop(3 / 6, 'green');
  gradient.addColorStop(4 / 6, 'blue');
  gradient.addColorStop(5 / 6, 'indigo');
  gradient.addColorStop(1, 'violet');
  context.fillStyle = gradient;
  //context.fillRect(0, 0, 500, 75);
  return gradient;
}
function setGold(color){
  color = 'gold';
  return color
}