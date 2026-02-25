
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

type Service = {
  id: string;
  title: string;
  desc: string;
};

type Project = {
  _id: string;
  title: string;
  location?: string;
  description?: string;
  beforeImage?: any;
  afterImage?: any;
};

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);

export default function Page() {
  const services: Service[] = useMemo(
    () => [
      { id: "prep-pouring", title: "Prep & Pouring", desc: "Site prep, forms, pour, and cleanup." },
      { id: "finishing", title: "Finishing", desc: "Smooth, stamped, broom, and exposed finishes." },
      { id: "broom-finish", title: "Broom Finish", desc: "Slip-resistant broom finish for walkways." },
      { id: "driveways", title: "Driveways", desc: "New pours, replacement, and repairs." },
      { id: "sidewalks", title: "Sidewalks", desc: "Sidewalks, steps, and small flatwork." },
      { id: "garage-pads", title: "Garage Pads", desc: "Strong base + reinforced concrete pads." },
    ],
    []
  );

  const [selectedService, setSelectedService] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "project"] | order(_createdAt desc){
          _id,
          title,
          location,
          description,
          beforeImage,
          afterImage
        }`
      )
      .then((data) => setProjects(data))
      .catch(console.error)
      .finally(() => setLoadingProjects(false));
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onClickServiceCard = (svc: Service) => {
    setSelectedService(svc.title);
    scrollTo("quote");
    setTimeout(() => {
      const select = document.getElementById("service") as HTMLSelectElement | null;
      select?.focus();
    }, 350);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-700">
              ✅ Licensed &amp; Insured <span className="mx-1">•</span> Fast Scheduling{" "}
              <span className="mx-1">•</span> Free Estimates
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
              Get a Free Concrete Quote in{" "}
              <span className="underline decoration-red-600">24 Hours</span>
            </h1>

            <p className="mt-3 text-gray-700">
              Driveways • Patios • Sidewalks • Slabs • Garage Floor • Pads • Detached Garages • Basements • Exposed Concrete • Commercials • Parking • Replacement • Epoxy • Repair — clean finish, solid reinforcement,
              and dependable timelines.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                onClick={() => scrollTo("quote")}
              >
                Request Free Estimate
              </button>

              <a
                className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                href="tel:+17800000000"
              >
                Call (780) 932-9317
              </a>
            </div>

            {/* Static Before/After */}
            <div className="mt-8">
              <div className="text-sm font-semibold mb-2">Before &amp; After</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border bg-white p-2">
                  <div className="text-xs text-gray-600 mb-2">Before</div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src="/before-after/before.jpg"
                      alt="Before concrete project"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                </div>

                <div className="rounded-xl border bg-white p-2">
                  <div className="text-xs text-gray-600 mb-2">After</div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src="/before-after/after.jpg"
                      alt="After concrete project"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Quote form */}
          <div id="quote" className="rounded-xl border bg-white p-6">
            <h2 className="text-xl font-bold">Request a Free Quote</h2>
            <p className="text-sm text-gray-600 mt-1">Tell us what you need — we’ll reply quickly.</p>

            <form
  action="https://formspree.io/f/mdalypkn"
  method="POST"
  className="mt-5 grid gap-4"
>
  <input
    className="input"
    type="text"
    placeholder="Full name"
    name="name"
    required
  />

  <input
    className="input"
    type="tel"
    placeholder="Phone number"
    name="phone"
    required
  />

  <input
    className="input"
    type="email"
    placeholder="Email (optional)"
    name="email"
  />

  <input
    className="input"
    type="text"
    placeholder="Address / Neighborhood"
    name="address"
    required
  />

  <select
    id="service"
    className="input"
    name="service"
    value={selectedService}
    onChange={(e) => setSelectedService(e.target.value)}
    required
  >
    <option value="">Select a service</option>
    {services.map((s) => (
      <option key={s.id} value={s.title}>
        {s.title}
      </option>
    ))}
  </select>

  <textarea
    className="input min-h-[120px]"
    placeholder="Project details"
    name="details"
    required
  />

  {/* Email subject */}
  <input
    type="hidden"
    name="_subject"
    value="New Concrete Quote Request - All Seven Concrete Ltd"
  />

  {/* Redirect after submit */}
  <input
    type="hidden"
    name="_redirect"
    value="https://allsevenconcreteltd.com/?sent=1"
  />

  <button
    type="submit"
    className="w-full rounded-md bg-red-600 py-3 text-white font-semibold hover:bg-red-700 transition"
  >
    Get My Free Quote
  </button>

  <p className="text-xs text-gray-500 text-center">
    By submitting, you agree to be contacted about your request. No spam.
  </p>
</form>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <h3 className="text-2xl font-bold">Recent Projects</h3>
          <p className="text-sm text-gray-600 mt-1">Real before &amp; after work.</p>

          {loadingProjects ? (
            <div className="mt-6 text-sm text-gray-600">Loading projects…</div>
          ) : projects.length === 0 ? (
            <div className="mt-6 rounded-lg border bg-gray-50 p-4 text-sm">
              No projects yet. Create and <b>Publish</b> a Project in Sanity Studio.
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <div key={p._id} className="rounded-xl border bg-white p-5">
                  <div className="font-semibold">{p.title}</div>
                  {p.location && <div className="text-sm text-gray-600">{p.location}</div>}
                  {p.description && <div className="text-sm text-gray-600 mt-2">{p.description}</div>}

                  {p.beforeImage && p.afterImage && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Before</div>
                        <img
                          src={urlFor(p.beforeImage).width(900).url()}
                          className="h-40 w-full rounded-lg object-cover"
                          alt="Before"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">After</div>
                        <img
                          src={urlFor(p.afterImage).width(900).url()}
                          className="h-40 w-full rounded-lg object-cover"
                          alt="After"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t bg-gray-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <h3 className="text-2xl font-bold">Our Concrete Services</h3>
          <p className="text-sm text-gray-600 mt-1">Click a service to auto-select it in the form.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onClickServiceCard(s)}
                className="rounded-xl border bg-white p-5 text-left hover:shadow-md transition"
              >
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm text-gray-600 mt-1">{s.desc}</div>
                <div className="text-xs text-red-700 mt-3">Click to request a quote →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} All Seven Concrete Ltd
        </div>
      </footer>
    </div>
  );
}

