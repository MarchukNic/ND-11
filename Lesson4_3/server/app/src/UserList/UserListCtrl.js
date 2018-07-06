'use strict'

userApp.controller('UserListCtrl', function ($scope, UsersService, PostsService, $q) {
  // Добавить лоадеры в список пользователей и постов.
  $scope.userLoadedU = false
  $scope.userLoadedP = false
  var obj1, obj2
  $q.all({
    obj1: UsersService.getUsers(),
    obj2: PostsService.getPosts()
  }).then(function (response) {
    $scope.users = response.obj1.data;
    $scope.posts = response.obj2.data;
    $scope.userLoadedU = true;
    $scope.userLoadedP = true;
  });

  // UsersService.getUsers().then(function (response) {
  //   $scope.users = response.data
  //   // Добавить лоадеры в список пользователей и постов.
  //   $scope.userLoadedU = true
  // })

  // PostsService.getPosts().then(function (response) {
  //   $scope.posts = response.data
  //   // Добавить лоадеры в список пользователей и постов.
  //   $scope.userLoadedP = true
  // })


  /*   UsersService.getUsers().then(function (response) {
      $scope.users = response.data
      return PostsService.getPosts()
    }).then(function (response) {
      $scope.posts = response.data
    }) */

})
