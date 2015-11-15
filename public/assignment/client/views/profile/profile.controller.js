(function(){
'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

        function ProfileController($scope, $rootScope, UserService){

            var model = this;
            model.update = update;

            console.log("Userid:: "+$rootScope.currentUserId);
            UserService.findUserById($rootScope.currentUserId)
                    .then(function(user){
                        model.currentUser = user;
                        console.log("Username:: "+model.currentUser.username);
                    })


            function update(){
                console.log(model.currentUser.username);
                console.log(model.currentUser.id);
                UserService.updateUser(model.currentUser.id, model.currentUser)
                        .then(function(user){
                            $rootScope.currentUser = user;
                        })
            }

//                $scope.currentUser = $rootScope.currentUser;
//
//         $scope.update = function(){
//                UserService.updateUser($scope.currentUser.id, $scope.currentUser, updatedUser);
//                console.log($scope.currentUser.id);
//
//                function updatedUser(user){
//                     $rootScope.currentUser = user;
//                     console.log(user.username);
//                     console.log(user.firstName);
//                     console.log(user.lastName);
//                     console.log(user.email);
//                }
//           }
        }
})();