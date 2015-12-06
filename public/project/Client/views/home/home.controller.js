(function(){
    angular
        .module("CommunityBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $location, $routeParams, UserService) {


    $scope.showSidebar = function(){

           if($routeParams.paramName == 'home'){
           alert("ksjdsdfj");
               return false;
           }else{
               return true;
           }
         };




        var model = this;
        model.registerMember = registerMember;
//        alert("hii");

        function registerMember(){
        // put firstname & lastname in userObj::::::

            var userObj = {username: model.username, password: model.password, email: model.email,
                            firstname: model.firstName, lastname: model.lastName, zipcode: model.zipcode};
            UserService.createUser(userObj)
                    .then(function(user){
                        console.log("register controller userId new: "+user._id);
                        $rootScope.currentUserId = user._id;
                        $location.url("/profile");
                    })

        }

            var model = this;
            model.login = login;

        function login(){
//        alert("username: "+ model.loginUsername);
                    UserService.findUserByUsernameAndPassword(model.loginUsername, model.loginPassword)
                            .then(function(user){
                                console.log("login user: "+ JSON.stringify(user, null, 4))
                                console.log("login userID: "+ user[0]._id);
                                console.log("login password: "+ user[0].password);
                                $rootScope.currentUserId = user[0]._id;
                                $location.url("/views/profile");
                            })
                }
    }
})();