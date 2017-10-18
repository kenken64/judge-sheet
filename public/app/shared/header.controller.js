(function () {
    angular
        .module("JudgeSheetApp")
        .controller("HeaderController", ["$location" ,HeaderController]);

    function HeaderController($location) {
        var self = this;
        self.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };
    }
})();