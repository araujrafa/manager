"USE STRICT";
app.controller("pedidoController", function($scope, $location, dbService){
	//Listando
	$scope.listaPedidos = function(){
		dbService.runAsync("SELECT * from pedidos inner join clientes on pedidos.idCLiente = clientes.id ORDER BY pedidos.codigo DESC", function(data){
			
			$scope.pedidos = data;
		});
	}

	$scope.listaProdutos = function(){
		dbService.runAsync("SELECT * from produtos", function(data){
			$scope.produtos = data;
		});
	}

	$scope.buscarCliente = function() {
		dbService.runAsync("SELECT * from clientes where telefone = '?'", [$scope.clientes.telefone], function(data){
			if (data[0]) {
				$scope.clientes = data[0];
			}
		});
	}

	//Salvando
	$scope.salvar = function() {
		var data = new Date();
		var dia     = data.getDate();           // 1-31
		var mes     = data.getMonth() + 1;          // 0-11 (zero=janeiro)
		var ano4    = data.getFullYear();       // 4 dígitos
		$scope.pedido.idCliente = $scope.clientes.id;
	
		if (!$scope.clientes.id) {
			dbService.insert('clientes', $scope.clientes); // insert pedidos
			
			dbService.runAsync("select * from clientes ORDER BY id DESC limit 1", function(data){
				$scope.pedido.idCliente = data[0].id;
			});
		} else {
			var id = $scope.clientes.id;
			delete $scope.clientes.id;
			delete $scope.clientes.$$hashKey;
			dbService.update('clientes', $scope.clientes, {id: id}); // update pedidos
		}

		if ($scope.pedido.codigo) {
			var codigo = $scope.pedido.codigo;
			delete $scope.pedido.codigo;
			delete $scope.pedido.$$hashKey;
			dbService.update('pedidos', $scope.pedido, {codigo: codigo}); //entidade, dados, where
		} else  {
			$scope.pedido.data = dia + "/" + mes + "/" + ano4;
			$scope.pedido.status = "Em entrega";
			dbService.insert('pedidos', $scope.pedido); // insert pedidos
		}

		$scope.pedido = {};
		$scope.clientes = {};
		$scope.listaPedidos();
		$('#modalPedido').modal('hide');
	}

	$scope.editar = function(dados){
		$scope.pedido = {
			valor: dados.valor,
			produto: dados.produto,
			obs: dados.obs,
			formaPagamento: dados.formaPagamento,
			status: dados.status,
			data: dados.data,
			quantidade: dados.quantidade,
			codigo: dados.codigo
		};
		$scope.clientes = {
			nome: dados.nome,
			endereco: dados.endereco,
			telefone: dados.telefone,
			id: dados.id
		}
		$('#modalPedido').modal('show');
	}
});