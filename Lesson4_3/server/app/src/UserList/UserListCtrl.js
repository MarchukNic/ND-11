'use strict'

userApp.controller('UserListCtrl', function ($scope, UsersService, PostsService) {
  // Добавить лоадеры в список пользователей и постов.
  $scope.userLoadedU = false
  $scope.userLoadedP = false

  UsersService.getUsers().then(function (response) {
    $scope.users = response.data
    // Добавить лоадеры в список пользователей и постов.
    $scope.userLoadedU = true
  })

  PostsService.getPosts().then(function (response) {
    $scope.posts = response.data
    // Добавить лоадеры в список пользователей и постов.
    $scope.userLoadedP = true
  })


/*   UsersService.getUsers().then(function (response) {
    $scope.users = response.data
    return PostsService.getPosts()
  }).then(function (response) {
    $scope.posts = response.data
  }) */

})
