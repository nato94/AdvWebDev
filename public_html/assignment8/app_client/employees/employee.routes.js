 (function() {

    'use strict'; 
    angular
        .module('app.employee')
        .config(config);
  
    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
      $routeProvider.
          when('/', {
              templateUrl: '/employees/employee-home.view.html',
              controller: 'EmployeeHomeController',
              controllerAs: 'vm'
          }).
          when('/add', {
              templateUrl: '/employees/employee-form.view.html',
              controller: 'EmployeeCreateController',
              controllerAs: 'vm'
          }).
          when('/update/:id', {
              templateUrl: '/employees/employee-form.view.html',
              controller: 'EmployeeUpdateController',
              controllerAs: 'vm'
          }).
          otherwise({
            redirectTo: '/'
          });
    }

})();