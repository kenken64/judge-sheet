'use strict';

const JUDGE_PAGE = "/#!/";

module.exports = function(app, dbs) {

    app.post("/api/v1/judge", (req, res)=>{ 
        console.log("judge ...")
        res.status(200).json({});
    });

    app.use(function(req, res, next) {
        if (req.user == null) {
            res.redirect(JUDGE_PAGE);
        }
        next();
    });

    return app;
}