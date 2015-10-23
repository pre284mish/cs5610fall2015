(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

        function UserService() {
        var users = [
            {id: 1, username: "preetymish", password: "abc", email: "preety@gmail.com", firstName: "Preety", lastName: "Mishra" },
            {id: 1, username: "alicewond", password: "abcd", email: "alice@gmail.com", firstName: "Alice", lastName: "Wonderland"},
        ];

        var service = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword
            findAllUsers : findAllUsers
            createUser : createUser
            deleteUserById : deleteUserById
            updateUser : updateUser
        };
        return service;

        function findAllUsers() {
            return users;
        }

        function findUserByUsernameAndPassword(username, password, callback) {
            for(var user in users){
                if(users[user].username == username && users[user].password == password){
                    return users[user];
                }
            }

        }

        function createUser(userObj, callback){


        }

        function deleteUserById(userId, callback){
            for(var user in users){
                if(users[user].id == userId){
                    users.splice(user, 1);
                }
            }
        }

        function updateUser(userId, userObj, callback){
            for(var user in users){
                if(users[user].id == userId){
                    users[user] = userObj;
                }
            }
        }

        //function for userId
    }
})();