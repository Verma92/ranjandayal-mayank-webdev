/**
 * Created by mayank on 10/17/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {

        var vm = this;
        vm.login = login;

        function login(username, password) {
            var user = UserService.findUsersByCredentials(username, password);
            if(user === null) {
                vm.error = "No such user !";
            } else {
                $location.url("/user/" + user._id);
            }

        }

    }

    function RegisterController($scope) {

    }

    function ProfileController($scope) {

    };

})();

