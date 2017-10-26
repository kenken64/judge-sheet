(function () {
    angular
        .module("JudgeSheetApp")
        .controller("JudgeCtrl", ["$http",'$state', 'localStorageService', 'JudgeSheetAppAPI' ,JudgeCtrl]);

    function JudgeCtrl($http,$state, localStorageService, JudgeSheetAppAPI) {
        var self = this;

        self.onSubmit = onSubmit;
        self.initForm = initForm;

        self.judgeInfo = {

        }

        function  initForm(){
            JudgeSheetAppAPI.getAllRuns().then((result)=>{
                self.batchruns = result.data;
                console.log(self.batchruns[0].runName);
            }).catch((error)=>{
                console.log(error);
            });
            self.judgeInfo.batchrun = null;
        }
        
        function onSubmit(){
            console.log("submit to server side");
            $http.post("/api/v1/judge", self.judgeInfo).then((result)=>{
                console.log(self.judgeInfo.judgename);
                console.log(self.judgeInfo.batchrun);
                localStorageService.set("judge_name", self.judgeInfo.judgename);
                localStorageService.set("selectedGlobalRun", self.judgeInfo.batchrun);
                $state.go("score-sheet");
            }).catch((error)=>{
                console.log("error > "+ error);
            })
        }
        self.initForm();
        console.log(self.judgeInfo.batchrun);
    }
})();