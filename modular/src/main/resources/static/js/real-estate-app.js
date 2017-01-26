var app = angular
    .module('real-estate-app', ['ngRoute',
        'auth',
        'basic-app-data',
        'new-object',
        'objects-search',
        'navigation',
        'add-city',
        'object-details',
        "angucomplete-alt",
        "ui.router"
    ])
    .config(
        function ($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.when('/', '/new');
            $urlRouterProvider.otherwise('/');

            $stateProvider.state('new-object', {
                url: '/new',
                templateUrl: 'js/new-object/new-object.html',
                controller: 'new-object',
                controllerAs: 'controller'
            }).state('new-object.step-one', {
                url: '/step-one',
                templateUrl: 'js/new-object/new-object-step-one.html',
                controller: 'new-object',
                controllerAs: 'controller'
            }).state('new-object.step-two', {
                url: '/step-two',
                templateUrl: 'js/new-object/new-object-step-two.html',
                controller: 'new-object',
                controllerAs: 'controller'
            }).state('new-object.step-three', {
                url: '/step-three',
                templateUrl: 'js/new-object/new-object-step-three.html',
                controller: 'new-object',
                controllerAs: 'controller'
            }).state('new-object.step-four', {
                url: '/step-four',
                templateUrl: 'js/new-object/new-object-step-four.html',
                controller: 'new-object',
                controllerAs: 'controller'
            }).state('all-objects', {
                url: '/all-objects',
                templateUrl: 'js/objects-search/objects-search.html',
                controller: 'objects-search',
                controllerAs: 'controller'
            }).state('login', {
                url: '/login',
                templateUrl: 'js/navigation/login.html',
                controller: 'navigation',
                controllerAs: 'controller'
            }).state('object-details', {
                url: '/object-details/:id',
                templateUrl: 'js/object-details/object-details.html',
                controller: 'object-details',
                controllerAs: 'controller'
            });

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        }).run(function (auth, basicAppData) {
        // Initialize auth module with the home page and login/logout path
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