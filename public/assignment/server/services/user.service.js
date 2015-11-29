//var model = require("../models/user.model.js")();

module.exports = function(app, model){

    app.get("/api/assignment/user/", findAllUsers);
    app.get("/api/assignment/user/id=:id", findUserById);
    app.get("/api/assignment/user/username=:username&password=:password", findUserByUsernameAndPassword);
    app.post("/api/assignment/user/", createUser);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.put("/api/assignment/user/id=:id", updateUser);





    function findAllUsers(req, res){
        model.findAllUsers()
        .then (function(users){
            res.json(users);
        });
    }

    function findUserByUsernameAndPassword(req, res){
        var credentials = {
            "username" : req.params.username,
            "password" : req.params.password

            }
            console.log("Credentials name blah "+ req.params.username);
            console.log("Credentials password blah "+ req.params.password);

        model.findUserByCredentials(credentials)
        .then (function(user){
                console.log("User.Service.js: "+ JSON.stringify(user, null, 4))

                console.log("user.service.js username "+ user.username);
                console.log("user.service.js password "+ user.password);
            res.json(user);
        });
    }

    function createUser(req, res){
        var userObj = req.body;
        console.log("create user:" + userObj);
        model.createUser(userObj)
        .then (function(users){
            res.json(users);
        });
    }

    function deleteUserById(req, res){
            var id = req.params.id;
            model.removeUser(id)
            .then (function(users){
                res.json(users);
            });
    }

    function findUserById(req, res){
            var id = req.params.id;
            console.log("find user:" + id);
            model.findById(id)
            .then (function(user){
                res.json(user);
            });
    }

    function updateUser(req, res){
                var id = req.params.id;
                console.log(id);
                var updatedUserObj = req.body;
                console.log(updatedUserObj);
                model.updateUser(id, updatedUserObj)
                .then (function(user){
                    res.json(user);
                });
    }

};