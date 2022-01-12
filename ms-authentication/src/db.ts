// conexão com o banco 
import { Pool } from "pg";
const connectionString = "conexãoBanco"
const db = new Pool({connectionString})

export default db