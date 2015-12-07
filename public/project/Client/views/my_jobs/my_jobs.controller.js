(function(){
'use strict';
    angular
        .module("CommunityBuilderApp")
        .controller("MyJobsController", MyJobsController);

    function MyJobsController($rootScope, $routeParams, JobService) {

        var model = this;
        model.markCompleted = markCompleted;
        getMyJobs($rootScope.currentUserId);

        console.log("My job controller user::"+ $rootScope.currentUserId);
         function getMyJobs(userId) {
            console.log("get all jobs of userId:" + userId);
            JobService.findAllJobsByAcquiredBy(userId)
                .then(function(jobs){
                console.log("All the jobs:"+JSON.stringify(jobs, null, 4));
                console.log("address::"+ JSON.stringify(jobs[0].address.street, null, 4));
                model.jobs = jobs;
            });

        }

        function markCompleted(jobId){
              var jobObj = {status: "Completed", _id: jobId};
              JobService.markCompleted(jobId, jobObj)
                      .then(function(job){
                           model.jobs = job;
                           getMyJobs($rootScope.currentUserId);
            });
        }



    }
})();