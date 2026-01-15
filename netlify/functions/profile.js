import jwt from "jsonwebtoken";
import { Client } from "pg";

export const handler = async (event) => {
  const token = event.headers.authorization?.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await db.connect();
  const res = await db.query(
    "SELECT role, student_code, email, full_name FROM users WHERE id=$1",
    [decoded.id]
  );
  await db.end();

  return { statusCode: 200, body: JSON.stringify(res.rows[0]) };
};
