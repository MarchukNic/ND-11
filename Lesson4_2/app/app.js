'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
  config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({ redirectTo: '/view1' });


  }]);
// Вынести главное меню в контроллер и сделать подсветку текущего пункта;
angular.module('myApp')
  .controller('FrontpageCtrl', function ($scope, $location) {
    $scope.menu = [{
      "title": "view1",
      "href": "#!/view1"
    }, {
      "title": "view2",
      "href": "#!/view2"
    }]

    $scope.isActive = function (location) {
      return location === '#!' + $location.path()
    }
  });