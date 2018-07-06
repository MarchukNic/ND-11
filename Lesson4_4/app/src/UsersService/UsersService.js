angular
  .module('UserApp')
  .factory('UsersService', function ($resource, $http) {
    return $resource('https://jsonplaceholder.typicode.com/users/:userId', {
      userId: '@userId'
    }, {
        update: {
          method: 'PUT'
        }
      })
  })
  .factory('UsersPostsService', function ($resource, $http) {
    return $resource('https://jsonplaceholder.typicode.com/users/:userId/posts', {
      userId: '@userId'
    }, {
        update: {
          method: 'PUT'
        }
      })
  })
