/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var repo = angular.module('repo', ['ngRoute','customFilters','googlechart','reportModule','homeModule','serviceModule','operationModule','applicationRepoModule','projectModule','relationshipModule','ruleModule','directiveModule','historyModule','ui.bootstrap']);

// configure our routes
repo.config(function ($routeProvider) {
    $routeProvider

            // route for the home page
            .when('/', {
                templateUrl: 'app/modules/landing/home.html',
                controller: 'homeCtrl'
            })

            .when('/operationFields/:operationId', {
                templateUrl: 'app/modules/operation/operationFields.html',
                controller: 'operationFieldsCtrl'
            })

            .when('/servicePrint/:serviceId', {
                templateUrl: 'app/modules/service/printView.html',
                controller: 'printServiceCtrl'
            })
            .when('/searchService', {
                templateUrl: 'app/modules/service/searchService.html',
                controller: 'searchServiceCtrl'
            })
              .when('/serviceEdit/:serviceId', {
                templateUrl: 'app/modules/service/service.html',
                controller: 'updateServiceCtrl'
            })
            
            .when('/login', {
                templateUrl: 'app/modules/landing/login.html',
                controller: 'loginCtrl'
            })
            .when('/logOut', {
                templateUrl: 'app/modules/landing/login.html',
                controller: 'logOutCtrl'
            })
            .when('/ruleEdit/:ruleId', {
                templateUrl: 'app/modules/rules/rules.html',
                controller: 'ruleEditCtrl'
            })
            // route for the about page
            .when('/ruleNew/:serviceId/:operationId', {
                templateUrl: 'app/modules/rules/rules.html',
                controller: 'ruleNewCtrl'
            })
            .when('/historyEdit/:historyId', {
                templateUrl: 'app/modules/history/changeHistory.html',
                controller: 'historyEditCtrl'
            })
            // route for the about page
            .when('/historyNew/:serviceId', {
                templateUrl: 'app/modules/history/changeHistory.html',
                controller: 'historyNewCtrl'
            })
            .when('/projectEdit/:projectId', {
                templateUrl: 'app/modules/project/project.html',
                controller: 'projectEditCtrl'
            })
            // route for the about page
            .when('/projectNew', {
                templateUrl: 'app/modules/project/project.html',
                controller: 'projectNewCtrl'
            })

            .when('/projectSearch', {
                templateUrl: 'app/modules/project/projectSearch.html',
                controller: 'searchProjectCtrl'
            })
            .when('/operationSearch', {
                templateUrl: 'app/modules/operation/operationSearch.html',
                controller: 'searchOperationCtrl'
            })
            // route for the about page
          
            // route for the about page
            .when('/serviceNew', {
                templateUrl: 'app/modules/service/service.html',
                controller: 'serviceCtrl'
            })
            .when('/applicationEdit/:applicationId', {
                templateUrl: 'app/modules/application/application.html',
                controller: 'editAppCtrl'
            })
            // route for the about page
            .when('/applicationNew', {
                templateUrl: 'app/modules/application/application.html',
                controller: 'newAppCtrl'
            })
            .when('/applicationSearch', {
                templateUrl: 'app/modules/application/applicationSearch.html',
                controller: 'searchAppCtrl'
            })
            .when('/operationNew/:serviceId', {
                templateUrl: 'app/modules/operation/operation.html',
                controller: 'newOperationCtrl'
            })
            .when('/operationRelation/:serviceId/:operationId/:relationship', {
                templateUrl: 'app/modules/relationship/link.html',
                controller: 'linkRelationCtrl'
            })
            .when('/wsdlParser', {
                templateUrl: 'app/modules/service/wsdlparser.html',
                controller: 'wsdlParserCtrl'
            })
            // route for the contact page
            .when('/operationEdit/:serviceId/:operationId', {
                templateUrl: 'app/modules/operation/operation.html',
                controller: 'editOperationCtrl'
            })
           
            .when('/report', {
                templateUrl: 'app/modules/report/report.html',
                controller: 'reportCtrl'
            });
});


repo.factory('sessionService', function ($rootScope) {


    function init() {
        if ($window.sessionStorage["update"]) {
            $rootScope.update = $window.sessionStorage["update"];
        }
    }

    init();

});

repo.run(['$rootScope', '$location', '$http', '$window','$anchorScroll',
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
        
         $rootScope.$on('$locationChangeSuccess', function () {
        console.log('$locationChangeSuccess changed!', new Date());
    });


    }]);