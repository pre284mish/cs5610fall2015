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
                           console.log("All the fields controller:"+JSON.stringify(form, null, 4));
                               model.fields = form;
                               FormService.findFormById(formId)
                               .then (function(form1){
                               console.log(JSON.stringify(form1, null, 4));
                                model.form = form1;
                               });

                               model.formId = formId;
                            });
        }

        console.log("Field controller for userID: "+ $routeParams.userId);
        console.log("Field controller for formId: "+ $routeParams.formId);

        function addField(formId, fieldType){
            var fieldObj;
                        switch (fieldType) {
                            case "Single Line Text" :
                                fieldObj = {
                                    label : "New Text Field",
                                    fieldType : "TEXT",
                                    options : null,
                                    placeholder : "New Field"
                                };
                                break;
                            case "Date" :
                                fieldObj = {
                                    "label" : "New Date Field",
                                    "fieldType" : "DATE",
                                    "options" : null,
                                    "placeholder" : "New Field"
                                };
                                break;
                            case "Dropdown" :
                                fieldObj = {
                                    "label" : "New Dropdown",
                                    "fieldType" : "OPTIONS",
                                    "options" : [
                                        {"label": "Option 1", "value": "OPTION_1"},
                                        {"label": "Option 2", "value": "OPTION_2"},
                                        {"label": "Option 3", "value": "OPTION_3"}
                                    ],
                                    "placeholder" : null
                                };
                                break;
                            case "Checkboxes" :
                                fieldObj = {
                                    "label" : "New Checkboxes",
                                    "fieldType" : "CHECKBOX",
                                    "options" : [
                                        {"label": "Option A", "value": "OPTION_A"},
                                        {"label": "Option B", "value": "OPTION_B"},
                                        {"label": "Option C", "value": "OPTION_C"}
                                    ],
                                    "placeholder" : null
                                };
                                break;
                            case "Radio" :
                                fieldObj = {
                                    "label": "New Radio Buttons",
                                    "fieldType": "RADIO",
                                    "options": [
                                        {"label": "Option X", "value": "OPTION_X"},
                                        {"label": "Option Y", "value": "OPTION_Y"},
                                        {"label": "Option Z", "value": "OPTION_Z"}
                                    ],
                                    "placeholder" : null
                                };
                                break;
                            case "Multi Line Text" :
                                fieldObj = {
                                    "label" : "New TextArea Field",
                                    "fieldType" : "TEXTAREA",
                                    "options" : null,
                                    "placeholder" : "New Field"
                                };
                                break;
                             case "Email" :
                                 fieldObj = {
                                     "label" : "New Email Field",
                                     "fieldType" : "EMAIL",
                                     "options" : null,
                                     "placeholder" : "New Field"
                                 };
                        }
            console.log("createFieldForForm controller client: " +JSON.stringify(fieldObj, null, 4));
            FieldService.createFieldForForm(formId, fieldObj)
            .then(function(response){
                console.log("field conteoller response: "+ response)
                updateModel($rootScope.currentUserId, formId);
            });

            }



        function removeField(formId, fieldId){
            console.log("delete client controller field" + fieldId);
            console.log("delete client controller form id" + formId);
             FieldService.deleteFieldFromForm(formId, fieldId)
                        .then(function(response){
                        console.log("field controller response: "+ response)
                            updateModel($rootScope.currentUserId, $routeParams.formId);
                        });

                }
    }
})();