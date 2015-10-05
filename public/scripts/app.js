angular.module('nbaApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/viewDivisions');

        $stateProvider
            // Division state
            .state('divisions', {
                url: '/viewDivisions',
                templateUrl: 'templates/divisions.html',
                controller: 'divisionsCtrl'
            })
            // Division teams state
            .state('teams', {
                url: '/viewTeams/:divisionId',
                templateUrl: 'templates/divisionsDetails.html',
                controller: 'divisionTeamsCtrl'
            });
    });