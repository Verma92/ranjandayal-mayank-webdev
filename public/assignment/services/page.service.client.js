(function (){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService)

    function PageService(){

        var pages =  [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            createPage:createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        function createPage(websiteId, page) {

        }

        function findPageByWebsiteId(websiteId) {
            console.log(websiteId);
            var result = [];
            for (var w in pages) {
                page = pages[w];
                console.log(page);
                if(parseInt(page.websiteId) === parseInt(websiteId)) {
                    result.push(page);
                }
            }
            return result;
        }

        function findPageById(pageId) {
            console.log(pageId);
            for (var p in pages) {
                page = pages[p];

                if(parseInt(page._id) === parseInt(pageId)) {
                    console.log(page);
                    return page;

                }
            }
            return null;
        }

        function updatePage(pageId, page) {

        }

        function deletePage(pageId) {

        }
    }

})();