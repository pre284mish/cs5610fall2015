(function(){
    'use strict';
   var app =  angular.module("CommunityBuilderApp");
   app.config(Configure)
    app.controller('CommonController', function($scope, $routeParams, $rootScope) {
            $rootScope.role = $routeParams.role;

        });


    function Configure($routeProvider) {

            $routeProvider
                        .when("/home", {
                            templateUrl: function(elem, attrs) {
                                return 'views/home/home.html'
                            },
                            controller: 'HomeController',
                            controllerAs: "model"
                        })
                        .when("/category/:role/:category", {
                            templateUrl: function(elem, attrs) {
                                console.log('inside category');
                                return 'views/category/category-' + elem.role + '.view.html'
                            },
                            controller: 'CategoryController',
                            controllerAs: "model"
                        })
                        .when("/add_job", {
                            templateUrl: "views/add_job/add_job.view.html",
                            controller: "AddJobController",
                            controllerAs: "model"
                        })
                        .when("/my_jobs", {
                            templateUrl: "views/my_jobs/my_jobs.view.html",
                            controller: "MyJobsController",
                            controllerAs: "model"
                        })
                         .when("/my_listings", {
                            templateUrl: "views/my_listings/my_listings.view.html",
                            controller: "MyListingController",
                            controllerAs: "model"
                        })
                        .when("/login", {
                            templateUrl: "views/login/login.view.html",
                            controller: "LoginController"
                        })
                        .when("/profile", {
                            templateUrl: "views/profile/profile.view.html",
                            controller: "ProfileController",
                            controllerAs: "model"
                        })
                        .when("/form", {
                            templateUrl: "views/form/form.view.html",
                            controller: "FormController"
                        })
                        .when("/login_register", {
                            templateUrl: "views/login_register/login_register.view.html",
                            controller: "RegisterController",
                            controllerAs: "model"
                        })
                        .otherwise({
                            redirectTo: "/home"
                        });
    }

}())