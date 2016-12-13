(function (){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService)

    function WidgetService($http){
/*
        var widgets =
            [
                { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];*/

        var filenamePrefixes = { "HEADER": "heading",
            "HTML": "html",
            "IMAGE": "image",
            "YOUTUBE": "youtube" };


        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            getFilenamePrefix: getFilenamePrefix,
            getAllWidgetTypes: getAllWidgetTypes,
            getDefaultWidgetValues: getDefaultWidgetValues
        };

        return api;

        function createWidget(pageId, widget)
        {
            console.log("inside createWidget service client");
            console.log(pageId);
            console.log(widget);
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId)
        {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId)
        {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget)
        {
            var url ="/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId)
        {
            var url ="/api/widget/" + widgetId;
            return $http.delete(url, widget);
        }

        function getFilenamePrefix(widgetType)
        {
            if (widgetType.toString() === "HEADER")
                return "heading";
            else if (widgetType.toString() === "HTML")
                return "html";
            else if (widgetType.toString() === "IMAGE")
                return "image";
            else if (widgetType.toString() === "YOUTUBE")
                return "youtube";

        }

        function getAllWidgetTypes()
        {
            url = "/api/widget";
            return $http.get(url);
        }

        function getDefaultWidgetValues()
        {
            url = "/api/widgetdefault";
            return $http.get(url);
        }
    }

})();