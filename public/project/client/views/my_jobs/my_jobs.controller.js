(function(){
'use strict';
    angular
        .module("CommunityBuilderApp")
        .controller("MyJobsController", MyJobsController);

    function MyJobsController($rootScope, $routeParams, $location, JobService) {

        var model = this;
        model.markCompleted = markCompleted;
        model.markAcquired = markAcquired;
        model.getFilteredJobsMyJobs = getFilteredJobsMyJobs;
        getMyJobs($rootScope.currentUserId);
        model.logout = logout;

        console.log("My job controller user::"+ $rootScope.currentUserId);
         function getMyJobs(userId) {
            console.log("get all jobs of userId:" + userId);
            JobService.findAllJobsByAcquiredBy(userId)
                .then(function(jobs){
//                console.log("All the jobs:"+JSON.stringify(jobs, null, 4));
//                console.log("address::"+ JSON.stringify(jobs[0].address.street, null, 4));
                model.jobs = jobs;
            });

        }

        function markCompleted(jobId){
              var jobObj = {status: "Completed"};
              JobService.markCompleted(jobId, jobObj)
                      .then(function(job){
                           model.jobs = job;
                           getMyJobs($rootScope.currentUserId);
            });
        }

        function markAcquired(jobId){
              var jobObj = {status: "Acquired"};
              JobService.markCompleted(jobId, jobObj)
                      .then(function(job){
                           model.jobs = job;
                           getMyJobs($rootScope.currentUserId);
            });
        }

        function getFilteredJobsMyJobs(status){
            console.log("get status:" + status + $rootScope.currentUserId);
            JobService.findAllJobsByStatusAndAcquiredById(status, $rootScope.currentUserId)
                        .then(function(jobs){
                        console.log("All the filtered my listings jobs:"+JSON.stringify(jobs, null, 4));
                             model.jobs = jobs;
                        })

        }

        function logout(){
             $rootScope.currentUserId = null;
             $location.url("/home");
         }



    }
})();