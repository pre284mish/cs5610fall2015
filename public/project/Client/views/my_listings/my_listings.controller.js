(function(){
'use strict';
    angular
        .module("CommunityBuilderApp")
        .controller("MyListingController", MyListingController);

    function MyListingController($rootScope, $routeParams, $location, JobService) {

        var model = this;
        getMyListings($rootScope.currentUserId);
        model.getFilteredJobsMyListings = getFilteredJobsMyListings;
        model.deleteJob = deleteJob;
        model.editJob = editJob;

         function getMyListings(userId) {
            console.log("get all jobs of userId:" + userId);
            JobService.findAllJobsByUserId(userId)
                .then(function(jobs){
                console.log("All the jobs:"+JSON.stringify(jobs, null, 4));
                console.log("address::"+ JSON.stringify(jobs[0].address.street, null, 4));
                model.jobs = jobs;
            });
        }

        function getFilteredJobsMyListings(status){
            console.log("get category & status:" + status + $rootScope.currentUserId);
            JobService.findAllJobsByStatusAndUserId(status, $rootScope.currentUserId)
                .then(function(jobs){
                    console.log("All the filtered my listings jobs:"+JSON.stringify(jobs, null, 4));
                     model.jobs = jobs;
                })

        }

        function deleteJob(jobId) {
             console.log("delete job controller" + jobId);
             JobService.deleteJobById(jobId)
                .then(function(job){
                    getMyListings($rootScope.currentUserId);
                });
         }

         function editJob(jobId){
            $location.url("/update_job");
            $rootScope.jobId = jobId;
         }

    }
})();