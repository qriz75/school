// A $( document ).ready() block.
$( document ).ready(function() {
  //  console.log( "ready!" );


  
  
var canvas = document.querySelector('canvas');


  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  
  var c = canvas.getContext('2d');
  
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
  for (var i = 0; i < 200; i++){
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = 'blue';
    c.stroke();
    
  }
  
  
//console.log('canvas');




// End of Document Ready Function
});