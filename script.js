$(document).ready(function() {
  //$('button').click(function() {
  $('form').submit(function(e) {
    e.preventDefault();
    var address = $('input:first').val();
    if(address){
      var jax = $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=?' + address);
      jax.done(function(data){
        var location_json = data.results[0];
        addPoint(location_json.geometry.location);
        $('<li>')
            .append($('<a>').attr('href','/user/messages'))
            .addClass('address')
            .text(location_json.formatted_address)
            .appendTo('ul');
      })
    }
    else {
      $( "span" ).text( "Invalid Address..." ).show().fadeOut(1000);
    }
  });
});

var map;
function initMap(location) {
  if(!location)
    location = {lat: 41.08394699999999, lng: -74.176609}
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 10
  });
}

function addPoint(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}
