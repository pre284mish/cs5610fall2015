var forms = require("./form.mock.json");

module.exports = function(app){

    var api = {
        createForm : createForm,
        findAllForms : findAllForms,
        findByFormId : findByFormId,
        updateForm : updateForm,
        removeForm : removeForm,
        findFormByTitle : findFormByTitle,
    };
    return api;

    function generateFormId() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
    function createForm(userId, formObj){
        var form = {
            id : generateFormId(),
            title : formObj.title,
            userId : userId
        }
        console.log("while adding: "+ form.id);
        console.log("while adding id: " + form.title);
        console.log("while adding user: " + form.userId);
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
        return formForUser;
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
    console.log("inside form.model" + formId);
        for(var i in forms){

            if(forms[i].id == formId){
                console.log("inside if of form.model");
                forms.splice(i, 1);
            }
        }
    }

    function findFormByTitle(formTitle){
        for(var i in forms){
            if(forms[i].title == formTitle){
                return form[i];
            }
        }
    }
};