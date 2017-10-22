(function () {
    angular
        .module("JudgeSheetApp")
        .controller("AdminCtrl", ["$http",'$state','$document','$uibModal', '$scope', 'localStorageService', 'JudgeSheetAppAPI',AdminCtrl])
        .controller("AddTeamCtrl", ["$http",'$state','$uibModalInstance', 'items' , '$rootScope', 'JudgeSheetAppAPI',AddTeamCtrl]);

    function AddTeamCtrl($http,$state,$uibModalInstance, items, $rootScope, JudgeSheetAppAPI){
        var self = this;
        self.team = {

        };

        JudgeSheetAppAPI.getAllRuns().then((result)=>{
            console.log(result);
            self.runs = result.data;
        }).catch((error)=>{
            console.log(error);
        });

        self.saveTeam = function(){
            JudgeSheetAppAPI.addTeam(self.team).then((result)=>{
                console.log(result);
                $rootScope.$broadcast('updateTeamList');
                $uibModalInstance.close(self.run);
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    function AdminCtrl($http,$state, $document,$uibModal, $scope,localStorageService,  JudgeSheetAppAPI) {
        var self = this;
        var selectedRun = localStorageService.get("selectedGlobalRun");
        self.data = [];
        
        JudgeSheetAppAPI.getAllTeam(selectedRun).then((result)=>{
            self.data = result.data;
        }).catch((error)=>{
            console.log(error);
        })

        $scope.$on("updateTeamList",function(){
            console.log("refresh Team list");
            var selectedRun = localStorageService.get("selectedGlobalRun");
            JudgeSheetAppAPI.getAllTeam(selectedRun).then((result)=>{
                self.data = result.data;
            }).catch((error)=>{
                console.log(error);
            });
        });

        $scope.$on("selectedRunChanged",function(){
            var selectedRun = localStorageService.get("selectedGlobalRun");
            console.log("refresh judge list");
            JudgeSheetAppAPI.getAllTeam(selectedRun).then((result)=>{
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
                templateUrl: '../app/admin/addTeam.html',
                controller: 'AddTeamCtrl',
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