angular.module('hospitalApp').controller('reportController',['$scope','$http','$rootScope','$routeParams',function($scope,$http, $rootScope, $routeParams){
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
            console.log(succ);
            $scope.report = succ.data.result;
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
}]);