const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

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

  // Very subtle deep-space haze
  ctx.beginPath();
  ctx.arc(canvas.width * 0.55, canvas.height * 0.38, canvas.width * 0.36, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(40, 50, 120, 0.055)";
  ctx.fill();
}

function drawStars(time, delta, warpAmount) {
  for (const star of stars) {
    const oldProjection = projectStar(star, star.speed * delta * 28 * warpAmount);

    // Slow forward movement during normal state.
    // Much faster movement during the intro warp.
    const warpMultiplier = 1 + warpAmount * 260;
    star.z -= star.speed * delta * warpMultiplier;

    // Tiny circular drift so the stars do not all move in one direction.
    star.angle += star.orbitSpeed * delta;
    star.x += Math.cos(star.angle) * 0.0018 * delta;
    star.y += Math.sin(star.angle) * 0.0018 * delta;

    if (star.z <= 0.045) {
      resetStar(star, true);
    }

    const projection = projectStar(star);

    const offscreen =
      projection.x < -200 ||
      projection.x > canvas.width + 200 ||
      projection.y < -200 ||
      projection.y > canvas.height + 200;

    if (offscreen) {
      resetStar(star, true);
      continue;
    }

    const pulse = Math.sin(time * star.twinkle + star.x) * 0.18;
    const alpha = clamp(star.alpha + pulse, 0.15, 1);

    const radius = clamp(star.size * projection.scale * 0.72, 0.35, 3.2);

    // Warp streaks
    if (warpAmount > 0.03) {
      ctx.beginPath();
      ctx.moveTo(oldProjection.x, oldProjection.y);
      ctx.lineTo(projection.x, projection.y);
      ctx.strokeStyle = `rgba(220, 230, 255, ${warpAmount * alpha * 0.95})`;
      ctx.lineWidth = clamp(radius * 1.15, 0.55, 3.4);
      ctx.stroke();
    }

    // Star core
    ctx.beginPath();
    ctx.arc(projection.x, projection.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();

    // Soft glow for closer stars
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

function draw(time) {
  const delta = Math.min(40, time - lastTime || 16);
  lastTime = time;

  mouse.x += (mouse.targetX - mouse.x) * 0.035;
  mouse.y += (mouse.targetY - mouse.y) * 0.035;

  const warpAmount = getWarpAmount(time);

  drawBackground();
  drawStars(time, delta, warpAmount);
  drawNodes(delta);

  requestAnimationFrame(draw);
}

window.addEventListener("mousemove", (event) => {
  mouse.targetX = (event.clientX / window.innerWidth - 0.5) * -10;
  mouse.targetY = (event.clientY / window.innerHeight - 0.5) * -10;
});

window.addEventListener("mouseleave", () => {
  mouse.targetX = 0;
  mouse.targetY = 0;
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
requestAnimationFrame(draw);

// Black screen first, then physical warp-in reveal.
setTimeout(() => {
  document.body.classList.remove("loading");
  document.body.classList.add("warping");
  warpStart = performance.now();
}, 1000);