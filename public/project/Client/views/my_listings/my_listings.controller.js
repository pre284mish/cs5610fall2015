(function(){
'use strict';
    angular
        .module("CommunityBuilderApp")
        .controller("MyListingController", MyListingController);

    function MyListingController($rootScope, $routeParams, JobService) {

        var model = this;
        getMyListings($rootScope.currentUserId);


         function getMyListings(userId) {
            console.log("get all jobs of userId:" + userId);
            JobService.findAllJobsByUserId(userId)
                .then(function(jobs){
                console.log("All the jobs:"+JSON.stringify(jobs, null, 4));
                console.log("address::"+ JSON.stringify(jobs[0].address.street, null, 4));
                model.jobs = jobs;
            });

        }

    }
})();