(function(){
'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($rootScope, UserService, FormService, FieldService, $routeParams) {


        var model = this;
        model.addField = addField;
        model.removeField = removeField;
        updateModel($routeParams.userId, $routeParams.formId);


        function updateModel(userId, formId){
            FieldService.getFieldsForForm(formId)
                           .then(function(form){
                           console.log("All the fields controller:"+form.fields);
                               model.fields = form.fields;
                               model.form = form;
                               model.formId = formId;
                            });
        }

        console.log("Field controller for userID: "+ $routeParams.userId);
        console.log("Field controller for formId: "+ $routeParams.formId);

        function addField(formId, fieldType){
        var fieldObj = {type: fieldType};
        console.log("add client controller fieldtype" + fieldType);
                    console.log("add client controller form id" + formId);
            FieldService.createFieldForForm(formId, fieldObj)
                    .then(function(response){
                    console.log("field conteoller response: "+ response)
                        updateModel($rootScope.currentUserId, $routeParams.formId);
                    });

            }



        function removeField(formId, fieldId){
            console.log("delete client controller field" + fieldId);
            console.log("delete client controller form id" + formId);
             FieldService.deleteFieldFromForm(formId, fieldId)
                        .then(function(response){
                        console.log("field conteoller response: "+ response)
                            updateModel($rootScope.currentUserId, $routeParams.formId);
                        });

                }
    }
})();