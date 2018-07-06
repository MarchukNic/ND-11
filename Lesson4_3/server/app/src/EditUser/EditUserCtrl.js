'use strict'

userApp.controller('EditUserCtrl', function ($scope, $routeParams, UsersService) {
  $scope.User = {}
  userForm.$invalid = false;

  UsersService.getUser($routeParams['userId']).then(function (response) {
    $scope.User = response.data
    $scope.userLoaded = true
  })

  $scope.editUser = function (User) {
    $scope.editSuccess = false
    console.log(User)
    UsersService.editUser(User).then(function (response) {
      $scope.User = {}
      $scope.UserId = response.data.id
      $scope.editSuccess = true
    })
  }
})
