'use strict';
const domain_name = "http://localhost:3000";
module.exports = {
    domain_name: domain_name,
    mongodb: process.env.MONGODB_URL || "mongodb://nusiss:password1234@ds029456.mlab.com:29456/judgeformdb",
    port: 3000,
}