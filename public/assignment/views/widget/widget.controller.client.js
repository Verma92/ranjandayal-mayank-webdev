/**
 * Created by mayank on 10/17/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

/*        .controller("WidgetHeadingController", WidgetHeadingController)
        .controller("WidgetImageController", WidgetImageController)
        .controller("WidgetChooseController", WidgetChooseController)
        .controller("WidgetYoutubeController", WidgetYoutubeController);*/

    function WidgetListController() {
        var vm = this;
    }
    function NewWidgetController() {
        var vm = this;
    }
    function EditWidgetController() {
        var vm = this;
    }
/*    function WidgetChooseController() {  }
    function WidgetYoutubeController() {  }*/
})();