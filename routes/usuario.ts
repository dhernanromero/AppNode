import { Router } from "express";
import { getUsuarios,getUsuario,postUsuario,putUsuario,deleteUsuario} from "../controller/usuarios";

const router =Router();
router.get('/',getUsuarios);
router.get('/:id',getUsuario);
router.get('/',postUsuario);
router.get('/:id',putUsuario);
router.get('/:id',deleteUsuario);


export default router;