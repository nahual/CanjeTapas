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

        if ($scope.item.monto < 100 || undefined == $scope.item.monto) {
            $scope.message.success = "No tienes dinero suficiente para canjear el producto :(";
        }
        else if ($scope.item.tapitas < 10 || undefined == $scope.item.tapitas) {
            $scope.message.success = "No tienes tapitas suficientes para canjear el producto :(";
        }
        // Dinero >> tapitas => tapitas determina cantidad de productos.
        else if ($scope.item.monto / 10 >= $scope.item.tapitas) {
            var itemsTapitas = Math.floor($scope.item.tapitas / 10);
            $scope.message.success = "Puedes canjear " + itemsTapitas + " productos!";
        }
        // Tapitas >> dinero
        else{
            var itemsMonto = Math.floor($scope.item.monto / 100);
            $scope.message.success = "Puedes canjear " + itemsMonto + " productos!";
        }

        $scope.message.error = null;

    };

    $scope.cancelForm = function () {
        //TODO change for real function or let it be :)
        $scope.message.success = null;
        $scope.message.error = "Ha ocurrido un error inesperado";
    };
}]);
