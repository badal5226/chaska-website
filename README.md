# Chaska Restaurant — Online Ordering Site

A ready-to-run food ordering website for Chaska Restaurant: full menu with pricing,
cart, and checkout.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Deploy it (host it live)

Easiest free options:
- **Vercel** or **Netlify**: connect this folder/GitHub repo, they auto-detect Vite and deploy.
- Run `npm run build` and upload the generated `dist/` folder to any static host
  (Hostinger, GoDaddy, etc. if that's where your domain is).

Point your domain (e.g. `orderchaska.com`) at the deployment once it's live.

## Editing the menu

All menu items and prices live in `src/App.jsx` at the top, in the `MENU` array.
Add, remove, or reprice items there — no other file needs to change. Update
`RESTAURANT_INFO` (address, phone) in the same file if those change.

## Important: connecting real payments

The checkout screen currently **simulates** a successful payment — it does not move
real money. That's because accepting live payments requires a secret API key that
must live on a server, never in the website code itself (anyone could read it in
their browser otherwise). Here's the standard path with **Razorpay** (most common
for Indian restaurants, supports UPI/cards/wallets):

1. Sign up at https://razorpay.com and complete KYC to activate live payments.
2. Get your **Key ID** and **Key Secret** from the Razorpay dashboard.
3. Create a small backend (a single serverless function works — e.g. on Vercel,
   Netlify Functions, or a tiny Node/Express server) with one endpoint that:
   - Receives the order total from the website
   - Calls Razorpay's Orders API using your Key Secret (kept only on the server,
     e.g. as an environment variable) to create an order
   - Returns the order ID to the website
4. On the website, replace the "Simulate Successful Payment" button with the
   Razorpay Checkout script, using the order ID from step 3. Razorpay's docs
   (https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/)
   have a copy-paste example for this exact flow.
5. Razorpay sends a webhook to your backend confirming payment — that's the
   trustworthy signal to mark the order as paid (don't trust the browser alone).

Until this is wired up, the "Cash on delivery" option works immediately as-is
since it just collects the order details.

## Menu photos

Every item now shows a photo, auto-matched by dish type (e.g. "chicken" +
"curry gravy" for a chicken curry dish) via a free placeholder photo service.
**These are generic stock-style photos, not actual photos of Chaska's food.**
For a restaurant site, real photos of your own dishes will always look more
trustworthy and appetizing than generic ones. To swap in real photos:

1. Take clear, well-lit photos of each dish (natural light works best).
2. Upload them somewhere with a direct image URL (e.g. a `public/images/`
   folder in this project, or a free image host).
3. In `src/App.jsx`, replace the `dishImageUrl(...)` call for that item with
   your image path/URL directly.

## Connecting real payments (Razorpay)

Online payment is wired up using Razorpay Checkout — you just need to add
your **Key ID**:

1. Sign up at https://razorpay.com and complete KYC to activate live payments.
2. Get your **Key ID** (starts with `rzp_`) from Dashboard > Settings > API Keys.
   Never use the **Key Secret** here — that must only ever live on a server.
3. Paste the Key ID into `RAZORPAY_KEY_ID` near the top of `src/App.jsx`.

With a Key ID set, "Pay Now" opens Razorpay's real checkout (UPI/cards/wallets)
for the exact order total. Until you add a key, that button stays in a
clearly-labeled demo mode so nothing looks broken to customers.

One caveat: since there's no backend here, payment success is trusted at
face value from the checkout popup — there's no server-side verification.
That's fine to start with, but before real volume, add a backend Orders API
call + webhook (Razorpay's docs walk through this exact flow) so payment
confirmation can't be spoofed.

## QR code

Tap the QR icon in the header to get a scannable code linking to the site —
download it to print or post on Instagram. It defaults to whatever URL the
site is running on; once you deploy to your own domain, paste that into the
box in the QR modal so the code always points at the live site.

## Taking orders

When a customer places an order, the site automatically opens WhatsApp with a
pre-filled message to the restaurant's number (`7903262362`, set in
`RESTAURANT_INFO` in `src/App.jsx`) listing every item, quantity, total, and
the customer's name/phone/address. Whoever has that WhatsApp open — owner or
cook — sees it immediately. If the browser blocks the auto-popup, the
customer sees a "Tap here to send it" fallback link.

To change which number receives orders, update `RESTAURANT_INFO.phone` in
`src/App.jsx`. Note it assumes an Indian (+91) number — change the `91` in
the `wa.me` link inside `placeOrder()` if that's ever not the case.

If order volume grows and WhatsApp becomes hard to keep up with, the next
steps up are a shared Google Sheet of orders, or a live kitchen dashboard —
happy to build either later.
