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
       $http.get('../api/project/count')
                       .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.projectTotal = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }


    function operationCount() {
        $http.get('../api/operation/count')

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.operationTotal = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }

    function serviceCount() {
        $http.get('../api/service/count')

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.serviceTotal = data;

                }).
                error(function (data, status, headers, config) {
                    console.info(data);
                });
    }

    function applicationCount() {
        $http.get('../api/application/count')

                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.applicationTotal = data;

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
        $http.get('../api/namedValuePair/topInterfaceByFunctionCount')

                .success(function (data, status, headers, config) {
                    console.info(data);
           // chart1.data = data;
                    //$scope.top10Reused = data;
                    for (var i = 0; i < data.length; i++) {
                      // console.info(data[i].total);
                       topInterfaceByFunctionCount.data.push([data[i][0],data[i][1]]);
                     
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
        $http.get('../api/namedValuePair/top10ReusedFunction')

                .success(function (data, status, headers, config) {
                    console.info(data);
                 
                  //$scope.top10Reused = data;
                    for (var i = 0; i < data.length; i++) {
                       console.info('test:'+data[i][1]);
                       
                       if (data[i].total != 'undefined'){
                       top10Reused.data.push([data[i][0],data[i][1]]);
                       }
                              // $scope.top10Reused.lables.push( data[i].name) ;
                               //$scope.top10Reused.data.push( parseInt(data[i].total)) ;
                    }
                    //console.info('chart1.data');
                     //console.info(top10Reused.data);
                       $scope.chart = top10Reused;

                }).
                error(function (data, status, headers, config) {
                    console.info( $scope.dataSet);
                });
    }



 function top10ProvidersFunction() {
        $http.get('../api/namedValuePair/top10ProvidersFunction')

                .success(function (data, status, headers, config) {
                    console.info(data[0]);
            
           // chart1.data = data;
                    //$scope.top10Reused = data;
                    for (var i = 0; i < data.length; i++) {
                      // console.info(data[i].total);
                       top10Providers.data.push([data[i][0],data[i][1]]);
                     
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
        $http.get('../api/namedValuePair/servicesPerProjectFunction')

                .success(function (data, status, headers, config) {
                    console.info(data);
           // chart1.data = data;
                    //$scope.top10Reused = data;
                    for (var i = 0; i < data.length; i++) {
                      // console.info(data[i].total);
                       servicesPerProject.data.push([data[i][0],data[i][1]]);
                     
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