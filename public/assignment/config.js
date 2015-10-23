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
                            templateUrl: "register.html"
                        })
                        .when("/login", {
                            templateUrl: "login/login.view.html",
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