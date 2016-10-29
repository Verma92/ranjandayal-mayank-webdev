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

        function init()
        {
            vm.login = login;
        }
        init();

        function login(username, password) {
            var user = UserService.findUsersByCredentials(username, password);
            if(user === null) {
                vm.alert = "Unable to login";
            } else {
                $location.url("/user/" + user._id);
            }
        }

    }

    function RegisterController($routeParams, $location, UserService) {
        var vm = this;

        function init()
        {
            vm.registerUser = registerUser;
        }
        init();

        function registerUser(user)
        {
            UserService.createUser(user);
            $location.url("/user/"+user._id);
        }

    }

    function ProfileController($routeParams, $location, UserService)
    {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var user = UserService.findUserById(userId);

        function init()
        {
            vm.user = user;
            vm.userId = userId;
            vm.updateProfile = updateProfile;
        }
        init();

        function updateProfile()
        {
            UserService.updateUser(user);
            $location.url("/user/"+vm.userId);
            console.log(user);
            //$location.url("/user/" + vm.userId + "/website");
        }
    };

})();

