/**
 * Created by mayank on 10/17/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("WebsiteListController", WebsiteListController);

        function EditWebsiteController($routeParams, WebsiteService) {
            var vm = this;
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;

            var website = WebsiteService.findWebsiteById(websiteId);
            vm.website = website;
            var websites = WebsiteService.findWebsitesByUser(userId);
            vm.websites = websites;
            console.log(websites);
            console.log(website);
            vm.userId = userId;
        }

        function WebsiteListController($routeParams, WebsiteService) {
            var vm = this;
            var userId = $routeParams.uid;
            var websites = WebsiteService.findWebsitesByUser(userId);
            vm.websites = websites;
            vm.userId = userId;
        }

        function NewWebsiteController($routeParams, WebsiteService) {
            var vm = this;
            var userId = $routeParams.uid;
            var websites = WebsiteService.findWebsitesByUser(userId);
            vm.websites = websites;
            vm.userId = userId;
        }
})();