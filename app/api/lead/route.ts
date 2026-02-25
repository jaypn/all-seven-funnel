import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  const payload = {
    name: String(form.get("name") || ""),
    phone: String(form.get("phone") || ""),
    email: String(form.get("email") || ""),
    address: String(form.get("address") || ""),
    service: String(form.get("service") || ""),
    details: String(form.get("details") || ""),
    createdAt: new Date().toISOString(),
  };

  // For now: log leads in terminal
  console.log("NEW LEAD:", payload);

  return NextResponse.redirect(
    new URL("/?submitted=1#quote", req.url),
    303
  );
}
