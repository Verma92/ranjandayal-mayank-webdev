/**
 * Created by mayank on 11/5/16.
 */
module.exports = function(app) {

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
    ];

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
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    app.get("/api/widget", getAllWidgetTypes);
    app.get("/api/widget/default", getDefaultWidgetValues);
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
        widget.pageId = pageId;
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
        } while(1);
    }
    
    function findAllWidgetsForPage(req, res)
    {
        var pageId = req.params.pageId;
        var result = [];
        for (var w in widgets) {
            widget = widgets[w];
            if(parseInt(widget.pageId) === parseInt(pageId)) {
                result.push(widget);
            }
        }
        res.json(result);
        return;
    }
    
    function findWidgetById(req, res)
    {
        console.log("reached findwidger by id");
        var widgetId = req.params.widgetId;

        for (var w in widgets) {
            widget = widgets[w];
            if(parseInt(widget._id) === parseInt(widgetId)) {
                res.json(widget);
                return;
            }
        }
        res.json('0');
        return;
    }
    
    function updateWidget()
    {
        
    }
    
    function deleteWidget()
    {
        
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
