//Kenzo
import type express from "express"
import * as clienteService from "../services/cliente.service.js"
import * as auditoriaService from "../services/auditoria.service.js"
import { getUsuario } from "../middlewares/usuario.header.js"

//Criar Cliente
export async function createCliente(req: express.Request, res: express.Response) {
  const { nome, telefone, endereco } = req.body

  const cliente = await clienteService.createCliente({ nome, telefone, endereco })
  await auditoriaService.registrarAuditoria({
    usuario: getUsuario(req),
    acao: "CRIAR",
    entidade: "Cliente",
    entidadeId: cliente.id,
    detalhes: `Cliente ${nome} criado`
  })
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.status(201).json(cliente)
}


//Buscar todos clientes
export async function getAllClientes(req: express.Request, res: express.Response) {
  const cliente = await clienteService.getAllClientes()
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
  res.status(200).json(cliente)
}


//Buscar cliente por
export async function getClienteById(req: express.Request, res: express.Response) {
  const { id } = req.params
  const cliente = await clienteService.getClienteById(Number(id))
  if (cliente) {
    res.status(200).json(cliente)
  } else {
    res.status(404).json({ message: "User not found" })
  }
}

//Update
export async function updateUser(req: express.Request, res: express.Response) {
  const { id } = req.params
  const { nome, telefone, endereco } = req.body
  const user = await clienteService.updateCliente(Number(id), { nome, telefone, endereco })

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  await auditoriaService.registrarAuditoria({
    usuario: getUsuario(req),
    acao: "ALTERAR",
    entidade: "Cliente",
    entidadeId: Number(id),
    detalhes: `Cliente ${id} alterado`
  })

  return res.status(200).json(user)
}

//Delete
export async function deleteUser(req: express.Request, res: express.Response) {
  const { id } = req.params
  const result = await clienteService.deleteCliente(Number(id))
  if (result === null) {
    return res.status(404).json({ message: "User not found" })
  }

  await auditoriaService.registrarAuditoria({
    usuario: getUsuario(req),
    acao: "EXCLUIR",
    entidade: "Cliente",
    entidadeId: Number(id),
    detalhes: `Cliente ${id} excluido`
  })

  return res.status(204).send()
}