/**
 * Created by mayank on 10/17/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

    function WidgetListController($routeParams, WidgetService, $sce)
    {
        console.log("widget list controller");
        var vm = this;
        var pid = $routeParams.pid;

        var promise = WidgetService.findWidgetsByPageId(pid);
        promise.success(function (widgets) {
            vm.widgets = widgets;
        });

        function init() {
            vm.pageId = pid;
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.checkSafeHtml = checkSafeHtml;
            vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;
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

    function NewWidgetController($routeParams, WidgetService, $location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var pageId = $routeParams.pid;

        function init() {

            vm.pageId = pageId;
            vm.userId = userId;
            vm.websiteId=$routeParams.wid;

            var promise = WidgetService.getAllWidgetTypes();
            promise.success(function (widgetTypes) {
                vm.widgetTypes = widgetTypes;
            })

            vm.createWidget = createWidget;
            console.log("inside NewWidgetControllerInit");

        }
        init();

        function createWidget(widgetType)
        {
            var widget = {"widgetType": widgetType};
            var promise = WidgetService.getDefaultWidgetValues();
            console.log("createWidget called from controller");
            console.log(promise);
            var defaultWidgetValues;
            promise
                .success(function(allDefaultWidgetVals) {
                    console.log("success controller");
                    console.log(allDefaultWidgetVals);
                    var defaultWidgetValues = allDefaultWidgetVals[widgetType];
                    console.log(defaultWidgetValues);
                    if( undefined !== defaultWidgetValues)
                    {
                        for (var key in defaultWidgetValues)
                        {
                            widget[key] = defaultWidgetValues[key];
                        }
                    }
                    console.log(widget);
                    var promise = WidgetService.createWidget(vm.pageId, widget);
                    promise.success(function (newWidgetRes) {
                        $location.url("/user/" + vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidgetRes._id);
                    })
                });
        }
    }

    function EditWidgetController($routeParams, WidgetService)
    {

        var vm = this;
        var wgid = $routeParams.wgid;
        var promise = WidgetService.findWidgetById(wgid);
        console.log(promise);
        promise.success(function (widgetRes) {
            console.log("widget res");
            console.log(widgetRes);
            vm.widget = widgetRes;
            vm.getFilenamePrefix = getFilenamePrefix;
        });

        function init()
        {
            vm.deleteWidget = deleteWidget;
            vm.updateWidget = updateWidget;
            vm.userId=$routeParams.uid;
            vm.websiteId=$routeParams.wid;
            vm.pageId=$routeParams.pid;

        }
        init();

        function updateWidget()
        {
            var promise = WidgetService.updateWidget(wgid, vm.widget);
            promise.success(function (widget) {
                vm.widget = widget;
                $location.url("/user/" + vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            })
        }

        function deleteWidget()
        {
            var promise = WidgetService.deleteWidget(wgid);
            promise.success(function () {
                $location.url("/user/" + vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            })
        }

        function getFilenamePrefix()
        {
            console.log("widget type:");
            console.log(vm.widget.type);
            var prefix = WidgetService.getFilenamePrefix(vm.widget.type);
            console.log("prefix:");
            console.log(prefix);
            return prefix;
        }
    }

})();