import React, { useState, useMemo } from "react";
import { ShoppingBag, Plus, Minus, X, Phone, MapPin, Check, ChevronRight, Flame, QrCode, Download } from "lucide-react";

// ---------- MENU DATA (from Chaska Restaurant menu card) ----------
const MENU = [
  {
    category: "Rolls",
    items: [
      { name: "Veg Roll", price: 30 },
      { name: "Paneer Roll", price: 60 },
      { name: "Egg Roll", price: 40 },
      { name: "Chicken Roll", price: 60 },
      { name: "Spring Roll", price: 30 },
    ],
  },
  {
    category: "Burgers & Fries",
    items: [
      { name: "Plain Burger", price: 30 },
      { name: "Paneer Burger", price: 50 },
      { name: "Chicken Burger", price: 50 },
      { name: "French Fries", price: 30 },
    ],
  },
  {
    category: "Noodles",
    items: [
      { name: "Veg Chowmin", half: 30, full: 50 },
      { name: "Egg Chowmin", half: 50, full: 80 },
      { name: "Paneer Chowmin", half: 50, full: 80 },
      { name: "Chicken Chowmin", half: 50, full: 80 },
      { name: "Hakka Noodles", half: 50, full: 80 },
    ],
  },
  {
    category: "Sandwiches",
    items: [
      { name: "Veg Sandwich", price: 30 },
      { name: "Paneer Sandwich", price: 80 },
      { name: "Chicken Sandwich", price: 80 },
      { name: "Chaska Spl Sandwich", price: 110, spl: true },
    ],
  },
  {
    category: "Veg Starters",
    items: [
      { name: "Paneer Lollipop", four: 120, eight: 180 },
      { name: "Paneer Tikka", four: 120, eight: 200 },
      { name: "Paneer Pakoda", four: 100, eight: 180 },
      { name: "Paneer 65", four: 150, eight: 250 },
      { name: "Chilli Potato", half: 50, full: 70 },
      { name: "Veg Manchurian", half: 80, full: 120 },
      { name: "Paneer Manchurian", half: 120, full: 190 },
    ],
  },
  {
    category: "Non-Veg Starters",
    items: [
      { name: "Chicken Lollipop", four: 160, eight: 320 },
      { name: "Chicken Wings", four: 120, eight: 200 },
      { name: "Chicken Pakoda", four: 100, eight: 180 },
      { name: "Chicken Manchurian", four: 140, eight: 250 },
      { name: "Chicken 65", four: 150, eight: 250 },
      { name: "Chicken Kabab", price: 100 },
      { name: "Chicken Tikka", price: 80 },
      { name: "Chicken Manchurian (H/F)", half: 120, full: 190 },
    ],
  },
  {
    category: "Biryani",
    items: [
      { name: "Muradabad Biryani", half: 80, full: 130 },
      { name: "Hyderabad Biryani", half: 80, full: 130 },
      { name: "Kolkata Biryani", half: 80, full: 130 },
      { name: "Chaska Spl. Biryani", price: 200, spl: true },
    ],
  },
  {
    category: "Cold Drinks",
    items: [
      { name: "Plain Cold Drink", price: 25 },
      { name: "Masala Cold Drink", price: 35 },
    ],
  },
  {
    category: "Non-Veg Meal",
    items: [
      { name: "Chicken Dehati", four: 160, eight: 300 },
      { name: "Chicken Kadhai", four: 160, eight: 300 },
      { name: "Chicken Chilli", four: 120, eight: 200 },
      { name: "Chicken Do-Pyaza", four: 160, eight: 300 },
      { name: "Chicken Masala", four: 160, eight: 300 },
      { name: "Chicken Butter Masala", four: 180, eight: 320 },
      { name: "Chaska Spl Chicken", four: 160, eight: 300, spl: true },
      { name: "Egg Curry", four: 120, eight: 200 },
      { name: "Egg Bhurji", four: 40, eight: 80 },
    ],
  },
  {
    category: "Veg Meal",
    items: [
      { name: "Kadhai Paneer", four: 110, eight: 200 },
      { name: "Chilli Paneer", four: 90, eight: 160 },
      { name: "Paneer Do-Pyaza", four: 110, eight: 200 },
      { name: "Paneer Masala", four: 100, eight: 180 },
      { name: "Paneer Butter Masala", four: 110, eight: 200 },
      { name: "Shahi Paneer", four: 130, eight: 240 },
      { name: "Matar Paneer", four: 90, eight: 160 },
      { name: "Chaska Spl Paneer", four: 110, eight: 200, spl: true },
    ],
  },
  {
    category: "Rice",
    items: [
      { name: "Plain Rice", half: 40, full: 70 },
      { name: "Jeera Rice", half: 50, full: 80 },
      { name: "Paneer Rice", half: 60, full: 100 },
      { name: "Chicken Rice", half: 60, full: 100 },
    ],
  },
  {
    category: "Roti",
    items: [
      { name: "Plain Roti", price: 10 },
      { name: "Butter Roti", price: 15 },
      { name: "Tandoori Roti", price: 35 },
      { name: "Tandoori Butter Roti", price: 45 },
      { name: "Lachha Paratha", price: 30 },
      { name: "Lachha Paratha Butter", price: 40 },
      { name: "Paneer Kulcha", price: 60 },
    ],
  },
  {
    category: "Pizza Special",
    items: [
      { name: "Onion Pizza", reg: 99, large: 129 },
      { name: "Capsicum Pizza", reg: 99, large: 129 },
      { name: "Tomato Pizza", reg: 99, large: 129 },
      { name: "Sweet Corn Pizza", reg: 119, large: 159 },
      { name: "Onion + Capsicum Pizza", reg: 119, large: 159 },
      { name: "Tomato + Sweet Corn Pizza", reg: 119, large: 159 },
      { name: "Baby Corn Pizza", reg: 99, large: 129 },
      { name: "Chaska Veg Pizza", reg: 149, large: 199, spl: true },
      { name: "Paneer Chilli Pizza", reg: 149, large: 199 },
      { name: "Chicken Chilli Pizza", reg: 149, large: 199 },
      { name: "Chaska Cheese Pizza", reg: 149, large: 199, spl: true },
    ],
  },
];

const RESTAURANT_INFO = {
  name: "Chaska Restaurant",
  address: "First Floor, Near GB Cyber World, Vishwakarma Market, Chainpur Road, Rasulpur",
  phone: "7903262362",
};

// Paste your Razorpay Key ID here (the public "Key ID", starts with rzp_ —
// never your Key Secret, that must stay on a server). Get it from
// Razorpay Dashboard > Settings > API Keys. Until this is set, online
// payment falls back to a clearly-labelled demo mode.
const RAZORPAY_KEY_ID = "rzp_test_TE8TZtiN5Pi4xl";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// size label pairs per data shape
function sizeVariants(item) {
  if (item.price != null) return [{ label: null, price: item.price }];
  if (item.half != null) return [{ label: "Half", price: item.half }, { label: "Full", price: item.full }];
  if (item.four != null) return [{ label: "4 pcs", price: item.four }, { label: "8 pcs", price: item.eight }];
  if (item.reg != null) return [{ label: "Regular", price: item.reg }, { label: "Large", price: item.large }];
  return [{ label: null, price: 0 }];
}

// NOTE: these are stock/generic photos matched by dish type, not actual photos of
// Chaska's food. Swap in real photos of your dishes for accuracy — see README.
function money(n) {
  return `₹${n}`;
}

export default function ChaskaApp() {
  const [activeCat, setActiveCat] = useState(MENU[0].category);
  const [cart, setCart] = useState({}); // key: "item|label" -> {name,label,price,qty}
  const [cartOpen, setCartOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState(typeof window !== "undefined" ? window.location.href : "https://orderchaska.com");
  const [checkoutStep, setCheckoutStep] = useState(null); // null | "form" | "payment" | "done"
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [payMethod, setPayMethod] = useState("online");
  const [orderId, setOrderId] = useState(null);
  const [waLink, setWaLink] = useState(null);

  const addToCart = (category, itemName, variant) => {
    const key = `${itemName}|${variant.label || "std"}`;
    setCart((prev) => {
      const existing = prev[key];
      return {
        ...prev,
        [key]: {
          name: itemName,
          category,
          label: variant.label,
          price: variant.price,
          qty: existing ? existing.qty + 1 : 1,
        },
      };
    });
  };

  const changeQty = (key, delta) => {
    setCart((prev) => {
      const item = prev[key];
      if (!item) return prev;
      const qty = item.qty + delta;
      if (qty <= 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: { ...item, qty } };
    });
  };

  const cartItems = Object.entries(cart);
  const cartCount = cartItems.reduce((sum, [, v]) => sum + v.qty, 0);
  const subtotal = cartItems.reduce((sum, [, v]) => sum + v.qty * v.price, 0);
  const deliveryFee = subtotal > 0 && subtotal < 300 ? 25 : 0;
  const total = subtotal + deliveryFee;

  const canCheckout = form.name.trim() && form.phone.trim().length >= 10 && form.address.trim();

  const buildWhatsAppMessage = (id) => {
    const lines = [
      `*New Order — ${id}*`,
      "",
      ...cartItems.map(([, v]) => `${v.qty} x ${v.name}${v.label ? ` (${v.label})` : ""} — ${money(v.qty * v.price)}`),
      "",
      `Subtotal: ${money(subtotal)}`,
      `Delivery: ${deliveryFee ? money(deliveryFee) : "Free"}`,
      `*Total: ${money(total)}*`,
      "",
      `Payment: ${payMethod === "online" ? "Paid online" : "Cash on delivery"}`,
      "",
      `Customer: ${form.name}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}`,
    ];
    return encodeURIComponent(lines.join("\n"));
  };

  const [payLoading, setPayLoading] = useState(false);

  const handleRazorpayPayment = async () => {
    setPayLoading(true);
    const loaded = await loadRazorpayScript();
    setPayLoading(false);
    if (!loaded) {
      alert("Couldn't load payment gateway. Check your connection and try again.");
      return;
    }
    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY_ID,
      amount: Math.round(total * 100), // paise
      currency: "INR",
      name: RESTAURANT_INFO.name,
      description: `Order for ${form.name}`,
      prefill: { name: form.name, contact: form.phone },
      theme: { color: "#D9A441" },
      handler: function () {
        placeOrder();
      },
      modal: {
        ondismiss: function () {
          setPayLoading(false);
        },
      },
    });
    rzp.on("payment.failed", function () {
      alert("Payment failed. You can try again or choose Cash on delivery.");
    });
    rzp.open();
  };

  const placeOrder = () => {
    const id = "CHK" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
    setCheckoutStep("done");
    const waUrl = `https://wa.me/91${RESTAURANT_INFO.phone}?text=${buildWhatsAppMessage(id)}`;
    setWaLink(waUrl);
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#100D08] text-[#F3E9D2] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }
        .font-sans { font-family: 'Poppins', sans-serif; }
        ::selection { background: #D9A441; color: #100D08; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#100D08]/95 backdrop-blur border-b border-[#D9A441]/20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-[#D9A441]" strokeWidth={1.5} />
            <div>
              <div className="font-display text-2xl leading-none text-[#D9A441]">CHASKA</div>
              <div className="text-[9px] tracking-[0.3em] text-[#F3E9D2]/60 -mt-0.5">RESTAURANT</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQrOpen(true)}
              className="flex items-center gap-1.5 border border-[#D9A441]/30 text-[#D9A441] px-3 py-2 rounded-full text-sm hover:border-[#D9A441]/60 transition-colors"
              title="Get QR code"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#D9A441] text-[#100D08] px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#E8C878] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C1440E] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#D9A441]/15">
        <div className="max-w-5xl mx-auto px-4 py-10 text-center">
          <div className="text-[10px] tracking-[0.4em] text-[#D9A441]/70 mb-2">ROLLS · BIRYANI · PIZZA · TANDOOR</div>
          <h1 className="font-display text-5xl sm:text-6xl text-[#F3E9D2] mb-2">
            Order the <span className="text-[#D9A441]">Chaska</span>
          </h1>
          <p className="text-[#F3E9D2]/60 text-sm max-w-md mx-auto mb-4">
            Fresh off the tandoor, straight to your door. Browse the full menu and order in a minute.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-[#F3E9D2]/50">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Rasulpur</span>
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {RESTAURANT_INFO.phone}</span>
          </div>
        </div>
      </section>

      {/* Category nav */}
      <nav className="sticky top-[57px] z-20 bg-[#100D08]/95 backdrop-blur border-b border-[#D9A441]/10">
        <div className="max-w-5xl mx-auto px-4 flex gap-2 overflow-x-auto py-3 no-scrollbar">
          {MENU.map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                setActiveCat(cat.category);
                document.getElementById(`cat-${cat.category}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeCat === cat.category
                  ? "bg-[#D9A441] text-[#100D08] border-[#D9A441]"
                  : "border-[#D9A441]/25 text-[#F3E9D2]/70 hover:border-[#D9A441]/60"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </nav>

      {/* Menu */}
      <main className="max-w-5xl mx-auto px-4 pb-32">
        {MENU.map((cat) => (
          <section key={cat.category} id={`cat-${cat.category}`} className="pt-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-display text-2xl text-[#D9A441]">{cat.category}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-[#D9A441]/40 to-transparent" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {cat.items.map((item) => {
                const variants = sizeVariants(item);
                return (
                  <div
                    key={item.name}
                    className="bg-[#17130D] border border-[#D9A441]/10 rounded-xl p-4 hover:border-[#D9A441]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-medium text-sm text-[#F3E9D2]">
                        {item.name}
                        {item.spl && <span className="ml-1.5 text-[10px] text-[#C1440E] bg-[#D9A441] px-1.5 py-0.5 rounded font-bold">SPL</span>}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((v) => {
                        const key = `${item.name}|${v.label || "std"}`;
                        const inCart = cart[key];
                        return (
                          <div key={key} className="flex items-center gap-2 bg-[#100D08] rounded-lg px-2.5 py-1.5 border border-[#D9A441]/10">
                            <span className="text-xs text-[#F3E9D2]/70">{v.label ? `${v.label} ` : ""}{money(v.price)}</span>
                            {inCart ? (
                              <div className="flex items-center gap-1.5 ml-1">
                                <button onClick={() => changeQty(key, -1)} className="w-5 h-5 flex items-center justify-center rounded bg-[#D9A441]/15 text-[#D9A441]">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs w-3 text-center">{inCart.qty}</span>
                                <button onClick={() => changeQty(key, 1)} className="w-5 h-5 flex items-center justify-center rounded bg-[#D9A441]/15 text-[#D9A441]">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(cat.category, item.name, v)}
                                className="ml-1 text-[10px] font-semibold text-[#100D08] bg-[#D9A441] px-2 py-0.5 rounded"
                              >
                                ADD
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <div className="pt-10 text-center text-xs text-[#F3E9D2]/40 border-t border-[#D9A441]/10 mt-10">
          {RESTAURANT_INFO.address} · For queries call {RESTAURANT_INFO.phone}
        </div>
      </main>

      {/* Floating cart bar (mobile-friendly) */}
      {cartCount > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-[#D9A441] text-[#100D08] rounded-xl py-3.5 px-5 flex items-center justify-between font-semibold shadow-lg shadow-black/40 z-30"
        >
          <span className="flex items-center gap-2"><ShoppingBag className="w-4 h-4" /> {cartCount} item{cartCount > 1 ? "s" : ""}</span>
          <span className="flex items-center gap-1">{money(total)} <ChevronRight className="w-4 h-4" /></span>
        </button>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => { setCartOpen(false); setCheckoutStep(null); }} />
          <div className="relative w-full max-w-md bg-[#14100A] h-full overflow-y-auto flex flex-col border-l border-[#D9A441]/20">
            <div className="flex items-center justify-between p-4 border-b border-[#D9A441]/10">
              <h2 className="font-display text-2xl text-[#D9A441]">
                {checkoutStep === "done" ? "Order Placed" : checkoutStep === "form" ? "Delivery Details" : "Your Cart"}
              </h2>
              <button onClick={() => { setCartOpen(false); setCheckoutStep(null); }} className="text-[#F3E9D2]/60 hover:text-[#F3E9D2]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CART VIEW */}
            {!checkoutStep && (
              <>
                <div className="flex-1 p-4 space-y-3">
                  {cartItems.length === 0 && (
                    <p className="text-sm text-[#F3E9D2]/40 text-center pt-10">Your cart is empty. Add something tasty!</p>
                  )}
                  {cartItems.map(([key, v]) => (
                    <div key={key} className="flex items-center justify-between bg-[#17130D] rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-sm font-medium">{v.name}</div>
                          <div className="text-xs text-[#F3E9D2]/50">{v.label ? `${v.label} · ` : ""}{money(v.price)} each</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => changeQty(key, -1)} className="w-6 h-6 flex items-center justify-center rounded bg-[#D9A441]/15 text-[#D9A441]">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm w-4 text-center">{v.qty}</span>
                        <button onClick={() => changeQty(key, 1)} className="w-6 h-6 flex items-center justify-center rounded bg-[#D9A441]/15 text-[#D9A441]">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {cartItems.length > 0 && (
                  <div className="p-4 border-t border-[#D9A441]/10 space-y-1.5">
                    <div className="flex justify-between text-sm text-[#F3E9D2]/60">
                      <span>Subtotal</span><span>{money(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#F3E9D2]/60">
                      <span>Delivery</span><span>{deliveryFee ? money(deliveryFee) : "Free"}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-base pt-1.5 border-t border-[#D9A441]/10">
                      <span>Total</span><span className="text-[#D9A441]">{money(total)}</span>
                    </div>
                    <button
                      onClick={() => setCheckoutStep("form")}
                      className="w-full mt-3 bg-[#D9A441] text-[#100D08] font-semibold py-3 rounded-lg hover:bg-[#E8C878] transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </>
            )}

            {/* FORM VIEW */}
            {checkoutStep === "form" && (
              <div className="flex-1 p-4 space-y-3">
                <div>
                  <label className="text-xs text-[#F3E9D2]/60 mb-1 block">Full name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#17130D] border border-[#D9A441]/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#D9A441]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#F3E9D2]/60 mb-1 block">Phone number</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9]/g, "") })}
                    className="w-full bg-[#17130D] border border-[#D9A441]/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#D9A441]"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                </div>
                <div>
                  <label className="text-xs text-[#F3E9D2]/60 mb-1 block">Delivery address</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-[#17130D] border border-[#D9A441]/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#D9A441] resize-none"
                    rows={3}
                    placeholder="House no, street, landmark, area"
                  />
                </div>

                <div className="pt-1">
                  <label className="text-xs text-[#F3E9D2]/60 mb-1.5 block">Payment method</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPayMethod("online")}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm ${
                        payMethod === "online" ? "border-[#D9A441] bg-[#D9A441]/10" : "border-[#D9A441]/15"
                      }`}
                    >
                      Pay online (UPI / Card)
                      {payMethod === "online" && <Check className="w-4 h-4 text-[#D9A441]" />}
                    </button>
                    <button
                      onClick={() => setPayMethod("cod")}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm ${
                        payMethod === "cod" ? "border-[#D9A441] bg-[#D9A441]/10" : "border-[#D9A441]/15"
                      }`}
                    >
                      Cash on delivery
                      {payMethod === "cod" && <Check className="w-4 h-4 text-[#D9A441]" />}
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D9A441]/10 flex justify-between text-sm font-semibold">
                  <span>Total</span><span className="text-[#D9A441]">{money(total)}</span>
                </div>

                <button
                  disabled={!canCheckout}
                  onClick={() => (payMethod === "online" ? setCheckoutStep("payment") : placeOrder())}
                  className="w-full mt-2 bg-[#D9A441] text-[#100D08] font-semibold py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E8C878] transition-colors"
                >
                  {payMethod === "online" ? "Continue to Payment" : "Place Order"}
                </button>
              </div>
            )}

            {/* PAYMENT VIEW */}
            {checkoutStep === "payment" && (
              <div className="flex-1 p-4 flex flex-col">
                <div className="bg-[#17130D] border border-[#D9A441]/15 rounded-lg p-4 mb-4">
                  {!RAZORPAY_KEY_ID && (
                    <p className="text-xs text-[#F3E9D2]/50 mb-3">
                      Demo mode — no payment key configured yet. Add your Razorpay Key ID in the code to accept real payments here.
                    </p>
                  )}
                  <div className="text-sm text-[#F3E9D2]/70 mb-1">Amount payable</div>
                  <div className="font-display text-3xl text-[#D9A441]">{money(total)}</div>
                </div>
                <button
                  onClick={RAZORPAY_KEY_ID ? handleRazorpayPayment : placeOrder}
                  disabled={payLoading}
                  className="w-full bg-[#D9A441] text-[#100D08] font-semibold py-3 rounded-lg hover:bg-[#E8C878] transition-colors disabled:opacity-50"
                >
                  {payLoading ? "Opening payment..." : RAZORPAY_KEY_ID ? "Pay Now (UPI / Card)" : "Simulate Successful Payment"}
                </button>
                <button
                  onClick={() => setCheckoutStep("form")}
                  className="w-full mt-2 text-xs text-[#F3E9D2]/50 py-2"
                >
                  Back
                </button>
              </div>
            )}

            {/* DONE VIEW */}
            {checkoutStep === "done" && (
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#D9A441] flex items-center justify-center mb-4">
                  <Check className="w-7 h-7 text-[#100D08]" />
                </div>
                <h3 className="font-display text-2xl text-[#D9A441] mb-1">Almost done!</h3>
                <p className="text-sm text-[#F3E9D2]/60 mb-4">Order ID: {orderId}</p>
                <p className="text-xs text-[#F3E9D2]/50 max-w-xs">
                  WhatsApp has opened in a new tab with your order filled in — just tap <strong className="text-[#F3E9D2]/80">Send</strong> there
                  to notify {RESTAURANT_INFO.name}. They'll call {form.phone} to confirm and deliver shortly.
                </p>
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-[#25D366] text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                  >
                    Open WhatsApp to Send Order
                  </a>
                )}
                <button
                  onClick={() => {
                    setCart({});
                    setCheckoutStep(null);
                    setCartOpen(false);
                    setForm({ name: "", phone: "", address: "" });
                    setWaLink(null);
                  }}
                  className="mt-6 text-sm font-semibold text-[#D9A441] border border-[#D9A441]/40 px-5 py-2 rounded-full"
                >
                  Order More
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR CODE MODAL */}
      {qrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setQrOpen(false)} />
          <div className="relative bg-[#14100A] border border-[#D9A441]/20 rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-2xl text-[#D9A441]">Scan to Order</h3>
              <button onClick={() => setQrOpen(false)} className="text-[#F3E9D2]/60 hover:text-[#F3E9D2]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white rounded-xl p-4 flex items-center justify-center mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(qrUrl)}`}
                alt="QR code to Chaska Restaurant ordering site"
                className="w-full h-auto"
                width={280}
                height={280}
              />
            </div>
            <label className="text-xs text-[#F3E9D2]/60 mb-1 block">Site URL this QR points to</label>
            <input
              value={qrUrl}
              onChange={(e) => setQrUrl(e.target.value)}
              className="w-full bg-[#221C13] border border-[#D9A441]/15 rounded-lg px-3 py-2 text-xs mb-3 focus:outline-none focus:border-[#D9A441]"
              placeholder="https://orderchaska.com"
            />
            <p className="text-[10px] text-[#F3E9D2]/40 mb-3">
              Once your site is live on its own domain, paste that link above so the QR
              always points to the real site — this box defaults to whatever page you're on now.
            </p>
            <a
              href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(qrUrl)}`}
              download="chaska-qr-code.png"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#D9A441] text-[#100D08] font-semibold py-2.5 rounded-lg hover:bg-[#E8C878] transition-colors"
            >
              <Download className="w-4 h-4" /> Download for print / Instagram
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
