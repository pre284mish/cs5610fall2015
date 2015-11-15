(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {

        var service = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById,
            findFormById : findFormById,
            findFormByTitle : findFormByTitle
        };
        return service;

        function generateFormId() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        }

        function createFormForUser(userId, formObj){
            var deferred = $q.defer();
            $http.post("/api/assignment/user/"+userId+"/form", formObj)
                    .success(function (response) {
                        deferred.resolve(response);
                     });

            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/"+userId+"/form")
                    .success(function(forms){
                    console.log("FormService.findAllForms" + forms);
                        deferred.resolve(forms);
                    });
            return deferred.promise;
        }

        function findFormById(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/"+ formId)
                    .success(function(form){
//                    console.log("find by id"+user.username+"for "+ userId);
                        deferred.resolve(form);
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