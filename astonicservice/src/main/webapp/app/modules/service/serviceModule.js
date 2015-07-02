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
    $scope.service.serviceType = "OSB Service";
    $scope.service.protocolType = "WS";
    $scope.service.status = "DESIGN";
    
    $scope.project = {};
    ProjectManager.refresh(function (data) {
        $scope.projects = data;
        $scope.project.name = $scope.projects[0].name;
        $scope.service.project_id = $scope.projects[0].id;
    });
    
    
    
    $scope.setProject = function (id) {
        $scope.project.name = ProjectManager.get(id).name;
        $scope.service.project_id = id;

    };
    
    $scope.componentType = function (type) {
        $scope.service.serviceType = type;

    };

    $scope.protocolType = function (type) {
        $scope.service.protocolType = type;

    };

    $scope.serviceStatus = function (type) {
        $scope.service.status = type;

    };

    $scope.save = function () {
        // Simple POST request example (passing data) :
        $http.post('../api/service',
                {
                        name: $scope.service.name,
                        documentationLoc: $scope.service.documentationLoc,
                        serviceType: $scope.service.serviceType,
                        protocolType: $scope.service.protocolType,
                        uri: $scope.service.uri,
                        status: $scope.service.status,
                        description: $scope.service.description,
                        projectId:{ id: $scope.service.project_id}
                       

                    }
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
    getOperations(serviceId);
    getHistory(serviceId);
    $scope.project = {};
    getProjectInfoAfterServiceLoads();
 
     function getProjectInfoAfterServiceLoads(){
         ProjectManager.refresh(function (data) {
         $scope.projects = data;
       
    });
    }
    
    // Simple POST request example (passing data) :
    $http.get('../api/service/'+ serviceId
    )

            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.service = data;
                console.info($scope.service);
                  $scope.project.name = $scope.service.projectId.name;
                   $scope.service.project_id = $scope.service.projectId.id;

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
        $scope.service.serviceType = type;

    };
    $scope.protocolType = function (type) {
        $scope.service.protocolType = type;

    };
    $scope.serviceStatus = function (type) {
        $scope.service.status = type;

    };
   


    $scope.update = function () {
        // Simple POST request example (passing data) :
        $http.put('../api/service/'+serviceId ,
                {
                        id: serviceId,
                        name: $scope.service.name,
                        documentationLoc: $scope.service.documentation_loc,
                        serviceType: $scope.service.serviceType,
                        protocolType: $scope.service.protocolType,
                        uri: $scope.service.uri,
                        status: $scope.service.status,
                        description: $scope.service.description,
                        projectId: { id:$scope.service.project_id},
                        environment:$scope.service.environment

                    }
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
        $http.get('../api/service/'+ id +'/operations')

                .success(function (data, status, headers, config) {
                    console.info("Operations "+ data);
                    $scope.operationws = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    };
    
    
    

    function getHistory(id) {
        // Simple POST request example (passing data) :
         $http.get('../api/service/'+ id +'/history')

                .success(function (data, status, headers, config) {
                    console.info("history: " + data);
                    $scope.historyList = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    };
    
    
    $scope.delete = function () {
        
        $http.delete('../api/service/'+ $scope.service.id)

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

        $http.get('../api/service')
                .success(function (data, status, headers, config) {
                    console.info(data);
                      serviceList = data;
                    callBack(data);

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
         
       
    };
    
      this.refreshWithOperations = function (callBack) {

        // Simple POST request example (passing data) :

        $http.get('../api/service')
        
                .success(function (data, status, headers, config) {
                    
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
        
        $scope.$emit('LOAD');
          $http.post('../RepoService/rest/data/wsdlparser',
                 $scope.wsdlWiz
        )
                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.service = data
                   // callBack(data);
                   $scope.$emit('UNLOAD');

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                     $scope.$emit('UNLOAD');  
                    $window.alert(data);  
                      
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

