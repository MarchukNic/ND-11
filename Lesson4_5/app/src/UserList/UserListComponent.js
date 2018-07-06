'use strict';

userApp.component('userList', {

    controller: function UserListCtrl(UsersService) {

        this.users = UsersService.query();
        // console.log(this.users)
    },

    templateUrl: './src/UserList/UserList.html'

});
