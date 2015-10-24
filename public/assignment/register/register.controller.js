(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register = function(){
                    UserService.createUser($scope.newUser, createNewUser);

                function createNewUser(user){
                    $rootScope.currentUser = user;
                    $location.url("/profile");
                }
        }
    }
})();