import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface Application {
  id: number;
  name: string;
  description: string;
  notes: string | null;
  url: string | null;
  image_url: string | null;
  is_active: boolean;
  created_date: string;
  modified_date: string;
}

export async function getActiveApplications(searchTerm?: string): Promise<Application[]> {
  if (searchTerm) {
    const pattern = `%${searchTerm}%`;
    return await sql`
      SELECT id, name, description, notes, url, image_url, is_active, created_date, modified_date
      FROM applications
      WHERE is_active = true
        AND (name ILIKE ${pattern} OR description ILIKE ${pattern} OR notes ILIKE ${pattern})
      ORDER BY created_date DESC
    ` as Application[];
  }
  return await sql`
    SELECT id, name, description, notes, url, image_url, is_active, created_date, modified_date
    FROM applications
    WHERE is_active = true
    ORDER BY created_date DESC
  ` as Application[];
}

export { sql };
