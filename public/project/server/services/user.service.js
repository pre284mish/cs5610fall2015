//var model = require("../models/user.model.js")();

module.exports = function(app, model){

    app.get("/api/project/user/", findAllUsers);
    app.get("/api/project/user/id=:id", findUserById);
    app.get("/api/project/user/username=:username&password=:password", findUserByUsernameAndPassword);
    app.post("/api/project/user/", createUser);
    app.delete("/api/project/user/:id", deleteUserById);
    app.put("/api/project/user/id=:id", updateUser);


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
        model.findUserByCredentials(credentials)
        .then (function(user){
            res.json(user);
        });
    }

    function createUser(req, res){
        var userObj = req.body;
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