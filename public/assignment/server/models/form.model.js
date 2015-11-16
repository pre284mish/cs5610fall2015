var forms = require("./form.mock.json");

module.exports = function(app){

    var api = {
        createForm : createForm,
        findAllForms : findAllForms,
        findByFormId : findByFormId,
        updateForm : updateForm,
        removeForm : removeForm,
        findFormByTitle : findFormByTitle,
        getFieldsForForm : getFieldsForForm,
        deleteFieldsFromForm : deleteFieldsFromForm,
        createFieldForForm : createFieldForForm
    };
    return api;

    function generateId() {
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
            id : generateId(),
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



// Functions for Fields:

    function createFieldForForm(formId, fieldObj){
    console.log("createfield: "+ formId + fieldObj);
    fieldObj.id = generateId();
        var formObj = findByFormId(formId);
        var allFields = formObj.fields;

        if(allFields == null){
            allFields = [];
        }
            allFields.push(fieldObj);
            formObj.fields = allFields;

    }

    function getFieldsForForm(formId){
        for(var i in forms){
            if(forms[i].id == formId){
                return forms[i];
            }
        }

    }

    function deleteFieldsFromForm(formId, fieldId){
    console.log("formid" + formId + "fieldid"+ fieldId);
        for(var i in forms){
            if(forms[i].id == formId){
                var fields = forms[i].fields;
                for(var j in fields){
                    if(fields[j].id == fieldId){
                        fields.splice(j, 1);
                    }
                }
            }
        }
    }

};