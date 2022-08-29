var express=require('express')
var use=express()
var cors=require('cors')
var mysql=require('mysql')
var body=require('body-parser')
var connect=require('./db/connection')
const con = require('./db/connection')
use.listen(5000);
use.use(body.json())
use.use(express.urlencoded({extended:false}))
use.use(cors())

// insert query
use.post('/insert',(req,res)=>
{
    var form=req.body;
    var sqlSelect='select * from reg where email= ?';
    connect.query(sqlSelect,form.useremail,(err,result)=>
    {
        if(err)
        {
            throw err
        }
        else
        {
            console.log(result.length)
            
            if(result.length<1)
            {
                var sqlIns=`insert into reg values ('${form.username}','${form.usermob}', '${form.useremail}')`;
                connect.query(sqlIns,(err)=>
                {
                    if(err)
                    {
                        throw err;
                    }
                    res.status(200)
                    res.json()
                })
            }
            else
            {
                console.log("savdhg");
                res.status(204)
                res.json()
            }

        }
    })
    
});
// select query
use.get('/select',(req,res)=>
{
    var sqlSel='select * from reg';
    connect.query(sqlSel,(err,result)=>
    {
        if(err)
        {
            throw err;
        }
        res.send(result)
    })
})
// delete query
use.delete('/delete/:name',(req,res)=>
{
    var form=req.params.name;
    console.log(form)
    var sqlDel='delete from reg where name=?';
    connect.query(sqlDel,form,(err,result)=>
    {
        if(err)
        {
            throw err
        }
        res.send(result)
        res.status(200)
    })

})
// update query
use.put('/update',(req,res)=>
{
    var name=req.body.username;
    var email=req.body.useremail;

    var sqlUpd="update reg set email=? where name=?";
    connect.query(sqlUpd,[email,name],(err,result)=>
    {
        if(err)
        {
            throw err
        }
        res.status(200)
        res.send(result)
    })
})