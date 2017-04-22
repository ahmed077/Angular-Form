/**
 * Created by Ahmed- on 3/21/2017.
 */
app.controller('loginController',
    ['$scope', 'Authentication',
        function($scope,Authentication) {
    $scope.message = 'Welcome to Login Page';
    $scope.form=true;
    $scope.login = function () {
        Authentication.login($scope.user);
    };
}]);
app.controller('registerController',
    ['$scope', 'Authentication',
        function($scope,Authentication) {
    $scope.message = 'Welcome to Register Page';
    $scope.result='';
    $scope.register = function () {
        Authentication.register($scope.user);
    };
}]);
app.controller('logoutController', ['Authentication','$location', function(Authentication,$location) {
    Authentication.logout();
}]);

app.controller('successController',['$scope', function($scope) {
    $scope.message = 'Welcome to Success Page';
}]);
app.controller('homeController',['$scope', function($scope) {
    $scope.message = 'Welcome to Home Page';
}]);