
//var users = require("./user.mock.json");
var q = require("q");

module.exports = function(db, mongoose){



    var UserSchema = require("./user.schema.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);


    var api = {
        createUser : createUser,
        findAllUsers : findAllUsers,
        findById : findById,
        updateUser : updateUser,
        removeUser : removeUser,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials
    };
    return api;


    function createUser(userObj){
        var deferred = q.defer();
        UserModel.create(userObj, function(err,doc){
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();
        UserModel.find(function(err, doc){
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

//     function generateGuid() {
//          function s4() {
//            return Math.floor((1 + Math.random()) * 0x10000)
//              .toString(16)
//              .substring(1);
//          }
//          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//            s4() + '-' + s4() + s4() + s4();
//    }


    function findById(userId){
        var deferred = q.defer();
        UserModel.findById(userId, function(err, doc){
            console.log("User.model.js doc for findByID: "+ JSON.stringify(doc, null, 4))
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function updateUser(userId, userObj){
        var deferred = q.defer();

        //For openshift delete userId before updating a user
        delete userObj._id;

        UserModel.update({_id: userId},{$set: userObj}, function(err, doc){
            if(err){
                deferred.reject(err);
            }else{
                UserModel.findById(userId, function(err, doc){
                deferred.resolve(doc);
            });
           }
        });
        return deferred.promise;
    }

    function removeUser(userId){
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function(err, doc){
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = q.defer();
        UserModel.find({username: username}, function(err, doc){
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials){
        var deferred = q.defer();
        UserModel.find({$and: [{username: credentials.username}, {password: credentials.password}]}, function(err, doc){
            console.log("User.model.js doc: "+ JSON.stringify(doc, null, 4))
            console.log("User.model.js err: "+ JSON.stringify(err, null, 4))

            deferred.resolve(doc);
        });
        return deferred.promise;
    }

};