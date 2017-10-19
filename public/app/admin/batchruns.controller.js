(function () {
    angular
        .module("JudgeSheetApp")
        .controller("BatchRunsCtrl", ["$http",'$state', '$document','$uibModal',BatchRunsCtrl])
        .controller("AddBatchRunsCtrl", ["$uibModalInstance", 'items', AddBatchRunsCtrl]);
        
    
    function AddBatchRunsCtrl($uibModalInstance, items){
        var self = this;
        
    }

    function BatchRunsCtrl($http,$state,$document,$uibModal) {
        var self = this;
        
        self.open = function (size, parentSelector) {
            var parentElem = parentSelector ? 
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: self.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '../app/admin/addBatchRun.html',
                controller: 'AddBatchRunsCtrl',
                controllerAs: '$ctrl',
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