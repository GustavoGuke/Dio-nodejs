// conexão com o banco 
import { Pool } from "pg";
const connectionString = "conexaoComOBanco"
const db = new Pool({connectionString})

export default db