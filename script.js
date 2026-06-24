const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

let stars = [];

const mouse = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
};

let lastTime = 0;

let warpStart = null;
const WARP_DURATION = 1900;

let travelStart = null;
let travelDuration = 1250;
let travelFocus = { x: 0.5, y: 0.5 };

// 1 means zooming forward into a page.
// -1 means zooming backward out to home.
let travelDirection = 1;

let activePage = null;

const homeScene = document.getElementById("homeScene");
const homeLinks = document.getElementById("homeLinks");
const homeIdentity = document.getElementById("homeIdentity");

const sceneA = document.getElementById("sceneA");
const sceneB = document.getElementById("sceneB");


const sound = {
  context: null,
  master: null,
  bassGain: null,
  bassOscillator: null,
  noiseBuffer: null,
  enabled: true,
  pointerSpeed: 0,
  lastPointerX: 0,
  lastPointerY: 0,
  lastPointerTime: 0
};

const siteData = window.siteData;

if (!siteData) {
  throw new Error("siteData.js did not load. Make sure it appears before script.js in index.html.");
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createNoiseBuffer(context) {
  const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
  const samples = buffer.getChannelData(0);

  for (let index = 0; index < samples.length; index += 1) {
    samples[index] = Math.random() * 2 - 1;
  }

  return buffer;
}

function initializeSound() {
  if (sound.context) return true;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) return false;

  const context = new AudioContextClass();
  const master = context.createGain();

  const limiter = context.createDynamicsCompressor();

  limiter.threshold.value = -4;
  limiter.knee.value = 12;
  limiter.ratio.value = 4;
  limiter.attack.value = 0.008;
  limiter.release.value = 0.18;

  master.gain.value = 0;
  master.connect(limiter);
  limiter.connect(context.destination);

  const ambienceGain = context.createGain();
  ambienceGain.gain.value = 0.22;
  ambienceGain.connect(master);

  const lowOscillator = context.createOscillator();
  const lowGain = context.createGain();

  lowOscillator.type = "triangle";
  lowOscillator.frequency.value = 25;
  lowGain.gain.value = 0.72;

  lowOscillator.connect(lowGain);
  lowGain.connect(ambienceGain);
  lowOscillator.start();

  const highOscillator = context.createOscillator();
  const highGain = context.createGain();

  highOscillator.type = "sine";
  highOscillator.frequency.value = 128;
  highGain.gain.value = 0.28;

  highOscillator.connect(highGain);
  highGain.connect(ambienceGain);
  highOscillator.start();

  const noiseSource = context.createBufferSource();
  const noiseFilter = context.createBiquadFilter();
  const noiseGain = context.createGain();

  sound.noiseBuffer = createNoiseBuffer(context);

  noiseSource.buffer = sound.noiseBuffer;
  noiseSource.loop = true;

  noiseFilter.type = "lowpass";
  noiseFilter.frequency.value = 550;
  noiseFilter.Q.value = 0.4;

  noiseGain.gain.value = 0.028;

  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ambienceGain);
  noiseSource.start();

  const bassOscillator = context.createOscillator();
  const bassGain = context.createGain();

  bassOscillator.type = "sine";
  bassOscillator.frequency.value = 38;
  bassGain.gain.value = 0.22;

  bassOscillator.connect(bassGain);
  bassGain.connect(master);
  bassOscillator.start();

  sound.context = context;
  sound.master = master;
  sound.bassGain = bassGain;
  sound.bassOscillator = bassOscillator;

  return true;
}

async function setSoundEnabled(enabled) {
  if (enabled && !initializeSound()) return;

  sound.enabled = enabled;

  if (sound.context?.state === "suspended") {
    await sound.context.resume();
  }

  const now = sound.context?.currentTime ?? 0;

  sound.master?.gain.setTargetAtTime(
    enabled ? 0.9 : 0.001,
    now,
    0.12
  );
}

function updateSoundFromPointer() {
  if (!sound.enabled || !sound.context) return;

  sound.pointerSpeed *= 0.75;

  const motion = clamp(sound.pointerSpeed, 0, 1);
  const now = sound.context.currentTime;
  const bassFrequency = 50 + motion * 55;

  sound.bassGain.gain.setTargetAtTime(
    0.22 + motion * 0.7,
    now,
    0.09
  );

  sound.bassOscillator.frequency.setTargetAtTime(
    bassFrequency,
    now,
    0.12
  );
}

function playTravelSound(direction) {
  if (!sound.enabled || !sound.context || !sound.noiseBuffer) return;

  const context = sound.context;
  const now = context.currentTime;
  const duration = 1.08;
  const zoomingIn = direction === 1;

  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  const subOscillator = context.createOscillator();
  const subGain = context.createGain();

  noise.buffer = sound.noiseBuffer;

  filter.type = "lowpass";
  filter.Q.value = 0.7;

  filter.frequency.setValueAtTime(
    zoomingIn ? 180 : 760,
    now
  );

  filter.frequency.exponentialRampToValueAtTime(
    zoomingIn ? 920 : 150,
    now + duration
  );

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.4, now + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  subOscillator.type = "sine";
  subOscillator.frequency.setValueAtTime(
    zoomingIn ? 44 : 76,
    now
  );

  subOscillator.frequency.exponentialRampToValueAtTime(
    zoomingIn ? 68 : 40,
    now + duration
  );

  subGain.gain.setValueAtTime(0.0001, now);
  subGain.gain.exponentialRampToValueAtTime(0.13, now + 0.12);
  subGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(sound.master);

  subOscillator.connect(subGain);
  subGain.connect(sound.master);

  noise.start(now);
  noise.stop(now + duration);

  subOscillator.start(now);
  subOscillator.stop(now + duration);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function resetStar(star, placeFarAway = true) {
  const spread = Math.max(canvas.width, canvas.height);

  star.x = random(-spread, spread);
  star.y = random(-spread, spread);
  star.z = placeFarAway ? random(0.75, 1) : random(0.12, 1);
  star.size = random(0.22, 1.05);
  star.alpha = random(0.5, 1);
  star.speed = random(0.0000025, 0.000005);
  star.twinkle = random(0.0006, 0.002);
  star.angle = random(0, Math.PI * 2);
  star.orbitSpeed = random(-0.0000015, 0.0000015);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const area = canvas.width * canvas.height;
  const starCount = Math.min(520, Math.floor(area / 2600));

  stars = Array.from({ length: starCount }, () => {
    const star = {};
    resetStar(star, false);
    return star;
  });

}

function getWarpAmount(time) {
  if (warpStart === null) return 0;

  const progress = clamp((time - warpStart) / WARP_DURATION, 0, 1);

  if (progress >= 1) {
    document.body.classList.remove("warping");
    warpStart = null;
    return 0;
  }

  return 1 - easeOutCubic(progress);
}

function startTravel(focusX, focusY, duration = 1250, direction = 1) {
  travelFocus.x = focusX;
  travelFocus.y = focusY;

  travelDirection = direction;
  travelDuration = duration;
  travelStart = performance.now();
  playTravelSound(direction);

  document.body.classList.add("traveling");
}

function getTravelAmount(time) {
  if (travelStart === null) return 0;

  const progress = clamp((time - travelStart) / travelDuration, 0, 1);

  if (progress >= 1) {
    travelStart = null;
    document.body.classList.remove("traveling");
    return 0;
  }

  return 1 - easeOutCubic(progress);
}

function setTravelCSSVarsFromElement(element) {
  const rect = element.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = centerX - window.innerWidth / 2;
  const dy = centerY - window.innerHeight / 2;

  document.documentElement.style.setProperty("--travel-x", `${dx}px`);
  document.documentElement.style.setProperty("--travel-y", `${dy}px`);

  return {
    x: centerX / window.innerWidth,
    y: centerY / window.innerHeight
  };
}

function projectStar(star, zOffset = 0) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const z = Math.max(0.045, star.z + zOffset);
  const perspective = 1 / z;
  const depth = 1 - z;

  const parallaxX = mouse.x * depth * 90;
  const parallaxY = mouse.y * depth * 90;

  return {
    x: centerX + star.x * perspective + parallaxX,
    y: centerY + star.y * perspective + parallaxY,
    scale: perspective,
    depth
  };
}

function drawBackground() {
  const gradient = ctx.createRadialGradient(
    canvas.width * 0.5,
    canvas.height * 0.45,
    0,
    canvas.width * 0.5,
    canvas.height * 0.5,
    canvas.width * 0.85
  );

  gradient.addColorStop(0, "#02020c");
  gradient.addColorStop(0.42, "#000006");
  gradient.addColorStop(1, "#000000");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(
    canvas.width * 0.55,
    canvas.height * 0.38,
    canvas.width * 0.36,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = "rgba(40, 50, 120, 0.055)";
  ctx.fill();
}

function drawStars(time, delta, warpAmount, travelAmount) {
  const totalWarp = Math.max(warpAmount, travelAmount);
  const isTraveling = travelAmount > 0.001;

  const focusX = isTraveling
    ? canvas.width * travelFocus.x
    : canvas.width / 2;

  const focusY = isTraveling
    ? canvas.height * travelFocus.y
    : canvas.height / 2;

  const direction = isTraveling ? travelDirection : 1;

  for (const star of stars) {
    const oldProjection = projectStar(star);

    /*
      Important:
      We no longer move the projection center to the clicked corner.
      Instead, the starfield remains continuous, while warp streaks are
      drawn radially around the chosen focus point.
    */

    const normalSpeed = star.speed * delta;
    const warpSpeed = star.speed * delta * (1 + totalWarp * 190);

    if (isTraveling) {
      const projection = projectStar(star);

      const dx = projection.x - focusX;
      const dy = projection.y - focusY;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;

      const ux = dx / distance;
      const uy = dy / distance;

      /*
        Zoom in:
          stars move outward from the clicked destination.
        Zoom out:
          stars move inward toward the clicked destination.

        This creates the visual direction without relocating the
        entire starfield to the corner.
      */

      star.x += ux * direction * warpSpeed * 95;
      star.y += uy * direction * warpSpeed * 95;

      star.z -= direction * star.speed * delta * (1 + totalWarp * 165);
    } else {
      star.z -= normalSpeed;
    }

    star.angle += star.orbitSpeed * delta;
    star.x += Math.cos(star.angle) * 0.0018 * delta;
    star.y += Math.sin(star.angle) * 0.0018 * delta;

    if (star.z <= 0.045) {
      resetStar(star, true);
    }

    if (star.z >= 1.18) {
      resetStar(star, false);
      star.z = random(0.12, 0.32);
    }

    const projection = projectStar(star);

    const offscreen =
      projection.x < -320 ||
      projection.x > canvas.width + 320 ||
      projection.y < -320 ||
      projection.y > canvas.height + 320;

    if (offscreen) {
      /*
        Do not let the screen go empty during zoom-out.
        Recycle stars softly back into the field instead of waiting
        for the whole projection to reset.
      */
      resetStar(star, true);
      continue;
    }

    const pulse = Math.sin(time * star.twinkle + star.x) * 0.18;
    const alpha = clamp(star.alpha + pulse, 0.15, 1);

    const radius = clamp(star.size * projection.scale * 0.72, 0.3, 3.0);

    if (totalWarp > 0.03) {
      let streakStartX = oldProjection.x;
      let streakStartY = oldProjection.y;
      let streakEndX = projection.x;
      let streakEndY = projection.y;

      /*
        During page transitions, make streaks point cleanly around the
        clicked corner instead of depending only on raw star position.
      */
      if (isTraveling) {
        const dx = projection.x - focusX;
        const dy = projection.y - focusY;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        const ux = dx / distance;
        const uy = dy / distance;

        const streakLength = totalWarp * clamp(distance * 0.13, 10, 68);

        if (direction === 1) {
          streakStartX = projection.x - ux * streakLength;
          streakStartY = projection.y - uy * streakLength;
          streakEndX = projection.x;
          streakEndY = projection.y;
        } else {
          streakStartX = projection.x + ux * streakLength;
          streakStartY = projection.y + uy * streakLength;
          streakEndX = projection.x;
          streakEndY = projection.y;
        }
      }

      ctx.beginPath();
      ctx.moveTo(streakStartX, streakStartY);
      ctx.lineTo(streakEndX, streakEndY);
      ctx.strokeStyle = `rgba(225, 235, 255, ${totalWarp * alpha * 0.92})`;
      ctx.lineWidth = clamp(radius * 1.0, 0.45, 2.8);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(projection.x, projection.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();

    if (projection.depth > 0.45) {
      ctx.beginPath();
      ctx.arc(projection.x, projection.y, radius * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(145, 165, 255, ${alpha * 0.08})`;
      ctx.fill();
    }
  }
}

function updateSpaceObjectParallax() {
  const objects = document.querySelectorAll(".space-object");

  for (const object of objects) {
    const depth = Number(object.dataset.depth || 8);

    object.style.setProperty("--px", `${mouse.x * depth}px`);
    object.style.setProperty("--py", `${mouse.y * depth}px`);
  }
}

function updateStackBends() {
  const stacks = document.querySelectorAll("[data-curved-stack]");

  for (const stack of stacks) {
    const items = [...stack.querySelectorAll(".stack-item")];

    if (!items.length) continue;

    const stackRect = stack.getBoundingClientRect();
    const stackCenterY = stackRect.top + stackRect.height / 2;

    let closestItem = null;
    let closestDistance = Infinity;

    for (const item of items) {
      const rect = item.getBoundingClientRect();
      const itemCenterY = rect.top + rect.height / 2;
      const distance = Math.abs(itemCenterY - stackCenterY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = item;
      }
    }

    for (const item of items) {
      const rect = item.getBoundingClientRect();
      const itemCenterY = rect.top + rect.height / 2;

      const rawOffset = (itemCenterY - stackCenterY) / (stackRect.height / 2);
      const offset = clamp(rawOffset, -1.7, 1.7);
      const distanceFromCenter = Math.abs(offset);

      /*
        Positive X pushes the stack RIGHT.
        This bends the wheel away from the main panel.
      */
      const bendX = -Math.pow(distanceFromCenter, 1.8) * 128;

      /*
        Above and below the center rotate in opposite directions,
        making the stack feel like it is rotating around the centered tab.
      */
      const rotateZ = offset * -9;
      const rotateY = offset * 24;

      const scale = 1 - Math.min(distanceFromCenter * 0.075, 0.16);
      const opacity = 1 - Math.min(distanceFromCenter * 0.18, 0.34);

      item.style.setProperty("--stack-x", `${bendX}px`);
      item.style.setProperty("--stack-rotate", `${rotateZ}deg`);
      item.style.setProperty("--stack-tilt", `${rotateY}deg`);
      item.style.setProperty("--stack-scale", scale);
      item.style.setProperty("--stack-opacity", opacity);

      item.classList.toggle("stack-item-center", item === closestItem);
    }
  }
}

function draw(time) {
  const delta = Math.min(40, time - lastTime || 16);
  lastTime = time;

  mouse.x += (mouse.targetX - mouse.x) * 0.035;
  mouse.y += (mouse.targetY - mouse.y) * 0.035;

  updateSoundFromPointer();

  const warpAmount = getWarpAmount(time);
  const travelAmount = getTravelAmount(time);

  drawBackground();
  drawStars(time, delta, warpAmount, travelAmount);
  updateSpaceObjectParallax();
  updateStackBends();

  requestAnimationFrame(draw);
}

function prepareSceneForEntry(scene, entryClass) {
  scene.classList.add("no-motion", "active", entryClass);

  // Force the browser to apply the hidden starting transform.
  scene.offsetHeight;

  scene.classList.remove("no-motion");

  requestAnimationFrame(() => {
    scene.classList.remove(entryClass);
  });
}

function hideSceneCleanly(scene, ...classesToRemove) {
  /*
    The scene is made invisible first with transitions disabled.
    Then transform classes are removed while invisible.
    This prevents the old UI from visibly moving back to center.
  */

  scene.classList.add("no-motion");
  scene.classList.remove("active", ...classesToRemove);

  // Force hidden/no-motion state.
  scene.offsetHeight;

  scene.classList.remove(...classesToRemove);

  requestAnimationFrame(() => {
    scene.classList.remove("no-motion");
  });
}

let currentScene = homeScene;
let currentPageId = "home";
let routeStack = [
  {
    id: "home",
    focus: { x: 0.5, y: 0.5 }
  }
];

let isTransitioning = false;

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderHome() {
  homeIdentity.querySelector("h1").textContent = siteData.home.title;
  homeIdentity.querySelector(".identity-subtitle").textContent =
  siteData.home.subtitle;

  homeLinks.innerHTML = siteData.home.links
    .map((link) => {
      return `
        <button
          class="corner-link ${link.position} space-object"
          data-link="${escapeHTML(link.target)}"
          data-depth="${link.depth ?? 16}"
        >
          ${escapeHTML(link.label)}
        </button>
      `;
    })
    .join("");
}

function configureMedia(scope = document) {
  const images = scope.querySelectorAll(".media-image");

  for (const image of images) {
    const setDimensions = () => {
      const media = image.closest(".space-media");

      if (!media || !image.naturalWidth || !image.naturalHeight) return;

      const maxWidth = Math.min(360, window.innerWidth * 0.3);
      const maxHeight = Math.min(280, window.innerHeight * 0.36);

      const scale = Math.min(
        maxWidth / image.naturalWidth,
        maxHeight / image.naturalHeight
      );

      const width = Math.round(image.naturalWidth * scale);
      const height = Math.round(image.naturalHeight * scale);

      media.style.setProperty("--media-visible-width", `${width}px`);
      media.style.setProperty("--media-visible-height", `${height}px`);
      media.style.setProperty("--media-caption-offset", `${height / 2 + 16}px`);
    };

    if (image.complete) {
      setDimensions();
    } else {
      image.addEventListener("load", setDimensions, { once: true });
    }
  }
}

function renderContentScene(scene, pageId) {
  const page = siteData.pages[pageId];

  if (!page) {
    console.warn(`Page "${pageId}" does not exist.`);
    return;
  }

  const sectionsHTML = (page.sections ?? [])
    .map((section) => {
      return `
        <li>
          <strong>${escapeHTML(section.title)}</strong><br />
          ${escapeHTML(section.text)}
        </li>
      `;
    })
    .join("");

  const cardsHTML = (page.cards ?? [])
  .map((card) => {
    const hasTarget = Boolean(card.target);
    const hasLink = Boolean(card.link);

    const cardInner = `
      <h3>${escapeHTML(card.title)}</h3>
      <p>${escapeHTML(card.description)}</p>
    `;

    if (hasLink) {
      const opensNewTab = card.link.startsWith("http");

      return `
        <a
          class="space-card orbit-${escapeHTML(card.position ?? "right")} space-object"
          href="${escapeHTML(card.link)}"
          ${opensNewTab ? `target="_blank" rel="noopener noreferrer"` : ""}
          data-depth="${card.depth ?? 13}"
        >
          ${cardInner}
        </a>
      `;
    }

    return `
      <button
        class="space-card orbit-${escapeHTML(card.position ?? "right")} space-object"
        data-depth="${card.depth ?? 13}"
        ${hasTarget ? `data-link="${escapeHTML(card.target)}"` : "disabled"}
      >
        ${cardInner}
      </button>
    `;
  })
  .join("");

    const cardToMediaSlot = {
      "top-left": "left-top",
      "bottom-left": "left-bottom",
      "top-right": "right-top",
      "bottom-right": "right-bottom"
    };

    const occupiedMediaSlots = new Set(
      (page.cards ?? [])
        .map((card) => cardToMediaSlot[card.position])
        .filter(Boolean)
    );

    const availableMediaSlots = [
      "left-top",
      "left-middle",
      "left-bottom",
      "right-top",
      "right-middle",
      "right-bottom"
    ].filter((slot) => !occupiedMediaSlots.has(slot));

    const mediaHTML = (page.media ?? [])
      .map((item, index) => {
        const position =
          item.position ??
          availableMediaSlots[index] ??
          availableMediaSlots[index % availableMediaSlots.length] ??
          "right-middle";

        return `
          <figure
            class="space-media media-${escapeHTML(position)} space-object"
            data-depth="${item.depth ?? 10}"
            tabindex="0"
          >
            <div class="media-frame">
              <img
                class="media-image"
                src="${escapeHTML(item.src)}"
                alt="${escapeHTML(item.alt ?? "")}"
                loading="lazy"
              />
            </div>

            ${
              item.caption
                ? `<figcaption>${escapeHTML(item.caption)}</figcaption>`
                : ""
            }
          </figure>
        `;
      })
      .join("");

  const stackItems = page.stack?.items ?? [];

  const stackHTML = stackItems.length
    ? `
      <aside
        class="curved-stack space-object"
        data-curved-stack
        data-depth="${page.stack?.depth ?? 10}"
      >
        ${
          page.stack?.label
            ? `<p class="stack-label">${escapeHTML(page.stack.label)}</p>`
            : ""
        }

        ${stackItems
          .map((item) => {
            const itemInner = `
              <h3>${escapeHTML(item.title)}</h3>
              ${
                item.description
                  ? `<p>${escapeHTML(item.description)}</p>`
                  : ""
              }
            `;

            if (item.link) {
              const opensNewTab = item.link.startsWith("http");

              return `
                <a
                  class="stack-item"
                  href="${escapeHTML(item.link)}"
                  ${opensNewTab ? `target="_blank" rel="noopener noreferrer"` : ""}
                >
                  ${itemInner}
                </a>
              `;
            }

            return `
              <button
                class="stack-item"
                ${item.target ? `data-link="${escapeHTML(item.target)}"` : "disabled"}
              >
                ${itemInner}
              </button>
            `;
          })
          .join("")}
      </aside>
    `
    : "";

  const poemHTML = page.poem
    ? `
      <article class="poem-panel space-object" data-depth="${page.poem.depth ?? 8}">
        <p class="poem-subtitle">${escapeHTML(page.kicker ?? "Poem")}</p>
        <h2 class="poem-title">${escapeHTML(page.title)}</h2>
        <div class="poem-text">${escapeHTML(page.poem.text)}</div>

        ${
          page.poem.note
            ? `<p class="poem-note">${escapeHTML(page.poem.note)}</p>`
            : ""
        }
      </article>
    `
    : "";

  const standardPanelHTML = !page.poem
    ? `
      <article class="space-panel space-object" data-depth="8">
        <p class="page-kicker">${escapeHTML(page.kicker)}</p>
        <h2>${escapeHTML(page.title)}</h2>
        <p>${page.intro}</p>

        ${
          sectionsHTML
            ? `<ul>${sectionsHTML}</ul>`
            : ""
        }
      </article>
    `
    : "";

  scene.innerHTML = `
    <button class="back-button space-object" data-back data-depth="14">
      ← Back
    </button>

    <div class="content-layout ${stackHTML ? "has-stack" : ""}">
      ${poemHTML || standardPanelHTML}

      <div class="node-cloud">
        ${cardsHTML}
        ${mediaHTML}
      </div>

      ${stackHTML}
    </div>
  `;

  configureMedia(scene);
}

function getSpareScene() {
  if (currentScene === sceneA) return sceneB;
  return sceneA;
}

function setTravelCSSVarsFromFocus(focus) {
  const dx = (focus.x - 0.5) * window.innerWidth;
  const dy = (focus.y - 0.5) * window.innerHeight;

  document.documentElement.style.setProperty("--travel-x", `${dx}px`);
  document.documentElement.style.setProperty("--travel-y", `${dy}px`);
}

function setTravelCSSVarsFromElement(element) {
  const rect = element.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const focus = {
    x: centerX / window.innerWidth,
    y: centerY / window.innerHeight
  };

  setTravelCSSVarsFromFocus(focus);

  return focus;
}

function prepareSceneForEntry(scene, entryClass) {
  scene.classList.add("no-motion", "active", entryClass);

  scene.offsetHeight;

  scene.classList.remove("no-motion");

  requestAnimationFrame(() => {
    scene.classList.remove(entryClass);
  });
}

function hideSceneCleanly(scene, classesToRemove = [], clearContent = false) {
  scene.classList.add("no-motion");
  scene.classList.remove("active", ...classesToRemove);

  scene.offsetHeight;

  scene.classList.remove(...classesToRemove);

  if (clearContent && scene !== homeScene) {
    scene.innerHTML = "";
  }

  requestAnimationFrame(() => {
    scene.classList.remove("no-motion");
  });
}

function navigateTo(pageId, clickedElement) {
  if (isTransitioning) return;
  if (!siteData.pages[pageId]) return;

  isTransitioning = true;

  const fromScene = currentScene;
  const toScene = getSpareScene();

  renderContentScene(toScene, pageId);

  const focus = setTravelCSSVarsFromElement(clickedElement);

  prepareSceneForEntry(toScene, "zoom-forward-in");

  requestAnimationFrame(() => {
    fromScene.classList.add("zoom-forward-out");
  });

  startTravel(focus.x, focus.y, 1200, 1);

  setTimeout(() => {
    hideSceneCleanly(
      fromScene,
      ["zoom-forward-out", "zoom-back-in", "zoom-forward-in", "zoom-back-out"],
      fromScene !== homeScene
    );

    toScene.classList.add("active");
    toScene.classList.remove("zoom-forward-in", "zoom-back-out");

    currentScene = toScene;
    currentPageId = pageId;

    routeStack.push({
      id: pageId,
      focus
    });

    isTransitioning = false;
  }, 1180);
}

function goBack() {
  if (isTransitioning) return;
  if (routeStack.length <= 1) return;

  isTransitioning = true;

  const currentEntry = routeStack[routeStack.length - 1];
  const previousEntry = routeStack[routeStack.length - 2];

  const fromScene = currentScene;
  const toScene = previousEntry.id === "home" ? homeScene : getSpareScene();

  setTravelCSSVarsFromFocus(currentEntry.focus);

  if (previousEntry.id !== "home") {
    renderContentScene(toScene, previousEntry.id);
  }

  prepareSceneForEntry(toScene, "zoom-back-in");

  requestAnimationFrame(() => {
    fromScene.classList.add("zoom-back-out");
  });

  startTravel(currentEntry.focus.x, currentEntry.focus.y, 1200, -1);

  setTimeout(() => {
    hideSceneCleanly(
      fromScene,
      ["zoom-back-out", "zoom-forward-in", "zoom-forward-out", "zoom-back-in"],
      fromScene !== homeScene
    );

    toScene.classList.add("active");
    toScene.classList.remove("zoom-back-in", "zoom-forward-out");

    routeStack.pop();

    currentScene = toScene;
    currentPageId = previousEntry.id;

    isTransitioning = false;
  }, 1180);
}

document.addEventListener("click", (event) => {
  const backButton = event.target.closest("[data-back]");
  if (backButton) {
    goBack();
    return;
  }

  const link = event.target.closest("[data-link]");
  if (link) {
    navigateTo(link.dataset.link, link);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    goBack();
  }
});

window.addEventListener("mousemove", (event) => {
  const now = performance.now();

  if (sound.lastPointerTime) {
    const distance = Math.hypot(
      event.clientX - sound.lastPointerX,
      event.clientY - sound.lastPointerY
    );

    const elapsed = Math.max(now - sound.lastPointerTime, 16);

    sound.pointerSpeed = clamp(
      distance / elapsed / 1.2,
      0,
      1
    );
  }

  sound.lastPointerX = event.clientX;
  sound.lastPointerY = event.clientY;
  sound.lastPointerTime = now;

  mouse.targetX = (event.clientX / window.innerWidth - 0.5) * -10;
  mouse.targetY = (event.clientY / window.innerHeight - 0.5) * -10;
});

window.addEventListener("mouseleave", () => {
  mouse.targetX = 0;
  mouse.targetY = 0;
});

window.addEventListener("resize", () => {
  resizeCanvas();
  configureMedia(document);
});

function enableSoundOnFirstInteraction() {
  setSoundEnabled(true);

  document.removeEventListener("pointerdown", enableSoundOnFirstInteraction);
  document.removeEventListener("keydown", enableSoundOnFirstInteraction);
}

document.addEventListener("pointerdown", enableSoundOnFirstInteraction);
document.addEventListener("keydown", enableSoundOnFirstInteraction);

renderHome();

resizeCanvas();
requestAnimationFrame(draw);

setTimeout(() => {
  document.body.classList.remove("loading");
  document.body.classList.add("warping");
  warpStart = performance.now();
}, 1000);