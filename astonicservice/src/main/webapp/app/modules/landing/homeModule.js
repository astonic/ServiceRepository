/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var homeModule = angular.module('homeModule', ['ngRoute']);

/******************************************************/

// create the controller and inject Angular's $scope
homeModule.controller('homeCtrl', function ($scope, $http, $rootScope) {
    // create a message to display in our view
    operationCount();
    serviceCount();
    applicationCount();
    projectCount();

    function projectCount() {
        $http.get('../api/project/count')

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.projectTotal = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }


    function operationCount() {
        $http.get('../api/operation/count')

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.operationTotal = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }

    function serviceCount() {
        $http.get('../api/service/count')

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.serviceTotal = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }

    function applicationCount() {
        $http.get('../api/application/count')

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.applicationTotal = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }



});





/********************************************************/

// create the controller and inject Angular's $scope
homeModule.controller('loginCtrl', function ($scope, $http, $rootScope, $window, $location) {

    $scope.tryLogin = function () {
        if ($scope.userpass == "update") {
            $window.sessionStorage["update"] = true;
            $rootScope.update = true;
            $window.alert('You are in!');
            $location.path('/searchService');
            console.info($rootScope.update);
        } else {
            $window.alert('Go away!!');
        }
    }

});

/*********************************************************/
// create the controller and inject Angular's $scope
homeModule.controller('logOutCtrl', function ($scope, $http, $rootScope, $window) {

    $window.sessionStorage["update"] = null;
    $rootScope.update = false;

});

/*********************************************************/
// create the controller and inject Angular's $scope
homeModule.controller('appCtrl', function ($scope) {

  $scope.$on('LOAD',function(){
     $scope.loading = true;
     
  });
   $scope.$on('UNLOAD',function(){
     $scope.loading = false;
     
  });
   
});