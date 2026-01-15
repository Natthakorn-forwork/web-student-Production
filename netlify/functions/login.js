import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Client } from "pg";

export const handler = async (event) => {
  const { email, password } = JSON.parse(event.body || "{}");

  const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await db.connect();
  const res = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  await db.end();

  if (res.rows.length === 0) {
    return { statusCode: 401, body: "Invalid login" };
  }

  const user = res.rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);

  if (!ok) return { statusCode: 401, body: "Invalid login" };

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ token })
  };
};
