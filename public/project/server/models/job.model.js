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
        markCompleted : markCompleted,
        findAllJobsByStatusAndAcquiredById : findAllJobsByStatusAndAcquiredById,
        findAllJobsByStatusAndUserId : findAllJobsByStatusAndUserId,
        findJobByJobId : findJobByJobId,
        deleteJobById : deleteJobById,
        findAllJobsByPinCode : findAllJobsByPinCode
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


          function findJobByJobId(jobId){
              var deferred = q.defer();
              JobModel.find({_id: jobId}, function(err, job){
                  console.log("job.model.js job for findAlljobsforUserId: "+ JSON.stringify(job, null, 4))
                  deferred.resolve(job);
              });
              return deferred.promise;
          }

         function findAllJobsByAcquiredBy(userId){
             var deferred = q.defer();
             JobModel.find({acquiredById: userId}, function(err, job){
                 console.log("job.model.js job for findAllJobsByAcquiredBy: "+ JSON.stringify(job, null, 4))
                 deferred.resolve(job);
             });
             return deferred.promise;
         }

        function findAllJobsByPinCode(pinCode, category){
                     var deferred = q.defer();
                     JobModel.find({$and: [{'address.zip': pinCode}, {category: category}]}, function(err, job){
                         console.log("job.model.js job for findAllJobsByPinCode: "+ JSON.stringify(job, null, 4))
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

        function findAllJobsByStatusAndAcquiredById(status, userId){
            var deferred = q.defer();
            JobModel.find({$and: [{status: status}, {acquiredById: userId}]}, function(err, job){
                console.log("job.model.js all jobs of status and acquiredBy: "+ JSON.stringify(job, null, 4))
                console.log("job.model.js err: "+ JSON.stringify(err, null, 4))

                deferred.resolve(job);
            });
            return deferred.promise;
        }

        function findAllJobsByStatusAndUserId(status, userId){
            var deferred = q.defer();
            JobModel.find({$and: [{status: status}, {userId: userId}]}, function(err, job){
                console.log("job.model.js all jobs of status and acquiredBy: "+ JSON.stringify(job, null, 4))
                console.log("job.model.js err: "+ JSON.stringify(err, null, 4))

                deferred.resolve(job);
            });
            return deferred.promise;
        }

        function updateJob(jobId, jobObj){
            var deferred = q.defer();

                JobModel.update({_id: jobId},{$set: jobObj}, function(err, job){
                if(err){
                console.log("update job model err: "+ JSON.stringify(err, null, 4))
                    deferred.reject(err);
                }else{
                    JobModel.findById(jobId, function(err, job){
                     console.log("update job model: "+ JSON.stringify(job, null, 4));
                    deferred.resolve(job);
                });
               }
            });
            return deferred.promise;
        }


        function markCompleted(jobId, jobObj){
            var deferred = q.defer();

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

        function deleteJobById(jobId){
            var deferred = q.defer();
            JobModel.remove({_id: jobId}, function(err, job){
                deferred.resolve(job);
            });
            return deferred.promise;
        }

};