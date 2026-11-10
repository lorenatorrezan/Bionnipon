import AuditLog from "../entities/auditoria.js"

export async function create(data: {
  usuario: string
  acao: string
  entidade: string
  entidadeId?: number
  detalhes?: string
}) {
  return AuditLog.create({ data })
}

export async function findAll(filtro: {
  usuario?: string
  acao?: string
  entidade?: string
} = {}) {
  return AuditLog.findMany({
    where: filtro,
    orderBy: { criadoEm: "desc" }
  })
}

export async function findById(id: number) {
  return AuditLog.findUnique({
    where: { id }
  })
}