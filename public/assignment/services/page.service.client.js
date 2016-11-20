(function (){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService)

    function PageService($http){

       /* var pages =  [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];*/

        var api = {
            createPage:createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        function createPage(websiteId, page)
        {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);

           /* page.websiteId = websiteId;
            var newPid;
            do {
                newPid = getRandomInt(0, 1000).toString();
                if (findPageById(newPid) === null)
                {
                    page._id = newPid;
                    pages.push(page);
                    return page;
                }
            }while(1);*/
        }

        function findPageByWebsiteId(websiteId)
        {
            console.log(websiteId);

            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url);

        }

        function findPageById(pageId)
        {
            console.log("findpagebyid called");
            var url = "/api/page/"+pageId;
            console.log($http.get(url));
            var promise = $http.get(url);
            promise
                .success(function(page) {
                    console.log("success");
                    console.log(page);
                });
            return $http.get(url);

           /* console.log("findpagebyid service client");
            console.log(pageId);
            console.log(pages);
            for (var p in pages)
            {
                page = pages[p];

                if(parseInt(page._id) === parseInt(pageId)) {
                    console.log(page);
                    return page;

                }
            }
            return null;*/
        }

        function updatePage(pageId, page)
        {
            var url = "/api/page/"+pageId;
            return $http.put(url, page);

            /*console.log("updatepage function");
            console.log(page);
            var pageIndex = findPageIndexById(pageId);
            if(pageIndex === -1)
            {
                console.log("null return");
                return null;
            }
            else
            {
                pages[pageIndex] = page;
                console.log(pages);
                return pages[pageIndex];
            }*/
        }

        function deletePage(pageId)
        {
            var url = "/api/page/"+pageId;
            return $http.delete(url);

           /* var pageIndex = findPageIndexById(pageId);
            if(pageIndex === -1)
            {
                return false;
            }
            else
            {
                pages.splice(pageIndex, 1);
                return true;
            }*/
        }

       /* function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function findPageIndexById(pageId) {
            for(var i = 0; i < pages.length; i++)
            {
                if( pages[i]._id === pageId)
                    return i;
            }
            return -1;
        }*/
    }

})();