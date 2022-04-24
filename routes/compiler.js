var express = require('express');
var router = express.Router();
const store = require("store2");
/**
Require compilex
 */
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);


/* GET home page. */

var databaseCHECK = "Hello world";
//############ DB --> Local Host --> Check ########

var pic = "https://i.pinimg.com/originals/02/20/da/0220dad7b5d390c3178815008a628ace.gif";
router.get('/', function(req, res, next) {
    var Resulte2 = check(databaseCHECK);
    if(Resulte2 === true){
        res.render('compiler', 
        { 
            title: 'EX Online IDE' 
            ,Resulte1:store('compiler')
            ,Resulte2:pic
        });
    }
    else res.render('compiler', 
        {
            title: 'EX Online IDE' 
            ,Resulte1:store('compiler')
            ,Resulte2:"https://media4.giphy.com/media/l0IyjeA5mmMZjhyPm/200w.gif?cid=82a1493bhx3qklpj8mpk0pg9nl7wntcihxdaa24w0b1wzhl4&rid=200w.gif&ct=g"
        });
});



router.post('/', function(req, res, next) {    
    var submit = req.body.submit;
    var code = req.body.code;
    var lang = req.body.lang;
    if(code === null || code === ""){
        code = "";
    }
    else ;
    if(submit === "Submit"){
        ide(code,lang);
        res.redirect('/ide#1234');
    }
    if(submit === "Compile"){
        ide(code,lang);
        res.redirect('/ide');
    }
});



function ide_storage(data,lang){
    if(lang === "Python")
        data=data.substring(0, data.length-2);
    if((lang === "C") || (lang === "C++"))
        console.log("L@2.1 : "+data.length+" --> " + data);
    store('compiler', data); 
    return store('compiler');
}

function check(data1){
    var data2 = store('compiler'); 
    if( data1 == data2){
        store(false); 
        return true
    }
   else return false
 }


function ide(code,lang){
    if(code.length !== 0){
        if (lang === "Python") {
            //var envData = { OS: "windows" };
            var envData = { OS: "linux" };
            compiler.compilePython(envData, code, function (data) {
                var dataOut = data.output;
                if(dataOut === undefined) {console.log("DataOut@undefined!!!! : "+dataOut)}
                else ide_storage(data.output,lang);
            });
        }         
        if((lang === "C") || (lang === "C++")) {
            var envData = { OS : "linux" , cmd : "gcc" };
            compiler.compileCPP(envData , code , function (data) {
                var dataOut = data.output;
                if(dataOut === undefined) {console.log("DataOut@undefined!!!! : "+dataOut)}
                else ide_storage(data.output,lang);
            });
        }
    }
    else console.log("\n please input! \n");
} 
module.exports = router;