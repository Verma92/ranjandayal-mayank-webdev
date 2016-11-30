(function (){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService)

    function WidgetService($http){

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
            ];

        var filenamePrefixes = { "HEADER": "heading",
            "HTML": "html",
            "IMAGE": "image",
            "YOUTUBE": "youtube" };

      /*  var widgetTypes = [ "HEADER",
                            "IMAGE",
                            "HTML",
                            "YOUTUBE" ];

        var defaultWidgetValues =
        {
            "HEADER": {"size":1},
            "IMAGE": {"width": "100%"},
            "YOUTUBE": {"width": "100%"}
        };*/

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
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, widget);

            /*widget.pageId = pageId;
            var newWid;
            do {
                newWid = getRandomInt(0, 1000).toString();
                if (findWidgetById(newWid) === null)
                {
                    widget._id = newWid;
                    widgets.push(widget);
                    return widget;
                }
            } while(1);*/
        }

        function findWidgetsByPageId(pageId)
        {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId)
        {
            console.log("findWidgetById client service");
            console.log(widgetId);
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
           /*
            for (var w in widgets) {
                widget = widgets[w];
                if(parseInt(widget._id) === parseInt(widgetId)) {
                    return widget;
                }
            }
            return null;*/
        }

        function updateWidget(widgetId, widget) {

        }

        function deleteWidget(widgetId) {

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

           /* url = "/api/widget/filename/"+widgetType;
            return $http.get(url);*/
        }

        function getAllWidgetTypes()
        {
            url = "/api/widget";
            return $http.get(url);

            /*console.log("inside getAllWidgetTypes");
            return widgetTypes;*/
        }

        function getDefaultWidgetValues()
        {
            url = "/api/widget/default";
            return $http.get(url);
/*
            return defaultWidgetValues;*/
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }


    }

})();