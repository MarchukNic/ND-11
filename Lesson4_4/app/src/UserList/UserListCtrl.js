'use strict'

userApp.controller('UserListCtrl', function ($scope, UsersService, PostsService) {
  UsersService.getUsers().then(function (response) {
    $scope.users = response.data
  })

  PostsService.getPosts().then(function (response) {
    $scope.posts = response.data
  })


/*   UsersService.getUsers().then(function (response) {
    $scope.users = response.data
    return PostsService.getPosts()
  }).then(function (response) {
    $scope.posts = response.data
  }) */

})
