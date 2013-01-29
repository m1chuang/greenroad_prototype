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
    update_riders_list();
    update_driver_list();
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
    
    //listener functions for creating events
	google.maps.event.addListener(map, 'click', function(e) {
		if(riderMode == "start"){
	    	console.log(e);
	    	 $("#rider_input_status span").empty().append(rider['name'] + ", click on map to pick end location");
            rider['start'] = e.latLng;
            rider['start_marker'] = addRiderarker(e.latLng,rider['name']+" START location");
	    	riderMode = "end";
	    }else if(riderMode == "end"){
	        rider['end'] = e.latLng;
	        rider['end_marker'] = addRiderarker(e.latLng,rider['name']+" END location");
	        
	    	riderMode = "done";
	    	$("#r_control").val("Add this request");
	        $("#rider_input_status span").empty().append(rider['name'] + ", click to add this rider request");
            /*var answer = confirm('Add this rider request?');
        	if(answer)
        	{
        		//socket.emit('addNewVideo',id);
        		console.log(rider);
        	}*/
	        
	    
	    }
    
	});
    
    update();

}


function addRiderarker(location, txt) {
    var pinColor = "0066FF";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
	var marker = new google.maps.Marker({map: map, 
	                                     position: location, 
	                                     clickable: true,
	                                     title: txt,
	                                     icon: pinImage,
                                         shadow: pinShadow});
    marker.info = new google.maps.InfoWindow({
      content: txt
    });
    google.maps.event.addListener(marker, 'click', function() {
      marker.info.open(map, marker);
    });
    return marker;
  //map.panTo(location);
  
  
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

function update_driver_list(){
    $.get(
        "/drivers/routes",
        function(data){
            $("#routes_list").empty();
            var riders = {};
            console.log(data);
            for (var i in data.drivers)
                
                $("#routes_list").append("<li>FROM: "+data.drivers[i].start_address+" , TO: "+data.drivers[i].end_address+"</li>");
                
                 //$("#routes_list").append("<li>"+data.riders[i].name+", FROM: "+data.riders[i].start+" , TO: "+data.riders[i].end+"</li>");

        },'json');


}

function update_nonDriver_user_list(){
    $.get(
        "/users",
        function(data){
            $("#nonDriver_user").empty();
            var riders = {};
            for (var i in data) 
                if (data[i].type == "none") 
                     $("#nonDriver_user").append("<option value="+data[i].uid+">"+data[i].name+"</option>");

        },'json');
    
}
function update_riders_list(){
    $.get(
        "/riders",
        function(data){
            $("#rider_list").empty();
            var riders = {};
            console.log(data);
            for (var i in data.riders)
                 $("#rider_list").append("<li>"+data.riders[i].name+", FROM: "+data.riders[i].start+" , TO: "+data.riders[i].end+"</li>");

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
            console.log(data);
            //$("#routes_list").append("<li>FROM: "+data.new_driver.start_address+" , TO: "+data.new_driver.end_address+"</li>");
            //console.log(data.end_address);
            update();
        },
        dataType: 'json'
    });

}

var riderMode = false;
var rider = {};
function new_rider_req(){
    if(!riderMode){
        //change status to input.
        rider['uid'] = $("#nonDriver_user").val();
        rider['name'] = $("#nonDriver_user option[value='"+rider['uid']+"']").text();
        riderMode = "start";
        $("#rider_input_status span").empty().append(rider['name'] + ", click on map to pick start location");
        $("#r_control").val("cancel request");
    }else if(riderMode == 'done'){
        var answer = confirm('Add this rider request?');
    	if(answer)
    	{
    	    //NOTE: reformat the logLot information
    		//make the ajax call to add this rider request
    		 $.ajax({
                url:"/riders",
                type: "post",
                data: {uid  : rider['uid'], 
                       start: rider['start'].lat()+","+rider['start'].lng(), 
                       end  : rider['end'].lat()+","+rider['end'].lng()},
                success:function(data){
                    console.log(data);
                  
                    update();
                },
                dataType: 'json'
            });
    		console.log(rider);
    	}
        cancel_rider_request();
    }else{
        //turn it off
        cancel_rider_request();
        
    }

}

function cancel_rider_request(){
    riderMode = false;
    $("#r_control").val("Create new route request from this");
    $("#rider_input_status span").empty().append("off");
    if(rider['start_marker']){
        rider['start_marker'].setMap(null);
    }
    if(rider['end_marker']){
        rider['end_marker'].setMap(null);
    }
    rider = {};
}
google.maps.event.addDomListener(window, "load", initializeDriverMap);
