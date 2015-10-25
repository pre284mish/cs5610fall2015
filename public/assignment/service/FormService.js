(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];


        var service = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
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

        function findAllFormsForUser(userId, callback){
            var formForUser = [];
            for(var form in forms){
                if(forms[form].userId == userId){
                    formForUser.push(forms[form]);
                }
            }
            callback(formForUser);
        }


        function createFormForUser(userId, form, callback) {
            form.formId = generateFormId();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function deleteFormById(formId, callback){
            for(var form in forms){
                if(forms[form].formId == formId){
                    forms.splice(form, 1);
                }
            }
            callback(forms);
        }


        function updateFormById(formId, newForm, callback){
            for(var form in forms){
                if(forms[form].id == formId){
                    forms[form] = newForm;
                }
            }
            callback(forms);
        }
    }
})();