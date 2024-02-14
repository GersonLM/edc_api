import app from './app';

const conectDB = require('./config/db')
const port = process.env.PORT || 3000;

conectDB()

app.listen(port,()=>{
    console.log('Server listen on port '+port)
});
