(function () {
    angular
        .module("JudgeSheetApp")
        .controller("JudgeCtrl", ["$http",'$state' ,JudgeCtrl]);

    function JudgeCtrl($http,$state) {
        var self = this;

        self.onSubmit = onSubmit;
        self.initForm = initForm;

        self.judgeInfo = {

        }

        self.batchruns =[{
            runNo: 1,
            runName: "2017 R3"
        }, {
            runNo: 2,
            runName: "2017 R4"
        }]; 

        function  initForm(){
            self.judgeInfo.batchrun = "1";
        }
        
        function onSubmit(){
            console.log("submit to server side");
            $http.post("/api/v1/judge", self.judgeInfo).then((result)=>{
                //console.log("result > "+ JSON.stringify(result));
                $state.go("score-sheet");
            }).catch((error)=>{
                console.log("error > "+ error);
            })
        }
        self.initForm();
    }
})();