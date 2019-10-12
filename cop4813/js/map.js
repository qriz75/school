var geocoder;
var map;

function initialize() {
  var map = new google.maps.Map(
    document.getElementById("map_canvas"), {
      center: new google.maps.LatLng(29.202431, -81.050343),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  var input = document.getElementById('id_address');
  var options = {
    types: ['address'],
    componentRestrictions: {
      country: 'us'
    }
  };
  autocomplete = new google.maps.places.Autocomplete(input, options);
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    for (var i = 0; i < place.address_components.length; i++) {
      for (var j = 0; j < place.address_components[i].types.length; j++) {
        if (place.address_components[i].types[j] == "postal_code") {
          document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;

        }
      }
    }
  })
}
google.maps.event.addDomListener(window, "load", initialize);
