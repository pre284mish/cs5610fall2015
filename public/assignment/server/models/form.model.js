//var forms = require("./form.mock.json");
var q = require("q");

module.exports = function(db, mongoose){

    var FormSchema = require("./form.schema.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);

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

//    function generateId() {
//        function s4() {
//            return Math.floor((1 + Math.random()) * 0x10000)
//              .toString(16)
//              .substring(1);
//        }
//      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//        s4() + '-' + s4() + s4() + s4();
//    }


    function createForm(formObj){
        var deferred = q.defer();
        console.log("Create form for title: "+ formObj.title + "where userId: "+ formObj.userId);
        FormModel.create(formObj, function(err, form){
            console.log("Form.model.js doc: "+ JSON.stringify(form, null, 4))
            console.log("Form.model.js err: "+ JSON.stringify(form, null, 4))

            deferred.resolve(form);
        });
        return deferred.promise;
    }

    function findAllForms(userId){
        var deferred = q.defer();
        FormModel.find({userId: userId}, function(err, form){
            console.log("Form.model.js doc for findAllForms: "+ JSON.stringify(form, null, 4))
            deferred.resolve(form);
        });
        return deferred.promise;
    }

    function findByFormId(formId){
         var deferred = q.defer();
         FormModel.findById(formId, function(err, form){
             console.log("Form.model.js doc for findByFormId: "+ JSON.stringify(form, null, 4))
             deferred.resolve(form);
         });
         return deferred.promise;
    }

    function updateForm(formId, newForm){
        FormModel.update({_id: formId}, {$set: newForm}, function(err, form){
        if(err){
            deferred.reject(err);
        }else{
            FormModel.findById(formId, function(err, form){
            deferred.resolve(form);
            });
        }
        });
        return deferred.promise;
    }

    function removeForm(formId){
        var deferred = q.defer();
        FormModel.remove({_id: formId}, function(err, form){
            deferred.resolve(form);
        });
        return deferred.promise;
    }

    function findFormByTitle(formTitle){
        var deferred = q.defer();
        FormModel.find({title: formTitle}, function(err, form){
            deferred.resolve(form);
        });
        return deferred.promise;
    }



// Functions for Fields:

    function createFieldForForm(formId, fieldObj){

        var deferred = q.defer();
        console.log("createfield: "+ formId + JSON.stringify(fieldObj, null, 4));
        FormModel.findById(formId, function(err, form){
            if(err){
                    deferred.reject(err);
                }
            else{
                    form.fields.push(fieldObj);
                    console.log("form.model create fields::::: " + JSON.stringify(form.fields, null, 4));
                    form.save (function (err, fields) {
                    console.log("Error::" + err);
                    console.log("after save server::"+ fields);
                    deferred.resolve(fields);
                });
            }
        });
        return deferred.promise;
    }

    function getFieldsForForm(formId){
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form){
            console.log("form.model fields::::: " + JSON.stringify(form.fields, null, 4));
            deferred.resolve(form.fields);
        });
        return deferred.promise;
    }

    function deleteFieldsFromForm(formId, fieldId){
        var deferred = q.defer();
        console.log("formid" + formId + "fieldid"+ fieldId);
        FormModel.findById(formId, function(err, form){
            var fields = form.fields;
            for(var i in fields){
                if(fields[i]._id == fieldId){
                    fields.splice(i, 1);
                }
            }
            form.save(function(err, forms){
                deferred.resolve(forms);
            });

        });
        return deferred.promise;
    }

};