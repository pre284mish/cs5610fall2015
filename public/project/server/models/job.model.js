var q = require("q");

module.exports = function(db, mongoose){

    var JobSchema = require("./job.schema.js")(mongoose);
    var JobModel = mongoose.model("JobModel", JobSchema);

    var api = {
        createJobByUser : createJobByUser,
        findAllJobsByCategory : findAllJobsByCategory,
        findAllJobsByUserId : findAllJobsByUserId,
        findAllJobsByCategoryAndStatus : findAllJobsByCategoryAndStatus,
        updateJob : updateJob,
        findAllJobsByAcquiredBy : findAllJobsByAcquiredBy,
        markCompleted : markCompleted
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
            JobModel.find({category: category}, function(err, job){
                deferred.resolve(job);
            });
            return deferred.promise;
        }

        function findAllJobsByUserId(userId){
                var deferred = q.defer();
                JobModel.find({userId: userId}, function(err, job){
                    console.log("job.model.js job for findAlljobsforUserId: "+ JSON.stringify(job, null, 4))
                    deferred.resolve(job);
                });
                return deferred.promise;
            }

         function findAllJobsByAcquiredBy(userId){
             var deferred = q.defer();
             JobModel.find({acquiredBy: userId}, function(err, job){
                 console.log("job.model.js job for findAllJobsByAcquiredBy: "+ JSON.stringify(job, null, 4))
                 deferred.resolve(job);
             });
             return deferred.promise;
         }

     function findAllJobsByCategoryAndStatus(params){
            var deferred = q.defer();
            JobModel.find({$and: [{category: params.category}, {status: params.status}]}, function(err, job){
                console.log("jon.model.js doc: "+ JSON.stringify(job, null, 4))
                console.log("job.model.js err: "+ JSON.stringify(err, null, 4))

                deferred.resolve(job);
            });
            return deferred.promise;
        }

    function updateJob(jobId, jobObj){
            var deferred = q.defer();

            //For openshift delete userId before updating a user
//            delete userObj._id;

                JobModel.update({_id: jobId},{$set: jobObj}, function(err, job){
                if(err){
                    deferred.reject(err);
                }else{
                    JobModel.findById(jobId, function(err, job){
                     console.log("update job model: "+ JSON.stringify(job, null, 4))
                    deferred.resolve(job);
                });
               }
            });
            return deferred.promise;
        }


        function markCompleted(jobId, jobObj){
                    var deferred = q.defer();

                    //For openshift delete userId before updating a user
        //            delete userObj._id;

                        JobModel.update({_id: jobId},{$set: jobObj}, function(err, job){
                        if(err){
                            deferred.reject(err);
                        }else{
                            JobModel.findById(jobId, function(err, job){
                             console.log("markCompleted job model: "+ JSON.stringify(job, null, 4))
                            deferred.resolve(job);
                        });
                       }
                    });
                    return deferred.promise;
                }

};