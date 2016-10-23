/**
 * Created by mayank on 10/17/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("WebsiteListController", WebsiteListController);

        function EditWebsiteController() {  }
        function WebsiteListController($scope)
            {
                //console.log("Hello from websitelist controller !");

                var websites = [
                    {"name": "Facebook", "description": "Most popular socia network"},
                    {"name": "Wikipedia", "description": "The free encylopedia"}
                ];

                $scope.weblist = websites;



            }


        function NewWebsiteController() {

        }
})();