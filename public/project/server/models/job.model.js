var q = require("q");

module.exports = function(db, mongoose){

    var JobSchema = require("./job.schema.js")(mongoose);
    var JobModel = mongoose.model("JobModel", JobSchema);

    var api = {
        createJobByUser : createJobByUser,
        findAllJobsByCategory : findAllJobsByCategory,
        findAllJobsByCategoryAndStatus : findAllJobsByCategoryAndStatus
//        updateForm : updateForm,
//        removeForm : removeForm,
//        findFormByTitle : findFormByTitle,
//        getFieldsForForm : getFieldsForForm,
//        deleteFieldsFromForm : deleteFieldsFromForm,
//        createFieldForForm : createFieldForForm
    };
    return api;

    function createJobByUser(jobObj){
        var deferred = q.defer();
        console.log("Create form for description: "+ JSON.stringify(jobObj, null, 4));
        JobModel.create(jobObj, function(err, job){
            console.log("Form.model.js doc: "+ JSON.stringify(job, null, 4))
            console.log("Form.model.js err: "+ JSON.stringify(err, null, 4))

            deferred.resolve(job);
        });
        return deferred.promise;
    }

    function findAllJobsByCategory(category){
            var deferred = q.defer();
            JobModel.find({category: category}, function(err, form){
                deferred.resolve(form);
            });
            return deferred.promise;
        }

     function findAllJobsByCategoryAndStatus(params){
            var deferred = q.defer();
            FormModel.find({$and: [{category: params.category}, {status: params.status}]}, function(err, job){
                console.log("jon.model.js doc: "+ JSON.stringify(job, null, 4))
                console.log("job.model.js err: "+ JSON.stringify(err, null, 4))

                deferred.resolve(job);
            });
            return deferred.promise;
        }

//    function updateForm(formId, newForm){
//        FormModel.update({_id: formId}, {$set: newForm}, function(err, form){
//        if(err){
//            deferred.reject(err);
//        }else{
//            FormModel.findById(formId, function(err, form){
//            deferred.resolve(form);
//            });
//        }
//        });
//        return deferred.promise;
//    }
//
//    function removeForm(formId){
//        var deferred = q.defer();
//        FormModel.remove({_id: formId}, function(err, form){
//            deferred.resolve(form);
//        });
//        return deferred.promise;
//    }
////
//
//
//
//
//// Functions for Fields:
//
//    function createFieldForForm(formId, fieldObj){
//
//        var deferred = q.defer();
//        console.log("createfield: "+ formId + JSON.stringify(fieldObj, null, 4));
//        FormModel.findById(formId, function(err, form){
//            if(err){
//                    deferred.reject(err);
//                }
//            else{
//                    form.fields.push(fieldObj);
//                    console.log("form.model create fields::::: " + JSON.stringify(form.fields, null, 4));
//                    form.save (function (err, fields) {
//                    console.log("Error::" + err);
//                    console.log("after save server::"+ fields);
//                    deferred.resolve(fields);
//                });
//            }
//        });
//        return deferred.promise;
//    }
//
//    function getFieldsForForm(formId){
//        var deferred = q.defer();
//        FormModel.findById(formId, function(err, form){
//            console.log("form.model fields::::: " + JSON.stringify(form.fields, null, 4));
//            deferred.resolve(form.fields);
//        });
//        return deferred.promise;
//    }
//
//    function deleteFieldsFromForm(formId, fieldId){
//        var deferred = q.defer();
//        console.log("formid" + formId + "fieldid"+ fieldId);
//        FormModel.findById(formId, function(err, form){
//            var fields = form.fields;
//            for(var i in fields){
//                if(fields[i]._id == fieldId){
//                    fields.splice(i, 1);
//                }
//            }
//            form.save(function(err, forms){
//                deferred.resolve(forms);
//            });
//
//        });
//        return deferred.promise;
//    }

};