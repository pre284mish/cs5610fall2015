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
                        console.log("login user: "+ user)
                        $rootScope.currentUserId = user.id;
                        $location.url("/profile");
                    })
        }

    }
})();