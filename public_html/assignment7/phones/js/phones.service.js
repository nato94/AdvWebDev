(function() {
  'use strict';
  
  angular
    .module('app')
    .factory('PhonesService', PhonesService);
  
  PhonesService.$inject = ['$http', 'REQUEST'];
  
  function PhonesService($http, REQUEST) {
    var url = REQUEST.Phones;
    var service = {
      'getPhones': getPhones,
      'getPhone': getPhone
    };
    
    return service;
    
    // Get all the stuff from the json file REQUEST refers to.
    function getPhones() {
      // Return promise from $http.get
      return $http.get(url).then(getPhonesComplete, getPhonesFailed);

      // Either return the data, or return empty array.
      function getPhonesComplete(response) {
        return response.data;
      }

      function getPhonesFailed(error) {
        return [];
      }
    }
    
    // Get a specific phone by id.
    function getPhone(id) {
      
      // Return result of promise.
      return getPhones().then(function(data) {
        return findPhoneComplete(data);
      });
      
      function findPhoneComplete(data) {
        var results = {};
        
        // Loop through data, and set results to that value if it is found.
        angular.forEach(data, function(val, key) {
          if(!results.length)
            if(val.hasOwnProperty('id') && val.id === id)
              results = angular.copy(val);
        }, results);
        
        // Return last result found from the foreach loop
        return results;
      }
    }
  }
})();

