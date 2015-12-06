(function(){
'use strict';
    angular
        .module("CommunityBuilderApp")
        .controller("CategoryController", CategoryController);

    function CategoryController($rootScope, UserService, FormService) {


        var model = this;
//        model.addForm = addForm;
        model.updateForm = updateForm;
//        model.deleteForm = deleteForm;
        console.log("Form controller for userID: "+ $rootScope.currentUserId);
        updateModel($rootScope.currentUserId);


        function addForm(){
            console.log("form:" + $rootScope.currentUserId);
            var userId = $rootScope.currentUserId;
            var formObj = {title: model.formName, userId: userId};
            console.log("Form object creation: "+ JSON.stringify(formObj, null, 4))
            FormService.createFormForUser(formObj)
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