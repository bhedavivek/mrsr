angular.module('hospitalApp').controller('reportController',['$scope','$http','$rootScope','$routeParams','$location',function($scope,$http, $rootScope, $routeParams, $location){
    switch($rootScope['auth-token'].usertype){
        case 'user':
        
            if($routeParams.report_id){
                console.log($routeParams.report_id);
                $http({
                    method: 'GET',
                    url:'/api/user/'+$routeParams.report_id,
                    headers : {
                        'Content-Type' : 'application/json',
                        'auth-token': JSON.stringify($rootScope['auth-token'])
                    }
                }).then(function(succ){
                    //console.log(succ);
                    $scope.report = succ.data.result;
                    console.log($scope.report);
                },function(err){});
            }
            else{
                $http({
                    method: 'GET',
                    url:'/api/user',
                    headers : {
                        'Content-Type' : 'application/json',
                        'auth-token': JSON.stringify($rootScope['auth-token'])
                    }
                }).then(function(succ){
                    $scope.reports = succ.data.result;
                },function(err){});
            }
        
        break;
        case 'doctor':
            
            var data1={};
            var data = {};
            console.log($routeParams.user_id);
            console.log($routeParams.report_id);
            if($routeParams.report_id){
                data.optype ='get';
                if($routeParams.user_id){
                    data.get = {
                        'user_id' : $routeParams.user_id,
                        'report_id': $routeParams.report_id
                    };
                }
                else{
                    data.get = {
                        'doctor_id':$rootScope['auth-token'].user_id,
                        'report_id': $routeParams.report_id
                    };
                }
                data1.data=data;
                $http({
                    method: 'POST',
                    url:'/api/user/',
                    'data' : JSON.stringify(data1),
                    headers : {
                        'Content-Type' : 'application/json',
                        'auth-token': JSON.stringify($rootScope['auth-token'])
                    }
                    
                }).then(function(succ){
                    //console.log(succ.data.result);
                    if(succ.status!=200)
                        $location.path('/dashboard');
                    $scope.report = succ.data.result;
                    console.log(succ);
                },function(err){
                    
                });
            }
            else{
                data.optype ='get';
                data.get = {
                    'doctor_id':$rootScope['auth-token'].user_id,
                };
                data1.data=data;
                $http({
                    method: 'POST',
                    url:'/api/user/',
                    'data' : JSON.stringify(data1),
                    headers : {
                        'Content-Type' : 'application/json',
                        'auth-token': JSON.stringify($rootScope['auth-token'])
                    }
                    
                }).then(function(succ){
                    //console.log(succ.data.result);
                    $scope.reports = succ.data.result;
                    console.log(succ);
                },function(err){});
            }
        
        break;
        case 'hospital':
        break;
        default :
            return;
    }
    
}]);