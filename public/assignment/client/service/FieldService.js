(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {

        var service = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm : getFieldsForForm,
            getFieldForForm : getFieldForForm,
            deleteFieldFromForm : deleteFieldFromForm,
            updateField : updateField
        };
        return service;


        function createFieldForForm(formId, fieldObj){
        console.log("createFieldForForm: " + formId + fieldObj);
            var deferred = $q.defer();
            $http.post("/api/assignment/form/"+ formId +"/field", fieldObj)
                    .success(function (response) {
                        deferred.resolve(response);
                     });

            return deferred.promise;
        }

        function getFieldsForForm(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field")
                    .success(function(response){
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field/" +fieldId)
                    .success(function(response){
//                    console.log("find by id"+user.username+"for "+ userId);
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId){
            console.log("inside delete FieldService"+formId)
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId + "/field/" +fieldId)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateField(formId, fieldId, field){
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formId + "/field/" +fieldId)
                    .success(function(response){
                        deferred.resolve(response);
                    });
            return deferred.promise;

        }

    }
})();