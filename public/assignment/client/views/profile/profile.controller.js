(function(){
'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

        function ProfileController($scope, $rootScope, UserService){

            var model = this;
            model.update = update;

            console.log("Profile controller Userid:: "+$rootScope.currentUserId);


                UserService.findUserById($rootScope.currentUserId)
                    .then(function(user){
                        model.currentUser = user;
                        console.log("Email in profile controller:: "+model.currentUser.email);
                    })


            function update(){
                console.log(model.currentUser.username);
                console.log(model.currentUser._id);
                UserService.updateUser(model.currentUser._id, model.currentUser)
                        .then(function(user){
                            $rootScope.currentUser = user;
                        })
            }

        }
})();