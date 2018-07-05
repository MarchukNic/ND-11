'use strict'

userApp.controller('UserListCtrl', function ($scope, UsersService, PostsService) {
  $scope.userLoadedU = false
  $scope.userLoadedP = false

  UsersService.getUsers().then(function (response) {
    $scope.users = response.data
    $scope.userLoadedU = true
  })

  PostsService.getPosts().then(function (response) {
    $scope.posts = response.data
    $scope.userLoadedP = true
  })


/*   UsersService.getUsers().then(function (response) {
    $scope.users = response.data
    return PostsService.getPosts()
  }).then(function (response) {
    $scope.posts = response.data
  }) */

})
