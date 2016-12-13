/**
 * Created by mayank on 11/5/16.
 */
module.exports = function(app, model) {

   /* var pages =  [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];*/

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/website/:websiteId/page/:pageId", deletePage);
    
    function createPage(req, res)
    {
        console.log("reached createPage function server side");
        var page = req.body;
        var websiteId = req.params.websiteId;
       /* var newPid = '999';
        /!* todo  *!/
        do {
            newPid = getRandomInt(0, 1000).toString();
            if (findPageByIdLocal(newPid) === null)
            {
                page._id = newPid;
                pages.push(page);
                return page;
            }
        }while(1);
        page._id = newPid;
        pages.push(page);
        console.log("pages server service");
        console.log(pages);
        res.json(pages);*/

        model
            .pageModel
            .createPage(websiteId, page)
            .then(
                function(newPage) {
                    res.send(newPage);
                },
                function(err) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    //corresponds to findPageByWebsiteId from client service
    function findAllPagesForWebsite(req, res)
    {
        var wid = req.params.websiteId;
        /*var result = [];
        for (var w in pages)
        {
            page = pages[w];
            console.log(page);
            if(parseInt(page.websiteId) === parseInt(wid))
            {
                result.push(page);
            }
        }
        console.log(pages);
        res.json(result);*/

        model
            .pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function(pages) {
                    console.log(pages);
                    res.send(pages.pages);
                },
                function(err) {
                    res.sendStatus(400).send(error);
                }
            )
    }
    
    function findPageById(req, res)
    {
        var pageId = req.params.pageId;

        /*for (var p in pages)
        {
            page = pages[p];

            if(parseInt(page._id) === parseInt(pageId)) {
                console.log(page);
                res.json(page);
                return;

            }
        }
        res.json('0');
        return;*/

        model
            .pageModel
            .findPageById(pageId)
            .populate('Widgets')
            .then(
                function(page) {
                    if (page) {
                        res.send(page);
                    }
                    else {
                        res.send('0');
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
    
    function updatePage(req, res)
    {
        //console.log(pages);
        var pageId = req.params.pageId;
        console.log(pageId);
        /*var pageIndex = findPageIndexById(pageId);
        console.log(pageIndex);*/
        var page = req.body;
        console.log(page);
        /*if(pageIndex === null)
        {
            console.log("null return from updatePage");
            res.json('0');
            return;
        }
        else
        {
            pages[pageIndex] = page;
            console.log("updatepage server service");
            console.log(pages);
            res.json(pages[pageIndex]);
            return;
        }*/

        model
            .pageModel
            .updatePage(page, pageId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
    
    function deletePage(req, res)
    {
        var pageId = req.params.pageId;
        var websiteId = req.params.websiteId;

        /*var pageIndex = findPageIndexById(pageId);
        if(pageIndex === null)
        {
            console.log("null return from deletePage");
            res.json('0');
            return;
        }
        else
        {
            pages.splice(pageIndex, 1);
            res.json(pages);
            return;
        }*/

        model
            .pageModel
            .deletePage(pageId, websiteId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    // auxiliary functions

    function findPageByIdLocal(pid)
    {
        console.log("searching in following pages: ");
        console.log(pages);
        console.log(pid.type);
        console.log(pid);
        for(p in pages)
        {
            if (parseInt(pid) === parseInt(pages[p]._id))
                return pages[p];
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