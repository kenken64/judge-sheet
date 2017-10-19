(function () {
    angular
        .module("JudgeSheetApp")
        .controller("HeaderController", ["$location", "localStorageService" ,HeaderController]);

    function HeaderController($location, localStorageService) {
        var self = this;
        self.judgename = localStorageService.get("judge_name");
        console.log(self.judgename);
        self.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };
    }
})();