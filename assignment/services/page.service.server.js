/**
 * Created by mayank on 11/5/16.
 */
module.exports = function(app) {

    var pages =  [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    
    function createPage(){}
    
    function findAllPagesForWebsite() {}
    
    function findPageById() {
        
    }
    
    function updatePage() {
        
    }
    
    function deletePage() {
        
    }


};