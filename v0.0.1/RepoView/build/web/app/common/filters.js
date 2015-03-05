/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('customFilters', []).filter('typeToLink', function() {
  return function(input) {
      
      if (input == "Service"){
          return "serviceEdit";
      }else if (input == "Application"){
          return "applicationEdit";
      }else if(input == "Operation"){
          return "operationEdit/0";
      }else{
          return input;
      }
     
  };
});