/**
 * Created by mayank on 10/17/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService, $rootScope) {

        var vm = this;

        function init()
        {
            vm.login = login;
        }
        init();


        function login(user) {
            console.log(user.username);
            if(user.username === "" || user.password === ""){
                vm.alert = "Username and Password are required";
            }
            else {
                UserService
                    .login(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            console.log(response.data);
                            console.log("error");
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        })
            }
        }
    }

    function RegisterController($routeParams, $location, UserService, $rootScope)
    {
        var vm = this;

        function init()
        {
            vm.registerUser = registerUser;
        }

        init();

        function registerUser(username, password, verifyPassword) {
            var user = {username: '', password:''};
            user.username = username;
            user.password = password;
            console.log("user at registration controller");
            console.log(user);

            if(typeof user.username === "undefined" || typeof user.password === "undefined" || verifyPassword === ""){
                vm.alert = "All fields are required";
            }
            else{
                if(user.password !== verifyPassword){
                    vm.alert = "Passwords do not match !";
                }

                else{
                    UserService
                        .register(user)
                        .then(
                            function(response) {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/user/"+user._id);
                            })
                }
            }
        }
    }

    function ProfileController($routeParams, $location, UserService, $rootScope, loggedin)
    {
        var vm = this;
        var userId = $rootScope.loggedUser._id;
        vm.userId = userId;
        vm.updateProfile = updateProfile;
        vm.logout = logout;

        function init()
        {
            UserService.findUserById(userId)
                .success(function(user) {
                    if (user != '0') {
                        vm.user = user;
                        console.log(user);
                    }
                })
                .error (function() {
                    vm.alert = "Could not retrieve user";
                });
        }
        init();

        function updateProfile()
        {
            var promise = UserService.updateUser(userId, vm.user);
            promise.success(function(user){
                if(user === '0') {
                    vm.alert = "Unable to update user";
                } else {
                    console.log("updated user : "+user);
                    $location.url("/user/"+vm.userId);
                }
            });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })
        }
    };

})();

