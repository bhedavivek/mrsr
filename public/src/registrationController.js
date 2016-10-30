angular.module('hospitalApp').controller('registrationController',['$scope','$rootScope','$http', '$location', function($scope, $rootScope, $http, $location){
        $scope.prefixes = ['Mr.','Mrs.','Mx.','Ms.','Dr.'];
        $scope.suffixes = ['Jr.','Sr.'];
        $scope.registerUser = function(){
            $scope.registeruser.usertype="user";
            $http.post('/register',$scope.registeruser)
            .then(function(success){
                $location.path('/login');
            }, function(err){
                $scope.error = "Login Failed";
            });
        };
        $scope.registerDoctor = function(){
            $scope.registerdoctor.usertype="doctor";
            $http.post('/register',$scope.registerdoctor)
            .then(function(success){
                $location.path('/login');
            }, function(err){
                $scope.error = "Login Failed";
            });
        };
    }
]);