angular.module('nbaApp')
    .controller('divisionsCtrl', function($scope, dataService) {
        var getDataPromise = dataService.getDivisions();

        getDataPromise.success(function (data) {
            $scope.divisions = data.data;
        });

        getDataPromise.error(function (data, status) {
            $scope.errorMessage = status;
        });

    }).controller('divisionTeamsCtrl', function($scope, dataService, $stateParams) {
    	$scope.divisionId = $stateParams.divisionId;
    	
        var getDataPromise = dataService.getDivisionsDetails($stateParams.divisionId);

        getDataPromise.success(function (data) {
            $scope.divisionDtls = data.data.teams;
        });

        getDataPromise.error(function (data, status) {
            $scope.errorMessage = status;
        });
    });