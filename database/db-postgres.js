import postgres from 'postgres'

// Creamos la instancia de conexión (pool) usando las variables de entorno
const sql = postgres({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

// Exportamos por defecto para poder usarlo como: await sql`SELECT...`
export default sql

export async function executeQuery (query, params = []) {
  console.log(query, params)
  // .unsafe se usa para pasar queries como strings planos con un array de parámetros
  return await sql.unsafe(query, params)
}