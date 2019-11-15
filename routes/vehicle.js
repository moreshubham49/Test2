const mysql = require("mysql");
var express = require("express");
var vehrouter =  express();


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'mean_exam'
  });

var myData =[];
connection.connect;


vehrouter.put("/:VehicleNo",function(request, response){
    let vno = parseInt(request.params.VehicleNo);
    let vname = request.body.VehicleName;
    let vcompany = request.body.Company; 
    let vtype = request.body.Type;
    let vprice = request.body.Price;
    let vdesc = request.body.Description;


    let query = `update tbl_vehicle set VehicleName= '${vname}',Company= '${vcompany}',Type= '${vtype}',Price= '${vprice}',Description= '${vdesc}' where VehicleNo=${vno}`;
    console.log(query);

    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
           console.log("Update query fired..")
        }
        else
        {   
           response.contentType("application/json");
           response.send(err); 
           console.log("some error in put method");
        }
    });
        
});

vehrouter.post("/",function(request, response){
    let vno = parseInt(request.body.VehicleNo);
    let vname = request.body.VehicleName;
    let vcompany = request.body.Company; 
    let vtype = request.body.Type;
    let vprice = request.body.Price;
    let vdesc = request.body.Description;
      
      let query = `insert into tbl_vehicle values(${vno},'${vname}', '${vcompany}', '${vtype}', '${vprice}', '${vdesc}' )`;

      console.log(query);
  
      connection.query(query, function(err, result){
          if(err==null)
          {
             response.contentType("application/json");
             response.send(JSON.stringify(result));
          }
          else
          {
             response.contentType("application/json");
             response.send(err); 
          }
      });
});

vehrouter.get("/", function(request, response){
    connection.query("select * from tbl_vehicle", function(err, result){
        if(err == null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
           console.log(" Select query fired..");
        }
        else
        {
           response.send("Something went wrong in get /!"); 
           console.log("Some error in get method");
        }
    });
    
});

vehrouter.get("/:VehicleNo", function(request, response){
    console.log("You searched for " + request.params.VehicleNo);
    var vehicleSearched= myData[parseInt(request.params.VehicleNo) - 1];
    response.contentType("application/json");
    response.send(vehicleSearched);
});

module.exports = vehrouter;
