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

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

app.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.item = {};
    $scope.message = {};

    $scope.sendForm = function () {
        $scope.message.success = null;
        $scope.message.error = null;

        var sobran = [];

        if (!isNumeric($scope.item.tapitas)){
            $scope.message.error = "La cantidad de tapas no es un número";
            return
        }

        if (!isNumeric($scope.item.monto)){
            $scope.message.error = "El monto no es un número";
            return
        }

        if ($scope.item.monto < 100 || undefined == $scope.item.monto) {
            $scope.message.success = "No tienes dinero suficiente para canjear el producto :(";
        }
        else if ($scope.item.tapitas < 10 || undefined == $scope.item.tapitas) {
            $scope.message.success = "No tienes tapitas suficientes para canjear el producto :(";
        }
        else if ($scope.item.monto > 10000) {
            $scope.message.success = "Con tanta plata, mejor usala para otra cosa... no canjeamos más de $10.000";
        }
        else if ($scope.item.tapitas > 10000) {
            $scope.message.success = "No se aceptan canjes con más de 10.000 tapitas";
        }
        // Dinero >> tapitas => tapitas determina cantidad de productos (sobra dinero)
        else if ($scope.item.monto / 10 >= $scope.item.tapitas) {

            var itemsTapitas = Math.floor($scope.item.tapitas / 10);
            var dineroSobra = Math.floor($scope.item.monto - (itemsTapitas * 100));
            var tapitasSobra = $scope.item.tapitas - itemsTapitas * 10;
            var msgSobra = '';

            if (dineroSobra > 0) {
                msgSobra = ", te sobran $" + dineroSobra;
                if (tapitasSobra > 0) {
                    msgSobra += " y";
                }
            }
            if (tapitasSobra > 0) {
                msgSobra += " te sobran " + tapitasSobra + " tapitas";
            }

            $scope.message.success = "Puedes canjear " + itemsTapitas + " productos" + msgSobra;
        }
        // Tapitas >> dinero (sobran tapitas)
        else{

            var itemsMonto = Math.floor($scope.item.monto / 100);
            var tapitasSobra = Math.floor($scope.item.tapitas - (itemsMonto * 10));
            var dineroSobra = $scope.item.monto - itemsMonto * 100;
            var msgSobra = '';

            if (dineroSobra > 0) {
                msgSobra = ", te sobran $" + dineroSobra;
                if (tapitasSobra > 0) {
                    msgSobra += " y";
                }
            }
            if (tapitasSobra > 0) {
                msgSobra += " te sobran " + tapitasSobra + " tapitas";
            }

            $scope.message.success = "Puedes canjear " + itemsMonto + " productos" + msgSobra;
        }

        $scope.message.error = null;

    };

    $scope.cancelForm = function () {
        $scope.item.monto = '';
        $scope.item.tapitas = '';
        $scope.message.error = null;
        $scope.message.success = null;
    };
}]);
