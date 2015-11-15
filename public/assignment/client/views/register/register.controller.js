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
                    .then(function(userId){
                        $rootScope.currentUserId = userId;
                        $location.url("/profile");
                    })

        }

//        $scope.register = function(){
//                    UserService.createUser($scope.newUser, createNewUser);
//
//                function createNewUser(user){
//                    $rootScope.currentUser = user;
//                    $location.url("/profile");
//                }
//        }
    }
})();