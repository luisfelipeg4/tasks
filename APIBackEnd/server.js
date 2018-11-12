
const express = require('express');
const cors = require('cors')
app= express()

const routes = require('./routes')
app.use('/',routes)
app.use(cors('*'))



app.use(function(req,res){
    console.log(req.method)
    res.send('Error en REQ')
})

app.listen(3000, function()  {
    console.log(`El servidor se está ejecutando en http://127.0.0.1:3000/`);
  });
  