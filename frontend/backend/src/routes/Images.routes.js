import {Router} from 'express'
import {getCasos,saveCasos,updateCasos,deleteCasos} from '../controllers/ImagesController.js'
import {getComentario,saveComentario,updateComentario,deleteComentario} from '../controllers/ComentariosController.js'
import {subirImagen} from '../middlewares/Storage.js'
const rutas = Router()

rutas.get('/api/v2/casos', getCasos)
rutas.get('/api/v2/casos/:id', getCasos)
rutas.post('/api/v2/casos',subirImagen.single('imagen'), saveCasos)
rutas.put('/api/v2/casos:id',subirImagen.single('imagen'), updateCasos)
rutas.delete('/api/v2/casos/:id', deleteCasos)

//
rutas.get('/api/v2/comentario', getComentario)
rutas.get('/api/v2/comentario/:id', getComentario)
rutas.post('/api/v2/comentario',subirImagen.single('imagen'), saveComentario)
rutas.put('/api/v2/comentario:id',subirImagen.single('imagen'), updateComentario)
rutas.delete('/api/v2/comentario/:id', deleteComentario)
export default rutas 