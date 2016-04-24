angular.module('hospitalApp').controller('profileController',['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
    $http({
        url:'/api/user/profile',
        method:'GET',
        headers : {
            'Content-Type' : 'application/json',
            'auth-token': JSON.stringify($rootScope['auth-token'])
        }
    }).then(function(succ){
        console.log(succ);
        if(succ.data.success){
            $scope.user = succ.data.result;
            
        }
        else{
             $scope.error = "Records do not exist";
        }
    },function(err){
        $scope.error = "Records do not exist";
    });
}]);