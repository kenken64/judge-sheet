'use strict';

var responseTime = require('response-time');
var StatsD = require('node-statsd');
var stats = new StatsD();

const JUDGE_PAGE = "/#!/";
const API_ENDPOINT = "/api/v1/";

module.exports = function(app, dbs) {
    const JUDGES_COLLECTION = 'judges';
    const RUN_COLLECTION = 'run';
    const SCORE_COLLECTION = 'score';
    const TEAM_COLLECTION = 'team';
    
    app.post(`${API_ENDPOINT}judges`, (req, res)=>{ 
        console.log("judges ...");
        var judgesCollection = dbs.production.collection(JUDGES_COLLECTION);
        judgesCollection.insertOne(req.body, function(err, r) {
            console.log(err);
            res.status(200).json(r);
        });
    });

    app.get(`${API_ENDPOINT}judges/isValid/:name`, (req, res)=>{ 
        console.log("judges ...");
        var judgeName = req.params.name;
        query = { "name":judgeName}
        var judgesCollection = dbs.production.collection(JUDGES_COLLECTION);
        judgesCollection.count(query, function(err, judge){
            console.log(judge);
            res.status(200).json(judge);
        });  
    });

    app.get(`${API_ENDPOINT}judges`, (req, res)=>{ 
        console.log("get all judges ... " + req.query.run);
        var arrRun = (req.query.run).split(" - ");
        console.log(arrRun[0]);
        console.log(arrRun[1]);
        var pages_size = req.query.itemsPerPage;
        var current_page = req.query.currentPage;
        var skips = parseInt(pages_size) * (parseInt(current_page) - 1);
        console.log(skips);
        console.log(pages_size);
        console.log(current_page);
        var judgesCol = dbs.production.collection(JUDGES_COLLECTION);
        var query = { runNo: arrRun[0], year: arrRun[1]};
        judgesCol.find(query, {"judgeName":1, "runNo":1, "year":1, "_id":1})
            .skip(skips).limit(parseInt(pages_size))
            .toArray(function(err, judgeDocs){
            console.log(judgeDocs);
            res.status(200).json(judgeDocs);
        });
    });

    // count ...judges
    app.get(`${API_ENDPOINT}judges/sum`, (req, res)=>{ 
        console.log("get count for all judges ... " + req.query.run);
        var arrRun = (req.query.run).split(" - ");
        console.log(arrRun[0]);
        console.log(arrRun[1]);
        
        var judgesCol = dbs.production.collection(JUDGES_COLLECTION);
        var query = { runNo: arrRun[0], year: arrRun[1]};
        judgesCol.count(query, 
            function(err, cntJudges){
            console.log(cntJudges);
            res.status(200).json(cntJudges);
        });
    });
    
    app.post(`${API_ENDPOINT}runs`, (req, res)=>{ 
        console.log("runs ...");
        var runCollection = dbs.production.collection(RUN_COLLECTION);
        runCollection.insertOne(req.body, function(err, r) {
            console.log(err);
            res.status(200).json(r);
        });
    });

    app.get(`${API_ENDPOINT}runs`, (req, res)=>{ 
        console.log("get all runs ...");
        var runsCol = dbs.production.collection(RUN_COLLECTION);
        var query = { };
        runsCol.find(query, {"runName":1, "year":1,"_id":1})
            .toArray(function(err, runDocs){
            console.log(runDocs);
            res.status(200).json(runDocs);
        });
    });

    app.post(`${API_ENDPOINT}scores`, (req, res)=>{ 
        console.log("save scores ..." + JSON.stringify(req.body));
        var scoreCollection = dbs.production.collection(SCORE_COLLECTION);
        var projectName = req.body.projectName.name;
        var query = { selectedGlobalRun: req.body.selectedGlobalRun, 
            'projectName.name': req.body.projectName.name, 
            judgeName: req.body.judgeName};
        scoreCollection.count(query, function(err, scoreCnt){
            console.log(scoreCnt);
            if(scoreCnt == 0){
                scoreCollection.save(req.body,function(err, r) {
                    console.log(err);
                    console.log(r);
                    res.status(200).json(req.body);
                });
            }else{
                scoreCollection.updateOne(
                    query,
                    { $set: { "potential" : req.body.potential,
                    "totalScore" : req.body.totalScore,
                    "presentationq" : req.body.presentationq,
                    "demoq" : req.body.demoq,
                    "businessv" : req.body.businessv,
                    "remarks" : req.body.remarks
                  } },
                    { upsert: true }
                 );
            }
        });  
    });

    app.get(`${API_ENDPOINT}scores`, (req, res)=>{ 
        console.log("get scores ...");
        console.log(req.query.runNo);
        console.log(req.query.judgeName);
        console.log(req.query.projectName);
        
        var scoreCollection = dbs.production.collection(SCORE_COLLECTION);
        var query = { selectedGlobalRun: req.query.runNo, 
                'projectName.name': req.query.projectName, 
                judgeName: req.query.judgeName};
        scoreCollection.findOne(query
            ,function(err, score){
                console.log(score);
            res.status(200).json(score);
        });
    });

    app.get(`${API_ENDPOINT}result`, (req, res)=>{ 
        console.log("get result ...");
        console.log(req.query.runNo);
        
        var scoreCollection = dbs.production.collection(SCORE_COLLECTION);
        var query = [ 
                { '$match': { "selectedGlobalRun": req.query.runNo } },
                { '$unwind': '$selectedGlobalRun'},
                { '$unwind': '$projectName.name'},
                { '$group': { '_id': "$projectName.name", 
                    'runNo': {$first: "$selectedGlobalRun"},
                    total : {$sum : "$totalScore" } } }];
        scoreCollection.aggregate(query
            ,function(err, scores){
            console.log(scores);
            res.status(200).json(scores);
        });
    });

    app.post(`${API_ENDPOINT}team`, (req, res)=>{ 
        console.log("teams ...");
        var teamCollection = dbs.production.collection(TEAM_COLLECTION);
        teamCollection.insertOne(req.body, function(err, r) {
            console.log(err);
            res.status(200).json(req.body);
        });
    });

    app.get(`${API_ENDPOINT}team/:runNo`, (req, res)=>{ 
        console.log("get all teams ..." + req.params.runNo);
        var teamCollection = dbs.production.collection(TEAM_COLLECTION);
        var query = { runNo: req.params.runNo};
        teamCollection.find(query)
            .toArray(function(err, teams){
            res.status(200).json(teams);
        });
    });

    app.use(responseTime(function (req, res, time) {
        var stat = (req.method + req.url).toLowerCase()
            .replace(/[:\.]/g, '')
            .replace(/\//g, '_')
        stats.timing(stat, time)
    }));

    app.use((req, res, next)=> {
        if (req.user == null) {
            res.redirect(JUDGE_PAGE);
        }
        next();
    });

    return app;
}