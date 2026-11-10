import type express from "express"
import * as auditoriaService from "../services/auditoria.service.js"

//Buscar todos os registros de auditoria (filtros opcionais: usuario, acao, entidade)
export async function getAllAuditorias(req: express.Request, res: express.Response) {
  const { usuario, acao, entidade } = req.query

  const filtro: { usuario?: string, acao?: string, entidade?: string } = {}
  if (typeof usuario === "string") filtro.usuario = usuario
  if (typeof acao === "string") filtro.acao = acao
  if (typeof entidade === "string") filtro.entidade = entidade

  const auditorias = await auditoriaService.getAllAuditorias(filtro)
  res.status(200).json(auditorias)
}

//Buscar registro de auditoria por id
export async function getAuditoriaById(req: express.Request, res: express.Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" })
  }

  const auditoria = await auditoriaService.getAuditoriaById(id)
  if (!auditoria) {
    return res.status(404).json({ message: "Audit log not found" })
  }

  return res.status(200).json(auditoria)
}