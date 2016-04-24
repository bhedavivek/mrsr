var app = angular.module('hospitalApp',['ngRoute','ngCookies']);

app.config(function($routeProvider){
   $routeProvider
    .when('/login',{
        resolve : {
            'check' : function($cookies, $location, $rootScope){
                if($cookies.getObject('auth-token')){
                    $location.path('/dashboard');
                }
            }  
        },
        templateUrl : '../views/login.html'
    })
    .when('/profile',{
        resolve : {
            'check' : function($cookies, $location, $rootScope){
                if($cookies.getObject('auth-token')){
                    $location.path('/dashboard');
                }
            }  
        },
        templateUrl : '../views/profile.html'
    })
    .when('/register/user',{
        templateUrl : '../views/registerUser.html'
    })
    .when('/register/doctor',{
        templateUrl : '../views/registerDoctor.html'
    })
    .when('/reports',{
        resolve : {
            'check' : function($location, $rootScope, $cookies){
                if(!$cookies.getObject('auth-token')){
                    $location.path("/login");
                }
                else if($cookies.getObject('auth-token')!=null){
                    $rootScope['auth-token']=$cookies.getObject('auth-token');
                }
            }  
        },
        templateUrl : '../views/reports.html'
    })
    .when('/reports/:report_id',{
        resolve : {
            'check' :function($location, $rootScope, $cookies){
                if(!$cookies.getObject('auth-token')){
                    $location.path("/login");
                }
                else if($cookies.getObject('auth-token')){
                    $rootScope['auth-token']=$cookies.getObject('auth-token');
                }
            }  
        },
        templateUrl : '../views/report.html'
    })
    .when('/register',{
        templateUrl : '../views/register.html'
    })
    .when('/dashboard', {
        resolve : {
            "check" : function($location, $rootScope, $cookies){
                if(!$cookies.getObject('auth-token')){
                    $location.path("/login");
                }
                else if($cookies.getObject('auth-token')){
                    $rootScope['auth-token']=$cookies.getObject('auth-token');
                }
            }
        },
        templateUrl : './views/dashboard.html',
        controller : 'reportController'
    })
    .otherwise({
        resolve : {
            "check" : function($location, $rootScope, $cookies){
                if(!$cookies.getObject('auth-token')){
                    $location.path("/login");
                }
                else if($cookies.getObject('auth-token')){
                    $rootScope['auth-token']=$cookies.getObject('auth-token');
                }
            }
        },
        redirectTo : '/dashboard'
    })
});
