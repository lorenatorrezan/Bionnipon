import { Router } from "express"
import * as auditoriaController from "../controllers/auditoria.controllers.js"

const router = Router()
router.get("/auditoria", auditoriaController.getAllAuditorias)
router.get("/auditoria/:id", auditoriaController.getAuditoriaById)

export default router