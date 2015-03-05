/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var operationModule = angular.module('operationModule', ['ngRoute']);



/*****************************************************/

// create the controller and inject Angular's $scope
operationModule.controller('operationFieldsCtrl', function ($scope, $http, $rootScope, $window,$routeParams,OperationFieldsManager) {
      
    var operationId = $routeParams.operationId;
    function refreshList() {
        OperationFieldsManager.refresh(operationId, function (data) {
            $scope.fields = data;
        });
    }
     
     $scope.allowSave = true; 
       $scope.newRow = function(){
           $scope.allowSave = true;
          $scope.selectedRow = {};
          $scope.selectedRow.usage_type = 'Request';
         $scope.selectedRow.field_type = 'Number';
          
      };
      
     
      refreshList();
      $scope.selectedRow = {};
      $scope.newRow();
      
    $scope.fieldUsageType = function(type){
        $scope.selectedRow.usage_type = type;
    };
    
     $scope.fieldType = function(type){
        $scope.selectedRow.field_type = type;
    };
    
      $scope.selectRow = function(id){
           $scope.allowSave = false;
          $scope.selectedRow = OperationFieldsManager.get(id);
      };
      
      $scope.save = function(){
          $scope.selectedRow.operation_id = operationId;
          OperationFieldsManager.create($scope.selectedRow, function(data){
               $window.alert('Field created!');
               refreshList();
               
          });
      };
      
      $scope.update = function(){
          OperationFieldsManager.update(id,function(data){
              $window.alert('Field updated!');
              refreshList();
          });
          
      };
      
      $scope.deleteRow = function(id){
          OperationFieldsManager.delete(id,function(data){
              $window.alert('Field removed!');
              refreshList();
          });
      };
      
      

});


/******************************************************/

// create the controller and inject Angular's $scope
operationModule.controller('searchOperationCtrl', function ($scope, $http, $rootScope) {
    // create a message to display in our view
     $scope.searchValue = "%";
    $scope.doSearch = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'Select * from operation where name like "' + $scope.searchValue + '" or description like "' + $scope.searchValue + '"'}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.operations = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error:!' + data;
                });
    };



});
/******************************************************/

/************************************************/

operationModule.service('OperationsManager', function ($http) {

    var list = [];
    this.getList = function () {
        return list;
    };
    this.setList = function (inList) {
        list = inList;
    };

    this.get = function (id) {
       
       
       if(list === undefined || list === null || list.length === 0){
             console.log("calling list is null:" + list);
           
        }
       
        for (i in list) {

            if (list[i].id == id) {

                return list[i];
            }
        }

    };

    this.refresh = function (id, callBack) {

        // Simple POST request example (passing data) :

        $http.post('../RepoService/rest/data/anyQuery',
                {q: "select operation.id as id,operation.name as name,operation.description as description from operation where  operation.service_id=" + id}
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

 


/************************************************/

operationModule.service('OperationFieldsManager', function ($http) {

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
                {q: "select * from message_structure where operation_id = " + id}
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
    
     this.getListByType = function (id,type, callBack) {

        // Simple POST request example (passing data) :

        $http.post('../RepoService/rest/data/anyQuery',
                {q: "select * from message_structure where usage_type = \""+ type +"\" and operation_id = " + id}
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
    
    
    this.delete = function (id, callBack) {

        // Simple POST request example (passing data) :

         $http.post('../RepoService/rest/data/delete',
                {message_structure: {
                        id: id
                    }}
        )
                .success(function (data, status, headers, config) {
                    console.info(data);
                    callBack(data);

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    };
    
     this.create = function (data, callBack) {

        // Simple POST request example (passing data) :

         $http.post('../RepoService/rest/data/insert',
                {message_structure: {
                        operation_id:data.operation_id,
                        field_name: data.field_name,
                        description:data.description, 
                        field_type:data.field_type ,
                        usage_type: data.usage_type 
                    }}
        )
                .success(function (data, status, headers, config) {
                    console.info(data);
                    callBack(data);

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    };
    
     this.update = function (data, callBack) {

        // Simple POST request example (passing data) :

         $http.post('../RepoService/rest/data/update',
                {message_structure: {
                        id:data.id,
                        field_name: data.field_name,
                        description:data.description, 
                        field_type:data.field_type ,
                        usage_type: data.usage_type 
                    }}
        )
                .success(function (data, status, headers, config) {
                    console.info(data);
                    callBack(data);

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    };
  
    
});


/******************************************************/


operationModule.controller('newOperationCtrl', function ($scope, $routeParams, $http, $location, $rootScope, $window,ServiceManager) {


    var serviceId = $routeParams.serviceId;
    $scope.operation = {};
    $scope.operation.mep_type = "Synch";
    $scope.edit = false;
    $scope.mepType = function (type) {
        $scope.operation.mep_type = type;

    };
    
      $scope.service =  ServiceManager.get(serviceId) ;
      
     
    
      if($scope.service === undefined || $scope.service === null || $scope.service === ""){
             console.log(" editOperationCtrl calling list is null:");
             ServiceManager.refresh(function(data){
                  $scope.service = ServiceManager.get(serviceId); 
             });
           
        }



    $scope.save = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/insert',
                {operation: {
                        name: $scope.operation.name,
                        request_msg: $scope.operation.request_msg,
                        response_msg: $scope.operation.response_msg,
                        mep_type: $scope.operation.mep_type,
                        tags: $scope.operation.tags,
                        description: $scope.operation.description,
                        service_id: $scope.service.id

                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                  
                    $scope.operation.id = data;


                    if ($scope.operation.id != 0) {
                        $scope.edit = true;
                        $window.alert('Operation created!!');
                         history.back();
                        
                    }


                }).
                error(function (data, status, headers, config) {
                     console.info(data);
                     $window.alert('Error creating Operation!');
                });
    };

});

/***********************************************************************/

operationModule.controller('editOperationCtrl', function ($scope, $routeParams, $http, $location, $window, ServiceManager) {

    var operationId = $routeParams.operationId;
    $scope.edit = true;
    
    $scope.service = {};
    
    function getServiceFromOperation(){
        $scope.service =  ServiceManager.get($scope.operation.service_id) ;
    
       if($scope.service === undefined || $scope.service === null || $scope.service === ""){
             console.log(" editOperationCtrl calling list is null:");
             ServiceManager.refresh(function(data){
                  $scope.service = ServiceManager.get($scope.operation.service_id); 
             });
           
        }
    }
    
    

    
    $scope.mepType = function (type) {
        $scope.operation.mep_type = type;

    };

    $scope.addRelation = function (type) {
        $location.path('/operationRelation/' + $scope.service.id +'/'+ operationId + '/' + type);
    };

    getRulesList(operationId);
    getRelationshipList(operationId);

    $http.post('../RepoService/rest/data/anyQuery',
            {q: "Select * from operation where id=" + operationId}
    )
            .success(function (data, status, headers, config) {
                $scope.operation = data[0];
               getServiceFromOperation();
                console.info(data);

            }).
            error(function (data, status, headers, config) {
                console.info(data);
            });



    $scope.update = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/update',
                {operation: {
                        id: operationId,
                        name: $scope.operation.name,
                        description: $scope.operation.description,
                        flow_diagram: $scope.operation.flow_diagram,
                        mep_type: $scope.operation.mep_type,
                        tags: $scope.operation.tags,
                        request_msg: $scope.operation.request_msg,
                        response_msg: $scope.operation.response_msg


                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $window.alert('Operation updated');
                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    };

    function getRulesList(id) {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/anyQuery',
                {q: "select * from logic where operation_id=" + id})

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.rules = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }
    ;

    $scope.relationships = [];
    function getRelationshipList(id) {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/anyQuery',
                {q: "select * from relationship where operation_id=" + id})

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.relationships = data;
                    //getNames(data);

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }
    ;

    $scope.delete = function () {
        
        $http.post('../RepoService/rest/data/operationDelete',
                {id: $scope.operation.id}
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




    $scope.removeRelationship = function (id) {
        console.info("remove " + id);
        $http.post('../RepoService/rest/data/delete',
                {relationship: {
                        id: id
                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $window.location.reload();
                    $window.alert('Removed!');

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });

    };


});