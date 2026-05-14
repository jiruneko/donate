import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://donate-weld-three.vercel.app"
    : "http://localhost:3000";
    
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const amount = Number(body.amount);

    if (
      isNaN(amount) ||
      amount < 500 ||
      amount > 100000
    ) {
      return Response.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "jpy",

            product_data: {
              name: "ゆどうふへの寄付",
            },

            unit_amount: amount,
          },

          quantity: 1,
        },
      ],

      mode: "payment",

      success_url:
        `${BASE_URL}/success?amount=${amount}`,

      cancel_url:
        `${BASE_URL}`,
    });

    return Response.json({
      url: session.url,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: "Stripe Error" },
      { status: 500 }
    );
  }
}