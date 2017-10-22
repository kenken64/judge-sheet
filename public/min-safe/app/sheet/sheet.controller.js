(function () {
    angular
        .module("JudgeSheetApp")
        .controller("SheetCtrl", ["$http",'$state', '$scope', 'JudgeSheetAppAPI','localStorageService' , SheetCtrl]);

    function SheetCtrl($http,$state, $scope, JudgeSheetAppAPI,localStorageService) {
        var self = this;
        var selectedGlobalRun = localStorageService.get("selectedGlobalRun");
        var judgeName = localStorageService.get("judge_name");
        
        self.gradedProject = {
            totalScore: 0
        };

        self.sumUp = function(){
            console.log(self.gradedProject.totalScore);
            self.gradedProject.totalScore=0;
            self.gradedProject.totalScore = self.gradedProject.presentationq + self.gradedProject.businessv 
                + self.gradedProject.demoq + self.gradedProject.potential;
        };

        self.saveScore = function(){
            self.gradedProject.selectedGlobalRun = selectedGlobalRun;
            self.gradedProject.judgeName = judgeName;
            console.log(" --> " + self.gradedProject.projectName);
            JudgeSheetAppAPI.saveScore(self.gradedProject).then((result)=>{
                self.gradedProject = result.data;
                self.gradedProject.message = "Graded !";
                $state.go('score-sheet');
            }).catch((error)=>{
                console.log(error);
            });
        };

        self.message = function(x ,y){
            console.log(x);
            console.log(y);
        }

        $scope.$watch('activeForm', function(newVal) {
            var selectedRun = localStorageService.get("selectedGlobalRun");
            if(newVal != null){
                console.log("newVal > " + newVal);   //listen to tab change events
                self.gradedProject.projectName = self.projects[parseInt(newVal)];
                console.log(self.gradedProject.projectName);
                console.log(judgeName);
                if(self.gradedProject.totalScore == NaN){
                    console.log("totalScore!");
                    self.gradedProject.totalScore = 0;
                }
                JudgeSheetAppAPI.getScore(self.gradedProject.projectName.name, selectedRun
                    ,judgeName).then((result)=>{
                    if(result !=null){
                        self.gradedProject = result.data;
                    }else{
                        console.log(">>>>");
                        self.gradedProject.totalScore = 0;
                    }
                    if(self.gradedProject == null){
                        self.gradedProject = {

                        }
                        self.gradedProject.projectName = self.projects[parseInt(newVal)];
                    }
                    console.log(result.data);
                }).catch((error)=>{
                    console.log(error);
                });
            }
        });

        self.initForm = function (){
            if(self.gradedProject.totalScore == NaN){
                console.log("totalScore!");
                self.gradedProject.totalScore = 0;
            }
            JudgeSheetAppAPI.getAllTeam(selectedGlobalRun).then((result)=>{
                self.projects = result.data;
            }).catch((error)=>{
                console.log(error);
            });
        };

        $scope.$on("selectedRunChanged",function(){
            var selectedRun = localStorageService.get("selectedGlobalRun");
            console.log("refresh sheet list  " + selectedRun);
            if(self.gradedProject.totalScore == NaN){
                console.log("totalScore!");
                self.gradedProject.totalScore = 0;
            }
            JudgeSheetAppAPI.getAllTeam(selectedRun).then((result)=>{
                self.projects = result.data;
            }).catch((error)=>{
                console.log(error);
            });
        });

        self.initForm();
        
    }
})();