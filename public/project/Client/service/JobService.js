(function(){
    'use strict';
    angular
        .module("CommunityBuilderApp")
        .factory("JobService", JobService);

    function JobService($http, $q) {

        var service = {
            createJobByUser : createJobByUser,
            findAllJobsByCategory : findAllJobsByCategory,
            findAllJobsByUserId : findAllJobsByUserId,
            findAllJobsByCategoryAndStatus : findAllJobsByCategoryAndStatus,
            updateJob : updateJob,
            findAllJobsByAcquiredBy :findAllJobsByAcquiredBy,
            markCompleted : markCompleted
        };
        return service;


        function createJobByUser(jobObj){
        console.log("add job client jobservice job object::::"+JSON.stringify(jobObj, null, 4));
            var deferred = $q.defer();
            $http.post("/api/project/user/"+jobObj.userId+"/job", jobObj)
                    .success(function (response) {
                        deferred.resolve(response);
                     });

            return deferred.promise;
        }

        function updateJob(jobId, jobObj){
            var deferred = $q.defer();
            $http.put("/api/project/job/id=" + jobId, jobObj)
                    .success(function(job){
                        deferred.resolve(job);
                    });
            return deferred.promise;

        }

        function markCompleted(jobId, jobObj){
            var deferred = $q.defer();
            $http.put("/api/project/completedjob/id=" + jobId, jobObj)
                    .success(function(job){
                        deferred.resolve(job);
                    });
            return deferred.promise;

        }

        function findAllJobsByCategory(category) {
            console.log("inside JobService::"+ category);
            var deferred = $q.defer();
            $http.get("/api/project/category/"+category+"/job")
                    .success(function(jobs){
                    console.log("JobService.findAllJobsByCategory" + jobs);
                        deferred.resolve(jobs);
                    });
            return deferred.promise;
        }

        function findAllJobsByCategoryAndStatus(category, status) {
           var deferred = $q.defer();
           $http.get("/api/project/user/category=" + category +"&status=" + status)
                   .success(function(job){
                   console.log("JobService.js: "+ JSON.stringify(job, null, 4))
                       deferred.resolve(job);
                   });
           return deferred.promise;
        }

        function findAllJobsByUserId(userId) {
            var deferred = $q.defer();
            $http.get("/api/project/user/"+userId+"/job")
                    .success(function(jobs){
                    console.log("JobService.findAllJobsByUserId" + jobs);
                        deferred.resolve(jobs);
                    });
            return deferred.promise;
        }

        function findAllJobsByAcquiredBy(userId) {
            var deferred = $q.defer();
            $http.get("/api/project/acquiredBy/"+userId+"/job")
                    .success(function(jobs){
                    console.log("JobService.findAllJobsByAcquiredBy" + jobs);
                        deferred.resolve(jobs);
                    });
            return deferred.promise;
        }

    }
})();