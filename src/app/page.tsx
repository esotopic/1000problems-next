import { getActiveApplications, Application } from "@/lib/db";
import Image from "next/image";

const staticApps: Application[] = [
  {
    id: 5, name: "Reviewing Gary Tan's GSTACK",
    description: "A deep dive into Y Combinator CEO Garry Tan's open-source AI software factory that turns Claude Code into a virtual dev team — CEO, Designer, Eng Manager, QA, and more. 63K+ GitHub stars.",
    notes: null, url: "https://gstack-review-1000problems-projects.vercel.app",
    image_url: "/images/gstack-logo.svg", is_active: true, created_date: "2026-04-03", modified_date: "2026-04-03",
  },
  {
    id: 4, name: "Vybe Program Manager",
    description: "The PM tool that manages itself. Tell Claude what to build, triage it, and watch AI crush your backlog while you sip coffee.",
    notes: null, url: "https://vybe.1000problems.com",
    image_url: "/images/vybe-logo.svg", is_active: true, created_date: "2026-03-29", modified_date: "2026-03-29",
  },
  {
    id: 3, name: "B3tz",
    description: "Finally, a place to put your big mouth to work. Make bold predictions, challenge your friends, and find out who actually knows what they're talking about — spoiler: it's probably not you.",
    notes: null, url: "https://b3tz.1000problems.com",
    image_url: "/images/b3tz-logo.svg", is_active: true, created_date: "2026-03-28", modified_date: "2026-03-28",
  },
  {
    id: 2, name: "RubberJointsAI",
    description: "Because your joints shouldn't sound like a bowl of Rice Krispies when you stand up. AI-powered mobility coaching that keeps you moving like you're 25 — even if your knees disagree.",
    notes: null, url: "https://app.1000problems.com",
    image_url: "/images/rubberjoints-logo.svg", is_active: true, created_date: "2026-03-27", modified_date: "2026-03-27",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  let apps: Application[];

  if (!search) {
    try {
      apps = await getActiveApplications();
      if (apps.length === 0) apps = staticApps;
    } catch {
      apps = staticApps;
    }
  } else {
    try {
      apps = await getActiveApplications(search);
    } catch {
      apps = staticApps.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.description.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  return (
    <>
      <section className="mb-8">
        <form method="get" className="flex gap-3 items-center max-w-xl mx-auto">
          <input
            type="text"
            name="search"
            defaultValue={search || ""}
            placeholder="Search applications..."
            className="flex-1 px-4 py-3 text-base border-2 border-gray-200 rounded-lg outline-none focus:border-[#0f3460] transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 text-base font-semibold text-white bg-[#0f3460] rounded-lg hover:bg-[#1a1a2e] transition-colors cursor-pointer"
          >
            Search
          </button>
          {search && (
            <a href="/" className="text-[#e94560] font-medium whitespace-nowrap hover:underline">
              Clear
            </a>
          )}
        </form>
      </section>

      <section>
        {apps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <a
                key={app.id}
                href={app.url || "#"}
                className="block no-underline text-inherit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col h-full">
                  <div className="h-48 overflow-hidden flex items-center justify-center bg-[#1a1a2e]">
                    {app.image_url ? (
                      <Image
                        src={app.image_url}
                        alt={app.name}
                        width={320}
                        height={192}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0f3460] to-[#e94560] flex items-center justify-center">
                        <span className="text-6xl font-bold text-white uppercase">
                          {app.name[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-gray-600 text-sm leading-relaxed mb-2 flex-1">
                      {app.description}
                    </p>
                    <p className="text-gray-400 text-xs mt-auto">
                      Added{" "}
                      {new Date(app.created_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400 text-lg">
            {search ? (
              <p>No applications found matching &quot;<strong>{search}</strong>&quot;</p>
            ) : (
              <p>No applications yet. Check back soon!</p>
            )}
          </div>
        )}
      </section>
    </>
  );
}
