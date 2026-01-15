import jwt from "jsonwebtoken";
import { Client } from "pg";

export const handler = async (event) => {
  const token = event.headers.authorization.replace("Bearer ", "");
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const { subject_id } = JSON.parse(event.body);

  const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await db.connect();
  await db.query(
    `INSERT INTO attendance (student_id, subject_id, status)
     VALUES ($1,$2,'present')`,
    [user.id, subject_id]
  );
  await db.end();

  return { statusCode: 200, body: "Checked in" };
};
