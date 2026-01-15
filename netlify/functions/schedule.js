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
  const res = await db.query(`
    SELECT sb.subject_name, sc.day_of_week, sc.start_time, sc.end_time
    FROM enrollments e
    JOIN subjects sb ON e.subject_id=sb.id
    JOIN schedules sc ON sb.id=sc.subject_id
    WHERE e.student_id=$1
  `, [user.id]);
  await db.end();

  return { statusCode: 200, body: JSON.stringify(res.rows) };
};
