angular.module('new-object', [ 'ui.bootstrap' ]).controller('new-object',
		function($http, $scope, $uibModal) {
			var self = this;
			$http.get('/user/').then(function(response) {
				self.user = response.data.name;
			});
			
			$http.get('/cities').then(function(response) {
				$scope.cities = response.data;
			});
			
			$scope.isApt=true;
			// change hardcoded values
			$scope.realty={address:{streetInCity:{id:2,city:{id:4}}}};
			
			this.addRealtyObject = function(){
				$http.post('/realty-object/add', $scope.realty).then(function(response) {
					console.log('success'+response);
				}, function() {
					console.log('failure'+response);
				});
			};
			
			$scope.addCity = function() {
				$uibModal.open({
					templateUrl : 'js/city/add-city-dialog.html',
					controller : 'add-city'
				});
			};
			
			$scope.cityURL = '/city/find';

			$scope.streetURL = '/street/find';

			$scope.citiesToSelect = {};

			$scope.cityIdElementId = 'cityId';
			$scope.streetIdElementId = 'streetId';
			$scope.streetParametersElementsIds = [ $scope.cityIdElementId ];
			$scope.cityParametersElementsIds = [];
		});