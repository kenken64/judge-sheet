angular.module("JudgeSheetApp",["ui.router","ui.bootstrap","LocalStorageModule"]).config(["localStorageServiceProvider",function(e){e.setPrefix("JudgeSheetApp").setStorageType("sessionStorage").setNotify(!0,!0)}]),function(){angular.module("JudgeSheetApp").controller("AdminCtrl",["$http","$state","$document","$uibModal","$scope","localStorageService","JudgeSheetAppAPI",function(e,t,o,l,n,a,c){var r=this,d=a.get("selectedGlobalRun");r.data=[],c.getAllTeam(d).then(e=>{r.data=e.data}).catch(e=>{console.log(e)}),n.$on("updateTeamList",function(){console.log("refresh Team list");var e=a.get("selectedGlobalRun");c.getAllTeam(e).then(e=>{r.data=e.data}).catch(e=>{console.log(e)})}),n.$on("selectedRunChanged",function(){var e=a.get("selectedGlobalRun");console.log("refresh judge list"),c.getAllTeam(e).then(e=>{r.data=e.data}).catch(e=>{console.log(e)})}),r.open=function(e,t){var n=t?angular.element(o[0].querySelector(".modal-demo "+t)):void 0;l.open({animation:r.animationsEnabled,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"../app/admin/addTeam.html",controller:"AddTeamCtrl",controllerAs:"ctrl",size:e,appendTo:n,resolve:{items:function(){return r.items}}}).result.catch(function(e){if(-1===["cancel","backdrop click","escape key press"].indexOf(e))throw e})}}]).controller("AddTeamCtrl",["$http","$state","$uibModalInstance","items","$rootScope","JudgeSheetAppAPI",function(e,t,o,l,n,a){var c=this;c.team={},a.getAllRuns().then(e=>{console.log(e),c.runs=e.data}).catch(e=>{console.log(e)}),c.saveTeam=function(){a.addTeam(c.team).then(e=>{console.log(e),n.$broadcast("updateTeamList"),o.close(c.run)}).catch(e=>{console.log(e)})}}])}(),function(){angular.module("JudgeSheetApp").controller("BatchRunsCtrl",["$http","$state","$document","$uibModal","$scope","JudgeSheetAppAPI",function(e,t,o,l,n,a){var c=this;c.data=[],a.getAllRuns().then(e=>{console.log(e),c.data=e.data}).catch(e=>{console.log(e)}),n.$on("updateRunList",function(){console.log("refresh run list"),a.getAllRuns().then(e=>{c.data=e.data}).catch(e=>{console.log(e)})}),c.open=function(e,t){var n=t?angular.element(o[0].querySelector(".modal-demo "+t)):void 0;l.open({animation:c.animationsEnabled,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"../app/admin/addBatchRun.html",controller:"AddBatchRunsCtrl",controllerAs:"ctrl",size:e,appendTo:n,resolve:{items:function(){return c.items}}}).result.catch(function(e){if(-1===["cancel","backdrop click","escape key press"].indexOf(e))throw e})}}]).controller("AddBatchRunsCtrl",["$uibModalInstance","items","$rootScope","JudgeSheetAppAPI",function(e,t,o,l){var n=this;n.run={},n.batchrunform={},n.saveRun=function(){console.log(n.runName),console.log(n.year),l.addRun(n.run).then(t=>{console.log(t),o.$broadcast("updateRunList"),e.close(n.run)}).catch(e=>{console.log(e)})}}])}(),function(){angular.module("JudgeSheetApp").controller("JudgesCtrl",["$http","$state","$document","$uibModal","$scope","localStorageService","JudgeSheetAppAPI",function(e,t,o,l,n,a,c){var r=this,d=a.get("selectedGlobalRun");c.getAllJudges(d).then(e=>{console.log(e),r.data=e.data}).catch(e=>{console.log(e)}),n.$on("updateJudgesList",function(){var e=a.get("selectedGlobalRun");console.log("refresh judge list"),c.getAllJudges(e).then(e=>{r.data=e.data}).catch(e=>{console.log(e)})}),n.$on("selectedRunChanged",function(){var e=a.get("selectedGlobalRun");console.log("refresh judge list"),c.getAllJudges(e).then(e=>{r.data=e.data}).catch(e=>{console.log(e)})}),r.open=function(e,t){var n=t?angular.element(o[0].querySelector(".modal-demo "+t)):void 0;l.open({animation:r.animationsEnabled,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"../app/admin/addJudge.html",controller:"AddJudgeCtrl",controllerAs:"ctrl",size:e,appendTo:n,resolve:{items:function(){return r.items}}}).result.catch(function(e){if(-1===["cancel","backdrop click","escape key press"].indexOf(e))throw e})}}]).controller("AddJudgeCtrl",["$http","$state","$uibModalInstance","items","$rootScope","JudgeSheetAppAPI",function(e,t,o,l,n,a){var c=this;c.judge={},c.runs=[],a.getAllRuns().then(e=>{console.log(e.data),c.runs=e.data}).catch(e=>{console.log(e)}),c.saveJudge=function(){a.addJudge(c.judge).then(e=>{console.log(e),n.$broadcast("updateJudgesList"),o.close(c.judge)}).catch(e=>{console.log(e)})}}])}(),function(){function e(e,t){e.state("Home",{url:"/home",templateUrl:"../app/judge/judge.html",controller:"JudgeCtrl",controllerAs:"ctrl"}).state("score-sheet",{url:"/score-sheet",templateUrl:"../app/sheet/sheet.html",controller:"SheetCtrl",controllerAs:"ctrl"}).state("compute",{url:"/compute",templateUrl:"../app/compute/compute.html",controller:"ComputeCtrl",controllerAs:"ctrl"}).state("admin",{url:"/admin",templateUrl:"../app/admin/admin.html",controller:"AdminCtrl",controllerAs:"ctrl"}).state("runs",{url:"/runs",templateUrl:"../app/admin/batchruns.html",controller:"BatchRunsCtrl",controllerAs:"ctrl"}).state("judges",{url:"/judges",templateUrl:"../app/admin/judges.html",controller:"JudgesCtrl",controllerAs:"ctrl"}),t.otherwise("/home")}angular.module("JudgeSheetApp").config(e),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){angular.module("JudgeSheetApp").controller("ComputeCtrl",["$http","$state","JudgeSheetAppAPI","localStorageService","$scope",function(e,t,o,l,n){function a(e){o.getResult(e).then(e=>{console.log(e.data),c.data=e.data}).catch(e=>{console.log(e)})}var c=this;a(l.get("selectedGlobalRun")),n.$on("selectedRunChanged",function(){var e=l.get("selectedGlobalRun");console.log("refresh result list  "+e),a(e)})}])}(),function(){angular.module("JudgeSheetApp").controller("JudgeCtrl",["$http","$state","localStorageService","JudgeSheetAppAPI",function(e,t,o,l){var n=this;n.onSubmit=function(){console.log("submit to server side"),e.post("/api/v1/judge",n.judgeInfo).then(e=>{console.log(n.judgeInfo.judgename),console.log(n.judgeInfo.batchrun),o.set("judge_name",n.judgeInfo.judgename),o.set("selectedGlobalRun",n.judgeInfo.batchrun),t.go("score-sheet")}).catch(e=>{console.log("error > "+e)})},n.initForm=function(){l.getAllRuns().then(e=>{n.batchruns=e.data}).catch(e=>{console.log(e)}),n.judgeInfo.batchrun="0"},n.judgeInfo={},n.initForm(),console.log(n.judgeInfo.batchrun)}])}(),function(){angular.module("JudgeSheetApp").service("JudgeSheetAppAPI",["$http",function(e){var t=this;const o="/api/v1/";console.log("JudgeSheetAppAPI"),t.getAllJudges=function(t){return e.get(`${o}judges?run=${t}`)},t.addJudge=function(t){return e.post(`${o}judges`,t)},t.isJudgeValid=function(t){return e.get(`${o}judges/isValid/${t}`)},t.addRun=function(t){return e.post(`${o}runs`,t)},t.getAllRuns=function(){return e.get(`${o}runs`)},t.saveScore=function(t){return e.post(`${o}scores`,t)},t.getScore=function(t,l,n){return e.get(`${o}scores?runNo=${l}&projectName=${t}&judgeName=${n}`)},t.getResult=function(t){return e.get(`${o}result?runNo=${t}`)},t.addTeam=function(t){return e.post(`${o}team`,t)},t.getAllTeam=function(t){return e.get(`${o}team/${t}`)}}])}(),function(){function e(e,t,o,l,n){var a=this;a.judgename=t.get("judge_name"),console.log(a.judgename),a.change=function(e){console.log(a.selectedGlobalRun),t.set("selectedGlobalRun",a.selectedGlobalRun),l.$broadcast("selectedRunChanged")},a.initForm=function(){n.getAllRuns().then(e=>{a.navbatchruns=e.data}).catch(e=>{console.log(e)}),a.selectedGlobalRun=t.get("selectedGlobalRun")},o.$on("updateRunList",function(){console.log("refresh run list"),n.getAllRuns().then(e=>{a.navbatchruns=e.data}).catch(e=>{console.log(e)})}),a.isActive=function(t){return t===e.path()},a.initForm()}angular.module("JudgeSheetApp").controller("HeaderController",e),e.$inject=["$location","localStorageService","$scope","$rootScope","JudgeSheetAppAPI"]}(),function(){angular.module("JudgeSheetApp").controller("SheetCtrl",["$http","$state","$scope","JudgeSheetAppAPI","localStorageService",function(e,t,o,l,n){var a=this,c=n.get("selectedGlobalRun"),r=n.get("judge_name");a.gradedProject={totalScore:0},a.sumUp=function(){console.log(a.gradedProject.totalScore),a.gradedProject.totalScore=0,a.gradedProject.totalScore=a.gradedProject.presentationq+a.gradedProject.businessv+a.gradedProject.demoq+a.gradedProject.potential},a.saveScore=function(){a.gradedProject.selectedGlobalRun=c,a.gradedProject.judgeName=r,console.log(" --\x3e "+a.gradedProject.projectName),l.saveScore(a.gradedProject).then(e=>{a.gradedProject=e.data,a.gradedProject.message="Graded !",t.go("score-sheet")}).catch(e=>{console.log(e)})},a.message=function(e,t){console.log(e),console.log(t)},o.$watch("activeForm",function(e){var t=n.get("selectedGlobalRun");null!=e&&(console.log("newVal > "+e),a.gradedProject.projectName=a.projects[parseInt(e)],console.log(a.gradedProject.projectName),console.log(r),NaN==a.gradedProject.totalScore&&(console.log("totalScore!"),a.gradedProject.totalScore=0),l.getScore(a.gradedProject.projectName.name,t,r).then(t=>{null!=t?a.gradedProject=t.data:(console.log(">>>>"),a.gradedProject.totalScore=0),null==a.gradedProject&&(a.gradedProject={},a.gradedProject.projectName=a.projects[parseInt(e)]),console.log(t.data)}).catch(e=>{console.log(e)}))}),a.initForm=function(){NaN==a.gradedProject.totalScore&&(console.log("totalScore!"),a.gradedProject.totalScore=0),l.getAllTeam(c).then(e=>{a.projects=e.data}).catch(e=>{console.log(e)})},o.$on("selectedRunChanged",function(){var e=n.get("selectedGlobalRun");console.log("refresh sheet list  "+e),NaN==a.gradedProject.totalScore&&(console.log("totalScore!"),a.gradedProject.totalScore=0),l.getAllTeam(e).then(e=>{a.projects=e.data}).catch(e=>{console.log(e)})}),a.initForm()}])}();