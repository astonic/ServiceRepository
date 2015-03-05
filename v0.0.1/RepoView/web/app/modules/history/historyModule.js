/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var historyModule = angular.module('historyModule', ['ngRoute']);

/****************************************************/
historyModule.controller('historyEditCtrl', function ($scope, $http, $location, $routeParams, $rootScope,$window) {

    var historyId = $routeParams.historyId;

    $scope.edit = true;

    $scope.changeType = function (type) {
        $scope.history.type = type;
    };

    $http.post('../RepoService/rest/data/anyQuery',
            {q: "Select * from history where id=" + historyId}
    )
            .success(function (data, status, headers, config) {
                $scope.history = data[0];
                console.info(data);

            }).
            error(function (data, status, headers, config) {
                console.info(data);
            });



    $scope.update = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/update',
                {history: {
                        id: $scope.history.id,
                        type: $scope.history.type,
                        description: $scope.history.description

                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $location.path('/serviceEdit/' + $scope.history.service_id);
                    $rootScope.globalMessage = 'History updated!';
                    $window.alert('History updated!');

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error updating history!';
                    $window.alert('Error updating history!');
                });
    };


    $scope.delete = function (id) {
        console.info("remove " + id);
        $http.post('../RepoService/rest/data/delete',
                {history: {
                        id: id
                    }}
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

/******************************************************/

historyModule.controller('historyNewCtrl', function ($scope, $http, $location, $routeParams, $rootScope,$window) {

    var serviceId = $routeParams.serviceId;


    $scope.edit = false;
    $scope.history = {};
    $scope.history.type = "Production Fix";
    $scope.history.service_id = serviceId;
    $scope.changeType = function (type) {
        $scope.history.type = type;
    };


    $scope.save = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/insert',
                {history: {
                        type: $scope.history.type,
                        description: $scope.history.description,
                        service_id: $scope.history.service_id
                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.history.id = data;
                    $location.path('/serviceEdit/' + serviceId);
                    $rootScope.globalMessage = 'History created!';
                     $window.alert('History history!');

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error creating History!';
                    $window.alert('Error creating History!');
                });
    };



});
