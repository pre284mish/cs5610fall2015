(function(){
    'use strict';
    angular
        .module("CommunityBuilderApp")
        .factory("JobService", JobService);

    function JobService($http, $q) {

        var service = {
            createJobByUser : createJobByUser,
            findAllJobsByCategory : findAllJobsByCategory,
            findAllJobsByCategoryAndStatus : findAllJobsByCategoryAndStatus,
//            deleteFormById : deleteFormById,
//            updateFormById : updateFormById,
//            findFormById : findFormById,
//            findFormByTitle : findFormByTitle
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

        function deleteFormById(formId){
            console.log("inside delete FormService"+formId)
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId)
                .success(function(form){
                    deferred.resolve(form);
                });
            return deferred.promise;
        }

        function updateFormById(formId, formObj){
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formId, formObj)
                    .success(function(form){
                        deferred.resolve(form);
                    });
            return deferred.promise;

        }

        function findFormByTitle(formTitle) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/:formTitle"+ formTitle)
                    .success(function(form){
                        deferred.resolve(form);
                    });
            return deferred.promise;
        }

    }
})();