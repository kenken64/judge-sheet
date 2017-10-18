(function () {
    angular
        .module("JudgeSheetApp")
        .controller("SheetCtrl", ["$http",'$state' , SheetCtrl]);

    function SheetCtrl($http,$state) {
        var self = this;
        self.gradedProject = {
            totalScore: 0
        };
        
        self.projects = [{
            id: 0,
            project_name: "Fitly",
            members: ["Person A", "Person B"],
            remarks: "",
            totalScore: 0,
        },
        {
            id: 1,
            project_name: "Shareconomy",
            members: ["Person A"],
            remarks: "",
            totalScore: 0,
        },
        {
            id: 2,
            project_name: "Ask&View",
            members: ["Person A"],
            remarks: "",
            totalScore: 0,
        }
        ];
    }
})();