var i = 0;
var locationList = []

$(document).ready(function() {
  //$('button').click(function(e) {}
  function run(e){
    type = e.originalEvent.type;
    if (type == 'submit') {
      e.preventDefault();
    }

    var address = $('input:first').val();
    if(address){
      var jax = $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=?' + address);
      jax.done(function(data){
        var location_json = data.results[0];
        addPoint(location_json.geometry.location);
        locationList.push(location_json.geometry.location);
        console.log(locationList[i]);

        $('<li>').addClass('address address' + i).appendTo('ul');

        $('<label>')
            .text(location_json.formatted_address)
            .attr("onclick", "centerMap(" + i +")")
            .appendTo('.address' + i);
        i++;
      })
    }
    else {
      $( "span" ).text( "Invalid Address..." ).show().fadeOut(1000);
    }
  }
  $('form').submit(function(e) { run(e); });

  $('button').click(function(e) { run(e); });

  $('<li>').on("click",function() { console.log(worked); });

});

var map;
function initMap(location) {
  if(!location){
    location = {lat: 41.08394699999999, lng: -74.176609}
  }
    map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 10
  });
}
function centerMap(location) {
  map.setCenter(locationList[location]);

}

function addPoint(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}
