

var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function ($routeProvider) {
    $routeProvider

            // route for the home page
            .when('/', {
                templateUrl: 'pages/home.html',
                controller: 'homeCtrl'
            })

            .when('/operationFields/:operationId', {
                templateUrl: 'pages/operationFields.html',
                controller: 'operationFieldsCtrl'
            })

            .when('/servicePrint/:serviceId', {
                templateUrl: 'pages/printView.html',
                controller: 'printServiceCtrl'
            })
            .when('/searchService', {
                templateUrl: 'pages/searchService.html',
                controller: 'searchServiceCtrl'
            })
            .when('/login', {
                templateUrl: 'pages/login.html',
                controller: 'loginCtrl'
            })
            .when('/logOut', {
                templateUrl: 'pages/login.html',
                controller: 'logOutCtrl'
            })
            .when('/ruleEdit/:ruleId', {
                templateUrl: 'pages/rules.html',
                controller: 'ruleEditController'
            })
            // route for the about page
            .when('/ruleNew/:operationId', {
                templateUrl: 'pages/rules.html',
                controller: 'ruleNewController'
            })
            .when('/historyEdit/:historyId', {
                templateUrl: 'pages/changeHistory.html',
                controller: 'historyEditController'
            })
            // route for the about page
            .when('/historyNew/:serviceId', {
                templateUrl: 'pages/changeHistory.html',
                controller: 'historyNewController'
            })
            .when('/projectEdit/:projectId', {
                templateUrl: 'pages/project.html',
                controller: 'projectEditController'
            })
            // route for the about page
            .when('/projectNew', {
                templateUrl: 'pages/project.html',
                controller: 'projectNewController'
            })

            .when('/projectSearch', {
                templateUrl: 'pages/projectSearch.html',
                controller: 'searchProjectCtrl'
            })
            .when('/operationSearch', {
                templateUrl: 'pages/operationSearch.html',
                controller: 'searchOperationCtrl'
            })
            // route for the about page
            .when('/serviceEdit/:serviceId', {
                templateUrl: 'pages/service.html',
                controller: 'updateserviceController'
            })
            // route for the about page
            .when('/serviceNew', {
                templateUrl: 'pages/service.html',
                controller: 'serviceController'
            })
            .when('/applicationEdit/:applicationId', {
                templateUrl: 'pages/application.html',
                controller: 'editAppCtrl'
            })
            // route for the about page
            .when('/applicationNew', {
                templateUrl: 'pages/application.html',
                controller: 'newAppCtrl'
            })
            .when('/applicationSearch', {
                templateUrl: 'pages/applicationSearch.html',
                controller: 'searchAppCtrl'
            })
            .when('/operationNew/:serviceId', {
                templateUrl: 'pages/operation_page.html',
                controller: 'newOperationController'
            })
            .when('/operationRelation/:operationId/:relationship', {
                templateUrl: 'pages/link.html',
                controller: 'linkRelationCtrl'
            })
            .when('/wsdlParser', {
                templateUrl: 'pages/wsdlparser.html',
                controller: 'wsdlParserCtrl'
            })
            // route for the contact page
            .when('/operationEdit/:serviceId/:operationId', {
                templateUrl: 'pages/operation_page.html',
                controller: 'editOperationController'
            });
});




// create the controller and inject Angular's $scope
scotchApp.controller('logOutCtrl', function ($scope, $http, $rootScope, $window) {

    $window.sessionStorage["update"] = null;
    $rootScope.update = false;

});


// create the controller and inject Angular's $scope
scotchApp.controller('wsdlParserCtrl', function ($scope, $http, $rootScope, $window,$location) {

    
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




/*****************************************************/

// create the controller and inject Angular's $scope
scotchApp.controller('operationFieldsCtrl', function ($scope, $http, $rootScope, $window,$routeParams,OperationFieldsManager) {
      
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





/********************************************************/

// create the controller and inject Angular's $scope
scotchApp.controller('loginCtrl', function ($scope, $http, $rootScope, $window, $location) {

    $scope.tryLogin = function () {
        if ($scope.userpass == "relax") {
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
scotchApp.controller('searchServiceCtrl', function ($scope, $http, ServiceManager) {

    var callMe = function (data) {
        $scope.servicesws = data;
    };
     $scope.alerts = [];
  $scope.alerts.push({msg: 'Another alert!',type:'info',dismissOnTimeout:'true'});
    ServiceManager.refresh(callMe);



});
/*********************************************************/


// create the controller and inject Angular's $scope
scotchApp.controller('printServiceCtrl', function ($scope, $http, $routeParams, ServiceManager, OperationsManager,OperationFieldsManager,LogicManager) {

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

/******************************************************/

// create the controller and inject Angular's $scope
scotchApp.controller('searchAppCtrl', function ($scope, $http, $rootScope) {
    // create a message to display in our view

    $scope.applications = {};

    $scope.doSearch = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/anyQuery',
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
scotchApp.controller('searchOperationCtrl', function ($scope, $http, $rootScope) {
    // create a message to display in our view

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

// create the controller and inject Angular's $scope
scotchApp.controller('homeCtrl', function ($scope, $http, $rootScope) {
    // create a message to display in our view
    operationCount();
    serviceCount();
    applicationCount();
    projectCount();

    function projectCount() {
        $http.post('../RepoService/rest/data/anyQuery',
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


/******************************************************/

// create the controller and inject Angular's $scope
scotchApp.controller('searchProjectCtrl', function ($scope, $http, $rootScope) {
    // create a message to display in our view

    $scope.projects = {};

    $scope.doSearch = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'Select * from project where name like "' + $scope.searchValue + '"'}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.projects = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error:!' + data;
                });
    };



});

/******************************************************/

scotchApp.controller('projectNewController', function ($scope, $http, $location, $routeParams, $rootScope,$window) {




    $scope.edit = false;
    $scope.project = {};



    $scope.save = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/insert',
                {project: {
                        name: $scope.project.name,
                        description: $scope.project.description,
                        project_documentation: $scope.project.project_documentation
                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.project.id = data;
                    $location.path('/projectSearch/');
                    $rootScope.globalMessage = 'Project created!';
                    $window.alert('Project created!');
                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error creating Project!';
                      $window.alert('Error creating Project!');
                });
    };



});

/****************************************************/
scotchApp.controller('projectEditController', function ($scope, $http, $location, $routeParams, $rootScope,$window) {

    var projectId = $routeParams.projectId;

    $scope.edit = true;



    $http.post('../RepoService/rest/data/anyQuery',
            {q: "Select * from project where id=" + projectId}
    )
            .success(function (data, status, headers, config) {
                $scope.project = data[0];
                console.info(data);

            }).
            error(function (data, status, headers, config) {
                console.info(data);
            });



    $scope.update = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/update',
                {project: {
                        id: $scope.project.id,
                        name: $scope.project.name,
                        description: $scope.project.description,
                        project_documentation: $scope.project.project_documentation

                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    //$location.path('/serviceEdit/' + $scope.history.service_id);
                    $rootScope.globalMessage = 'project updated!';
                     $window.alert('Project updated!!');

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                     $window.alert('Error updating!');
                });
    };



    $scope.delete = function (id) {
        console.info("remove " + id);
        $http.post('../RepoService/rest/data/delete',
                {project: {
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
/****************************************************/
scotchApp.controller('historyEditController', function ($scope, $http, $location, $routeParams, $rootScope,$window) {

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



});

/******************************************************/

scotchApp.controller('historyNewController', function ($scope, $http, $location, $routeParams, $rootScope,$window) {

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




/******************************************************/

// create the controller and inject Angular's $scope
scotchApp.controller('newAppCtrl', function ($scope, $http, $location, $rootScope,$window) {
    // create a message to display in our view

    $scope.application = {};
    $scope.application.domain = "Billing";
    $scope.appDomain = function (type) {
        $scope.application.domain = type;
    };


    $scope.save = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/insert',
                {application: {
                        name: $scope.application.name,
                        description: $scope.application.description,
                        domain: $scope.application.domain
                    }}
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

/******************************************************/

// create the controller and inject Angular's $scope
scotchApp.controller('editAppCtrl', function ($scope, $http, $routeParams, $rootScope,$window) {
    // create a message to display in our view
    var appId = $routeParams.applicationId;
    $scope.edit = true;

    $http.post('../RepoService/rest/data/anyQuery',
            {q: "Select * from application where id=" + appId}
    )
            .success(function (data, status, headers, config) {
                $scope.application = data[0];
                console.info(data);

            }).
            error(function (data, status, headers, config) {
                console.info(data);
            });


    $scope.update = function () {
        // Simple POST request example (passing data) :
        $http.post('../RepoService/rest/data/update',
                {application: {
                        id: $scope.application.id,
                        domain: $scope.application.domain,
                        description: $scope.application.description

                    }}
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
    
    
        $scope.delete = function (id) {
        console.info("remove " + id);
        $http.post('../RepoService/rest/data/delete',
                {application: {
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


scotchApp.controller('newOperationController', function ($scope, $routeParams, $http, $location, $rootScope, $window,ServiceManager) {


    var serviceId = $routeParams.serviceId;
    $scope.operation = {};
    $scope.operation.mep_type = "Synch";
    $scope.edit = false;
    $scope.mepType = function (type) {
        $scope.operation.mep_type = type;

    };
    
      $scope.service =  ServiceManager.get(serviceId) ;
      


    function linkServiceToOperation(operaton_id, service_id) {

        $http.post('../RepoService/rest/data/insert',
                {service_operation: {
                        service_id: service_id,
                        operation_id: operaton_id
                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.operation.id = operaton_id;
                    $window.alert('Operation created');


                }).
                error(function (data, status, headers, config) {
                    console.info(data);
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
                        description: $scope.operation.description

                    }}
        )

                .success(function (data, status, headers, config) {
                    console.info(data);
                    linkServiceToOperation(data, serviceId);
                    $scope.operation.id = data;


                    if ($scope.operation.id != 0) {
                        $scope.edit = true;
                        //$location.path('/operationEdit/' + $scope.operation.id);
                        $rootScope.globalMessage = 'Operation created!';
                         $window.alert('Operation created!');
                    }


                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error creating Operation!';
                     $window.alert('Error creating Operation!');
                });
    };

});








/*********************************************************/

scotchApp.controller('ruleNewController', function ($scope, $routeParams, $http, $rootScope, $window, OperationsManager) {

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
                    scope.$apply();

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                    $rootScope.globalMessage = 'Error creating Logic!';
                    $window.alert('Error creating Logic!');
                });
    };

});





scotchApp.controller('ruleEditController', function ($scope, $location, $routeParams, $http, $rootScope, $window) {
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



/*********************************************************/

scotchApp.controller('serviceController', function ($scope, $routeParams, $http, $location, $rootScope, $window,ProjectManager) {


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


scotchApp.controller('updateserviceController', function ($scope, $location, $routeParams, $http, $rootScope, $window, OperationsManager,ProjectManager) {
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


/**********************************************/


scotchApp.controller('linkRelationCtrl', function ($scope, $routeParams, $http, $window, OperationsManager) {

    var operationId = $routeParams.operationId;
    var relation = $routeParams.relationship;
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

scotchApp.controller('editOperationController', function ($scope, $routeParams, $http, $location, $window, ServiceManager) {

    var operationId = $routeParams.operationId;
    $scope.edit = true;
    
    $scope.service = {};
    $scope.service =  ServiceManager.get($routeParams.serviceId) ;
    
    $scope.mepType = function (type) {
        $scope.operation.mep_type = type;

    };

    $scope.addRelation = function (type) {


        $location.path('/operationRelation/' + operationId + '/' + type);

        //$scope.application.domain = type;

    };

    getRulesList(operationId);
    getRelationshipList(operationId);

    $http.post('../RepoService/rest/data/anyQuery',
            {q: "Select * from operation where id=" + operationId}
    )
            .success(function (data, status, headers, config) {
                $scope.operation = data[0];
               
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



scotchApp.directive('backButton', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', goBack);

            function goBack() {
                history.back();
                scope.$apply();
                
            }
        }
    }
});








scotchApp.factory('sessionService', function ($rootScope) {


    function init() {
        if ($window.sessionStorage["update"]) {
            $rootScope.update = $window.sessionStorage["update"];
        }
    }

    init();

});


scotchApp.run(['$rootScope', '$location', '$http', '$window','$anchorScroll',
    function ($rootScope, $location, $http, $window,$anchorScroll) {
        $rootScope.globalMessage = '';
        $rootScope.update = false;
        
         
        function init() {
            if ($window.sessionStorage["update"]) {
                $rootScope.update = $window.sessionStorage["update"];
            }
        }

        init();

        $rootScope.closeAlert = function () {
            $rootScope.globalMessage = '';
        };


    }]);


scotchApp.service('ServiceManager', function ($http) {

    var serviceList = [];

    this.getList = function () {
        return serviceList;
    };
    this.setList = function (list) {
        serviceList = list;
    };



    this.get = function (id) {
        console.log("calling get:" + serviceList);
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

                    callBack(data);

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
         
       
    };
    this.refresh(this.setList);


});


/************************************************/

scotchApp.service('LogicManager', function ($http) {

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

/************************************************/

scotchApp.service('ProjectManager', function ($http) {

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

    this.refresh = function (callBack) {

        // Simple POST request example (passing data) :

        $http.post('../RepoService/rest/data/anyQuery',
                {q: "select * from project" }
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

scotchApp.service('RelationshipManager', function ($http) {

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
/************************************************/

scotchApp.service('OperationsManager', function ($http) {

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
                {q: "select operation.id as id,operation.name as name,operation.description as description from operation,service_operation where operation.id = service_operation.operation_id and service_operation.service_id=" + id}
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

scotchApp.service('OperationFieldsManager', function ($http) {

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


scotchApp.directive('fieldinfo', function() {
    var directive = {};

    directive.restrict = 'E';

    directive.templateUrl = "snip/fieldLister.html";
    directive.scope = {
        operation : "=operation"
    };
    directive.controller = function($scope,OperationFieldsManager){
        
        $scope.getRequestFields = function (id) {
            OperationFieldsManager.getListByType(id, "Request", function (list) {
                $scope.requestList = list;
            });

        };

        $scope.getResponseFields = function (id) {
            OperationFieldsManager.getListByType(id, "Response", function (list) {
                $scope.responseList = list;
            });
        };
        
        
    };

    return directive;
});


scotchApp.directive('ruleinfo', function() {
    var directive = {};

    directive.restrict = 'E';

    directive.templateUrl = "snip/logicList.html";
    directive.scope = {
        operation : "=operation"
    };
    directive.controller = function($scope,LogicManager){
        
        $scope.getRules = function(id){
        LogicManager.refresh(id,function(data){
            $scope.rules = data;
        });
    };
        
        
    };

    return directive;
});

scotchApp.directive('relationshipinfo', function() {
    var directive = {};

    directive.restrict = 'E';

    directive.templateUrl = "snip/relationList.html";
    directive.scope = {
        operation : "=operation"
    };
    directive.controller = function($scope,RelationshipManager){
        
        $scope.getRelationships = function(id){
        RelationshipManager.refresh(id,function(data){
            $scope.relationships = data;
        });
    };
        
        
    };

    return directive;
});



scotchApp.controller('AlertController', ['$scope', '$attrs', function ($scope, $attrs) {
  $scope.closeable = 'close' in $attrs;
  //this.close = $scope.close;
  this.closelert = function(i){
      console.info("not implemented");
  };
  
}]);

