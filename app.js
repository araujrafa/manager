var app = angular.module('cdg', [require('angular-route'),'angularUtils.directives.dirPagination']);

app.config(function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : "views/pedidos.html",
		controller : "pedidoController",
        access: { requiredLogin: false }
	}).when("/clientes", {
		templateUrl : "views/cliente.html",
		controller : "clienteController",
        access: { requiredLogin: false }
	})
});