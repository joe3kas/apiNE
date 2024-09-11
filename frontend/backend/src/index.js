import app from './app.js'
import {connectDB} from './config.js'

connectDB();
app.listen(4000);
console.log('servidor en el puerto 4000');