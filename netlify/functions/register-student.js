import bcrypt from "bcryptjs";
import { Client } from "pg";

export const handler = async (event) => {
  const { student_code, email, password, full_name } =
    JSON.parse(event.body || "{}");

  const hash = await bcrypt.hash(password, 10);

  const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await db.connect();

  await db.query(
    `INSERT INTO users (role, student_code, email, password_hash, full_name)
     VALUES ('student',$1,$2,$3,$4)`,
    [student_code, email, hash, full_name]
  );

  await db.end();

  return { statusCode: 201, body: "Student registered" };
};
