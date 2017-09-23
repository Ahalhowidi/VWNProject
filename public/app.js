(function() {
    
    var app = angular.module('app', ['ngRoute', 'angular-jwt']);

   
    app.config(function($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
       
        $routeProvider.when('/main', {
            templateUrl: 'main.html',
            controller: 'mainController',
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        $routeProvider.when('/vwnorg', {
            templateUrl: 'vwmorg.html',
            controller: 'VwnOrgController',
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
       
        $routeProvider.otherwise('/main')

    })


    app.controller('VwnOrgController', VwnOrgController);

    function VwnOrgController($http, $window, $location) {
        var vm = this;
        vm.title = "VwnOrgController";



    }

    app.controller('mainController', mainController);

    function mainController($http, $window, $location) {
        var vm = this;
        vm.title = "mainController";

        vm.getAlltags = function() {
            $http.get('/api/allTags').then(function(response) {
                vm.allTags = response.data;

            });
        };
        vm.getAlltags();

        vm.getByTags = function() {
           // vm.checkboxModel2 = vm.checkboxModel2.filter(Boolean)

                console.log("tag");
                console.log( vm.checkboxModel2);


            if (vm.checkboxModel2 == 0){
                console.log('empty')
                console.log(vm.allTags)
                vm.checkboxModel2[1] = 1
            }

            $http.get('/api/getByTags/:tags' + vm.checkboxModel2).then(function(response) {
                vm.matchedOrg = response.data;
                console.log(vm.matchedOrg)
                vm.checkboxModel2 = [];

            });

        };

        vm.getPrByTags = function() {
           // vm.checkboxModel2 = vm.checkboxModel2.filter(Boolean)

                console.log("tag");
                console.log( vm.checkboxModel2);


            if (vm.checkboxModel2 == 0){
                console.log('empty')
                console.log(vm.allTags)
                vm.checkboxModel2[1] = 1
            }

            $http.get('/api/getPrByTags/:tags' + vm.checkboxModel2).then(function(response) {
                vm.matchedOrg = response.data;
                console.log(vm.matchedOrg)
                vm.checkboxModel2 = [];

            });

        };

        vm.checkboxModel = {
            val: {}
        };
        vm.checkboxModel2 = [];
    }

    }());