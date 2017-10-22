(function () {
    angular
        .module("JudgeSheetApp")
        .controller("BatchRunsCtrl", ["$http",'$state', '$document','$uibModal', '$scope', 'JudgeSheetAppAPI',BatchRunsCtrl])
        .controller("AddBatchRunsCtrl", ["$uibModalInstance", 'items', '$rootScope', 'JudgeSheetAppAPI', AddBatchRunsCtrl]);
        
    
    function AddBatchRunsCtrl($uibModalInstance, items, $rootScope, JudgeSheetAppAPI){
        var self = this;
        self.run = {

        }

        self.batchrunform = {

        }
        self.saveRun = function(){
            console.log(self.runName);
            console.log(self.year);
            JudgeSheetAppAPI.addRun(self.run).then((result)=>{
                console.log(result);
                $rootScope.$broadcast('updateRunList');
                $uibModalInstance.close(self.run);
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    function BatchRunsCtrl($http, $state, $document, $uibModal, $scope, JudgeSheetAppAPI) {
        var self = this;
        self.data = [];

        JudgeSheetAppAPI.getAllRuns().then((result)=>{
            console.log(result);
            self.data = result.data;
        }).catch((error)=>{
            console.log(error);
        });

        $scope.$on("updateRunList",function(){
                console.log("refresh run list");
                JudgeSheetAppAPI.getAllRuns().then((result)=>{
                    self.data = result.data;
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
                templateUrl: '../app/admin/addBatchRun.html',
                controller: 'AddBatchRunsCtrl',
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
    }
})();