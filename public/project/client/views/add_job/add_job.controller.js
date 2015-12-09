(function(){
    angular
        .module("CommunityBuilderApp")
        .controller("AddJobController", AddJobController);

    function AddJobController($scope, $rootScope, $routeParams, $location, UserService, JobService) {
        var model = this;
        model.post = post;
        model.category = $rootScope.category;

        console.log("AddJobController: " + $rootScope.role + $rootScope.category);
        function post(){
                var role = $rootScope.role;
                var category =  $rootScope.category;
                var userId = $rootScope.currentUserId;
                var addressObj = {street: model.street, apt: model.apt, city: model.city, state: model.state, zip: model.zip};
                 UserService.findUserById(userId)
                    .then(function(userObj){
                     console.log("add job controller user::"+  JSON.stringify(userObj, null, 4));
                     var jobObj = {jobDescription: model.jobDescription, category: category, address: addressObj,
                                    postedDate: model.postedDate, postedBy: userObj, userId:userId,status: 'Pending'};
                                    JobService.createJobByUser(jobObj)
                                        .then(function(job){
                                            console.log("register controller userId new: "+job._id);
                                            $rootScope.currentUserId = userId;
                                             $location.path('/category/'+ role + '/' + category);
                                    });


                    });


        }
    }
})();