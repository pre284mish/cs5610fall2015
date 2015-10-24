(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {

        $scope.login = function(){
                    UserService.findUserByUsernameAndPassword($scope.username, $scope.password, userExists);
//                    console.log($scope.username);
//                    console.log($scope.password);

                function userExists(user){
                    $rootScope.currentUser = user;
                    $location.url("/profile");
                }
        }
    }
})();