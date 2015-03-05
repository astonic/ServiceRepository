/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var reportModule = angular.module('reportModule', ['ngRoute']);

/********************************************************/

// create the controller and inject Angular's $scope
// create the controller and inject Angular's $scope
reportModule.controller('reportCtrl', function ($scope, $http, $rootScope) {
    // create a message to display in our view
    
  

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
     
      $scope.top10Reused = {};
      $scope.top10Reused.lables = [];
      $scope.top10Reused.data = [];
    
     
     
     
    var top10Reused = {};
    top10Reused.type = "PieChart";
    top10Reused.data = [
       ['Component', 'count']
      
      ];
    //  chart1.data.push(['Services',20000]);
    top10Reused.options = {
        displayExactValues: true,
        legend:null,
        //width: 100%,
        //height: 100,
        is3D: false,
        chartArea: {center:10,top:10,bottom:0,height:"900%",width:"100%"}
    };
    
    
    
      var top10Providers = {};
    top10Providers.type = "ColumnChart";
    top10Providers.data = [
       ['Component', 'count']
      
      ];
    //  chart1.data.push(['Services',20000]);
    top10Providers.options = {
        displayExactValues: true,
        legend:null,
        //width: 100%,
        //height: 100,
        is3D: false,
        chartArea: {center:10,top:10,bottom:0,height:"900%",width:"100%"}
    };


   
    
      var servicesPerProject = {};
    servicesPerProject.type = "Table";
    servicesPerProject.data = [
       ['Project', 'Service Count']
      
      ];
    //  chart1.data.push(['Services',20000]);
    servicesPerProject.options = {
        displayExactValues: true,
        legend:null,
        width: 350,
        //height: 100,
        is3D: false,
        chartArea: {center:10,top:10,bottom:0,height:"90%",width:"100%"}
    };
    
    
    var topInterfaceByFunctionCount = {};
    topInterfaceByFunctionCount.type = "ColumnChart";
    topInterfaceByFunctionCount.data = [
       ['Project', 'Service Count']
      
      ];
    //  chart1.data.push(['Services',20000]);
    topInterfaceByFunctionCount.options = {
        displayExactValues: true,
        legend:null,
        width: 350,
        //height: 100,
        is3D: false,
        chartArea: {center:10,top:10,bottom:0,height:"90%",width:"100%"}
    };
   

    //$scope.aa=1*$scope.chart.data[1][1];
    //$scope.bb=1*$scope.chart.data[2][1];
   // $scope.cc=1*$scope.chart.data[3][1];
   
        
        
    
     
    $scope.refreshData = function () {
        
        topInterfaceByFunctionCount.data = [
       ['Project', 'Service Count']
      
      ];
         top10Reused.data = [
       ['Component', 'count']
      
      ];
        
        
         servicesPerProject.data = [
       ['Project', 'Service Count']
      
      ];
      
       top10Providers.data = [
       ['Component', 'count']
      
      ];
     
      //$scope.$emit('LOAD');  
        top10ReusedFunction();
        top10ProvidersFunction();
        servicesPerProjectFunction();
        topInterfaceByFunctionCountFunction();

        operationCount();
        serviceCount();
        applicationCount();
        projectCount();
      
       
    };
     
     
     
      function topInterfaceByFunctionCountFunction() {
        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'SELECT s.name,count(*) total FROM repo.service s, service_operation so where s.id = so.service_id'
                        +' group by s.id'
                        +' order by total desc limit 10;'
                })

                .success(function (data, status, headers, config) {
                    console.info(data);
           // chart1.data = data;
                    //$scope.top10Reused = data;
                    for (var i = 0; i < data.length; i++) {
                      // console.info(data[i].total);
                       topInterfaceByFunctionCount.data.push([data[i].name,data[i].total]);
                     
                              // $scope.top10Reused.lables.push( data[i].name) ;
                               //$scope.top10Reused.data.push( parseInt(data[i].total)) ;
                    }
                    console.info('chart1.data');
                     console.info(topInterfaceByFunctionCount.data);
                       $scope.chart4 = topInterfaceByFunctionCount;

                }).
                error(function (data, status, headers, config) {
                    console.info( $scope.dataSet);
                });
    }
     
     
      function top10ReusedFunction() {
        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'Select o.name as name,count(*) total from operation o, relationship r where o.id = r.operation_id' +
                        ' and relationship_type = "Consumed by" ' +
                        ' group by o.id ' +
                        ' order by total desc limit 10;'
                })

                .success(function (data, status, headers, config) {
                    console.info(data);
           // chart1.data = data;
                    //$scope.top10Reused = data;
                    for (var i = 0; i < data.length; i++) {
                      // console.info(data[i].total);
                       top10Reused.data.push([data[i].name,data[i].total]);
                     
                              // $scope.top10Reused.lables.push( data[i].name) ;
                               //$scope.top10Reused.data.push( parseInt(data[i].total)) ;
                    }
                    console.info('chart1.data');
                     console.info(top10Reused.data);
                       $scope.chart = top10Reused;

                }).
                error(function (data, status, headers, config) {
                    console.info( $scope.dataSet);
                });
    }



 function top10ProvidersFunction() {
        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'Select r.component_name as name,count(*) total from operation o, relationship r where o.id = r.operation_id'
                        + ' and relationship_type = "Provided by" '
                        + ' group by r.component_name'
                        + ' order by total desc limit 10;'
                })

                .success(function (data, status, headers, config) {
                    console.info(data);
           // chart1.data = data;
                    //$scope.top10Reused = data;
                    for (var i = 0; i < data.length; i++) {
                      // console.info(data[i].total);
                       top10Providers.data.push([data[i].name,data[i].total]);
                     
                              // $scope.top10Reused.lables.push( data[i].name) ;
                               //$scope.top10Reused.data.push( parseInt(data[i].total)) ;
                    }
                    console.info('chart1.data');
                     console.info(top10Providers.data);
                       $scope.chart1 = top10Providers;

                }).
                error(function (data, status, headers, config) {
                    console.info( $scope.dataSet);
                });
    }





function servicesPerProjectFunction() {
        $http.post('../RepoService/rest/data/anyQuery',
                {q: 'select p.name as name,count(*) total from service s, project p where p.id = s.project_id '
                    + ' group by p.id limit 10; '
                })

                .success(function (data, status, headers, config) {
                    console.info(data);
           // chart1.data = data;
                    //$scope.top10Reused = data;
                    for (var i = 0; i < data.length; i++) {
                      // console.info(data[i].total);
                       servicesPerProject.data.push([data[i].name,data[i].total]);
                     
                              // $scope.top10Reused.lables.push( data[i].name) ;
                               //$scope.top10Reused.data.push( parseInt(data[i].total)) ;
                    }
                    console.info('chart1.data');
                     console.info(servicesPerProject.data);
                       $scope.chart3 = servicesPerProject;

                }).
                error(function (data, status, headers, config) {
                    console.info( $scope.dataSet);
                });
    }
    
     


});