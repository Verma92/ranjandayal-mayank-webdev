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
            vm.logout = logout;
        }
        init();


        /*function login(user) {
            UserService
                .login(user)
                .then(
                    function(response) {
                        var user = response.data;
                        console.log(response.data);
                        console.log("error");
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
                    })
        }
*/
        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })
        }

             function login(user)
             {
                 username = user.username;
                 password = user.password;
                 var promise= UserService.findUsersByCredentials(username, password);

                 promise.success(function(user){
                     if(user === '0') {
                         vm.alert = "Unable to login";
                     } else {
                         console.log("inside login controller "+user.username);
                         $location.url("/user/" + user._id);
                     }
                 });
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
/*
        function registerUser(username, password) {
            var user = {username: '', password:''};
            user.username = username;
            user.password = password;
            console.log("user at registration controller");
            console.log(user);

            UserService
                .register(user)
                .then(
                    function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
                    })
        }*/

        function registerUser(username, password) {
            console.log("register controller");
            console.log(username);
            console.log(password);
            UserService
                .createUser(username, password)
                .success(function(user){
                    console.log("res user");
                    console.log(user);
                    userId = user._id;
                    $location.url("/user/"+userId);
                })
                .error(function (error) {

                });
        }

/*        function registerUser(user)
        {
            console.log("user at controller");
            console.log(user);
            UserService
                .createUser(user)
                .success(function(newUser){
                    console.log("new user");
                    console.log(newUser);
                    $location.url("/user/"+newUser._id);
                })
                .error(function (error) {

                });
            /!*var promise = UserService.createUser(user);

            promise.success(function(updatedUser) {
                console.log("update user at controller");
                console.log(updatedUser);
                if (updatedUser === '0') {
                    vm.alert = "Couldn't create user";
                } else {
                    $location.url("/user/" + updatedUser._id);
                }
            });*!/
        };*/

       /* function register(username, password) {
            UserService
                .createUser(user)
                .success(function(user){
                    $location.url("/user/"+user._id);
                })
                .error(function (error) {

                });
        };*/
    }

    function ProfileController($routeParams, $location, UserService)
    {
        console.log($routeParams);
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;
        vm.updateProfile = updateProfile;
        console.log(userId);

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
/*
        function updateProfile()
        {
            UserService.updateUser(user);
            $location.url("/user/"+vm.userId);
            console.log(user);
            //$location.url("/user/" + vm.userId + "/website");
        }*/
    };

})();

