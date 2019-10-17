// A $( document ).ready() block.
$(document).ready(function() {
  //canvas variable
  var canvas = document.querySelector('canvas');
  //setting the canvas tu use up all the screenspace
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //shortcut variable to reduce typing
  var c = canvas.getContext('2d');
  //the object to hold the mouse position
  var mouse = {
    mx: undefined,
    my: undefined
  }
  //the object to hold the click coordiantes
  var click = {
    cx: undefined,
    cy: undefined
  }
  // global variables 
  var hoveredCircle = null;
  var maxRadius = 100;
  var minRadius = 10;
  var colorArray = [
    '#000000',
    '#FF0000',
    '#800000',
    '#FFFF00',
    '#808000',
    '#00FF00',
    '#008000',
    '#00FFFF',
    '#008080',
    '#0000FF',
    '#000080',
    '#FF00FF',
    '#800080'
  ];
  //eventlisteners 
  //mouse movement
  window.addEventListener('mousemove', function(event) {
    mouse.mx = event.x;
    mouse.my = event.y;
  })
  //window resize
  window.addEventListener('resize', function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  })
  // mouse click
  window.addEventListener('click', function(event) {
    click.cx = event.x;
    click.cy = event.y;
    console.log(click.cx, " | ", event.x, " | ", click.cy, " | ", event.y)
    
    var which;
    if ((which = circleArray.indexOf(hoveredCircle)) != -1)
      circleArray.splice(which, 1);
  })
  //Circle object
  function Circle(x, y, dx, dy, radius, cid) {
    //Identifier
    this.cid = cid;
    //coordinates
    this.x = x;
    this.y = y;
    //velocities
    this.dx = dx;
    this.dy = dy;
    //size
    this.radius = radius;
    //appearance
    this.fillColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.strokeColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    //drawing the circle
    this.draw = function() {
      //this declares that the pen starts here
      c.beginPath();
      //the actual circle calculation
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      //the outline color
      c.strokeStyle = this.strokeColor;
      //this is the function that performs the drawing
      c.stroke();
      //the filling color
      c.fillStyle = this.fillColor;
      //this function performs the filling
      c.fill();
    }
    //the update function
    this.update = function() {
      //these if statements prevent reverse the direction when the circle hits the bordes of the canvas  
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy


      //interactivity for hovers
      // these if statements enlarge the circles to a pre-determined max size when they come in contact with the mouse
      if (mouse.mx - this.x < 50 && mouse.mx - this.x > -50 && mouse.my - this.y < 50 && mouse.my - this.y > -50) {
        hoveredCircle = this;
        if (this.radius < maxRadius) {
          this.radius += 1;
          //console.log('hover increased | ', this.x, "x", "& ", this.y, "y")
        }
      } else if (this.radius > minRadius) {
        if (hoveredCircle == this)
          hoveredCircle = null;
        this.radius -= 1;
        //console.log('mouse left decrease')
      } else if (click.cx == this.x || click.cy == this.y) {
        //this.cid = "clicked";
      }
      //calling the draw function from above
      this.draw();
    }
  }



  // an array to hold the circles
  var circleArray = [];
  var count = 100;

  //an initialzation function
  function init() {
    //making sure we start with an empty arry when we call the function again
    circleArray = [];
    //looping through the array
    for (var i = 0; i < count; i++) {
      //the  variables needed to generate random circles
      var radius = 30;
      var x = Math.random() * (innerWidth - radius * 2) + radius;
      var y = Math.random() * (innerHeight - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 10;
      var dy = (Math.random() - 0.5) * 10;
      var cid = i;
      //pushing circles into the array
      circleArray.push(new Circle(x, y, dx, dy, radius, cid));
    }
  }
  //this function moves the circles
  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
//       if(circleArray[i].cid == "clicked"){
//         circleArray.splice(i, 1);
      console.log(circleArray[i]);
      
      circleArray[i].update();
    }



  }
  init();
  animate();
  //console.log('animate function');
  // End of Document Ready Function
});



// possibly re-using later
// c.fillRect(100, 100, 100, 100);

//c.beginPath();
//c.moveTo(50, 300);
//c.lineTo(300, 100);
//c.lineTo(400, 500);
//c.strokeStyle = " darkgrey";
//c.stroke();

/*c.beginPath();
c.arc(300,300, 30, 0, Math.PI * 2, false);
c.stroke();
*/
//   for (var i = 0; i < 200; i++){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;

//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'blue';
//     c.stroke();

//   }