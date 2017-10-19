(function () {
    angular
        .module("JudgeSheetApp")
        .controller("AdminCtrl", ["$http",'$state','$document','$uibModal',AdminCtrl])
        .controller("AddTeamCtrl", ["$http",'$state','$uibModalInstance', 'items' ,AddTeamCtrl]);

    function AddTeamCtrl($http,$state,$uibModalInstance, items){

    }

    function AdminCtrl($http,$state, $document,$uibModal) {
        var self = this;
        self.data = [
            { projectName: 'FitLy', members: [{name:"Person A"},{name:"Person B"} ] },
            { projectName: 'FitLy2', members: [{name:"Person A"},{name:"Person B"} ] },
            { projectName: 'FitLy3', members: [{name:"Person A"},{name:"Person C"} ] },
            { projectName: 'FitLy4', members: [{name:"Person A"} ] },
            { projectName: 'FitLy5', members: [{name:"Person A"},{name:"Person B"} ] }
        ];

        self.open = function (size, parentSelector) {
            var parentElem = parentSelector ? 
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: self.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '../app/admin/addTeam.html',
                controller: 'AddTeamCtrl',
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