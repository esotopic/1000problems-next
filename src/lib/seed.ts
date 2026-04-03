import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL || "";

async function seed() {
  const sql = neon(DATABASE_URL);

  // Create table
  await sql`
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      description VARCHAR(1000) NOT NULL DEFAULT '',
      notes TEXT,
      url VARCHAR(500),
      image_url VARCHAR(500),
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      modified_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // Seed data - upsert pattern
  const apps = [
    {
      name: "Reviewing Gary Tan's GSTACK",
      description: "A deep dive into Y Combinator CEO Garry Tan's open-source AI software factory that turns Claude Code into a virtual dev team — CEO, Designer, Eng Manager, QA, and more. 63K+ GitHub stars.",
      url: "https://gstack-review-1000problems-projects.vercel.app",
      image_url: "/images/gstack-logo.svg",
      created_date: "2026-04-03",
    },
    {
      name: "Vybe Program Manager",
      description: "The PM tool that manages itself. Tell Claude what to build, triage it, and watch AI crush your backlog while you sip coffee.",
      url: "https://vybe.1000problems.com",
      image_url: "/images/vybe-logo.svg",
      created_date: "2026-03-29",
    },
    {
      name: "B3tz",
      description: "Finally, a place to put your big mouth to work. Make bold predictions, challenge your friends, and find out who actually knows what they're talking about — spoiler: it's probably not you.",
      url: "https://b3tz.1000problems.com",
      image_url: "/images/b3tz-logo.svg",
      created_date: "2026-03-28",
    },
    {
      name: "RubberJointsAI",
      description: "Because your joints shouldn't sound like a bowl of Rice Krispies when you stand up. AI-powered mobility coaching that keeps you moving like you're 25 — even if your knees disagree.",
      url: "https://app.1000problems.com",
      image_url: "/images/rubberjoints-logo.svg",
      created_date: "2026-03-27",
    },
  ];

  for (const app of apps) {
    const existing = await sql`SELECT id FROM applications WHERE name = ${app.name}`;
    if (existing.length === 0) {
      await sql`
        INSERT INTO applications (name, description, url, image_url, is_active, created_date, modified_date)
        VALUES (${app.name}, ${app.description}, ${app.url}, ${app.image_url}, true, ${app.created_date}::timestamptz, NOW())
      `;
      console.log(`Inserted: ${app.name}`);
    } else {
      await sql`
        UPDATE applications
        SET description = ${app.description}, url = ${app.url}, image_url = ${app.image_url}, is_active = true, modified_date = NOW()
        WHERE name = ${app.name}
      `;
      console.log(`Updated: ${app.name}`);
    }
  }

  console.log("Seed complete!");
}

seed().catch(console.error);
