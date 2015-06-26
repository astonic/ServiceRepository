/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var directiveModule = angular.module('directiveModule', ['ngRoute']);

directiveModule.directive('backButton', function () {
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







directiveModule.directive('fieldinfo', function() {
    var directive = {};

    directive.restrict = 'E';

    directive.templateUrl = "app/common/partials/fieldLister.html";
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


directiveModule.directive('ruleinfo', function() {
    var directive = {};

    directive.restrict = 'E';

    directive.templateUrl = "app/common/partials/logicList.html";
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

directiveModule.directive('relationshipinfo', function() {
    var directive = {};

    directive.restrict = 'E';

    directive.templateUrl = "app/common/partials/relationList.html";
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

