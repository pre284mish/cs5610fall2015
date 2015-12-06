(function(){
    angular
        .module("CommunityBuilderApp")
        .controller("AddJobController", AddJobController);

    function AddJobController($scope, $rootScope, $routeParams, $location, UserService, JobService) {
        var model = this;
        model.post = post;

        console.log("AddJobController: " + $rootScope.role + $rootScope.category);
        function post(){
                var role = $rootScope.role;
                var category =  $rootScope.category;
                var userId = $rootScope.currentUserId;
                console.log("street client controller: "+ model.street);
                var addressObj = {street: model.street, apt: model.apt, city: model.city, state: model.state, zip: model.zip};
                console.log("add job controller address object::::"+JSON.stringify(addressObj, null, 4));
                var jobObj = {jobDescription: model.jobDescription, category: category, address: addressObj, postedDate: model.postedDate, userId: userId, status: 'Pending'};
                console.log("add job controller job object::::"+JSON.stringify(jobObj, null, 4));
                JobService.createJobByUser(jobObj)
                    .then(function(job){
                        console.log("register controller userId new: "+job._id);
                        $rootScope.currentUserId = userId;
                         $location.path('/category/'+ role + '/' + category);
                });

        }
    }
})();