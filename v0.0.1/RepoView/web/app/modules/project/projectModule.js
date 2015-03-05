/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var projectModule = angular.module('projectModule', ['ngRoute']);


// create the controller and inject Angular's $scope
projectModule.controller('searchProjectCtrl', function ($scope, $http, $rootScope) {
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


projectModule.controller('projectNewCtrl', function ($scope, $http, $location, $routeParams, $rootScope,$window) {




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
projectModule.controller('projectEditCtrl', function ($scope, $http, $location, $routeParams, $rootScope,$window) {

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


/************************************************/

projectModule.service('ProjectManager', function ($http) {

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