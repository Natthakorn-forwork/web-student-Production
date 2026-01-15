import jwt from "jsonwebtoken";
import { Client } from "pg";

export const handler = async (event) => {
  const token = event.headers.authorization.replace("Bearer ", "");
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await db.connect();
  await db.query(
    "INSERT INTO line_up (student_id) VALUES ($1)",
    [user.id]
  );
  await db.end();

  return { statusCode: 200, body: "Line up recorded" };
};
