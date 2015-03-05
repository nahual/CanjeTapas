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

        // Números negativos
        $scope.item.monto = Math.abs($scope.item.monto);
        $scope.item.tapitas = Math.abs($scope.item.tapitas);

        if ($scope.item.monto > 10000 || $scope.item.tapitas > 10000) {
            window.location = 'http://localhost:9999'
        }

        if ($scope.item.tapitas == 0) {
            $scope.message.success = "Puedes canjear 999999 productos";
            return;
        }

        if ($scope.item.monto < 100 || undefined == $scope.item.monto) {
            $scope.message.success = "No tienes dinero suficiente para canjear el pprorducto :(";
        }
        else if ($scope.item.tapitas < 10 || undefined == $scope.item.tapitas) {
            $scope.message.success = "No tienes dinero suficientes para canjear el producto :(";
        }
        // Dinero >> tapitas => tapitas determina cantidad de productos (sobra dinero)
        else if ($scope.item.monto / 10 >= $scope.item.tapitas) {

            var itemsTapitas = Math.floor($scope.item.tapitas / 10);
            var dineroSobra = Math.floor($scope.item.monto - ($scope.item.tapitas * 10));
            var msgSobra = '';

            if (dineroSobra > 0) {
                msgSobra = " y te sobran $" + dineroSobra;
            }

            $scope.message.success = "Puedes canjear " + itemsTapitas + " productos" + msgSobra;
        }
        // Tapitas >> dinero (sobran tapitas)
        else{

            var itemsMonto = Math.floor($scope.item.monto / 100);
            var tapitasSobra = Math.floor($scope.item.tapitas - (itemsMonto * 10));
            var msgSobra = '';

            if (tapitasSobra > 0) {
                msgSobra = " y te sobran " + tapitasSobra + " tapitas";
            }

            $scope.message.success = "Puedes canjear " + itemsMonto + " productos" + msgSobra;
        }

        $scope.message.error = null;

    };

    $scope.cancelForm = function () {
        //TODO change for real function or let it be :)
        $scope.message.success = null;
        $scope.message.error = "Ha ocurrido un error inesperado";
    };
}]);
