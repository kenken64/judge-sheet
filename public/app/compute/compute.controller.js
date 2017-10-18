(function () {
    angular
        .module("JudgeSheetApp")
        .controller("ComputeCtrl", ["$http",'$state' ,ComputeCtrl]);

    function ComputeCtrl($http,$state) {
        var self = this;
        self.data = [
            { projectName: 'FitLy', grandTotal: 12 },
            { projectName: 'FitLy2', grandTotal: 12 },
            { projectName: 'FitLy3', grandTotal: 12 },
            { projectName: 'FitLy4', grandTotal: 12 },
            { projectName: 'FitLy5', grandTotal: 12 }
        ];
    }
})();