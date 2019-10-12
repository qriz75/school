	function getPets(dataSource) {
	  var tbody = $("#zoo tbody").empty();
	  $.each(dataSource.pets, function() {
	    var tr = $("<tr>").attr("Type", this.Type);
	    tr.append($("<th>").text(this.Type));
	    $(this.Names).each(function() {
	      tr.append($("<td>").append(makePet(this)) );
	    });


	    tr.appendTo(tbody);

	  })

	}

	function makePet(name) {
	  var div = $("<div>", {class: "name"})
	    .append($("<h4>").text(name.name))
	    .append(
	      $("<div class='pet-img-container'>")
	      .append($("<img>", {src: "" + name.img, height: "100px"}))
	    );
	  var attributes = $("<ul class='attribute-list'>").appendTo(div);
	  if (name.attributes && name.attributes.length) 
		{
	    $.each(name.attributes, function() {
	      attributes.append($("<li class='attributes'>").text(this));
	    });
	  }

	  return div;
	}

	$(async function() {
	  var response = await fetch("zoo.json");
	  var json = await response.json();
	  getPets(json);
	})