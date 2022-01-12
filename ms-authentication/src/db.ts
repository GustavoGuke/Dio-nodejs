// conexão com o banco 
import { Pool } from "pg";
const connectionString = "conexãoComBanco"
const db = new Pool({connectionString})

export default db