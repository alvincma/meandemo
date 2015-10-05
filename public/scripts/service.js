angular.module('nbaApp')
    .factory('dataService', function ($http) {
        return {
            getDivisions: function () {
                var divisionsPromise = $http({method: 'GET', url: 'http://localhost:3000/divisions'});
                return divisionsPromise;
            },
            getDivisionsDetails: function (divisionName) {
                var teamsPromise = $http({
                    method: 'GET',
                    url: 'http://localhost:3000/divisions/' + divisionName
                });
                return teamsPromise;
            }
        }
    });