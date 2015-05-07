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
        $http.post('../RepoServiceV1/rest/data/anyQuery',
                {q: 'Select count(*) as total from project'}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.projectTotal = data[0].total;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }


    function operationCount() {
        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'Select count(*) as total from operation'}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.operationTotal = data[0].total;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }

    function serviceCount() {
        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'Select count(*) as total from service'}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.serviceTotal = data[0].total;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }

    function applicationCount() {
        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'Select count(*) as total from application'}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.applicationTotal = data[0].total;

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