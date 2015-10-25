(function(){
'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

        function ProfileController($scope, $rootScope, UserService){
                $scope.currentUser = $rootScope.currentUser;

         $scope.update = function(){
                UserService.updateUser($scope.currentUser.id, $scope.currentUser, updatedUser);
                console.log($scope.currentUser.id);

                function updatedUser(user){
                     $rootScope.currentUser = user;
                     console.log(user.username);
                     console.log(user.firstName);
                     console.log(user.lastName);
                     console.log(user.email);
                }
           }
        }
})();