var map;

function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644),
     disableDefaultUI: true
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  scrollThreshold = $( "#floatingColl" ).position().top + 20; // see main.js for refrence on this line
  // the above line is to make the floatingColumn float
   
}

google.maps.event.addDomListener(window, 'load', initialize);
