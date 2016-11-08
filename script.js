$(document).ready(function() {
  var map_api = 'https://maps.googleapis.com/maps/api/geocode/json?address=?';

  $('button').click(function() {
        var address = $(this).siblings('input').val()
        map_api += address;
        var location_json;
        $.getJSON(map_api, function(data){
          location_json = data.results[0].geometry.location;
          addPoint(location_json);
        });

        $('<li>')
          .addClass('address')
          .text(address)
          .appendTo('ul');
  });
});

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.08394699999999, lng: -74.176609},
    zoom: 10
  });
}

function addPoint(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}
