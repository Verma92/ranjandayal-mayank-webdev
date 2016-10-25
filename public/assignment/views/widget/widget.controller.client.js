/**
 * Created by mayank on 10/17/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

    function WidgetListController($routeParams, WidgetService, $sce) {

        console.log("widget list controller");
        var vm = this;
        var pid = $routeParams.pid;

        function init() {
            vm.pageId = pid;
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.checkSafeHtml = checkSafeHtml;
            vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;
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

    function EditWidgetController($routeParams, WidgetService, $sce) {

        var vm = this;

        function init() {

            vm.widget=WidgetService.findWidgetById($routeParams.wgid);
            vm.getFilenamePrefix = getFilenamePrefix;
            console.log("inside EditWidgetController");

        }
        init();

        function getFilenamePrefix() {
            console.log("inside filename prefix");
            return WidgetService.getFilenamePrefix(vm.widget.widgetType);
        }


    }
/*    function WidgetChooseController() {  }
    function WidgetYoutubeController() {  }*/
})();