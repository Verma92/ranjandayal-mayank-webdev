/**
 * Created by mayank on 10/17/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

/*        .controller("WidgetHeadingController", WidgetHeadingController)
        .controller("WidgetImageController", WidgetImageController)
        .controller("WidgetChooseController", WidgetChooseController)
        .controller("WidgetYoutubeController", WidgetYoutubeController);*/

    function WidgetListController($routeParams, WidgetService, $sce) {
        console.log("widget list controller");
        var vm = this;
        var pid = $routeParams.pid;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(pid);
            console.log(WidgetService.findWidgetsByPageId(pid));
        }
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYoutubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" +id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }
    }
    function NewWidgetController() {
        var vm = this;
    }
    function EditWidgetController() {
        var vm = this;
    }
/*    function WidgetChooseController() {  }
    function WidgetYoutubeController() {  }*/
})();