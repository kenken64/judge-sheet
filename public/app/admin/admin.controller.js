(function () {
    angular
        .module("JudgeSheetApp")
        .controller("AdminCtrl", ["$http",'$state' ,AdminCtrl]);

    function AdminCtrl($http,$state) {
        var self = this;
        self.data = [
            { projectName: 'FitLy', members: [{name:"Person A"},{name:"Person B"} ] },
            { projectName: 'FitLy2', members: [{name:"Person A"},{name:"Person B"} ] },
            { projectName: 'FitLy3', members: [{name:"Person A"},{name:"Person C"} ] },
            { projectName: 'FitLy4', members: [{name:"Person A"} ] },
            { projectName: 'FitLy5', members: [{name:"Person A"},{name:"Person B"} ] }
        ];
    
    }
})();