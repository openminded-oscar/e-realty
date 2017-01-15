var app = angular
		.module('hello', [ 'ngRoute', 'auth', 'new-object', 'objects-search', 'navigation', 'add-city', 'object-details' ])
		.config(
				function($routeProvider, $httpProvider, $locationProvider) {
					$locationProvider.html5Mode(true);

					$routeProvider.when('/', {
						templateUrl : 'js/new-object/new-object.html',
						controller : 'new-object',
						controllerAs : 'controller'
					}).when('/all-objects', {
						templateUrl : 'js/objects-search/objects-search.html',
						controller : 'objects-search',
						controllerAs : 'controller'
					}).when('/login', {
						templateUrl : 'js/navigation/login.html',
						controller : 'navigation',
						controllerAs : 'controller'
					}).when('/object-details/:id', {
						templateUrl : 'js/object-details/object-details.html',
						controller : 'object-details',
						controllerAs : 'controller'
					}).otherwise('/');

					$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

				}).run(function(auth) {

			// Initialize auth module with the home page and login/logout path
			// respectively
			auth.init('/', '/login', '/logout');
		});

module.directive('autoCompleteDirective', function($http) {
	return {
		restrict : 'A',
		controller : 'objects-search',
		scope : {
			autoCompleteUrl : '@',
			parametersElementsIds : '@',
			resultElementId:'@',
			ngModel : '='
		},
		require : 'ngModel',
		link : function(scope, elm, attrs, $scope) {
			elm.autocomplete({
				source : function(request, response) {
					$http({
						method : 'post',
						url : scope.autoCompleteUrl,
						data : constructAutoCompleteRequestBody(request.term, scope.parametersElementsIds)
					}).success(function(data) {
						response(transformCityResponse(data));
					});
				},
				minLength : 2,
				select : function(event, ui) {
					scope.$apply(function() {
						scope.ngModel = ui.item.value;
						$("#"+(scope.resultElementId)).val(ui.item.id);
					});
				}
			});
		}
	}
});

constructAutoCompleteRequestBody = function(inputString, parameterIds) {
	var parameterIds = JSON.parse(parameterIds);
	console.log(parameterIds);
	
	var body = {};
	body.q = inputString;

	var i;
	for (i = 0; i < parameterIds.length; ++i) {
		var currentId=parameterIds[i];
		body[currentId] = $('#'+currentId).val();
	}

	return body;
}

transformCityResponse = function(cities) {
	var i;

	for (i = 0; i < cities.length; ++i) {
		var city = cities[i];
		city.value = (city.name
				+ (city.district ? (', ' + city.district + ' distr.') : '') + (city.region ? (', '
				+ city.region + ' reg.')
				: ''));
	}

	return cities;
}