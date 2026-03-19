export async function POST(req: Request) {
  const data = await req.json();

  console.log("NEW LEAD:", data);

  // later: send to Google Sheets / Airtable

  return Response.json({ success: true });
}