var app = angular.module('hospitalApp').controller('loginController', ['$scope', '$rootScope','$http','$location','$cookies',function($scope, $rootScope, $http, $location, $cookies){
    $scope.usertypes = ['user', 'doctor', 'institution']; 
    $scope.login = function(){
    var utype = $scope.loginuser.usertype;
    var uname = $scope.loginuser.user_id;
    var password = $scope.loginuser.user_password;
    if(!utype || !uname || !password){
        $scope.error = "Form Incomplete";
    }
    else{
        $scope.error="";
        $http.post('/authenticate',$scope.loginuser)
            .then(function(success){
                console.log(success.data);
                var response = success.data;
                if(response['auth-token']){
                    var exp = new Date();
                    exp = new Date(exp.setDate(exp.getDate()+1));
                    $rootScope['auth-token'] = response['auth-token'];
                    $cookies.putObject('auth-token',$rootScope['auth-token'], {'expires' : exp});
                    $location.path('/dashboard');
                }
                else{
                    $scope.error = "Login Failed";
                }
            }, function(err){
                $scope.error = "Login Failed";
            });
        }
    }
    $scope.logout = function(){
        $rootScope['auth-token']=null;
        $cookies.remove('auth-token');
        $location.path('/login');
    }
}]);