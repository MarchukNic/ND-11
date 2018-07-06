'use strict';

userApp.component('userDetail', {

    controller: function UserDetailCtrl(UsersService, $routeParams,  $scope) {

        this.users = UsersService.get({
            userId: $routeParams['userId']
            //  $routeParams['userId']
        }, function(successResult) {
            // Окей!
            $scope.notfoundError = false;
            $scope.userLoaded = true;
    
            $scope.activeTab = 1;
            $scope.disableControlTab = true;
        }, function(errorResult) {
            // Не окей..
            $scope.notfoundError = true;
            $scope.userLoaded = true;
        });
        console.log(this.users)
    },

    templateUrl: './src/UserDetail/UserDetail.html',

    bindings: {
        userId: '='
      }
});
