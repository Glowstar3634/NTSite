const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

const homeScene = document.getElementById("homeScene");
const pageScene = document.getElementById("pageScene");
const backButton = document.getElementById("backButton");

const pageKicker = document.getElementById("pageKicker");
const pageTitle = document.getElementById("pageTitle");
const pageBody = document.getElementById("pageBody");

let stars = [];
let nodes = [];

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
let isTransitioning = false;

const pages = {
  about: {
    kicker: "Origin Point",
    title: "About",
    body: `
      <p>
        I’m Nova Travis — a creator moving between mathematics, physics,
        writing, art, and technology.
      </p>
      <p>
        This site is built like a personal universe: each section is not just
        a page, but a region of thought. The goal is to make my work feel like
        something you travel through, not something you simply scroll past.
      </p>
      <ul>
        <li><strong>Core idea:</strong> structure and emotion are not opposites.</li>
        <li><strong>Creative direction:</strong> math, physics, poetry, design, and invention.</li>
        <li><strong>Current focus:</strong> building ideas that align technical depth with human meaning.</li>
      </ul>
    `
  },

  projects: {
    kicker: "Built Systems",
    title: "Projects",
    body: `
      <p>
        My projects are where abstract ideas become usable systems, stories,
        tools, and ventures.
      </p>
      <ul>
        <li>
          <strong>I.A.R.</strong> — an accident reporting platform for automatic
          evidence capture, encrypted driver verification, real-time accident
          data exchange, and police-ready incident reports.
        </li>
        <li>
          <strong>A-LIGN</strong> — a book project about how math and physics
          concepts can map onto life, identity, perspective, and growth.
        </li>
        <li>
          <strong>Market Intelligence Tool</strong> — a planned stock-market
          news scraper and screener using machine learning and AI-based signals.
        </li>
      </ul>
    `
  },

  writing: {
    kicker: "Language Field",
    title: "Writing",
    body: `
      <p>
        My writing explores perception, emotion, ambition, regret, idealization,
        and the strange way meaning changes depending on the observer.
      </p>
      <ul>
        <li><strong>Paint</strong> — perspective, color, morality, and interpretation.</li>
        <li><strong>Stone</strong> — idealization, memory, symbolism, and being frozen in someone else’s mind.</li>
        <li><strong>Recipe</strong> — creation, doubt, distortion, and the fear of ruining something meaningful.</li>
        <li><strong>Gaze of Greed</strong> — desire, projection, and emotional imbalance.</li>
      </ul>
    `
  },

  math: {
    kicker: "Concept Space",
    title: "Math Notes",
    body: `
      <p>
        This section is for the ideas I’m studying seriously and slowly:
        topology, graph theory, differential forms, proofs, and the deeper
        language behind structure.
      </p>
      <ul>
        <li><strong>Topology</strong> — spaces, continuity, bases, quotients, and fundamental groups.</li>
        <li><strong>Graph Theory</strong> — tournaments, matchings, orientations, Eulerian structure, and Hamiltonian paths.</li>
        <li><strong>Differential Forms</strong> — wedge products, curl, divergence, and geometric calculus.</li>
        <li><strong>Emergence</strong> — mathematical ways to describe when a collection of parts behaves like one object.</li>
      </ul>
    `
  }
};

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
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
  const nodeCount = Math.min(70, Math.floor(area / 23000));

  stars = Array.from({ length: starCount }, () => {
    const star = {};
    resetStar(star, false);
    return star;
  });

  nodes = Array.from({ length: nodeCount }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: random(-0.055, 0.055),
    vy: random(-0.055, 0.055),
    size: random(1, 2.2),
    depth: random(0.25, 1)
  }));
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

      star.z -= direction * star.speed * delta * (1 + totalWarp * 110);
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

        const streakLength = totalWarp * clamp(distance * 0.22, 18, 120);

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
      ctx.strokeStyle = `rgba(220, 230, 255, ${totalWarp * alpha * 0.88})`;
      ctx.lineWidth = clamp(radius * 1.05, 0.5, 3.2);
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

function drawNodes(delta) {
  for (const p of nodes) {
    p.x += p.vx * delta;
    p.y += p.vy * delta;

    if (p.x < -80) p.x = canvas.width + 80;
    if (p.x > canvas.width + 80) p.x = -80;
    if (p.y < -80) p.y = canvas.height + 80;
    if (p.y > canvas.height + 80) p.y = -80;
  }

  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];

    const ax = a.x + mouse.x * a.depth * 35;
    const ay = a.y + mouse.y * a.depth * 35;

    ctx.beginPath();
    ctx.arc(ax, ay, a.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(180, 190, 255, 0.42)";
    ctx.fill();

    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];

      const bx = b.x + mouse.x * b.depth * 35;
      const by = b.y + mouse.y * b.depth * 35;

      const dx = ax - bx;
      const dy = ay - by;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 130) {
        const opacity = 1 - distance / 130;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `rgba(120, 135, 255, ${opacity * 0.2})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();
      }
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

function draw(time) {
  const delta = Math.min(40, time - lastTime || 16);
  lastTime = time;

  mouse.x += (mouse.targetX - mouse.x) * 0.035;
  mouse.y += (mouse.targetY - mouse.y) * 0.035;

  const warpAmount = getWarpAmount(time);
  const travelAmount = getTravelAmount(time);

  drawBackground();
  drawStars(time, delta, warpAmount, travelAmount);
  drawNodes(delta);
  updateSpaceObjectParallax();

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

function openPage(pageName, clickedButton) {
  if (!pages[pageName]) return;
  if (activePage === pageName) return;
  if (isTransitioning) return;

  isTransitioning = true;
  activePage = pageName;

  const page = pages[pageName];

  pageKicker.textContent = page.kicker;
  pageTitle.textContent = page.title;
  pageBody.innerHTML = page.body;

  const focus = setTravelCSSVarsFromElement(clickedButton);

  prepareSceneForEntry(pageScene, "zoom-in-in");

  requestAnimationFrame(() => {
    homeScene.classList.add("zoom-in-out");
  });

  startTravel(focus.x, focus.y, 1200, 1);

  setTimeout(() => {
    hideSceneCleanly(homeScene, "zoom-in-out", "zoom-out-in");

    pageScene.classList.add("active");
    pageScene.classList.remove("zoom-in-in", "zoom-out-out");

    isTransitioning = false;
  }, 1180);
}

function closePage() {
  if (!activePage) return;
  if (isTransitioning) return;

  isTransitioning = true;

  const matchingButton = document.querySelector(`[data-page="${activePage}"]`);

  const focus = matchingButton
    ? setTravelCSSVarsFromElement(matchingButton)
    : { x: 0.5, y: 0.5 };

  prepareSceneForEntry(homeScene, "zoom-out-in");

  requestAnimationFrame(() => {
    pageScene.classList.add("zoom-out-out");
  });

  startTravel(focus.x, focus.y, 1200, -1);

  setTimeout(() => {
    hideSceneCleanly(pageScene, "zoom-out-out", "zoom-in-in");

    homeScene.classList.add("active");
    homeScene.classList.remove("zoom-out-in", "zoom-in-out");

    activePage = null;
    isTransitioning = false;
  }, 1180);
}

document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    openPage(button.dataset.page, button);
  });
});

backButton.addEventListener("click", closePage);

window.addEventListener("mousemove", (event) => {
  mouse.targetX = (event.clientX / window.innerWidth - 0.5) * -10;
  mouse.targetY = (event.clientY / window.innerHeight - 0.5) * -10;
});

window.addEventListener("mouseleave", () => {
  mouse.targetX = 0;
  mouse.targetY = 0;
});

window.addEventListener("resize", resizeCanvas);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePage();
  }
});

resizeCanvas();
requestAnimationFrame(draw);

// Black screen first, then physical warp-in reveal.
setTimeout(() => {
  document.body.classList.remove("loading");
  document.body.classList.add("warping");
  warpStart = performance.now();
}, 1000);