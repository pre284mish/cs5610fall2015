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
//                        console.log("Username:: "+model.currentUser.username);
                    })


            function update(){
                console.log(model.currentUser.username);
                console.log(model.currentUser.id);
                UserService.updateUser(model.currentUser.id, model.currentUser)
                        .then(function(user){
                            $rootScope.currentUser = user;
                        })
            }

        }
})();