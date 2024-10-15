let server=require('http');
server.createServer(require('./Main').user).listen(3000,()=>{
    console.log('server started sucessfully')
});