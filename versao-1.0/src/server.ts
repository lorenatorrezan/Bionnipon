import "dotenv/config"
import express from "express"

import clienteRoutes from "./routes/cliente.routes.js"
import servicoRoutes from "./routes/servico.routes.js"
import auditoriaRoutes from "./routes/auditoria.routes.js"

import cors from 'cors';

const app = express()
app.use(express.json())
app.use(clienteRoutes)
app.use(servicoRoutes)
app.use(auditoriaRoutes)

app.use(cors({
  origin: 'http://localhost:5500', 
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: false
}));

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`)
  console.log(`Front rodando em http://localhost:5500/index.html`)
})