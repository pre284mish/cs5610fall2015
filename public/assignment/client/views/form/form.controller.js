(function(){
'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, UserService, FormService) {


        var model = this;
        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        console.log("Form controller for userID: "+ $rootScope.currentUserId);
        updateModel($rootScope.currentUserId);
//        model.selectForm = selectForm;


        function addForm(){
            console.log("form:" + $rootScope.currentUserId);
            var userId = $rootScope.currentUserId;
            var formObj = {title: model.formName};
            FormService.createFormForUser(userId, formObj)
                    .then(function(form){
                          model.forms = form;
                          updateModel($rootScope.currentUserId);
                    });
        }

        function updateModel(userId) {
            console.log("FormsUserId:" + userId);
            FormService.findAllFormsForUser(userId)
                           .then(function(forms){
                           console.log("All the forms:"+forms);
                               model.forms = forms;
                            });

        }

        function updateForm(){
            var formObj = {userId: $rootScope.currentUser.id, title: model.form.formName};
            FormService.createFormForUser(formObj)
                    .then(function(form){
                         model.forms = form;
                    });
        }


        function deleteForm(formId) {
             console.log("delete client controller" + formId);
             FormService.deleteFormById(formId)
                        .then(function(form){
                            updateModel($rootScope.currentUserId);
                        });
         }

    }
})();