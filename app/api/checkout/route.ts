import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_URL;

    if (!secretKey) {
      return Response.json(
        { error: "Missing STRIPE_SECRET_KEY" },
        { status: 500 }
      );
    }

    if (!baseUrl) {
      return Response.json(
        { error: "Missing NEXT_PUBLIC_URL" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);

    const body = await req.json().catch(() => ({}));
    const { name, organisation, email, score } = body ?? {};

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: "Boardium Governance Health Check Report",
              description: "Board-ready governance diagnostic report",
            },
            unit_amount: 14900,
          },
          quantity: 1,
        },
      ],
      metadata: {
        name: name || "",
        organisation: organisation || "",
        email: email || "",
        score: String(score || ""),
      },
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return Response.json(
      { error: "Unable to create Stripe checkout session" },
      { status: 500 }
    );
  }
}