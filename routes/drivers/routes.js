
/*
 * Drivers API definition
 */
 
 //google map plugin.
var gm = require("googlemaps");

//Show information for specific route
exports.show = function(req, res){
    var route_id = req.params.route_id;
    if(route_request[route_id]){

        res.send(route_request[route_id]);
    }else{
        //ERROR
        res.send({"error": "route does not exists!"});
    }
   /* gm.reverseGeocode('41.850033,-87.6500523', function(err, data){
        res.send(data);
       
    });*/
    

};


//send destination/ parse route from googlemapapi
exports.create = function(req, res){
    console.log(req.body);
    var uid   = parseInt(req.body.uid);
    var start = req.body.start;
    var end   = req.body.end;
    gm.directions(start, end, function(err, data){
        route_request[uid] = data.routes[0].legs[0];
        //set the user to driver
        users[uid].isDriver = true;
        res.send(route_request[uid]);
    })
   
};


//TODO: replaces the driver route request for a given driver
exports.update = function(req, res){
   
    var route_id = req.params.route_id;
    if(route_request[route_id]){
        console.log(req.body);
        var start = req.body.start;
        var end   = req.body.end;
        gm.directions(start, end, function(err, data){
            route_request[route_id] = data.routes[0].legs[0];
            res.send(route_request[uid]);
        })
    }else{
        //ERROR
        res.send({"error": "route does not exists!"});
    }
   
};