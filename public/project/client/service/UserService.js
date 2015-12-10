(function(){
    'use strict';
    angular
        .module("CommunityBuilderApp")
        .factory("UserService", UserService);

        function UserService($http, $q) {

        var service = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            findUserById : findUserById,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };
        return service;

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/project/user/")
                    .success(function(users){
                        deferred.resolve(users);
                    });
            return deferred.promise;
        }

        function findUserById(userId) {
            var deferred = $q.defer();
            $http.get("/api/project/user/id="+ userId)
                    .success(function(user){
                    console.log("find by id"+user.username+"for "+ userId);
                        deferred.resolve(user);
                    });
            return deferred.promise;
        }

        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http.get("/api/project/user/username=" + username +"&password=" + password)
                    .success(function(user){
                    console.log("UserService.js: "+ JSON.stringify(user, null, 4))
                        deferred.resolve(user);
                    });
            return deferred.promise;

        }

        function createUser(userObj){

            var deferred = $q.defer();
            $http.post("/api/project/user/", userObj)
                .success(function (response) {
                console.log("Create user Userservice: "+ JSON.stringify(response, null, 4))
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteUserById(userId){
            var deferred = $q.defer();
            $http.delete("/api/project/user/" + userId)
                .success(function(user){
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function updateUser(userId, userObj){
            var deferred = $q.defer();
            $http.put("/api/project/user/id=" + userId, userObj)
                    .success(function(user){
                        deferred.resolve(user);
                    });
            return deferred.promise;

        }

    }
})();