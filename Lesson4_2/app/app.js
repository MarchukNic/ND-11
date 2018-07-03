'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'ui.router',
  'ngMessages'
]).
  config(['$locationProvider', '$routeProvider', '$stateProvider', function ($locationProvider, $routeProvider, $stateProvider) {
    
    var helloState = {
      name: 'hello',
      url: '/hello',
      template: '<h3>hello world!</h3>'
    }

    var myaccount = {
      name: 'myaccount',
      url: '/myaccount',
      templateUrl: '/myaccount.html'
    }
    $locationProvider.hashPrefix('!');

    $stateProvider.state(helloState);
    $stateProvider.state(myaccount);

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
  })
  .controller('LoginpageCtrl', function() {
    var vm = this;
    vm.hello = "Hello from frontpage";
    console.log('Sample');
});