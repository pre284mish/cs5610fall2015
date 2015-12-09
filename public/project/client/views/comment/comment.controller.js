(function(){
'use strict';
    angular
        .module("CommunityBuilderApp")
        .controller("CommentController", CommentController);

    function CommentController($rootScope, $routeParams, $location, JobService) {

        var model = this;
        model.commentForJob = commentForJob;


         function commentForJob(){

             console.log("jobId in comment controller::"+ $rootScope.jobId + model.comment);
             var jobObj = {comment : model.comment};
             JobService.updateJob($rootScope.jobId, jobObj)
                     .then(function(job){
                          model.jobs = job;
                          $location.url("/my_listings");
                     });
             }
    }
})();