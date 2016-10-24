/**
 * Created by mayank on 10/17/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("WebsiteListController", WebsiteListController);

        function EditWebsiteController() {
            var vm = this;
            var userId = parseInt($routeParams.uid);
            var user = UserService.findUserById(userId);
            vm.user = user;



        }
        function WebsiteListController($routeParams, WebsiteService) {
            var vm = this;
            var userId = $routeParams.uid;
            var websites = WebsiteService.findWebsitesByUser(userId);
            vm.websites = websites;
            console.log(websites);
        }


        function NewWebsiteController() {
            var vm = this;

        }
})();