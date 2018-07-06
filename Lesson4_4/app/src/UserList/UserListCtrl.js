'use strict'

userApp.controller('UserListCtrl', function ($scope, UsersService, PostsService) {
  $scope.users = UsersService.query()
  // Использовать $resource для вывода списка постов.
  $scope.posts = PostsService.query()
  // PostsService.getPosts().then(function (response) {
  //   $scope.posts = response.data
  // })
})
