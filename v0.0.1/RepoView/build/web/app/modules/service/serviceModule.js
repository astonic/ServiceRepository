/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var serviceModule = angular.module('serviceModule', ['ngRoute']);



/*********************************************************/

serviceModule.controller('serviceCtrl', function ($scope, $routeParams, $http, $location, $rootScope, $window,ProjectManager) {


    $scope.edit = false;
    $scope.service = {};
    $scope.service.service_type = "OSB Service";
    $scope.service.protocol_type = "WS";
    $scope.service.status = "DESIGN";
    
    $scope.project = {};
    ProjectManager.refresh(function (data) {
        $scope.projects = data;
        $scope.project.name = $scope.projects[0].name;
        $scope.service.project_id = $scope.project.id;
    });
    
    
    
    $scope.setProject = function (id) {
        $scope.project.name = ProjectManager.get(id).name;
        $scope.service.project_id = id;

    };
    
    $scope.componentType = function (type) {
        $scope.service.service_type = type;

    };

    $scope.protocolType = function (type) {
        $scope.service.protocol_type = type;

    };

    $scope.serviceStatus = function (type) {
        $scope.service.status = type;

    };

    $scope.save = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/insert',
                {service: {
                        name: $scope.service.name,
                        documentation_loc: $scope.service.documentation_loc,
                        service_type: $scope.service.service_type,
                        protocol_type: $scope.service.protocol_type,
                        uri: $scope.service.uri,
                        status: $scope.service.status,
                        description: $scope.service.description,
                        project_id: $scope.service.project_id

                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.service.id = data;


                    if ($scope.service.id != 0) {
                        $scope.edit = true;
                        $location.path('/serviceEdit/' + $scope.service.id);
                        $rootScope.globalMessage = 'Service created!';
                        $window.alert('Service created continue adding more detials!');
                    }



                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error creating Service!';
                     $window.alert('Error creating Service!');
                });
    };

});





/********************************************************/


serviceModule.controller('updateServiceCtrl', function ($scope, $location, $routeParams, $http, $rootScope, $window, OperationsManager,ProjectManager) {
    var serviceId = $routeParams.serviceId;

    $scope.edit = true;
    $scope.service = {};
    $scope.service.id = serviceId;
    //getOperations(serviceId);
    getHistory(serviceId);
    $scope.project = {};

     function getProjectInfoAfterServiceLoads(){
         ProjectManager.refresh(function (data) {
        $scope.projects = data;
        if ($scope.service.project_id != null){
        $scope.project.name = ProjectManager.get($scope.service.project_id).name;
      }else{
        $scope.project.name = $scope.projects[0].name;
        $scope.service.project_id = $scope.projects[0].id;
      }
    });
    }
    
    // Simple POST request example (passing data) :
    $http.post('../RepoService/rest/data/anyQuery',
            {q: "Select * from service where id=" + serviceId}
    )

            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.service = data[0];
                console.info(data);
                getProjectInfoAfterServiceLoads();

                //$scope.servicesws  = data;

            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.info(data);
            });


    OperationsManager.refresh(serviceId, function (data) {
        $scope.operationws = data;
    });
    
    
   
   
    
    
    $scope.setProject = function (id) {
        $scope.project.name = ProjectManager.get(id).name;
        $scope.service.project_id = id;

    };

    $scope.componentType = function (type) {
        $scope.service.service_type = type;

    };
    $scope.protocolType = function (type) {
        $scope.service.protocol_type = type;

    };
    $scope.serviceStatus = function (type) {
        $scope.service.status = type;

    };
   


    $scope.update = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/update',
                {service: {
                        id: serviceId,
                        name: $scope.service.name,
                        documentation_loc: $scope.service.documentation_loc,
                        service_type: $scope.service.service_type,
                        protocol_type: $scope.service.protocol_type,
                        uri: $scope.service.uri,
                        status: $scope.service.status,
                        description: $scope.service.description,
                        project_id: $scope.service.project_id

                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Service updated!';
                    $window.alert('Service updated!');

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error updating service!';
                });
    };


    function getOperations(id) {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/anyQuery',
                {q: "select operation.id as id,operation.name as name,operation.description as description from operation,service_operation where operation.id = service_operation.operation_id and service_operation.service_id=" + id})

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.operationws = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }
    ;

    function getHistory(id) {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/anyQuery',
                {q: "select * from history where service_id=" + id})

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.historyList = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    };
    
    
    $scope.delete = function () {
        
        $http.post('../RepoService/rest/data/serviceDelete',
                {id: $scope.service.id}
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
serviceModule.controller('searchServiceCtrl', function ($scope, $http, ServiceManager) {

    var callMe = function (data) {
        $scope.servicesws = data;
    };
     $scope.alerts = [];
  $scope.alerts.push({msg: 'Another alert!',type:'info',dismissOnTimeout:'true'});
    ServiceManager.refresh(callMe);



});
/*********************************************************/


serviceModule.service('ServiceManager', function ($http) {

    var serviceList = [];

    this.getList = function () {
        return serviceList;
    };
    this.setList = function (list) {
        serviceList = list;
    };



    this.get = function (id) {
        console.log("calling get:" + serviceList);
        
        if(serviceList === undefined || serviceList === null || serviceList.length === 0){
             console.log("calling serviceList is null:" + serviceList);
              
        }
        
        for (i in serviceList) {

            if (serviceList[i].id == id) {

                return serviceList[i];
            }
        }

    };


    this.refresh = function (callBack) {

        // Simple POST request example (passing data) :

        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'Select * from service'}
        )
                .success(function (data, status, headers, config) {
                    console.info(data);
                      serviceList = data;
                    callBack(data);

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
         
       
    };
    this.refresh(this.setList);


});



// create the controller and inject Angular's $scope
serviceModule.controller('printServiceCtrl', function ($scope, $http, $routeParams, ServiceManager, OperationsManager,OperationFieldsManager,LogicManager) {

    var serviceId = $routeParams.serviceId;
    $scope.service = ServiceManager.get(serviceId);

    OperationsManager.refresh(serviceId, function (list) {
        $scope.operations = list;
    });
    
    
    $scope.getRequestFields = function(id){
        OperationFieldsManager.getListByType(id,"Request",function(list){
            $scope.requestList = list;
        });
        
    };
    
    $scope.getResponseFields = function(id){
        OperationFieldsManager.getListByType(id,"Response",function(list){
            $scope.responseList = list;
        });
    };
    });
    
    
    
    
// create the controller and inject Angular's $scope
serviceModule.controller('wsdlParserCtrl', function ($scope, $http, $rootScope, $window,$location) {

    
    $scope.doSearch = function(){
        
        
          $http.post('../RepoService/rest/data/wsdlparser',
                 $scope.searchValue
        )
                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.service = data
                   // callBack(data);

                }).
                error(function (data, status, headers, config) {
                      $window.alert('Error: make sure the URL does not require authentication!');  
                });       
        
        
    };
    
    function saveOperations(){
        
      
                $http.post('../RepoService/rest/data/saveOperations',
                $scope.service
             )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    //$scope.operation.id = operaton_id;
                    //$window.alert('Operation created');
                     $window.alert('Service created continue adding more detials!');  
                      $location.path('/serviceEdit/'  + $scope.service.id );

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
               
    
    };
    
    
    
    
     $scope.save =  function () {
        // Simple POST request example (passing data) :
        $scope.service.uri =  $scope.searchValue; 
        $http.post('../RepoService/rest/data/insert',
                {service: {
                        name: $scope.service.name,
                        description: $scope.service.description, 
                        uri:  $scope.service.uri
                       
                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.service.id = data;
                    $scope.service.service_id = data;
                    
                    if ($scope.service.id != 0) {
                       
                        saveOperations();
                    }



                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error creating Service!';
                     $window.alert('Error creating Service!');
                });
    };
    
    

});

