import mongoose from "mongoose"


const esquema = new mongoose.Schema({
    nombre: String, comentario: String, niveles: Number, fecha: Date
}, { versionKey: false })
const ComentarioModel = new mongoose.model('comentarios', esquema)

export const getComentario = async (req, res) => {
    try {
        const { id } = req.params
        const rows =
            (id === undefined) ? await ComentarioModel.find() : await ComentarioModel.findById(id)
        return res.status(200).json({ status: true, data: rows })
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error] })
    }
}

export const saveComentario = async (req, res) => {
    try {
        const { nombre, fecha } = req.body
        const validacion = validar(nombre, fecha, req.file, 'Y')

        if (validacion == '') {
            const nuevacomentario = new ComentarioModel({
                nombre: nombre, fecha: fecha,
            })
            return await nuevacomentario.save().then(
                () => { res.status(200).json({ status: true, message: 'comentario guardado' }) }
            )
        }
        else {
            return res.status(400).json({ status: false, errors: validacion })
        }
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] })
    }
}

export const updateComentario = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, fecha } = req.body
        let valores = { nombre: nombre, fecha: fecha }

        if (req.file != null) {
            await eliminarcomentario(id)
            valores = { nombre: nombre, fecha: fecha }
        }

        const validacion = validar(nombre)

        if (validacion == '') {
            await ComentarioModel.updateOne({ _id: id }, { $set: valores })
            return res.status(200).json({ status: true, message: 'Comentario actualizada' })
        }
        else {
            return res.status(400).json({ status: false, errors: validacion })
        }
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] })
    }
}

export const deleteComentario = async (req, res) => {
    try {
        const { id } = req.params
        await eliminarcomentario(id)
        await ComentarioModel.deleteOne({ _id: id })
        return res.status(200).json({ status: true, message: 'comentario eliminada' })
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] })
    }
}

const eliminarcomentario = async (id) => {
    const Comentario = await ComentarioModel.findById(id)
}

const validar = (nombre) => {
    var errors = []
    if (nombre === undefined || nombre.trim() === '') {
        errors.push('El nombre NO debe de estar vacío')
    }
    return errors
}


