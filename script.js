const PRODUCTS = [
    { id: 1, name: "Pro Wireless Controller", cat: "controllers", price: 189, icon: "🎮", desc: "Low-latency, 20h battery, RGB grips.", tag: "Best seller" },
    { id: 2, name: "Arcade Stick Mini", cat: "controllers", price: 145, icon: "🕹️", desc: "Fighting-game stick with clicky buttons." },
    { id: 3, name: "Surround Headset X", cat: "audio", price: 129, icon: "🎧", desc: "7.1 sound and a clear detachable mic." },
    { id: 4, name: "Stream Mic USB", cat: "audio", price: 99, icon: "🎙️", desc: "Plug and play, built for Discord and streams." },
    { id: 5, name: "RGB Mechanical Keyboard", cat: "pc", price: 169, icon: "⌨️", desc: "Hot-swap switches, 16M colours.", tag: "New" },
    { id: 6, name: "Speed Mouse 12K", cat: "pc", price: 79, icon: "🖱️", desc: "Light 58g body and adjustable DPI." },
    { id: 7, name: "XL RGB Mousepad", cat: "pc", price: 49, icon: "🟪", desc: "90 x 40 cm with glowing edges." },
    { id: 8, name: "PSN Card 20 USD", cat: "cards", price: 72, icon: "💳", desc: "Digital code sent by email within minutes." },
    { id: 9, name: "Steam Card 20 USD", cat: "cards", price: 70, icon: "🎟️", desc: "Top up your wallet and grab the next sale." },
    { id: 10, name: "Xbox Game Pass 1 month", cat: "cards", price: 45, icon: "🟩", desc: "Hundreds of games on console and PC." },
    { id: 11, name: "PlayStation 5 Slim", cat: "consoles", price: 1990, icon: "🎮", desc: "Disc edition with one controller and HDMI cable.", tag: "Hot" },
    { id: 12, name: "Xbox Series S", cat: "consoles", price: 1190, icon: "🟩", desc: "Compact, digital-only, fast loading." },
    { id: 13, name: "Nintendo Switch OLED", cat: "consoles", price: 1290, icon: "🔴", desc: "Play on the TV or take it anywhere." },
    { id: 14, name: "Retro Console 10,000 games", cat: "consoles", price: 159, icon: "👾", desc: "Classic arcade and 8-bit games, two pads included." },
    { id: 15, name: "Gaming Chair Pro", cat: "setup", price: 649, icon: "🪑", desc: "Adjustable back, neck pillow and lumbar support." },
    { id: 16, name: "RGB LED Light Strip 5m", cat: "setup", price: 35, icon: "💡", desc: "Remote control and 16 colour modes for your room." },
    { id: 17, name: "Gaming Desk 140 cm", cat: "setup", price: 399, icon: "🖥️", desc: "Carbon-look top, cup holder and cable hole." },
    { id: 18, name: "Headset Stand RGB", cat: "setup", price: 59, icon: "🎧", desc: "Glowing stand with 2 USB ports." },
    { id: 19, name: "Monitor 27\" 165Hz", cat: "pc", price: 749, icon: "🖥️", desc: "1ms response, ideal for FPS games.", tag: "New" },
    { id: 20, name: "Webcam Full HD", cat: "pc", price: 89, icon: "📷", desc: "1080p with auto light fix for streaming." },
    { id: 21, name: "Controller Charging Dock", cat: "controllers", price: 55, icon: "🔋", desc: "Charges two controllers at once." },
    { id: 22, name: "Thumb Grips Pack x8", cat: "controllers", price: 15, icon: "🔵", desc: "Anti-slip silicone caps in 4 colours." },
    { id: 23, name: "Wireless Gaming Earbuds", cat: "audio", price: 119, icon: "🎧", desc: "Low-latency mode and 30h battery with case." },
    { id: 24, name: "Fortnite V-Bucks 2800", cat: "cards", price: 59, icon: "💎", desc: "Top-up code for skins and the battle pass." },
    { id: 25, name: "Roblox Gift Card 25 USD", cat: "cards", price: 85, icon: "🧱", desc: "Digital code sent by email." },
    { id: 26, name: "EA FC 26 (PS5)", cat: "games", price: 229, icon: "⚽", desc: "The latest football game with Ultimate Team." },
    { id: 27, name: "Minecraft (Switch)", cat: "games", price: 99, icon: "⛏️", desc: "Build, survive and play with friends." },
    { id: 28, name: "Mario Kart 8 Deluxe", cat: "games", price: 179, icon: "🏎️", desc: "Race with up to 4 players on one screen." },
    { id: 29, name: "Call of Duty (Xbox)", cat: "games", price: 249, icon: "🔫", desc: "Campaign, multiplayer and zombies mode." }
  ];
  
  /* ---------- Settings (edit these) ---------- */
  const WHATSAPP = "21600000000";   // your number: 216 + 8 digits, no + or spaces
  const FREE_FROM = 300, DELIVERY = 7, PROMO = { GAMER10: 0.10 };
  const SALE = { 1: 219, 3: 159, 5: 199, 6: 99, 11: 2190, 13: 1390, 15: 749, 19: 849, 26: 259 }; // old prices
  const GOV = ["Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kébili","Kef","Mahdia","Manouba","Médenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"];
  
  const $ = (s) => document.querySelector(s);
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
  const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const dt = (n) => Math.round(n).toLocaleString("fr-TN") + " DT";
  const rating = (p) => (4.2 + (p.id * 7 % 9) / 10).toFixed(1);
  const reviews = (p) => 12 + (p.id * 13 % 80);
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  
  let cart = load("pd-cart", []), wish = new Set(load("pd-wish", [])), promo = load("pd-promo", "");
  const view = { cat: "all", q: "", sort: "default" };
  
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast.id);
    toast.id = setTimeout(() => t.classList.remove("show"), 2400);
  }
  
  /* ---------- Theme ---------- */
  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    document.querySelectorAll(".theme").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.t === t)));
    store("pd-theme", t);
  }
  document.querySelector(".themes").addEventListener("click", (e) => {
    const b = e.target.closest(".theme"); if (b) setTheme(b.dataset.t);
  });
  setTheme(load("pd-theme", "neon"));
  
  /* ---------- Products ---------- */
  function renderProducts() {
    let list = PRODUCTS.filter((p) =>
      (view.cat === "all" || (view.cat === "saved" ? wish.has(p.id) : p.cat === view.cat)) &&
      (p.name + " " + p.desc).toLowerCase().includes(view.q));
    if (view.sort === "low") list.sort((a, b) => a.price - b.price);
    if (view.sort === "high") list.sort((a, b) => b.price - a.price);
    if (view.sort === "top") list.sort((a, b) => rating(b) - rating(a));
    $("#resultCount").textContent = list.length + (list.length === 1 ? " item" : " items");
    $("#productGrid").innerHTML = list.length ? list.map((p) => {
      const old = SALE[p.id], off = old ? Math.round((1 - p.price / old) * 100) : 0;
      return `
      <article class="card">
        ${off ? `<span class="tag sale">-${off}%</span>` : p.tag ? `<span class="tag">${p.tag}</span>` : ""}
        <button class="heart" data-id="${p.id}" aria-pressed="${wish.has(p.id)}" aria-label="Save ${p.name}">${wish.has(p.id) ? "♥" : "♡"}</button>
        <div class="thumb" aria-hidden="true">${p.icon}</div>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="stars" aria-label="Rated ${rating(p)} out of 5">★ ${rating(p)} <span>(${reviews(p)})</span></div>
        <div class="buy">
          <span class="price">${dt(p.price)}${old ? `<s>${dt(old)}</s>` : ""}</span>
          <button class="add" data-id="${p.id}">Add to cart</button>
        </div>
      </article>`; }).join("")
      : `<p class="empty">${view.cat === "saved" ? "No saved items yet. Tap the heart on a product." : "Nothing found. Try another word or category."}</p>`;
  }
  
  $("#filters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip"); if (!chip) return;
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active"); view.cat = chip.dataset.cat; renderProducts();
  });
  $("#search").addEventListener("input", (e) => { view.q = e.target.value.trim().toLowerCase(); renderProducts(); });
  $("#sort").addEventListener("change", (e) => { view.sort = e.target.value; renderProducts(); });
  
  $("#productGrid").addEventListener("click", (e) => {
    const h = e.target.closest(".heart");
    if (h) {
      const id = Number(h.dataset.id);
      wish.has(id) ? wish.delete(id) : wish.add(id);
      store("pd-wish", [...wish]); return renderProducts();
    }
    const btn = e.target.closest(".add"); if (!btn) return;
    const id = Number(btn.dataset.id), f = cart.find((i) => i.id === id);
    f ? f.qty++ : cart.push({ id, qty: 1 });
    updateCart(); toast("Added to your cart");
    const cb = $("#cartBtn"); cb.classList.remove("bump"); void cb.offsetWidth; cb.classList.add("bump");
  });
  /* light that follows the mouse on cards */
  $("#productGrid").addEventListener("pointermove", (e) => {
    const c = e.target.closest(".card"); if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px");
  });
  
  /* ---------- Cart ---------- */
  function totals() {
    const sub = cart.reduce((s, i) => s + byId(i.id).price * i.qty, 0);
    const disc = PROMO[promo] ? sub * PROMO[promo] : 0;
    const net = sub - disc;
    return { sub, disc, net, fee: !sub || net >= FREE_FROM ? 0 : DELIVERY, total: net + (!sub || net >= FREE_FROM ? 0 : DELIVERY) };
  }
  function updateCart() {
    store("pd-cart", cart);
    const t = totals();
    $("#cartCount").textContent = cart.reduce((s, i) => s + i.qty, 0);
    $("#sumSub").textContent = dt(t.sub);
    $("#sumDisc").textContent = t.disc ? "−" + dt(t.disc) : "—";
    $("#sumFee").textContent = !t.sub ? "—" : t.fee ? dt(t.fee) : "Free";
    $("#cartTotal").textContent = dt(t.total);
    $("#shipBar").style.width = Math.min(100, t.net / FREE_FROM * 100) + "%";
    $("#shipMsg").textContent = !t.sub ? `Free delivery from ${FREE_FROM} DT` :
      t.net >= FREE_FROM ? "You got free delivery!" : `Add ${dt(FREE_FROM - t.net)} more for free delivery`;
    $("#cartItems").innerHTML = cart.length ? cart.map((i) => { const p = byId(i.id); return `
      <li class="item">
        <span class="ico" aria-hidden="true">${p.icon}</span>
        <div>${p.name}<small>${dt(p.price)}</small></div>
        <div class="qty">
          <button data-act="dec" data-id="${p.id}" aria-label="Remove one">−</button><span>${i.qty}</span>
          <button data-act="inc" data-id="${p.id}" aria-label="Add one">+</button>
        </div>
      </li>`; }).join("") : `<li class="empty">Your cart is empty. Pick a game or a controller to start.</li>`;
  }
  $("#cartItems").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const it = cart.find((i) => i.id === Number(b.dataset.id)); if (!it) return;
    it.qty += b.dataset.act === "inc" ? 1 : -1;
    cart = cart.filter((i) => i.qty > 0); updateCart();
  });
  
  $("#promoBtn").addEventListener("click", () => {
    const code = $("#promoInput").value.trim().toUpperCase();
    if (PROMO[code]) { promo = code; store("pd-promo", code); $("#promoMsg").textContent = `Code ${code} applied: -${PROMO[code] * 100}%`; }
    else { promo = ""; store("pd-promo", ""); $("#promoMsg").textContent = "This code is not valid."; }
    updateCart();
  });
  
  const setDrawer = (open) => {
    $("#drawer").classList.toggle("open", open);
    $("#drawer").setAttribute("aria-hidden", String(!open));
    $("#overlay").classList.toggle("show", open);
    if (!open) $("#orderForm").hidden = true;
  };
  $("#cartBtn").addEventListener("click", () => setDrawer(true));
  $("#closeCart").addEventListener("click", () => setDrawer(false));
  $("#overlay").addEventListener("click", () => setDrawer(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setDrawer(false));
  $("#clearCart").addEventListener("click", () => { cart = []; updateCart(); });
  
  /* ---------- Checkout (order sent on WhatsApp) ---------- */
  $("#gov").innerHTML = '<option value="">Choose your governorate</option>' + GOV.map((g) => `<option>${g}</option>`).join("");
  $("#checkout").addEventListener("click", () => {
    if (!cart.length) return toast("Add something to your cart first");
    $("#orderForm").hidden = false; $("#oName").focus();
  });
  $("#orderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#oName").value.trim(), phone = $("#oPhone").value.replace(/\s/g, "").replace(/^\+216/, "");
    const gov = $("#gov").value, addr = $("#oAddr").value.trim();
    const bad = name.length < 2 ? "Enter your name." : !/^\d{8}$/.test(phone) ? "Phone number must have 8 digits." :
      !gov ? "Choose your governorate." : addr.length < 5 ? "Enter your address." : "";
    $("#orderErr").textContent = bad; if (bad) return;
    const t = totals();
    const lines = cart.map((i) => `• ${i.qty} x ${byId(i.id).name} (${dt(byId(i.id).price)})`).join("\n");
    const msg = `New order\n${lines}\n\nDelivery: ${t.fee ? dt(t.fee) : "Free"}${promo ? `\nPromo: ${promo}` : ""}\nTotal: ${dt(t.total)} (cash on delivery)\n\nName: ${name}\nPhone: ${phone}\nGovernorate: ${gov}\nAddress: ${addr}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    cart = []; updateCart(); e.target.reset(); setDrawer(false);
    toast("Order ready! Send it in WhatsApp to confirm.");
  });
  
  /* ---------- Mobile menu ---------- */
  $("#menuBtn").addEventListener("click", () => {
    const open = $("#nav").classList.toggle("open");
    $("#menuBtn").setAttribute("aria-expanded", String(open));
  });
  $("#nav").addEventListener("click", () => $("#nav").classList.remove("open"));
  
  /* ---------- Contact form ---------- */
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name").value.trim(), info = $("#contactInfo").value.trim(), msg = $("#message").value.trim();
    const isPhone = /^(\+216)?\s?\d{2}\s?\d{3}\s?\d{3}$/.test(info), isMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info);
    $("#nameErr").textContent = name.length < 2 ? "Enter your name." : "";
    $("#contactErr").textContent = isPhone || isMail ? "" : "Enter a Tunisian phone number (8 digits) or an email.";
    $("#messageErr").textContent = msg.length < 10 ? "Write at least 10 characters." : "";
    if (name.length < 2 || !(isPhone || isMail) || msg.length < 10) return;
    e.target.reset();
    $("#formOk").textContent = "Message sent. We reply within 24 hours.";
  });
  
  $("#year").textContent = new Date().getFullYear();
  renderProducts();
  updateCart();