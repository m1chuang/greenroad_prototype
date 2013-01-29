
/*
 * RIDER API definition
 */
 
 

//Show information for specific rider request
exports.show = function(req, res){
    var rider_id = req.params.rider_id;
    if(riders[rider_id]){

        res.send({"status": "OK", "rider": riders[rider_id]});
    }else{
        //ERROR
        res.send({"status": "error", "error_msg" : "rider request does not exists!"});
    }
   

};

exports.showAll = function(req, res){
    res.send({"status": "OK", "riders": riders});
}

//create new rider request
exports.create = function(req, res){
    console.log(req.body);
    if(!req.body.uid || !req.body.start || !req.body.end){
                //ERROR
        res.send({"status": "error", "error_msg" : "incorrect param!"});

    }
    var uid   = parseInt(req.body.uid);
    //check if the user already has a ride id
    //assumption: a user can only have one rider request at any given time. (just to make it simpler)
    if(riders[uid]){
        //ERROR?
        res.send({"status": "error", "error_msg" : "user is already a rider!"});
    }else{
        users[uid].type = "rider";
        riders[uid] = {"uid"  : uid, 
                       "start": req.body.start, 
                       "end"  : req.body.end,
                       "name" : users[uid]['name']};

        res.send({"status": "OK", 
                  "newRider": riders[uid]});
    }
    
    
   
};


//TODO: 
exports.update = function(req, res){
    
   
};