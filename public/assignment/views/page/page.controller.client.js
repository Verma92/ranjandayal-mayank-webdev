(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)
        .controller("NewPageController", NewPageController)
        .controller("PageListController", PageListController);

    function EditPageController($routeParams, PageService, $location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var pageId = $routeParams.pid;
        var websiteId = $routeParams.wid;
        console.log(pageId);
        var promise = PageService.findPageById(pageId);
        console.log("findPageById called from controller");

        promise
            .success(function(page) {
                console.log("success controller");
                console.log(page);
                vm.page = page;
            });

        function init()
        {
            //vm.page = pageOut;
            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.pageId = pageId;
            vm.updatePage = updatePage;
            vm.deletePage = deletePage;
        }
        init();

        function updatePage()
        {
            if(typeof page === "undefined") {
                vm.alert = "Name is required !"
            }
            else {
                i
                    console.log("update page controller");
                    console.log(vm.page);
                    PageService.updatePage(pageId, vm.page);
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");

            }
        }

        function deletePage()
        {
            PageService.deletePage(pageId, websiteId);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page");
        }
    }

    function NewPageController($routeParams, PageService, $location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        function init()
        {
            vm.createPage = createPage;
            vm.userId = userId;
            vm.websiteId = websiteId;
        }
        init();

        function createPage(page)
        {
            if(typeof page === "undefined") {
                vm.alert = "Name is required !"
            }
            else{
                if(typeof page.name === "undefined"){
                    vm.alert = "Name is required !"
                }
                else{
                    PageService.createPage(websiteId, page);
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                }
            }
        }
    }

    function PageListController($routeParams, PageService)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.websiteId = websiteId;

        var promise = PageService.findPageByWebsiteId(websiteId);
        promise
            .success(function(pages) {
                console.log("pages");
                console.log(pages);
                vm.pages = pages;
            });
    }
})();
