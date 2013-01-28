exports.show = function(req, res){
    console.log("yes");
    res.send(users);

};

exports.showOne = function(req, res){
    if(users[req.keys.id]){
        res.send({'error': "user doesn't exists"});
    }else{
        res.send(users[req.keys.id]);
    }

};
