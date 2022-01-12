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
        const existeUsuario = await Usuario.findOne({
            where:{
                email: body.email
            }
        });

        if(existeUsuario){
            return res.status(400).json({
                msg:"ya existe un usuario con el email " + body.email
            })
        }

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

export const putUsuario = async (req: Request, res:Response) =>{
    const {id} = req.params;
    const {body} = req;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario){
            return res.status(400).json({
                msg:"no existe un usuario con el id " + body.id
            })
        }

        await usuario.update(body);
        res.json({usuario});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administradir'
        })
    }
}

export const deleteUsuario = async (req: Request, res:Response) =>{
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario){
        return res.status(400).json({
            msg:"no existe un usuario con el id " + id
        })
    }

    await usuario.update({estado : false});
   
    //Aliminacion fisica de clientes
    // await usuario.destroy();

    res.json({
        msg:'postUsuario',
        id
    })
}