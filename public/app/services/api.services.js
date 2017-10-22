(function(){
    angular
        .module("JudgeSheetApp")
        .service("JudgeSheetAppAPI", [
            '$http',
            JudgeSheetAppAPI
        ]);
    
    function JudgeSheetAppAPI($http){
        var self = this;
        const URL = "/api/v1/";
        console.log("JudgeSheetAppAPI");
        
        self.getAllJudges = function(selectedRun){
            return $http.get(`${URL}judges?run=${selectedRun}`);
        };

        self.addJudge = function(judge){
            return $http.post(`${URL}judges`, judge);
        };

        self.isJudgeValid = function(name){
            return $http.get(`${URL}judges/isValid/${name}`);
        };

        self.addRun = function(run){
            return $http.post(`${URL}runs`, run);
        };

        self.getAllRuns = function(){
            return $http.get(`${URL}runs`);
        };

        self.saveScore = function(score){
            return $http.post(`${URL}scores`, score);
        };

        self.getScore = function(projectName, runNo, judgeName){
            return $http.get(`${URL}scores?runNo=${runNo}&projectName=${projectName}&judgeName=${judgeName}`);
        };

        self.getResult = function(runNo){
            return $http.get(`${URL}result?runNo=${runNo}`);
        };

        self.addTeam = function(team){
            return $http.post(`${URL}team`, team);
        };

        self.getAllTeam = function(runNo){
            return $http.get(`${URL}team/${runNo}`);
        };
    }
})();