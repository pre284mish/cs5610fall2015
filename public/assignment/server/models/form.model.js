var forms = require("../form.mock.json");

module.exports = function(app){

    var api = {
        createForm : createForm,
        findAllForms : findAllForms,
        findByFormId : findByFormId
        updateForm : updateForm,
        removeForm : removeForm,
        findFormByTitle : findFormByTitle,
    };
    return api;


    function createForm(userId, form){
        form.userId = userId;
        forms.push(form);
        return form;
    }

    function findAllForms(userId){
        var formForUser = [];
        for(var i in forms){
            if(forms[i].userId == userId){
                formForUser.push(forms[i]);
            }
        }
    }

    function findByFormId(formId){
         for(var i in forms){
            if(forms[i].id == formId){
                return forms[i];
            }
        }
    }

    function updateForm(formId, newForm){
        for(var i in forms){
            if(forms[i].id == formId){
                forms[i] = newForm;
                return forms[i];
            }
        }
    }

    function removeForm(formId){
        for(var i in forms){
            if(forms[i].formId == formId){
                forms.splice(i, 1);
            }
        }
        return forms;
    }

    function findFormByTitle(formTitle){
        for(var i in forms){
            if(forms[i].title == formTitle){
                return form[i];
            }
        }
    }
};