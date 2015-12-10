(function(){
'use strict';
    angular
        .module("CommunityBuilderApp")
        .controller("UpdateJobController", UpdateJobController);

    function UpdateJobController($rootScope, $routeParams, $location, JobService) {

        var model = this;
        loadJobDetailsForUpdate($rootScope.jobId);
        model.updateJob = updateJob;
        model.logout = logout;



         function loadJobDetailsForUpdate(jobId){
            JobService.findJobByJobId(jobId)
                 .then(function(job){
                    console.log("All the job by jobId:"+JSON.stringify(job, null, 4));
                    model.currentJob = job[0];
                    $rootScope.jobId = job[0]._id;
                 });
         }


         function updateJob(jobId){
             console.log("jobId in update_job controller::"+ jobId);
             var addressObj = {state: model.currentJob.address.state, city: model.currentJob.address.city,
                                street: model.currentJob.address.street, apt: model.currentJob.address.apt,
                                zip: model.currentJob.address.zip};
             var jobObj = {jobDescription:model.currentJob.jobDescription, postedDate: model.currentJob.postedDate,
                            address:addressObj};
             JobService.updateJob(jobId, jobObj)
                     .then(function(job){
                          model.jobs = job;
//                            $rootScope.myDate = new Date(job.postedDate);
                            $location.url("/my_listings");
                     });
             }


         function logout(){
             $rootScope.currentUserId = null;
             console.log("Root scope:"+JSON.stringify($rootScope.currentUserId, null, 4));
             $location.url("/home");
         }
    }
})();