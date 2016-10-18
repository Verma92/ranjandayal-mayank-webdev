/**
 * Created by mayank on 10/17/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($scope) {

        $scope.hello = "hello from login controller";

    }

    function RegisterController($scope) {

    }

    function ProfileController($scope) {

    };

})();

