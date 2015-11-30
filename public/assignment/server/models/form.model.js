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
        findFormByTitle : findFormByTitle
//        getFieldsForForm : getFieldsForForm,
//        deleteFieldsFromForm : deleteFieldsFromForm,
//        createFieldForForm : createFieldForForm
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
        FormModel.create(formObj, function(err, doc){
            console.log("Form.model.js doc: "+ JSON.stringify(doc, null, 4))
            console.log("Form.model.js err: "+ JSON.stringify(err, null, 4))

            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function findAllForms(userId){
        var deferred = q.defer();
        FormModel.find({userId: userId}, function(err, doc){
            console.log("Form.model.js doc for findAllForms: "+ JSON.stringify(doc, null, 4))
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function findByFormId(formId){
         var deferred = q.defer();
         FormModel.findById(formId, function(err, doc){
             console.log("Form.model.js doc for findByFormId: "+ JSON.stringify(doc, null, 4))
             deferred.resolve(doc);
         });
         return deferred.promise;
    }

    function updateForm(formId, newForm){
        FormModel.update({_id: formId}, {$set: newForm}, function(err, doc){
        if(err){
            deferred.reject(err);
        }else{
            FormModel.findById(formId, function(err, doc){
            deferred.resolve(doc);
            });
        }
        });
        return deferred.promise;
    }

    function removeForm(formId){
        var deferred = q.defer();
        FormModel.remove({_id: formId}, function(err, doc){
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function findFormByTitle(formTitle){
        var deferred = q.defer();
        FormModel.find({title: formTitle}, function(err, doc){
            deferred.resolve(doc);
        });
        return deferred.promise;
    }



// Functions for Fields:

//    function createFieldForForm(formId, fieldObj){
//    console.log("createfield: "+ formId + fieldObj);
//    fieldObj.id = generateId();
//        var formObj = findByFormId(formId);
//        var allFields = formObj.fields;
//
//        if(allFields == null){
//            allFields = [];
//        }
//            allFields.push(fieldObj);
//            formObj.fields = allFields;
//
//    }
//
//    function getFieldsForForm(formId){
//        for(var i in forms){
//            if(forms[i].id == formId){
//                return forms[i];
//            }
//        }
//
//    }
//
//    function deleteFieldsFromForm(formId, fieldId){
//    console.log("formid" + formId + "fieldid"+ fieldId);
//        for(var i in forms){
//            if(forms[i].id == formId){
//                var fields = forms[i].fields;
//                for(var j in fields){
//                    if(fields[j].id == fieldId){
//                        fields.splice(j, 1);
//                    }
//                }
//            }
//        }
//    }

};