// api/create-order.js
//
// Vercel serverless function. Creates a Razorpay order on the server so the
// Key Secret never touches the browser. The frontend calls this endpoint
// with the cart total, gets back an order_id, and hands that to Razorpay
// Checkout.
//
// Env vars needed (set in Vercel dashboard > Settings > Environment Variables):
//   RAZORPAY_KEY_ID      - starts with rzp_
//   RAZORPAY_KEY_SECRET  - never expose this to the frontend

import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, items, customer } = req.body || {};

    // Always recompute/validate the amount server-side in a real deployment —
    // never trust a total sent from the browser. For now we just sanity-check it.
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "Invalid order amount" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency: "INR",
      receipt: `chaska_${Date.now()}`,
      notes: {
        customer_name: customer?.name || "",
        customer_phone: customer?.phone || "",
        item_count: Array.isArray(items) ? items.length : undefined,
      },
    });

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID, // safe to expose, it's the public key
    });
  } catch (err) {
    console.error("create-order error:", err);
    return res.status(500).json({ error: "Could not create order" });
  }
}
