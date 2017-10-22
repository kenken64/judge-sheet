(function () {
    var myApp = angular
        .module("JudgeSheetApp", [
            'ui.router',
            'ui.bootstrap',
            'LocalStorageModule'
        ]);

    myApp.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('JudgeSheetApp')
            .setStorageType('sessionStorage')
            .setNotify(true, true)
        }]);
})();