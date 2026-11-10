import type express from "express"

// Le o nome de quem executou a acao pelo cabecalho "x-usuario".
// Enquanto o sistema nao tiver login, quem nao enviar o cabecalho aparece como "anonimo".
export function getUsuario(req: express.Request): string {
  const usuario = req.header("x-usuario")
  return usuario && usuario.trim() !== "" ? usuario.trim() : "anonimo"
}