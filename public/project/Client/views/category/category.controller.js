(function(){
'use strict';
    angular
        .module("CommunityBuilderApp")
        .controller("CategoryController", CategoryController);

    function CategoryController($rootScope, $routeParams, UserService, JobService) {

        $rootScope.role = $routeParams.role;
        $rootScope.category = $routeParams.category;

        var model = this;

        model.category = $rootScope.category;
        console.log(" CategoryController for userID: "+ $rootScope.currentUserId + $rootScope.role + $rootScope.category);
        updateModel($rootScope.category);
        model.acquire = acquire;
        model.getFilteredJobs = getFilteredJobs;
        model.searchByPin = searchByPin;


     function updateModel(category) {
        console.log("get all jobs of category:" + category);
        JobService.findAllJobsByCategory(category)
            .then(function(jobs){
//                console.log("All the jobs:"+JSON.stringify(jobs, null, 4));
//                console.log("address::"+ JSON.stringify(jobs[0].address.street, null, 4));
            model.jobs = jobs;
        });

    }

  function acquire(jobId){
    var userId = $rootScope.currentUserId;
     UserService.findUserById(userId)
        .then(function(userObj){
            var jobObj = {acquiredById:userId ,acquiredBy: userObj, status: "Acquired"};
            JobService.updateJob(jobId, jobObj)
                    .then(function(job){
                         model.jobs = job;
                         console.log("categoryiiiii"+$rootScope.category);
                         updateModel($rootScope.category);
                    });

        });
    }

    function getFilteredJobs(status){
        console.log("get mylistings status:" + $rootScope.category+ status);
        JobService.findAllJobsByCategoryAndStatus($rootScope.category, status)
            .then(function(jobs){
            console.log("All the filtered jobs:"+JSON.stringify(jobs, null, 4));
                 model.jobs = jobs;
            })
    }

    function searchByPin(){
        var pinCode = model.pincode;
        console.log("get pincode:" + pinCode);
        JobService.findAllJobsByPinCode(pinCode, $rootScope.category)
            .then(function(jobs){
            console.log("All the jobs of pincode:"+JSON.stringify(jobs, null, 4));
                 model.jobs = jobs;
            })

    }

    }
})();