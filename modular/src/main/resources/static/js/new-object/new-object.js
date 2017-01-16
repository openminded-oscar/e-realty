angular.module('new-object', ['ui.bootstrap', 'ngFileUpload']).controller('new-object',
    function ($http, $scope, $uibModal, Upload, $timeout) {
        $http.get('/user/').then(function (response) {
            $scope.user = response.data.name;
        });

        $http.get('/cities').then(function (response) {
            $scope.cities = response.data;
        });

        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });
        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });
        $scope.log = '';
        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                        Upload.upload({
                            url: '/upload-photo',
                            data: {
                                userId: $scope.user,
                                category: 'realty-photo',
                                file: file
                            }
                        }).then(function (resp) {
                            $timeout(function () {
                                $scope.log = 'file: ' +
                                    resp.config.data.file.name +
                                    ', Response: ' + JSON.stringify(resp.data) +
                                    '\n' + $scope.log;
                            });
                        }, function (resp) {
                            if ($scope.uploadError) {
                                $scope.uploadError += "\nFile was not uploaded properly: " + file.name;
                            } else {
                                $scope.uploadError = "File was not uploaded properly: " + file.name;
                            }
                        }, function (evt) {
                            $scope.progressPercentage = parseInt(100.0 *
                                evt.loaded / evt.total);
                        });
                    }
                }
            }
        };


        $scope.isApt = true;
        // change hardcoded values
        $scope.realty = {address: {streetInCity: {id: 2}}};

        this.addRealtyObject = function () {
            $http.post('/realty-object/add', $scope.realty).then(function (response) {
                console.log('success' + response);
            }, function () {
                console.log('failure' + response);
            });
        };

        $scope.addCity = function () {
            $uibModal.open({
                templateUrl: 'js/city/add-city-dialog.html',
                controller: 'add-city'
            });
        };

        $scope.cityURL = '/city/find';

        $scope.streetURL = '/street/find';

        $scope.citiesToSelect = {};

        $scope.cityIdElementId = 'cityId';
        $scope.streetIdElementId = 'streetId';
        $scope.streetParametersElementsIds = [$scope.cityIdElementId];
        $scope.cityParametersElementsIds = [];
    });