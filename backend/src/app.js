import express from 'express' 
import morgan from 'morgan' 
import cors from 'cors'
import rutasImages from './routes/Images.routes.js'


const app = express()
app.use(morgan ('dev'))
app.use (cors ())
app.use (express.json())
app. use (express.static('public'))
app.use (rutasImages)


app.use ((req,res) => {
    res.status (404).json({status:false,errors: 'Not found' })
})
app.get('/', (req,res) => {res. send( 'Hola mundo')} )

export default app;