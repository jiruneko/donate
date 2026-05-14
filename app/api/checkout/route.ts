import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const amount = Number(body.amount);

    // 金額チェック
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

    // 現在のURLを自動取得
    const origin = req.headers.get("origin");

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

      // 決済成功
      success_url: `${origin}/success?amount=${amount}`,

      // ← ここ超重要
      // キャンセル時はトップへ戻す
      cancel_url: `${origin}`,
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