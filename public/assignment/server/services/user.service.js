var model = require("../models/user.model.js")();

module.exports = function(app){

    app.get("/api/assignment/client/user", findAllUsers);
    app.get("/api/assignment/client/user/id=:id", findUserById);
    app.get("/api/assignment/client/user/username=:username&password=:password", findUserByUsernameAndPassword);
    app.post("/api/assignment/client/user/", createUser);
    app.delete("/api/assignment/client/user/:id", deleteUserById);
    app.put("/api/assignment/client/user/id=:id", updateUser);





    function findAllUsers(req, res){
        res.json(model.findAllUsers());
    }

    function findUserByUsernameAndPassword(req, res){
        var credentials = {
            "username" : req.params.username,
            "password" : req.params.password

            }

        res.json(model.findUserByCredentials(credentials));
    }

    function createUser(req, res){
        var userObj = req.body;
        console.log("create user:" + userObj);
        res.json(model.createUser(userObj));
    }

    function deleteUserById(req, res){
            var id = req.params.id;
            res.json(model.removeUser(id));
    }

    function findUserById(req, res){
            var id = req.params.id;
            console.log("find user:" + id);
            res.json(model.findById(id));
    }

    function updateUser(req, res){
                var id = req.params.id;
                console.log(id);
                var updatedUserObj = req.body;
                console.log(updatedUserObj);
                res.json(model.updateUser(id, updatedUserObj));
    }



};