const magicConfig = {
  name: "Sheyla",
  birthdayDate: "26 de mayo de 2026",
  relationshipStartDate: "2021-05-30",
  musicFile: "assets/music/theme.mp3",
  photos: [
    "assets/images/foto1.jpeg",
    "assets/images/IMG-20260530-WA0011.jpg", "assets/images/IMG-20260530-WA0006.jpg", "assets/images/IMG-20260530-WA0013.jpg",  "assets/images/IMG-20260530-WA0018.jpg", "assets/images/IMG-20260530-WA0017.jpg", "assets/images/IMG-20260530-WA0014.jpg"
  ],
  mainLetter: [
    "Mi amor Sheyla, hoy el universo parece brillar un poquito más fuerte, como si cada estrella hubiera recibido una invitación para celebrar tu vida.",
    "Quise prepararte esta carta mágica para recordarte lo especial que eres para mí: tu sonrisa, tu forma de amar, tu ternura y esa luz tuya que convierte cualquier día común en un recuerdo inolvidable.",
    "Gracias por ser mi calma, mi aventura y mi lugar favorito. Si la magia existe, estoy seguro de que vive en cada momento que comparto contigo. Feliz cumpleaños, mi amor." 
  ],
  finalLetter: [
    "Gracias por llenar mi vida de magia.",
    "Gracias por cada sonrisa, cada abrazo y cada momento compartido.",
    "Si tuviera todos los giratiempos del mundo, elegiría volver a vivir cada instante contigo.",
    "Feliz cumpleaños mi amor.",
    "Te amo infinitamente ❤️"
  ],
  loveSpells: [
    "Eres mi hechizo favorito.",
    "Ni todos los giratiempos alcanzarían para vivir todo lo que quiero contigo.",
    "Contigo siempre encuentro mi hogar.",
    "Mi lugar favorito siempre será a tu lado.",
    "Tu sonrisa es la magia que ilumina mis días.",
    "En cualquier mapa, mi destino favorito eres tú."
  ],
  giftInstructions: [
    "Antes de empezar, hay algo que debo decirte. Algunos de los regalos ya los recibiste, pero me habría gustado presentártelos de una forma más adecuada.",

"Uno fue para mantener tu cabellito tan bonito como siempre.",

"También hubo uno porque quiero que sientas que en tus ojitos no hay ninguna imperfección ni faltante.",

"Hubo uno más porque sé cuánto te gusta ese chocolatito.",

"Te entregué uno para que sientas abrigo en estas fechas frías.",

"Y junto a ese, un compañero de fuego para esos días.",

"Por último, una pequeña muestra de tu juventud y elegancia puesta en tu muñeca.",

"Ahora sí, comencemos con los que aún quedan por descubrir.",

"Empieza por algo pensado para esos días en los que necesitas un gustito y cuidar tu barriguita.",

"Porque unos chocolatitos nunca están de más.",

"Para seguir manteniendo esa piel hermosa como siempre.",

"Para que esos toquecitos queden exactamente como te gustan.",

"Porque ese cabello tan bonito también merece sus cuidados.",

"Porque parte de consentirse está en los pequeños detalles.",

"Para que esas manitos también reciban un poquito de cariño.",

"Porque siempre es bonito oler rico.",

"Porque sé cuánto te importa la higiene.",

"Porque brillas como la luna en la noche.",

"Porque la letra más bonita es la de tu nombre.",

"Porque eres un sol y quiero que siempre estés protegida.",

"Para hacer juego, variar y combinar como más te guste.",

"Porque un regalo para él también es un regalo para ti, y porque también lo tengo presente.",

"Porque sigo pensando que eres la mejor en esto, y además hay un reto pendiente para nosotros.",

"Porque siempre Slytherin.",

"Porque a veces la magia también se construye pieza por pieza.",

"Guarda este para el final, porque toda bruja talentosa merece potenciar su magia.",
  ]
};

const state = {
  currentSlide: 0,
  touchStartX: 0,
  touchEndX: 0,
  lastSpellIndex: -1,
  sparkleBoost: false
};

const $ = (selector) => document.querySelector(selector);

const heroTitle = $("#heroTitle");
const birthdayDate = $("#birthdayDate");
const mainLetter = $("#mainLetter");
const audio = $("#magicAudio");
const activateMagic = $("#activateMagic");
const playMusic = $("#playMusic");
const pauseMusic = $("#pauseMusic");
const volumeControl = $("#volumeControl");
const carouselTrack = $("#carouselTrack");
const carouselDots = $("#carouselDots");
const prevPhoto = $("#prevPhoto");
const nextPhoto = $("#nextPhoto");
const castSpell = $("#castSpell");
const spellMessage = $("#spellMessage");
const toggleGifts = $("#toggleGifts");
const giftScroll = $("#giftScroll");
const giftInstructions = $("#giftInstructions");
const openSecret = $("#openSecret");
const closeSecret = $("#closeSecret");
const marauderOverlay = $("#marauderOverlay");
const secretMessage = $("#secretMessage");
const managedText = $("#managedText");
const footprints = $("#footprints");
const canvas = $("#sparkleCanvas");
const context = canvas.getContext("2d");

function init() {
  renderConfigContent();
  setupAudio();
  setupCarousel();
  setupSpells();
  setupGiftScroll();
  setupSecretExperience();
  setupRevealAnimations();
  setupSparkles();
}

function renderConfigContent() {
  heroTitle.textContent = `✨ Feliz Cumpleaños Mi Amor ${magicConfig.name} ✨`;
  birthdayDate.textContent = magicConfig.birthdayDate;
  mainLetter.innerHTML = magicConfig.mainLetter.map((paragraph) => `<p>${paragraph}</p>`).join("");
  giftInstructions.innerHTML = magicConfig.giftInstructions.map((item) => `<li>${item}</li>`).join("");
  secretMessage.innerHTML = magicConfig.finalLetter.map((paragraph) => `<p>${paragraph}</p>`).join("");
}

function setupAudio() {
  audio.src = magicConfig.musicFile;
  audio.volume = Number(volumeControl.value);

  activateMagic.addEventListener("click", () => {
    document.body.classList.add("magic-awake");
    state.sparkleBoost = true;
    activateMagic.classList.add("is-active");
    activateMagic.setAttribute("aria-pressed", "true");
    activateMagic.textContent = "✨ Magia Activada";
    audio.play().catch(() => {
      activateMagic.textContent = "✨ Magia visual activada";
    });
  });

  playMusic.addEventListener("click", () => audio.play());
  pauseMusic.addEventListener("click", () => audio.pause());
  volumeControl.addEventListener("input", () => {
    audio.volume = Number(volumeControl.value);
  });
}

function setupCarousel() {
  carouselTrack.innerHTML = magicConfig.photos.map((photo, index) => `
    <figure class="carousel-slide" style="--slide-bg:url('${photo}')" aria-label="Recuerdo ${index + 1} de ${magicConfig.photos.length}">
      <img src="${photo}" alt="Recuerdo mágico ${index + 1} con ${magicConfig.name}" loading="lazy" decoding="async" />
    </figure>
  `).join("");

  carouselDots.innerHTML = magicConfig.photos.map((_, index) => `
    <button class="carousel-dot" type="button" aria-label="Ir a la foto ${index + 1}"></button>
  `).join("");

  carouselTrack.querySelectorAll("img").forEach((image, index) => {
    image.addEventListener("error", () => {
      image.parentElement.innerHTML = `<div class="photo-fallback">Agrega aquí foto${index + 1}.jpg</div>`;
    }, { once: true });
  });

  prevPhoto.addEventListener("click", () => goToSlide(state.currentSlide - 1));
  nextPhoto.addEventListener("click", () => goToSlide(state.currentSlide + 1));
  carouselDots.querySelectorAll("button").forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
  });

  const carousel = $("#photoCarousel");
  carousel.addEventListener("touchstart", (event) => {
    state.touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener("touchend", (event) => {
    state.touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  goToSlide(0);
}

function goToSlide(index) {
  const total = magicConfig.photos.length;
  state.currentSlide = (index + total) % total;
  carouselTrack.style.transform = `translateX(-${state.currentSlide * 100}%)`;
  carouselDots.querySelectorAll("button").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === state.currentSlide);
    dot.setAttribute("aria-current", dotIndex === state.currentSlide ? "true" : "false");
  });
}

function handleSwipe() {
  const threshold = 42;
  const distance = state.touchEndX - state.touchStartX;
  if (Math.abs(distance) < threshold) return;
  goToSlide(state.currentSlide + (distance < 0 ? 1 : -1));
}

function calculateDateDifference(startDate, endDate) {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

function setupSpells() {
  castSpell.addEventListener("click", () => {
    let nextIndex = Math.floor(Math.random() * magicConfig.loveSpells.length);
    if (magicConfig.loveSpells.length > 1) {
      while (nextIndex === state.lastSpellIndex) {
        nextIndex = Math.floor(Math.random() * magicConfig.loveSpells.length);
      }
    }
    state.lastSpellIndex = nextIndex;
    spellMessage.textContent = magicConfig.loveSpells[nextIndex];
    spellMessage.classList.remove("pop");
    void spellMessage.offsetWidth;
    spellMessage.classList.add("pop");
  });
}

function setupGiftScroll() {
  toggleGifts.addEventListener("click", () => {
    const isOpen = giftScroll.classList.contains("is-open");
    if (isOpen) {
      giftScroll.classList.remove("is-open");
      toggleGifts.setAttribute("aria-expanded", "false");
      setTimeout(() => { giftScroll.hidden = true; }, 700);
      return;
    }
    giftScroll.hidden = false;
    requestAnimationFrame(() => giftScroll.classList.add("is-open"));
    toggleGifts.setAttribute("aria-expanded", "true");
  });
}

function setupSecretExperience() {
  openSecret.addEventListener("click", () => {
    document.body.classList.add("no-scroll");
    marauderOverlay.classList.add("is-open");
    marauderOverlay.setAttribute("aria-hidden", "false");
    managedText.classList.remove("is-visible");
    secretMessage.querySelectorAll("p").forEach((paragraph) => paragraph.classList.remove("is-visible"));
    createFootprints();
    revealSecretMessage();
  });

  closeSecret.addEventListener("click", () => {
    document.body.classList.remove("no-scroll");
    marauderOverlay.classList.remove("is-open");
    marauderOverlay.setAttribute("aria-hidden", "true");
    footprints.innerHTML = "";
  });
}

function createFootprints() {
  footprints.innerHTML = "";
  const path = [
    [12, 88], [20, 74], [31, 62], [44, 50], [58, 38], [72, 28], [84, 16],
    [88, 72], [74, 62], [61, 55], [47, 47], [34, 37], [22, 25]
  ];

  path.forEach(([left, top], index) => {
    const print = document.createElement("span");
    print.className = "footprint";
    print.style.left = `${left}%`;
    print.style.top = `${top}%`;
    print.style.setProperty("--rotation", `${index % 2 === 0 ? -24 : 18}deg`);
    print.style.animationDelay = `${index * 180}ms`;
    footprints.appendChild(print);
  });
}

function revealSecretMessage() {
  const paragraphs = [...secretMessage.querySelectorAll("p")];
  paragraphs.forEach((paragraph, index) => {
    setTimeout(() => paragraph.classList.add("is-visible"), 1050 + index * 1050);
  });
  setTimeout(() => managedText.classList.add("is-visible"), 1300 + paragraphs.length * 1050);
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(".section-reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealElements.forEach((element) => observer.observe(element));
}

function setupSparkles() {
  const sparkles = Array.from({ length: 74 }, () => createSparkle());

  function resizeCanvas() {
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    sparkles.forEach((sparkle) => {
      sparkle.y -= sparkle.speed * (state.sparkleBoost ? 1.7 : 1);
      sparkle.x += Math.sin((sparkle.y + sparkle.phase) * 0.015) * 0.25;
      if (sparkle.y < -10) Object.assign(sparkle, createSparkle(true));
      const opacity = sparkle.opacity * (state.sparkleBoost ? 1.25 : 1);
      context.beginPath();
      context.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
      context.fillStyle = `rgba(245, 194, 231, ${opacity})`;
      context.shadowColor = "rgba(255, 105, 180, 0.72)";
      context.shadowBlur = state.sparkleBoost ? 16 : 10;
      context.fill();
      context.shadowBlur = 0;
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  draw();
}

function createSparkle(fromBottom = false) {
  return {
    x: Math.random() * window.innerWidth,
    y: fromBottom ? window.innerHeight + Math.random() * 60 : Math.random() * window.innerHeight,
    size: Math.random() * 1.9 + 0.6,
    speed: Math.random() * 0.34 + 0.12,
    opacity: Math.random() * 0.56 + 0.18,
    phase: Math.random() * 120
  };
}

init();
