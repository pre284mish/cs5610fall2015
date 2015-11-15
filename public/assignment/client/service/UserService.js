(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

        function UserService($http, $q) {
//        var users = [
//            {id: 1, username: "preetymish", password: "abc", email: "preety@gmail.com", firstName: "Preety", lastName: "Mishra" },
//            {id: 2, username: "alicewond", password: "abcd", email: "alice@gmail.com", firstName: "Alice", lastName: "Wonderland"},
//        ];

        var service = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            findUserById : findUserById,
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
            var deferred = $q.defer();
            $http.get("/api/assignment/client/user/")
                    .success(function(users){
                        deferred.resolve(users);
                    });
            return deferred.promise;
        }

        function findUserById(userId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/client/user/id="+ userId)
                    .success(function(user){
                    console.log("find by id"+user.username+"for "+ userId);
                        deferred.resolve(user);
                    });
            return deferred.promise;
        }

        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http.get("/api/assignment/client/user/username=" + username +"&password=" + password)
                    .success(function(user){
                        deferred.resolve(user);
                    });
            return deferred.promise;

        }

        function createUser(userObj){
            var deferred = $q.defer();
//            userObj.id = generateGuid();
            $http.post("/api/assignment/client/user/", userObj)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteUserById(userId){
            var deferred = $q.defer();
            $http.delete("/api/assignment/client/user/" + userId)
                .success(function(user){
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function updateUser(userId, userObj){
            var deferred = $q.defer();
            $http.put("/api/assignment/client/user/id=" + userId, userObj)
                    .success(function(user){
                        deferred.resolve(user);
                    });
            return deferred.promise;

        }

    }
})();