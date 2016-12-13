/**
 * Created by mayank on 11/5/16.
 */

module.exports = function(app, model) {

  /*  var websites =   [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];
*/

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);

    function createWebsite(req, res)
    {
       /* var newWid;
        var website = req.body;
        website.developerId = req.params.userId;*/
            /*todo*/ //check delete website bug post that
        /*do {
            newWid = getRandomInt(0, 1000).toString();
            existingWid = function () {

                for (var w in websites) {
                website = websites[w];
                console.log(website);
                if(parseInt(website._id) != parseInt(wid))
                {
                    return null;
                }
              }
            };

            if (existingWid === null)
            {
                website._id = newWid;
                //websites.push(website);
                for(i = 0; i < websites.length; i++)
                    console.log(websites[i]);
                return;
            }
        }while(1);*/

        var uid = req.params.userId;

        var website = req.body;
        console.log(uid);
        console.log(website);
        model
            .websiteModel
            .createWebsite(uid, website)
            .then(
                function(newWebsite) {
                    console.log("newWebsite");
                    console.log(newWebsite);
                    res.json(newWebsite);
                },
                function(err) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllWebsitesForUser(req, res)
    {
        /*var uid = req.params.userId;
        var result = [];
        for(var w in websites) {
            if(websites[w].developerId == uid) {
                result.push(websites[w]);
            }
        }
        res.json(result);*/

        var userId = req.params.userId;
        model
            .websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(response) {
                    res.send(response.websites);
                },
                function(err) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findWebsiteById(req, res)
    {
        /*var wid = req.params.websiteId;
        for (var w in websites)
        {
            website = websites[w];
            console.log(website);
            if(parseInt(website._id) === parseInt(wid))
            {
                res.json(website);
                return;
            }
        }
        res.json('0');*/

        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    if (website) {
                        res.send(website);
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

    function updateWebsite(req, res)
    {
        var wid = req.params.websiteId;
        var website = req.body;
        /*var webIndex = findWebIndexById(wid);
        if( webIndex === -1)
        {
            res.send('0');
            return;
        }
        else
        {
            websites[webIndex] = website;
            res.json(websites[webIndex]);
            return;
        }*/
        model
            .websiteModel
            .updateWebsite(website, wid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteWebsite(req, res)
    {
        var wid = req.params.websiteId;
        var uid = req.params.userId;
        console.log("wid uid");
        console.log(wid);
        console.log(uid);
        //var webIndex = findWebIndexById(wid);
        /*if(webIndex === -1)
        {
            res.send('0');
            return;
        }
        else
        {
            websites.splice(webIndex, 1);
            res.send(200);
            return;
        }*/
        model
            .websiteModel
            .deleteWebsite(uid, wid)
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

    function findWebIndexById(websiteId) {
        for(var i = 0; i < websites.length; i++)
        {
            if( websites[i]._id === websiteId)
                return i;
        }
        return -1;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }


};