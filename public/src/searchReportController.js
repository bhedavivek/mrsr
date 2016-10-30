angular.module('hospitalApp').controller('searchReportController',['$scope','$http','$rootScope','$routeParams','$location',function($scope,$http, $rootScope, $routeParams, $location){
    $scope.sr={};
    $scope.searchreport=function(){
        var dat = {
            'data':{
                'optype':'get',
                'get' : $scope.sr
        }};
        $http({
                    method: 'POST',
                    url:'/api/user/',
                    'data' : JSON.stringify(dat),
                    headers : {
                        'Content-Type' : 'application/json',
                        'auth-token': JSON.stringify($rootScope['auth-token'])
                    }
                    
                }).then(function(succ){
                    //console.log(succ.data.result);
                    $scope.searchresults = succ.data.result;
                },function(err){});
    };
    $scope.searchreset=function(){
        $scope.sr={};
    }
}]);
