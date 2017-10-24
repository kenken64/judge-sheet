(function () {
    angular
        .module("JudgeSheetApp")
        .controller("JudgesCtrl", ["$http",'$state','$document','$uibModal', '$scope', 'localStorageService', 'JudgeSheetAppAPI', JudgesCtrl])
        .controller("AddJudgeCtrl", ["$http",'$state','$uibModalInstance', 'items' , '$rootScope', 'JudgeSheetAppAPI', AddJudgeCtrl]);

    function AddJudgeCtrl($http,$state,$uibModalInstance, items, $rootScope, JudgeSheetAppAPI){
        var self = this;
        self.judge = {

        };

        self.runs = [];
        
        JudgeSheetAppAPI.getAllRuns().then((result)=>{
            console.log(result.data);
            self.runs = result.data;
        }).catch((error)=>{
            console.log(error);
        });

        self.saveJudge = function(){
            JudgeSheetAppAPI.addJudge(self.judge).then((result)=>{
                console.log(result);
                $rootScope.$broadcast('updateJudgesList');
                $uibModalInstance.close(self.judge);
            }).catch((error)=>{
                console.log(error);
            })
        }

    }

    function JudgesCtrl($http,$state, $document,$uibModal, $scope, localStorageService, JudgeSheetAppAPI) {
        var self = this;
        var selectedRun = localStorageService.get("selectedGlobalRun");
        self.totalItems = 0;
        self.itemsPerPage = 5;
        self.currentPage = 1;
        self.maxSize = 5; // control this number of display items on the pagination.

        JudgeSheetAppAPI.getAllJudges(selectedRun).then((result)=>{
            console.log(result);
            self.data = result.data;
            JudgeSheetAppAPI.sumOfJudges().then(function(result){
                console.log(">>>> " + result);
                self.totalItems = result.sum;
            });
        }).catch((error)=>{
            console.log(error);
        });

        $scope.$on("updateJudgesList",function(){
                var selectedRun = localStorageService.get("selectedGlobalRun");
                console.log("refresh judge list");
                JudgeSheetAppAPI.getAllJudges(selectedRun).then((result)=>{
                    self.data = result.data;
                    JudgeSheetAppAPI.sumOfJudges().then(function(result){
                        console.log(result);
                        self.totalItems = result.sum;
                    });
                }).catch((error)=>{
                    console.log(error);
                });
        });

        $scope.$on("selectedRunChanged",function(){
            var selectedRun = localStorageService.get("selectedGlobalRun");
            console.log("refresh judge list");
            JudgeSheetAppAPI.getAllJudges(selectedRun).then((result)=>{
                self.data = result.data;
                JudgeSheetAppAPI.sumOfJudges().then(function(result){
                    console.log(result);
                    self.totalItems = result.sum;
                });
            }).catch((error)=>{
                console.log(error);
            });
        });
        
        self.open = function (size, parentSelector) {
            var parentElem = parentSelector ? 
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: self.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '../app/admin/addJudge.html',
                controller: 'AddJudgeCtrl',
                controllerAs: 'ctrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return self.items;
                    }
                }
            }).result.catch(function (resp) {
                if (['cancel', 'backdrop click', 'escape key press'].indexOf(resp) === -1) throw resp;
            });
        };

        self.pageChanged = function(){
            console.log('Page changed to: ' + vm.currentPage);
            var selectedRun = localStorageService.get("selectedGlobalRun");
            console.log("refresh pagination judge list");
            JudgeSheetAppAPI.getAllJudges(selectedRun, vm.itemsPerPage, vm.currentPage).then((result)=>{
                self.data = result.data;
                JudgeSheetAppAPI.sumOfJudges().then(function(result){
                    console.log(result);
                    self.totalItems = result.sum;
                });
            }).catch((error)=>{
                console.log(error);
            });
        };
    
    }
})();