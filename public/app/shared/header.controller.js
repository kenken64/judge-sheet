(function () {
    angular
        .module("JudgeSheetApp")
        .controller("HeaderController", HeaderController);

    HeaderController.$inject = ['$location', 'localStorageService', '$scope', 
                                '$rootScope', 'JudgeSheetAppAPI'];

    function HeaderController($location, localStorageService, $scope, $rootScope, JudgeSheetAppAPI) {
        var self = this;
        self.judgename = localStorageService.get("judge_name");
        console.log(self.judgename);
        
        self.change = function(selectedRunDesc){
            console.log(self.selectedGlobalRun);
            localStorageService.set("selectedGlobalRun", self.selectedGlobalRun);
            $rootScope.$broadcast('selectedRunChanged');
        };

        self.initForm = function () {
            JudgeSheetAppAPI.getAllRuns().then((result)=>{
                self.navbatchruns = result.data;
            }).catch((error)=>{
                console.log(error);
            });
            self.selectedGlobalRun = localStorageService.get("selectedGlobalRun");
        }
        

        $scope.$on("updateRunList",function(){
                console.log("refresh run list");
                JudgeSheetAppAPI.getAllRuns().then((result)=>{
                    self.navbatchruns = result.data;
                }).catch((error)=>{
                    console.log(error);
                });
        });

        self.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };

        self.initForm();;
    }
})();