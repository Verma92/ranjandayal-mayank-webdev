/**
 * Created by mayank on 10/15/16.
 */

(function() {
    angular.module("WebAppMaker") .config(Config);

    function Config($routeProvider) {
        console.log("inside route provider");
        $routeProvider

            .when("/login", {
                templateUrl: "/assignment/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/", {
                templateUrl: "/assignment/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("default", {
                templateUrl: "/assignment/views/user/login.view.client.html"
            })

            .when("/register", {
                templateUrl: "/assignment/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "/assignment/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

            .when("/user/:uid", {
                templateUrl: "/assignment/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

            .when("/page-edit", {
                templateUrl: "/assignment/views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "/assignment/views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })

            .when("/page-list", {
                templateUrl: "/assignment/views/page/page-list.view.client.html",
                controller: "ListPageController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page", {
                templateUrl: "/assignment/views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })

            .when("/page-new", {
                templateUrl: "/assignment/views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "/assignment/views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })

            .when("/website-new", {
                templateUrl: "/assignment/views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/new", {
                templateUrl: "/assignment/views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })

            .when("/website-list", {
                templateUrl: "/assignment/views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })

            .when("/user/:uid/website", {
                templateUrl: "/assignment/views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })

            .when("/website-edit", {
                templateUrl: "/assignment/views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid", {
                templateUrl: "/assignment/views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })

            .when("/widget-youtube", {
                templateUrl: "/assignment/views/widget/widget-youtube.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"

            })

            .when("/widget-choose", {
                templateUrl: "/assignment/views/widget/widget-choose.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "/assignment/views/widget/widget-choose.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })

            .when("/widget-heading", {
                templateUrl: "/assignment/views/widget/widget-heading.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })

            .when("/widget-image", {
                templateUrl: "/assignment/views/widget/widget-image.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "/assignment/views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "/assignment/views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })

            .when("/website/:wid", {
                templateUrl: "/assignment/views/website/website-edit.view.client.html"
            })
/*
            .otherwise({
                redirectTo: "/login"
            });*/

    }
})();