var map;
var rendererOptions = {
    draggable: true
  };
//var defaultDriverPos = "34.062702,-118.44230099999999";
var defaultDriverPos = new google.maps.LatLng( 34.062702, -118.44230099999999);
                             
var driver_uid = 0;
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();

function update(){
    update_nonDriver_user_list();
}

/*Initialize*/
function initializeDriverMap() {
    console.log(defaultDriverPos);

    //var coords = new google.maps.LatLng(defaultDriverPos.coords.latitude, 
    //                                    defaultDriverPos.coords.longitude);
    //console.log(coords);
	var mapOptions = {
    	zoom: 14,
        center: defaultDriverPos,
    	mapTypeControl: false,
    	streetViewControl: false,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
  	};
  	map =  new google.maps.Map(document.getElementById("driver_map_canvas"), mapOptions);

    var marker = new google.maps.Marker({
        position: defaultDriverPos,
        map: map,
        title:"You are here!"
    });

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
      //computeTotalDistance(directionsDisplay.directions);
    });
    update();

}

//DIRECTION FUNCTIONS
function calcRoute() {
    //var coords = new google.maps.LatLng(defaultDriverPos.coords.latitude, 
    //                                    defaultDriverPos.coords.longitude);

    var end = document.getElementById("end").value;
    var request = {
        origin:defaultDriverPos, 
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            console.log(directionsDisplay.directions);
        }
    });
	

}

//
function error(msg) {
  console.log('[ERROR]: ' + msg);
}
function update_nonDriver_user_list(){
    $.get(
        "/users",
        function(data){
            $("#nonDriver_user").empty();
            var riders = {};
            for (var i in data) 
                if (!data[i].isDriver) 
                     $("#nonDriver_user").append("<option value="+data[i].uid+">"+data[i].name+"</option>");

        },'json');
    
}
function new_driver_req(){
  
    var e = document.getElementById("end").value;
    //var start = document.getElementById("start").value;
    //right now, we send the uid. But idealy, the server would check what user  is

    $.ajax({
        url:"/drivers/routes",
        type: "post",
        data: {uid: driver_uid, start: "34.062702,-118.44230099999999", end: e},
        success:function(data){
            $("#routes_list").append("<li>FROM: "+data.start_address+" , TO: "+data.end_address+"</li>");
            //console.log(data.end_address);
            update();
        },
        dataType: 'json'
    });

}

function new_rider_req(){


}
google.maps.event.addDomListener(window, "load", initializeDriverMap);
