angular.module('hospitalApp').controller('newReportController',['$scope', '$rootScope','$http','$location','$cookies',function($scope, $rootScope, $http, $location, $cookies){
    $scope.addReport = function(){
        var report={};
        report.title = $scope.newreport.title;
        report.patient_aadhaar_id = $scope.newreport.user_id;
        report.doctor_registration_id = $rootScope['auth-token'].user_id;
        report.report_date = new Date();
        report.upload_info={};
        report.tests=[];
        var test = {};
        test.test_name = $scope.newreport.test_name;
        test.test_properties = [];
        var property = {};
        property.property_name =$scope.newreport.test_property_name;
        property.property_value = $scope.newreport.test_property_value;
        test.test_properties.push(property);
        report.tests.push(test);
        $http({
            url : '/api/user/profile',
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token':JSON.stringify($rootScope['auth-token'])
            }
        }).then(function(succ){
            $scope.user = succ.data.result;
            report.upload_info.name = $scope.user.name.first_name +" "+ $scope.user.name.last_name;
            report.upload_info.address = $scope.user.address.address;
            report.upload_info.city = $scope.user.address.city;
            report.upload_info.pincode = $scope.user.address.zipcode;
            $http({
                url : '/api/user',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'auth-token':JSON.stringify($rootScope['auth-token'])
                },
                data : JSON.stringify({
                    'data' : {
                        'optype':'insert',
                        'insert' : report
                    }
                })
            }).then(function(succ){
                if(succ.data.success){
                    $location.path('/');
                }
                else{
                    $scope.error = "Error!!";
                }
            },function(err){});
        },function(err){});
        
    }
}]);