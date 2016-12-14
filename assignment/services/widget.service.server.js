/**
 * Created by mayank on 11/5/16.
 */
module.exports = function(app, model) {
/*
    var widgets =  [
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

    var widgetTypes = [ "HEADER",
        "IMAGE",
        "HTML",
        "YOUTUBE" ];

    var defaultWidgetValues =
    {
        "HEADER": {"size":1},
        "IMAGE": {"width": "100%"},
        "YOUTUBE": {"width": "100%"}
    };


    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });


    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/page/:pageId/widget/:widgetId", updateWidget);
    app.delete("/api/page/:pageId/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    app.get("/api/widget", getAllWidgetTypes);
    app.get("/api/widgetdefault", getDefaultWidgetValues);
    app.get("/api/widget/filename/:widgetType", getFilenamePrefix);


    function uploadImage(req, res)
    {
        console.log("upload image called");
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        res.json(myFile);
    }

    function createWidget(req, res)
    {
        var widget = req.body;
        var pageId = req.params.pageId;
        console.log("widget");
        console.log(widget);
        /*widget.pageId = pageId;
        var newWid;
        do {
            newWid = getRandomInt(0, 1000).toString();

            if (findWidgetByIdLocal(newWid) === null)
            {
                console.log("inside widgetby local");
                widget._id = newWid;
                widgets.push(widget);
                console.log(widgets);
                res.json(widget);
                return;
            }
        } while(1);*/
        model
            .widgetModel
            .createWidget(pageId, widget)
            .then(
                function(newWidget) {
                    res.send(newWidget);
                },
                function(err) {
                    res.sendStatus(400);
                }
            )
    }
    
    function findAllWidgetsForPage(req, res)
    {
        var pageId = req.params.pageId;
       /* var result = [];
        for (var w in widgets) {
            widget = widgets[w];
            if(parseInt(widget.pageId) === parseInt(pageId)) {
                result.push(widget);
            }
        }
        res.json(result);
        return;*/
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    res.send(widgets);
                },
                function(err) {
                    res.sendStatus(400).send(error);
                }
            )
    }
    
    function findWidgetById(req, res)
    {
        console.log("reached findwidger by id");
        var widgetId = req.params.widgetId;

        /*for (var w in widgets) {
            widget = widgets[w];
            if(parseInt(widget._id) === parseInt(widgetId)) {
                res.json(widget);
                return;
            }
        }
        res.json('0');
        return;*/
        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    if (widget) {
                        res.send(widget);
                    }
                    else {
                        res.send('0');
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }
    
    function updateWidget(req, res)
    {
        var wid = req.params.widgetId;
        var pid = req.params.pageId;
        var widget = req.body;
        /*var widIndex = findWidgetIndexById(wid);
        if(widIndex === -1)
        {
            res.send('0');
            return;
        }
        else
        {
            widgets[widIndex] = widget;
            res.json(widgets[widIndex]);
            return;
        }*/
        model
            .widgetModel
            .updateWidget(widget, wid, pid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
    
    function deleteWidget(req, res)
    {
        var wid = req.params.widgetId;
        var pid = req.params.pageId;

       /* var widIndex = findWidgetIndexById(wid);
        if(widIndex === -1)
        {
            res.send('0');
            return;
        }
        else
        {
            widgets.splice(widIndex, 1);
            res.send(200);
            return;
        }*/
        model
            .widgetModel
            .deleteWidget(wid, pid)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function getAllWidgetTypes(req, res)
    {
        res.json(widgetTypes);
        return;
    }

    function getDefaultWidgetValues(req, res)
    {
        res.json(defaultWidgetValues);
        return;
    }

    function getFilenamePrefix(req, res)
    {
        var widType = req.params.widgetType;
        res.json(filenamePrefixes[widType]);
    }


    // auxiliary functions

    function findWidgetIndexById(widgetId)
    {
        for(var i = 0; i < widgets.length; i++)
        {
            if( widgets[i]._id === widgetId)
                return i;
        }
        return -1;
    }

    function findWidgetByIdLocal(wid)
    {
        console.log("searching in following widgets: ");
        console.log(widgets);
        console.log(wid.type);
        console.log(wid);
        for(p in widgets)
        {
            if (parseInt(wid) === parseInt(widgets[p]._id))
                return widgets[p];
            else
                return null;
        }
    }

    function findPageIndexById(pageId)
    {
        for(var i = 0; i < pages.length; i++)
        {
            if(parseInt(pages[i]._id) === parseInt(pageId))
                return i;
        }
        return null;
    }

    function getRandomInt(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
};
