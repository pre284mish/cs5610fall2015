(function(){
'use strict';
    angular
        .module("CommunityBuilderApp")
        .controller("ProfileController", ProfileController);

        function ProfileController($scope, $rootScope, $location, UserService){

            console.log("Profile controller Userid:: "+$rootScope.currentUserId);
            console.log("User's role::"+$rootScope.role)

                UserService.findUserById($rootScope.currentUserId)
                    .then(function(user){
                        console.log("profile controller user profile"+JSON.stringify(user, null, 4))
                        $rootScope.currentUser = user;
                        model.currentUser = user;
                        console.log("Email in profile controller:: "+model.currentUser.email);
                    })


            var model = this;
            model.update = update;
            model.role = $rootScope.role;
            model.logout = logout;

            function update(){
                console.log(model.currentUser.username);
                console.log(model.currentUser._id);
                UserService.updateUser(model.currentUser._id, model.currentUser)
                        .then(function(user){
                            $rootScope.currentUser = user;
                        })
            }

            function logout(){
                    $rootScope.currentUserId = null;
                    console.log("Root scope:"+JSON.stringify($rootScope.currentUserId, null, 4));
                    $location.url("/home");
                }

        }
})();