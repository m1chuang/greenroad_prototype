var map;
var geocoder;

//driver default: 34.062702, -118.44230099999999
//
var defaultPos = {'coords': {'latitude': 34.062702, 'longitude':  -118.44230099999999}} ;

//GET current location from client browser (HTML5)
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initialize);
} else {
    error('Geo Location is not supported, go to default location');
    initialize(defaultPos);
}



/*Initialize*/
function initialize(position) {
    console.log(position);
    geocoder = new google.maps.Geocoder();
    var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
	var mapOptions = {
    	zoom: 14,
        center: coords,
    	mapTypeControl: false,
    	streetViewControl: false,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
  	};
  	map =  new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title:"You are here!"
    });
}
  
 /* function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000.
    document.getElementById("total").innerHTML = "Total Distance:" + total + " mi";
  }   */
  
  
  

function error(msg) {
  console.log('error: ' + msg);
}

function new_driver(){


}

function new_rider(){


}
//google.maps.event.addDomListener(window, 'load', getCurrentLocation);
