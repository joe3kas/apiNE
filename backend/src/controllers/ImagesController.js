import mongoose from "mongoose"
import * as fs from 'fs'
import { error } from "console"

const esquema = new mongoose.Schema({
    nombre: String, imagen: String, niveles: Number, fecha: Date
}, { versionKey: false })
const CasosModel = new mongoose.model('Casos', esquema)

export const getCasos = async (req, res) => {
    try {
        const { id } = req.params
        const rows =
            (id === undefined) ? await CasosModel.find() : await CasosModel.findById(id)
        return res.status(200).json({ status: true, data: rows })
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error] })
    }
}

export const saveCasos = async (req, res) => {
    try {
        const { nombre, fecha } = req.body
        const validacion = validar(nombre, fecha, req.file, 'Y')

        if (validacion == '') {
            const nuevaImagen = new CasosModel({
                nombre: nombre, fecha: fecha,
                imagen: '/uploads/' + req.file.filename
            })
            return await nuevaImagen.save().then(
                () => { res.status(200).json({ status: true, message: 'Imagen guardado' }) }
            )
        }
        else {
            return res.status(400).json({ status: false, errors: validacion })
        }
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] })
    }
}

export const updateCasos = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, fecha } = req.body
        let imagen = ''
        let valores = { nombre: nombre, fecha: fecha }

        if (req.file != null) {
            await eliminarImagen(id)
            imagen = '/uploads/' + req.file.filename
            valores = { nombre: nombre, fecha: fecha, imagen: imagen }
        }

        const validacion = validar(nombre)

        if (validacion == '') {
            await CasosModel.updateOne({ _id: id }, { $set: valores })
            return res.status(200).json({ status: true, message: 'Casos actualizada' })
        }
        else {
            return res.status(400).json({ status: false, errors: validacion })
        }
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] })
    }
}

export const deleteCasos = async (req, res) => {
    try {
        const { id } = req.params
        await eliminarImagen(id)
        await CasosModel.deleteOne({ _id: id })
        return res.status(200).json({ status: true, message: 'imagen eliminada' })
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] })
    }
}

const eliminarImagen = async (id) => {
    const Casos = await CasosModel.findById(id)
    const img = Casos.imagen
    fs.unlinkSync('./public/' + img)
}

const validar = (nombre, img, sevalida) => {
    var errors = []
    if (nombre === undefined || nombre.trim() === '') {
        errors.push('El nombre NO debe de estar vacío')
    }
    if (sevalida === 'Y' && img === undefined) {
        errors.push('Selecciona una imagen en formato jpg o png')
    }
    else if (errors != '') {
        fs.unlinkSync('./public/' + img.filename)
    }
    return errors
}


