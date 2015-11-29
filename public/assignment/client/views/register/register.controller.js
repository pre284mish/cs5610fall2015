(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        var model = this;
        model.register = register;


        function register(){
            var userObj = {username: model.newUser.username, password: model.newUser.password , email: model.newUser.email};
            UserService.createUser(userObj)
                    .then(function(user){
                        console.log("register controller userId new: "+user._id);
                        $rootScope.currentUserId = user._id;
                        $location.url("/profile");
                    })

        }
    }
})();