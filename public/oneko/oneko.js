// public/oneko/oneko.js
// ---------------------------------------------------------------
// ONEKO – ALWAYS ON + auto-cycle + DRAG SOUND + SWITCH SOUND
// ---------------------------------------------------------------

(async function oneko() {
  const CYCLE_INTERVAL = 30_000;   // 30 seconds
  const NEKO_SPEED = 10;

  // ==== STATE ====
  let nekoEl = null;
  let nekoPosX = 32, nekoPosY = 32;
  let mousePosX = 0, mousePosY = 0;
  let frameCount = 0, idleTime = 0;
  let idleAnimation = null, idleAnimationFrame = 0;
  let forceSleep = false, grabbing = false, grabStop = true, nudge = false;
  let kuroNeko = false, variant = "classic";

  let intervalId = null;
  let cycleTimeoutId = null;

  // ==== AUDIO ====
  const sounds = {
    drag: new Audio('/oneko/sounds/drag.mp3'),
    switch: new Audio('/oneko/sounds/switch.mp3')
  };
  // Preload
  Object.values(sounds).forEach(s => s.preload = 'auto');

  const playSound = (name) => {
    const sound = sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {}); // ignore autoplay errors
    }
  };

  // ==== VARIANTS ====
  const VARIANTS = [
    ["classic",    "Cat"],
    ["dog",        "Dog"],
    ["tora",       "Tora"],
    ["maia",       "Maia"],
    ["vaporwave",  "Vaporwave"]
  ];

  // ==== SPRITE MAP ====
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
    scratchWallN: [[0, 0], [0, -1]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4, 0], [-4, -1]],
    tired: [[-3, -2]],
    sleeping: [[-2, 0], [-2, -1]],
    N: [[-1, -2], [-1, -3]],
    NE: [[0, -2], [0, -3]],
    E: [[-3, 0], [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S: [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W: [[-4, -2], [-4, -3]],
    NW: [[-1, 0], [-1, -1]],
  };

  // ==== LOCAL STORAGE ====
  const parseLS = (k, f) => {
    try {
      const v = JSON.parse(localStorage.getItem(`oneko:${k}`));
      return typeof v === typeof f ? v : f;
    } catch { return f; }
  };
  const setLS = (k, v) => localStorage.setItem(`oneko:${k}`, JSON.stringify(v));

  // ==== SPRITE HELPERS ====
  const getSprite = (name, frame) => spriteSets[name][frame % spriteSets[name].length];
  const setSprite = (name, frame) => {
    const s = getSprite(name, frame);
    nekoEl.style.backgroundPosition = `${s[0] * 32}px ${s[1] * 32}px`;
  };
  const resetIdle = () => { idleAnimation = null; idleAnimationFrame = 0; };

  // ==== VARIANT CONTROL ====
  const setVariant = (id) => {
    const prev = variant;
    variant = id;
    setLS("variant", id);
    nekoEl.style.backgroundImage = `url('/oneko/oneko-${id}.gif')`;
    if (prev !== id) playSound('switch');
  };

  const rotateVariant = () => {
    const idx = VARIANTS.findIndex(v => v[0] === variant);
    const next = VARIANTS[(idx + 1) % VARIANTS.length];
    setVariant(next[0]);
  };

  const startCycling = () => {
    if (cycleTimeoutId) clearTimeout(cycleTimeoutId);
    cycleTimeoutId = setTimeout(() => {
      rotateVariant();
      startCycling();
    }, CYCLE_INTERVAL);
  };

  // ==== SLEEP (double-click) ====
  const sleep = () => {
    forceSleep = !forceSleep;
    setLS("forceSleep", forceSleep);
    nudge = false;
    if (!forceSleep) resetIdle();
  };

  // ==== IDLE ====
  const idle = () => {
    idleTime += 1;
    if (idleTime > 10 && Math.random() < 0.005 && !idleAnimation) {
      const c = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) c.push("scratchWallW");
      if (nekoPosY < 32) c.push("scratchWallN");
      if (nekoPosX > innerWidth - 32) c.push("scratchWallE");
      if (nekoPosY > innerHeight - 32) c.push("scratchWallS");
      idleAnimation = c[Math.floor(Math.random() * c.length)];
    }
    if (forceSleep) idleAnimation = "sleeping";

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8 && nudge && forceSleep) { setSprite("idle", 0); break; }
        if (nudge) { nudge = false; resetIdle(); }
        if (idleAnimationFrame < 8) { setSprite("tired", 0); break; }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192 && !forceSleep) resetIdle();
        break;
      case "scratchWallN": case "scratchWallS": case "scratchWallE": case "scratchWallW": case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) resetIdle();
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  };

  // ==== MAIN FRAME ====
  const frame = () => {
    frameCount += 1;
    if (grabbing) { grabStop && setSprite("alert", 0); return; }

    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const dist = Math.hypot(diffX, diffY);

    if (forceSleep && Math.abs(diffX) < NEKO_SPEED && Math.abs(diffY) < NEKO_SPEED) {
      nekoPosX = mousePosX; nekoPosY = mousePosY;
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
      idle(); return;
    }

    if ((dist < NEKO_SPEED || dist < 48) && !forceSleep) { idle(); return; }

    resetIdle();
    if (idleTime > 1) { setSprite("alert", 0); idleTime = Math.min(idleTime, 7); idleTime -= 1; return; }

    let dir = "";
    if (diffY / dist > 0.5) dir += "N";
    if (diffY / dist < -0.5) dir += "S";
    if (diffX / dist > 0.5) dir += "W";
    if (diffX / dist < -0.5) dir += "E";
    setSprite(dir || "N", frameCount);

    nekoPosX -= (diffX / dist) * NEKO_SPEED;
    nekoPosY -= (diffY / dist) * NEKO_SPEED;

    nekoPosX = Math.min(Math.max(16, nekoPosX), innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  };

  // ==== CREATE CAT ====
  const create = () => {
    variant = parseLS("variant", "classic");
    kuroNeko = parseLS("kuroneko", false);
    forceSleep = parseLS("forceSleep", false);
    if (!VARIANTS.some(v => v[0] === variant)) variant = "classic";

    nekoEl = document.createElement("div");
    nekoEl.id = "oneko";
    nekoEl.style.cssText = `
      position:fixed; width:32px; height:32px; background:url('/oneko/oneko-${variant}.gif') 0 0;
      image-rendering:pixelated; pointer-events:auto; z-index:9999;
      left:${nekoPosX - 16}px; top:${nekoPosY - 16}px;
      filter:${kuroNeko ? "invert(100%)" : "none"};
    `;
    document.body.appendChild(nekoEl);

    window.addEventListener("mousemove", e => {
      if (!forceSleep) { mousePosX = e.clientX; mousePosY = e.clientY; }
    });

    // ==== DRAG WITH SOUND ====
    nekoEl.addEventListener("mousedown", e => {
      if (e.button !== 0) return;
      grabbing = true;
      playSound('drag'); // SOUND ON GRAB
      let startX = e.clientX, startY = e.clientY, startNX = nekoPosX, startNY = nekoPosY;
      let grabTimer;

      const move = ev => {
        const dX = ev.clientX - startX, dY = ev.clientY - startY;
        const aX = Math.abs(dX), aY = Math.abs(dY);
        if (aX > aY && aX > 10) setSprite(dX > 0 ? "scratchWallW" : "scratchWallE", frameCount);
        else if (aY > aX && aY > 10) setSprite(dY > 0 ? "scratchWallN" : "scratchWallS", frameCount);

        if (grabStop || aX > 10 || aY > 10) {
          grabStop = false;
          clearTimeout(grabTimer);
          grabTimer = setTimeout(() => {
            grabStop = true; nudge = false;
            startX = ev.clientX; startY = ev.clientY;
            startNX = nekoPosX; startNY = nekoPosY;
          }, 150);
        }

        nekoPosX = startNX + ev.clientX - startX;
        nekoPosY = startNY + ev.clientY - startY;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
      };

      const up = () => {
        grabbing = false; nudge = true; resetIdle();
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    });

    // Right-click: invert
    nekoEl.addEventListener("contextmenu", e => {
      e.preventDefault();
      kuroNeko = !kuroNeko;
      setLS("kuroneko", kuroNeko);
      nekoEl.style.filter = kuroNeko ? "invert(100%)" : "none";
    });

    // Double-click: sleep
    nekoEl.addEventListener("dblclick", sleep);
  };

  // ==== START ===
  create();
  intervalId = setInterval(frame, 100);
  startCycling();
})();