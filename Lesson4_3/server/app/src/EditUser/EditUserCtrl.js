'use strict'

userApp.controller('EditUserCtrl', function ($scope, UsersService) {
  $scope.User = {}

  $scope.editUser = function (User) {
    $scope.editSuccess = false

    UsersService.editUser(User).then(function (response) {
      $scope.User = {}

      $scope.UserId = response.data.id
      $scope.editSuccess = true
    })
  }
})
