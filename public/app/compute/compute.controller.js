(function () {
    angular
        .module("JudgeSheetApp")
        .controller("ComputeCtrl", ["$http",'$state' , 'JudgeSheetAppAPI', 'localStorageService', '$scope',ComputeCtrl]);

    function ComputeCtrl($http,$state, JudgeSheetAppAPI, localStorageService, $scope) {
        var self = this;
        
        var selectedRun = localStorageService.get("selectedGlobalRun");
        getResult(selectedRun);

        $scope.$on("selectedRunChanged",function(){
            var selectedRun = localStorageService.get("selectedGlobalRun");
            console.log("refresh result list  " + selectedRun);
            getResult(selectedRun);
        });

        function getResult(selectedRun){
            JudgeSheetAppAPI.getResult(selectedRun).then((result)=>{
                console.log(result.data);
                self.data = result.data;
            }).catch((error)=>{
                console.log(error);
            });
        }
    }
})();