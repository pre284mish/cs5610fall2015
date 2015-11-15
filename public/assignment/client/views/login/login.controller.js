(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {


        var model = this;
        model.login = login;

        function login(){
            console.log(model.username);
            UserService.findUserByUsernameAndPassword(model.username, model.password)
                    .then(function(user){
                        $rootScope.currentUser = user;
                        $location.url("/profile");
                    })
        }


//        $scope.login = function(){
//                    UserService.findUserByUsernameAndPassword($scope.username, $scope.password, userExists);
////                    console.log($scope.username);
////                    console.log($scope.password);
//
//                function userExists(user){
//                    $rootScope.currentUser = user;
//                    $location.url("/profile");
//                }
//        }
    }
})();