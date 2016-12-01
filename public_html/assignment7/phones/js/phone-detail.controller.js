(function() {
     
    'use strict';
    angular
        .module('app')
        .controller('PhoneDetailController', PhoneDetailController);
    
    PhoneDetailController.$inject = ['$routeParams', 'PhonesService'];
    
    function PhoneDetailController($routeParams, PhonesService) {
        var vm = this;
        
        vm.phone = {};
        var id = $routeParams.phoneId;
        
        console.log("ID: ");
        console.log(id);
       
        
        activate();
        
        function activate() {
            PhonesService.getPhone(id).then(function(res) {
                vm.phone = res;
                console.log(res);
            });
        }
    }
})();

