const express = require('express')
const app = express()

app.get("/", function (req, res){
    res.sendFile(__dirname + "/app/index.html")    
})



app.listen(3000,  function () {
    //console.log('Servidor rodando na url http://localhost:3000') 
})