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
        }
        function WebsiteListController($scope)
            {
                var vm = this;
                //console.log("Hello from websitelist controller !");

                var websites = [
                    {"name": "Facebook", "description": "Most popular socia network"},
                    {"name": "Wikipedia", "description": "The free encylopedia"}
                ];

                $scope.weblist = websites;



            }


        function NewWebsiteController() {
            var vm = this;

        }
})();