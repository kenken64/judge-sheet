(function () {
    angular
        .module("JudgeSheetApp")
        .config(judgeSheetAppConfig);
        judgeSheetAppConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    function judgeSheetAppConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("Home", {
                url: "/home",
                templateUrl: "../app/judge/judge.html",
                controller: 'JudgeCtrl',
                controllerAs: 'ctrl'
            })
            .state("score-sheet", {
                url: "/score-sheet",
                templateUrl: "../app/sheet/sheet.html",
                controller: 'SheetCtrl',
                controllerAs: 'ctrl'
            })
            .state("compute", {
                url: "/compute",
                templateUrl: "../app/compute/compute.html",
                controller: 'ComputeCtrl',
                controllerAs: 'ctrl'
            })
            .state("admin", {
                url: "/admin",
                templateUrl: "../app/admin/admin.html",
                controller: 'AdminCtrl',
                controllerAs: 'ctrl'
            })
            

        $urlRouterProvider.otherwise("/home");


    }
})();