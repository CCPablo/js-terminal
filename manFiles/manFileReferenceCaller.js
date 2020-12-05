
/*INSERTED INFO */
let importLs = require('./manLs');
let manLs = importLs.manLs;

let importCat = require('./manCat');
let manCat = importCat.manCat;

let importCd = require('./manCd');
let manCd = importCd.manCd;

let importClear = require('./manClear');
let manClear = importClear.manClear;

let importEcho = require('./manEcho');
let manEcho = importEcho.manEcho;

let importMkdir = require('./manMkdir');
let manMkdir = importMkdir.manMkdir;

let importMv = require('./manMv');
let manMv = importMv.manMv;

let importPwd = require('./manPwd');
let manPwd = importPwd.manPwd;

let importRm = require('./manRm');
let manRm = importRm.manRm;


export {manCat, manCd, manClear, manEcho, manLs, manMkdir, manMv, manPwd, manRm};

/* TO USE WHEN IMPORTING */
let importMan = require('./manFileReferenceCaller');