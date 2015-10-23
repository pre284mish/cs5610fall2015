(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);


    function Configure($routeProvider) {

            $routeProvider
                        .when("/home",{
                            templateUrl: "home/home.view.html"
                        })
                        .when("/register", {
                            templateUrl: "register/register.view.html"
                        })
                        .when("/login", {
                            templateUrl: "login/login.view.html",
                        })
                        .when("/profile", {
                            templateUrl: "profile/profile.view.html",
                        })
                        .when("/form", {
                            templateUrl: "form/form.view.html",
                        })
                        .when("/courseEdit/:count", {
                            templateUrl: "courseEdit.html",
                            controller: "CourseEditController"
                        })
                        .when("/loginwe", {
                            templateUrl: "login.html"
                        })
                        .otherwise({
                            redirectTo: "/home"
                        });
    }

}())