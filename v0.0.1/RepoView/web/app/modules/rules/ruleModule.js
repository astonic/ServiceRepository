/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var ruleModule = angular.module('ruleModule', ['ngRoute']);

/*********************************************************/

ruleModule.controller('ruleNewCtrl', function ($scope, $routeParams, $http, $rootScope, $window, OperationsManager) {

    var operationId = $routeParams.operationId;
    $scope.operation = OperationsManager.get(operationId);
    $scope.edit = false;
    $scope.rule = {};
    $scope.rule.type = "Business Rule";
    $scope.ruleType = function (type) {
        $scope.rule.type = type;

    };

    $scope.save = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/insert',
                {logic: {
                        operation_id: operationId,
                        documentation_url: $scope.rule.documentation_url,
                        type: $scope.rule.type,
                        description: $scope.rule.description

                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.rule.id = data;
                    $scope.edit = true;
                    $rootScope.globalMessage = 'Logic created!';
                    $window.alert('Logic created!');
                    history.back();
                    

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error creating Logic!';
                    $window.alert('Error creating Logic!');
                });
    };

});





ruleModule.controller('ruleEditCtrl', function ($scope, $location, $routeParams, $http, $rootScope, $window) {
    var ruleId = $routeParams.ruleId;

    $scope.edit = true;
    $scope.rule = {};
    $scope.rule.id = ruleId;

    $scope.ruleType = function (type) {
        $scope.rule.type = type;

    };

    $http.post('../RepoService/rest/data/anyQuery',
            {q: "Select * from logic where id=" + ruleId}
    )
            .success(function (data, status, headers, config) {
                $scope.rule = data[0];
                console.info(data);

            }).
            error(function (data, status, headers, config) {
                console.info(data);
            });


    $scope.update = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/update',
                {logic: {
                        id: $scope.rule.id,
                        operation_id: $scope.rule.operation_id,
                        documentation_url: $scope.rule.documentation_url,
                        type: $scope.rule.type,
                        description: $scope.rule.description

                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Updating Logic!';
                    $window.alert('Updating Logic!');
                    history.back();
                    scope.$apply();

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error updating Logic!';
                });
    };


});


/************************************************/

ruleModule.service('LogicManager', function ($http) {

    var list = [];
    this.getList = function () {
        return list;
    };
    this.setList = function (inList) {
        list = inList;
    };

    this.get = function (id) {
        console.log("calling get:" + list);
        for (i in list) {

            if (list[i].id == id) {

                return list[i];
            }
        }

    };

    this.refresh = function (id, callBack) {

        // Simple POST request example (passing data) :

        $http.post('../RepoService/rest/data/anyQuery',
                {q: "select * from logic where operation_id = " + id}
        )
                .success(function (data, status, headers, config) {
                    console.info(data);
                    list = data;
                    callBack(data);

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    };
});