import * as auditoriaRepository from "../repositories/auditoria.repository.js"

export async function registrarAuditoria(data: {
  usuario: string
  acao: string
  entidade: string
  entidadeId?: number
  detalhes?: string
}) {
  try {
    return await auditoriaRepository.create(data)
  } catch (error) {
    // falha no log nao pode derrubar a operacao principal
    console.error("Falha ao registrar auditoria:", error)
    return null
  }
}

export async function getAllAuditorias(filtro: {
  usuario?: string
  acao?: string
  entidade?: string
} = {}) {
  return await auditoriaRepository.findAll(filtro)
}

export async function getAuditoriaById(id: number) {
  return await auditoriaRepository.findById(id)
}