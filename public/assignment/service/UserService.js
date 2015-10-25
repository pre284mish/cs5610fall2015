(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

        function UserService() {
        var users = [
            {id: 1, username: "preetymish", password: "abc", email: "preety@gmail.com", firstName: "Preety", lastName: "Mishra" },
            {id: 2, username: "alicewond", password: "abcd", email: "alice@gmail.com", firstName: "Alice", lastName: "Wonderland"},
        ];

        var service = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };
        return service;


        function generateGuid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        }

        function findAllUsers() {
            callback(users);
        }

        function findUserByUsernameAndPassword(username, password, callback) {
            for(var user in users){
                if(users[user].username.localeCompare(username) == 0 && users[user].password.localeCompare(password) == 0){
                    callback (users[user]);
                    return;
                }
            }

        }

        function createUser(userObj, callback){
            userObj.id = generateGuid();
            users.push(userObj);
            callback(userObj);
        }

        function deleteUserById(userId, callback){
            for(var user in users){
                if(users[user].id == userId){
                    users.splice(user, 1);
                }
            }
            callback(users);
        }

        function updateUser(userId, userObj, callback){
            for(var user in users){
                if(users[user].id == userId){
                    users[user] = userObj;
                    callback(users[user]);
                }
            }

        }

    }
})();