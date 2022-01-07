import { Request,Response } from "express"
import Usuario from "../models/usuario"

export const getUsuarios = async(req: Request, res:Response) =>{
    const usuarios = await Usuario.findAll();
    res.json({usuarios});
}

export const getUsuario = async(req: Request, res:Response) =>{
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        res.json({usuario});    
    } else {
        res.status(404).json({
            msg: "No se encontró el usuario indicado"
        })
    }
    
}

export const postUsuario = async(req: Request, res:Response) =>{
    const {body} = req;
    try {
        // const usuario = new Usuario(body);
        const usuario = Usuario.build(body);
        await usuario.save();

        res.json({usuario});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administradir'
        })
    }
}

export const putUsuario = (req: Request, res:Response) =>{
    const {id} = req.params;
    const {body} = req;
    res.json({
        msg:'putUsuario',
        body
    })
}

export const deleteUsuario = (req: Request, res:Response) =>{
    const {id} = req.params;
    res.json({
        msg:'postUsuario',
        id
    })
}