(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {


        var model = this;
        model.login = login;

        function login(){
            UserService.findUserByUsernameAndPassword(model.username, model.password)
                    .then(function(user){
                        console.log("login user: "+ JSON.stringify(user, null, 4))
                        console.log("login userID: "+ user[0]._id);
                        console.log("login userID: "+ user.password);
                        $rootScope.currentUserId = user[0]._id;
                        $location.url("/profile");
                    })
        }

    }
})();