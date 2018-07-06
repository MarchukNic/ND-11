angular
  .module('UserApp')
  // Использовать $resource для вывода списка постов.
  .factory('PostsService', function ($resource, $http) {
    return $resource('https://jsonplaceholder.typicode.com/posts/:postId/', {
      userId: '@postId'
    }, {
        update: {
          method: 'PUT'
        }
      })
  })
