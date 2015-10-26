(function(){
'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, UserService, FormService) {


        // Get all the forms for a user.
       FormService.findAllFormsForUser($rootScope.currentUser.id, getForms);

        //Assign all the forms for a user to $scope.$forms
        function getForms(userForms){
            $scope.forms = userForms;

        }


        $scope.addForm = function(){
            var formObj = {userId: $rootScope.currentUser.id, formName: $scope.form.formName};
            FormService.createFormForUser($rootScope.currentUser.id, formObj, addForm)
        }

        function addForm(form){
//            var newFormOfUser = {formName:form.formName, formId:};
            $scope.forms.push(form);
        }


        $scope.updateForms = function(){
            FormService.updateFormById($rootScope.formId, formObj, updateform);
        }

        function updateform(form){
            $scope.forms = form;
        }

        $scope.deleteForm = function(index){
            var currForm = $scope.forms[index];
            FormService.deleteFormById(currForm.formId, deleteFormByIndex);
        }

        function deleteFormByIndex(form){

            var index = $scope.forms.indexOf(form);
            $scope.forms.splice(index, 1);
        }

        $scope.selectForm = function(index) {
            //$scope.forms = $scope.forms[index];
        }

//        function selectForm(response) {
//            $scope.currentform = response;
//        }


    }
})();