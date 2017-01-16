var app = angular
    .module('hello', ['ngRoute', 'auth', 'new-object', 'objects-search', 'navigation', 'add-city', 'object-details'])
    .config(
        function ($routeProvider, $httpProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.when('/', {
                templateUrl: 'js/new-object/new-object.html',
                controller: 'new-object',
                controllerAs: 'controller'
            }).when('/all-objects', {
                templateUrl: 'js/objects-search/objects-search.html',
                controller: 'objects-search',
                controllerAs: 'controller'
            }).when('/login', {
                templateUrl: 'js/navigation/login.html',
                controller: 'navigation',
                controllerAs: 'controller'
            }).when('/object-details/:id', {
                templateUrl: 'js/object-details/object-details.html',
                controller: 'object-details',
                controllerAs: 'controller'
            }).otherwise('/');

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        }).run(function (auth) {

        // Initialize auth module with the home page and login/logout path
        // respectively
        auth.init('/', '/login', '/logout');
    });

module.directive('addressAutoComplete', function ($http) {
    return {
        restrict: 'E',
        controller: 'objects-search',
        scope: {
            autoCompleteUrl: '@',
            parametersElementsIds: '@',
            resultElementId: '@',
            //ngModel: '='
            currentId: '='
        },
        //require: 'ngModel',
        link: function (scope, elm, attrs, $scope) {
            var variantView = elm.find("input[type='text']");
            var variantId = elm.find("input[type='hidden']");
            variantView.autocomplete({
                source: function (request, response) {
                    $http({
                        method: 'post',
                        url: scope.autoCompleteUrl,
                        data: constructAutoCompleteRequestBody(request.term,
                            scope.parametersElementsIds)
                    }).success(function (data) {
                        response(transformAddressComponentResponse(data));
                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        // scope.ngModel = ui.item.value;
                        scope.currentId = ui.item.id;
                        variantId.val(ui.item.id);
                    });
                }
            });
        }
    }
});

constructAutoCompleteRequestBody = function (inputString, parameterIds) {
    var parameterIds = JSON.parse(parameterIds);

    var body = {};
    body.q = inputString;

    var i;
    for (i = 0; i < parameterIds.length; ++i) {
        var currentId = parameterIds[i];
        body[currentId] = $('#' + currentId).val();
    }

    return body;
}

transformAddressComponentResponse = function (addressComponentVariants) {
    var i;

    for (i = 0; i < addressComponentVariants.length; ++i) {
        var addressComponent = addressComponentVariants[i];
        addressComponent.value = (addressComponent.name
        + (addressComponent.district ? (', ' + addressComponent.district + ' distr.') : '')
        + (addressComponent.region ? (', ' + addressComponent.region + ' reg.') : ''));
    }

    return addressComponentVariants;
}