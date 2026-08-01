// api/webhook.js
//
// Razorpay calls this endpoint directly (server-to-server) after a payment
// completes. This is the ONLY signal you should trust to mark an order as
// paid — never trust the "payment success" event from the browser alone,
// since that can be spoofed by anyone with dev tools open.
//
// Setup:
//   1. Deploy this function, note its public URL:
//      https://<your-domain>/api/webhook
//   2. In Razorpay Dashboard > Settings > Webhooks, add that URL,
//      subscribe to the "payment.captured" event, and set a webhook secret.
//   3. Add that secret as RAZORPAY_WEBHOOK_SECRET in your Vercel env vars.
//
// Vercel note: this route needs the RAW request body (not JSON-parsed) to
// verify the signature, so we disable the default body parser below.

import crypto from "crypto";

export const config = {
  api: {
    bodyParser: false,
  },
};

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawBody = await getRawBody(req);
  const signature = req.headers["x-razorpay-signature"];

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (signature !== expectedSignature) {
    console.warn("Webhook signature mismatch — possible spoofed request");
    return res.status(400).json({ error: "Invalid signature" });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    // This is the trustworthy point to mark the order as paid.
    // For now this just logs it — plug in your own storage here
    // (e.g. write to a Google Sheet, database, or send yourself a
    // WhatsApp/Slack alert) once you have somewhere to record orders.
    console.log("Payment captured:", {
      orderId: payment.order_id,
      paymentId: payment.id,
      amount: payment.amount / 100,
      email: payment.email,
      contact: payment.contact,
    });
  }

  // Always respond 200 quickly so Razorpay doesn't retry unnecessarily.
  return res.status(200).json({ received: true });
}
