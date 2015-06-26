/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
   

var applicationRepoModule = angular.module('applicationRepoModule', ['ngRoute']);

/******************************************************/

// create the controller and inject Angular's $scope
applicationRepoModule.controller('searchAppCtrl', function ($scope, $http, $rootScope) {
    // create a message to display in our view
       $scope.searchValue = "%";
    $scope.applications = {};

    $scope.doSearch = function () {
        // Simple POST request example (passing data) :
        $http.get('../api/application',
                {q: 'Select * from application where name like "' + $scope.searchValue + '" or description like "' + $scope.searchValue + '"'}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.applications = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error:!' + data;
                });
    };



});


/******************************************************/

// create the controller and inject Angular's $scope
applicationRepoModule.controller('editAppCtrl', function ($scope, $http, $routeParams, $rootScope,$window) {
    // create a message to display in our view
    var appId = $routeParams.applicationId;
    $scope.edit = true;
    
     $scope.appDomain = function (type) {
        $scope.application.domain = type;
    };
    
    $http.get('../api/application/'+appId
    )
            .success(function (data, status, headers, config) {
                $scope.application = data;
                console.info(data);

            }).
            error(function (data, status, headers, config) {
                console.info(data);
            });


    $scope.update = function () {
        // Simple POST request example (passing data) :
        $http.put('../api/application/'+$scope.application.id,
                    {
                        id: $scope.application.id,
                        name: $scope.application.name,
                        domain: $scope.application.domain,
                        description: $scope.application.description

                    }
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Application updated!';
                    $window.alert('Application updated!');

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error updating Application!';
                    $window.alert('Error updating Application!');
                });
    };
    
    
        $scope.delete = function () {
        console.info("remove " + $scope.application.id);
        $http.delete('../api/application/' + $scope.application.id
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    history.back();
                    $window.alert('Removed!');

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });

    };


});

// create the controller and inject Angular's $scope
applicationRepoModule.controller('newAppCtrl', function ($scope, $http, $location, $rootScope,$window) {
    // create a message to display in our view

    $scope.application = {};
    $scope.application.domain = "Billing";
    
    $scope.appDomain = function (type) {
        $scope.application.domain = type;
    };


    $scope.save = function () {
        // Simple POST request example (passing data) :
        $http.post('../api/application',
                {
                        name: $scope.application.name,
                        description: $scope.application.description,
                        domain: $scope.application.domain
                    }
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.application.id = data;
                    $rootScope.globalMessage = 'Application created!';
                    $location.path('/applicationSearch');
                    $window.alert('Application created!');


                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error creating Application!';
                     $window.alert('Error creating Application!');
                });
    };





});
