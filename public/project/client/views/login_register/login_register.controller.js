(function(){
    angular
        .module("CommunityBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope,$routeParams, $location, UserService) {
        var model = this;
        model.registerMember = registerMember;

        function registerMember(role){
        $rootScope.role = role;
            var userObj = {username: model.username, password: model.password, email: model.email,
                            firstname: model.firstName, lastname: model.lastName, zipcode: model.zipcode, role: role};
            UserService.createUser(userObj)
                    .then(function(user){
                        console.log("register controller userId new: "+user._id);
                        $rootScope.currentUserId = user._id;
                        $routeParams.role = user.role;
                        $rootScope.role = user.role;
                        $location.url("/profile");
                    })

        }

            var model = this;
            model.login = login;

        function login(){

//        alert("username: "+ model.loginUsername);
                    UserService.findUserByUsernameAndPassword(model.loginUsername, model.loginPassword)
                            .then(function(user){
                            console.log("login user error: "+ JSON.stringify(user, null, 4))
                                if(user == "" || user =="undefined" || user == "null"){
                                    model.showErrorMsg = "Error";
                                }else{
                                console.log("login user: "+ JSON.stringify(user, null, 4))
                                console.log("login userID: "+ user[0]._id);
                                console.log("login password: "+ user[0].password);
                                $rootScope.currentUserId = user[0]._id;
                                $routeParams.role = user[0].role;
                                $rootScope.role = user[0].role;
                                $location.url("/profile");
                                }
                            })
                }
    }
})();