/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var relationshipModule = angular.module('relationshipModule', ['ngRoute']);

/**********************************************/


relationshipModule.controller('linkRelationCtrl', function ($scope, $routeParams, $http,$location, $window, OperationsManager,ServiceManager) {

    var operationId = $routeParams.operationId;
    var serviceId = $routeParams.serviceId;
    var relation = $routeParams.relationship;
    console.info('OperationId: '+ operationId);
    
   $scope.searchValue = "%";
    
    $scope.operation = OperationsManager.get(operationId);
    $scope.service = ServiceManager.get(serviceId);

     if($scope.service === undefined || $scope.service === null || $scope.service === ""){
             console.log(" linkRelationCtrl calling list is null:");
             ServiceManager.refresh(function(data){
                  $scope.service = ServiceManager.get(serviceId); 
                   console.log("Now  ServiceManager:"  );
                   console.log($scope.operation  );
                   
             });
           
        }
        


      if($scope.operation === undefined || $scope.operation === null || $scope.operation === ""){
             console.log(" linkRelationCtrl calling list is null:");
             OperationsManager.refresh(serviceId,function(data){
                  $scope.operation = OperationsManager.get(operationId); 
                   console.log("Now  $scope.operation:"  );
                   console.log($scope.operation  );
                   
             });
           
        }
        

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
        $http.get('../api/service/name/'+ $scope.searchValue)

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
         $http.get('../api/application/name/'+ $scope.searchValue)

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
        $http.get('../api/operation/name/'+ $scope.searchValue)

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.list = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }



    function sendLinkData(id, comp_name, type) {

        $http.post('../api/relationship',
           {
                        operationId: {id:operationId},
                        relationshipType: $scope.relation,
                        relationshipId: id,
                        componentName: comp_name,
                        componentType: type

                    }
        )

                .success(function (data, status, headers, config) {
                    console.info(data);

                    $scope.edit = true;
                    $window.alert('Linked :)!');
                    $location.path('/operationEdit/'  + serviceId +'/'+ operationId );
                   
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

        $http.get('../api/operation/' + id + '/relationship')
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