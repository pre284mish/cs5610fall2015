
var users = require("./user.mock.json");

module.exports = function(app){

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
        userObj.id = generateGuid();
        users.push(userObj);
        return userObj.id;
    }

    function findAllUsers(){
        return users;
    }

     function generateGuid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


    function findById(userId){
        for(var i in users){
           if(users[i].id == userId){
                return users[i];
           }
        }
            return null;
    }

    function updateUser(userId, userObj){
        for(var i in users){
            if(users[i].id == userId){
                users[i] = userObj;
                return users[i];
            }
        }
    }

    function removeUser(userId){
        for(var i in users){
            if(users[i].id == userId){
                users.splice(i, 1);
            }
        }
        return users;
    }

    function findUserByUsername(username){
        for(var i in users){
            if(users[i].username.localeCompare(username) == 0){
                return (users[i]);
            }
        }
    }

    function findUserByCredentials(credentials){
        for(var i in users){
            if(users[i].username.localeCompare(credentials.username) == 0 &&
            users[i].password.localeCompare(credentials.password) == 0) {
                return users[i];
            }
        }
    }

};