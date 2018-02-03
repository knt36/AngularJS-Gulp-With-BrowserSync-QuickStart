angular.module('myApp').
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/main',{
        templateUrl: '/view/main/main.html',
        controller:'MainController'
    })
    .otherwise({redirectTo: '/main'});
}]);
