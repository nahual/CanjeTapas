var app = angular.module('myApp', [
    'ngRoute'
]);


app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);


app.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.item = {};

    $scope.sendForm = function () {
        //TODO change for real function
        alert('monto=' + $scope.item.monto + " tapitas=" + $scope.item.tapitas);
    };

    $scope.cancelForm = function () {
        //TODO change for real function
        alert("btn cancel");
    };
}]);