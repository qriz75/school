function refreshGBList(dataSource) {
	var tbody = $("#gb-list tbody").empty();
  $.each(dataSource.ages, function(){
  	var tr = $("<tr>").attr("age", this.age);
    tr.append($("<th>").text(this.age));
   	$(this.gbs).each(function(){
    	tr.append( $("<td>").append(makeGB(this)) );
    });
    
    
    tr.appendTo(tbody);  
  
  })

}

function makeGB(gb) {
	var div = $("<div>", {class: "gb"})
  	.append($("<h4>").text(gb.gb))
  	.append(
    	$("<div class='gb-img-container'>")
      	.append($("<img>", {src: "/cop4813/img/foe/" + gb.img, height: "100px"}))
    );
  var boosts = $("<ul class='boost-list'>").appendTo(div);
 if (gb.boosts && gb.boosts.length)
 {
 	$.each(gb.boosts, function(){
  	boosts.append($("<li class='boost'>").text(this));
  });
 }
 
 return div;
}

$(async function() {
  var response = await fetch("/cop4813/json/foe.json");
  var json = await response.json();
  refreshGBList(json);
})
   

