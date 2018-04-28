"USE STRICT";
app.controller("clienteController", function($scope, $location, dbService){
	//Listando
	$scope.listaClientes = function(){
		dbService.runAsync("SELECT * FROM clientes", function(data){
			$scope.clientes = data;
		});
	}

	// //Salvando
	// $scope.salvar = function(){
	// 	if($scope.cliente.id){
	// 		//Editar
	// 		var id = $scope.cliente.id;
	// 		delete $scope.cliente.id;
	// 		delete $scope.cliente.$$hashKey; //Apaga elemento $$hashKey do objeto
	// 		dbService.update('pessoas', $scope.pessoa, {id: id}); //entidade, dados, where
	// 	}else{
	// 		//nova
	// 		dbService.insert('pessoas', $scope.cliente); // entidade, dados
	// 	}
	// 	$scope.pessoa = {};
	// 	$scope.listaPessoas();
	// 	$('#modalPessoa').modal('hide');
	// }

	// //Abrindo para editar
	// $scope.editar = function(dados){
	// 	$scope.pessoa = dados;
	// 	$('#modalPessoa').modal('show');
	// }

	// //Excluindo
	// $scope.excluir = function(dados){
	// 	if(confirm("Deseja realmente apagar o cadastro de "+dados.nome+"?")){
	// 		dbService.update('pessoas', {ativo:0}, {id: dados.id});
	// 		$scope.listaPessoas();
	// 	}
	// }
});