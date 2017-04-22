/**
 * Created by Ahmed- on 3/21/2017.
 */
var app = angular.module('myApp', ['ngRoute', 'firebase']);
app.run(['$rootScope','$location', function($rootScope,$location) {
    $rootScope.$on('$routeChangeError', function (event,next,previus,error) {
        if (error == 'AUTH_REQUIRED') {
            $rootScope.result = 'You Must Login first';
            $location.path('/login');
        }
    });
}]);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/login', {
            templateUrl: 'parts/login.html',
            controller: 'loginController'
    }).
        when('/register', {
            templateUrl: 'parts/register.html',
            controller: 'registerController'
    }).
        when('/success', {
            templateUrl: 'parts/success.html',
            controller: 'successController',
            resolve: {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                }
            }
    }).
        when('/logout', {
            templateUrl: 'parts/logout.html',
            controller: 'logoutController'
    }).
        when('/', {
            templateUrl: 'parts/home.html',
            controller: 'homeController'
    }).
        otherwise({
            redirectTo: '/'
    });
}]);

// Initialize Firebase

