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
    $scope.message = {};

    $scope.sendForm = function () {
        //TODO change for real function

        $scope.message.error = null;
        $scope.message.success = "Tienes " + $scope.item.monto + " $ y " + $scope.item.tapitas + " tapitas";
    };

    $scope.cancelForm = function () {
        //TODO change for real function or let it be :)
        $scope.message.success = null;
        $scope.message.error = "Ha ocurrido un error inesperado";
    };
}]);