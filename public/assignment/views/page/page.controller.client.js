(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)
        .controller("NewPageController", NewPageController)
        .controller("PageListController", PageListController);

    function EditPageController($routeParams, PageService) {
        var vm = this;
        var userId = $routeParams.uid;
        var pageId = $routeParams.pid;
        var page = PageService.findPageById(pageId);
        vm.page = page;
        vm.userId = userId;
    }

    function NewPageController() {
        var vm = this;
    }

    function PageListController($routeParams, PageService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pages = PageService.findPageByWebsiteId(websiteId);
        vm.pages = pages;
        vm.userId = userId;
    }
})();
