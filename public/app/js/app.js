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

        if (!isNumeric($scope.item.envases)){
            $scope.message.error = "La cantidad de envases no es un número";
            return
        }

        var canje_envases = Math.min(Math.floor($scope.item.monto / 150), Math.floor($scope.item.envases / 5));
        var dinero_sobrante = $scope.item.monto - canje_envases * 150;
        var canjes_tapas = Math.min(Math.floor(dinero_sobrante / 100), Math.floor($scope.item.tapitas / 10));
        var max_actual = [canjes_tapas, canje_envases];

        var vuelto_dinero = $scope.item.monto - max_actual[0] * 100 - max_actual[1] * 150;
        var vuelto_tapas = $scope.item.envases - max_actual[1] * 5;
        var vuelto_envases = $scope.item.tapitas - max_actual[0] * 10;

        var vuelto = [];
        if (vuelto_dinero > 0) {
            vuelto.push('$' + vuelto_dinero)
        }
        if (vuelto_tapas > 0) {
            vuelto.push(vuelto_tapas + ' tapa' + (vuelto_tapas > 1 ? 's' : ''))
        }
        if (vuelto_envases > 0) {
            vuelto.push(vuelto_envases + ' envase' + (vuelto_envases > 1 ? 's' : ''))
        }

        var vuelto_mensaje = '';
        if (vuelto.length == 0) {
            vuelto_mensaje = ''
        } else if (vuelto.length == 1) {
            vuelto_mensaje = ', te sobran ' + vuelto[0]
        } else {
            vuelto_mensaje = ', te sobran ' + vuelto.slice(0, vuelto.length - 1).join(', ') + ' y ' + vuelto[vuelto.length - 1];
        }
        $scope.message.success = 'Puedes canjear ' + (max_actual[0] + max_actual[1]) + ' productos (' + max_actual[0] +' canjes con tapas y ' + max_actual[1] +' canjes con envases)' + vuelto_mensaje;
        $scope.message.error = null;

    };

    $scope.cancelForm = function () {
        $scope.message.error = "Ha ocurrido un error inesperado";
        $scope.message.success = null;
    };
}]);
