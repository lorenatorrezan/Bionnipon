
//Kenzo
import type express from "express"
import * as ServicoService from "../services/servico.service.js"
import * as auditoriaService from "../services/auditoria.service.js"
import { getUsuario } from "../middlewares/usuario.header.js"

//Criar Servico
export async function createServico(req: express.Request, res: express.Response) {
  const { tipo,data,prazo,garantia,clienteId } = req.body
  const servico = await ServicoService.createServico({ tipo,data,prazo,garantia,clienteId })

  await auditoriaService.registrarAuditoria({
    usuario: getUsuario(req),
    acao: "CRIAR",
    entidade: "Servico",
    entidadeId: servico.id,
    detalhes: `Servico ${tipo} criado para o cliente ${clienteId}`
  })

  res.status(201).json(servico)
}


//Buscar todos servicos
export async function getAllServicos(req: express.Request, res: express.Response) {
  const servico = await ServicoService.getAllServicos()
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.status(200).json(servico)
}


//Buscar servico por ID
export async function getServicoById(req: express.Request, res: express.Response) {
  const { id } = req.params
  const servico = await ServicoService.getServicoById(Number(id))
  if (servico) {
    res.status(200).json(servico)
  } else {
    res.status(404).json({ message: "Servico not found" })
  }
}

//Update
export async function updateServico(req: express.Request, res: express.Response) {
  const { id } = req.params
  const { tipo,data,prazo,garantia} = req.body
  const servico = await ServicoService.updateServico(Number(id), { tipo,data,prazo,garantia})
  if (!servico) {
    return res.status(404).json({ message: "servico not found" })
  }

  await auditoriaService.registrarAuditoria({
    usuario: getUsuario(req),
    acao: "ALTERAR",
    entidade: "Servico",
    entidadeId: Number(id),
    detalhes: `Servico ${id} alterado`
  })

  return res.status(200).json(servico)
}

//Delete
export async function deleteServico(req: express.Request, res: express.Response) {
  const { id } = req.params
  const result = await ServicoService.deleteServico(Number(id))
  if (result === null) {
    return res.status(404).json({ message: "Servico not found" })
  }

  await auditoriaService.registrarAuditoria({
    usuario: getUsuario(req),
    acao: "EXCLUIR",
    entidade: "Servico",
    entidadeId: Number(id),
    detalhes: `Servico ${id} excluido`
  })

  return res.status(204).send()
}