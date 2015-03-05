/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var relationshipModule = angular.module('relationshipModule', ['ngRoute']);

/**********************************************/


relationshipModule.controller('linkRelationCtrl', function ($scope, $routeParams, $http, $window, OperationsManager) {

    var operationId = $routeParams.operationId;
    var relation = $routeParams.relationship;
    console.info('OperationId: '+ operationId);
    
   
    
    $scope.operation = OperationsManager.get(operationId);

    $scope.operationId = operationId;
    $scope.relation = relation;
    $scope.searchTypeValue = "Application";

    $scope.searchType = function (type) {
        $scope.searchTypeValue = type;
    };

    $scope.search = function () {
        if ($scope.searchTypeValue == "Application") {
            searchApplications();
        } else if ($scope.searchTypeValue == "Service") {
            searchServices();
        } else {
            searchOperations();
        }
    };

    $scope.link = function (id, comp_name, type) {

        console.info(id);
        sendLinkData(id, comp_name, type);
    };


    function searchServices() {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'Select id, name as name, description from service where name like "' + $scope.searchValue + '" or tags like "' + $scope.searchValue + '"'}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.list = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }

    function searchApplications() {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'Select * from application where name like "' + $scope.searchValue + '"'}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.list = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }

    function searchOperations() {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'Select * from operation where name like "' + $scope.searchValue + '"'}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.list = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }



    function sendLinkData(id, comp_name, type) {

        $http.post('../RepoService/rest/data/insert',
                {relationship: {
                        operation_id: operationId,
                        relationship_type: $scope.relation,
                        relationship_id: id,
                        component_name: comp_name,
                        component_type: type

                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);

                    $scope.edit = true;
                    $window.alert('Linked :)!');
                    history.back();
                    //scope.$apply();

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }



});

/***********************************************************************/

relationshipModule.service('RelationshipManager', function ($http) {

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
                {q: "select * from relationship where operation_id = " + id}
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