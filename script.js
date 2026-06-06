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

const siteData = {
  home: {
    title: "NOVA",
    subtitle: "TRAVIS",
    links: [
      { label: "About", target: "about", position: "top-left", depth: 16 },
      { label: "Projects", target: "projects", position: "top-right", depth: 16 },
      { label: "Writing", target: "writing", position: "bottom-left", depth: 16 },
      { label: "Math Notes", target: "math", position: "bottom-right", depth: 16 }
    ]
  },

  pages: {
    about: {
      kicker: "Origin Point",
      title: "About",
      intro: `
        I’m Nova Travis — a creator moving between mathematics, physics,
        writing, art, and technology.
      `,
      sections: [
        {
          title: "Core Direction",
          text: "I’m interested in places where structure and emotion meet: proofs, poems, software, physics, design, and systems that help people understand the world differently."
        },
        {
          title: "This Site",
          text: "This website is built like a personal universe. Each section is not just a page, but a region of thought you travel into."
        }
      ],
      cards: []
    },

    projects: {
      kicker: "Built Systems",
      title: "Projects",
      intro: `
        My projects are where abstract ideas become usable systems, stories,
        tools, and ventures.
      `,
      sections: [
        {
          title: "Project Philosophy",
          text: "I like building things that feel conceptually deep but practically useful: technical systems with a strong identity."
        }
      ],
      cards: [
        {
          title: "I.A.R.",
          description: "An accident reporting platform for evidence capture, driver verification, and police-ready incident reports.",
          target: "iar",
          position: "top-right",
          depth: 15
        },
        {
          title: "A-LIGN",
          description: "A book project connecting math and physics concepts to life, identity, growth, and perspective.",
          target: "align",
          position: "bottom-right",
          depth: 14
        },
        {
          title: "Market Intelligence",
          description: "A planned stock-market news scraper and screener using machine learning and AI-based signals.",
          target: "market-intelligence",
          position: "bottom-left",
          depth: 13
        }
      ]
    },

    iar: {
      kicker: "Project Galaxy",
      title: "I.A.R.",
      intro: `
        I.A.R. is an accident reporting platform designed to make post-accident
        information exchange faster, safer, and more reliable.
      `,
      sections: [
        {
          title: "Purpose",
          text: "The idea is to help people in accidents capture evidence, exchange necessary information securely, and generate organized reports that can help insurance companies and law enforcement."
        },
        {
          title: "Core Features",
          text: "Possible features include automatic photo/video evidence capture, encrypted driver verification, accident timeline generation, and police-ready summaries."
        },
        {
          title: "Why It Matters",
          text: "After an accident, people are stressed and disorganized. I.A.R. tries to turn that chaos into structured, trustworthy information."
        }
      ],
      cards: [
        {
          title: "Evidence Capture",
          description: "Photos, videos, timestamps, location data, and contextual accident records.",
          target: "iar-evidence",
          position: "top-left",
          depth: 14
        },
        {
          title: "Encrypted Exchange",
          description: "Safer ways for drivers to exchange identity and insurance information.",
          target: "iar-exchange",
          position: "bottom-right",
          depth: 14
        }
      ]
    },

    "iar-evidence": {
      kicker: "I.A.R. Subsystem",
      title: "Evidence Capture",
      intro: `
        This subsystem focuses on preserving accident evidence before it gets
        lost, forgotten, or disputed.
      `,
      sections: [
        {
          title: "What It Records",
          text: "Evidence could include images, video, timestamps, location, vehicle positions, road conditions, visible damage, and witness notes."
        },
        {
          title: "Design Goal",
          text: "The goal is not just to collect data, but to collect it in a structured way that later becomes useful for reports, claims, and legal clarity."
        }
      ],
      cards: []
    },

    "iar-exchange": {
      kicker: "I.A.R. Subsystem",
      title: "Encrypted Exchange",
      intro: `
        This subsystem focuses on information exchange without making users
        expose more personal information than necessary.
      `,
      sections: [
        {
          title: "Concept",
          text: "Drivers could verify and exchange required accident information through a controlled encrypted flow instead of manually copying sensitive documents."
        }
      ],
      cards: []
    },

    align: {
      kicker: "Book Project",
      title: "A-LIGN",
      intro: `
        A-LIGN is a book project about using math and physics as a language
        for life, identity, decision-making, and growth.
      `,
      sections: [
        {
          title: "Main Idea",
          text: "Concepts like vectors, forces, equilibrium, topology, entropy, and emergence can become metaphors for how people change and understand themselves."
        },
        {
          title: "Tone",
          text: "The project should feel intellectual but personal: rigorous enough to be meaningful, but human enough to be felt."
        }
      ],
      cards: []
    },

    "market-intelligence": {
      kicker: "Technical System",
      title: "Market Intelligence",
      intro: `
        A planned tool for collecting market news, detecting patterns, and
        helping screen stocks through AI-assisted signals.
      `,
      sections: [
        {
          title: "Possible Pipeline",
          text: "Scrape news, classify sentiment, detect unusual volume or price movement, compare against historical patterns, and produce watchlist signals."
        }
      ],
      cards: []
    },

    writing: {
      kicker: "Language Field",
      title: "Writing",
      intro: `
        My writing explores perception, emotion, ambition, regret,
        idealization, and the strange way meaning changes depending on the observer.
      `,
      sections: [
        {
          title: "Writing Direction",
          text: "A lot of my poems focus on projection: how we color the world, how we freeze people into symbols, and how private emotion changes public meaning."
        }
      ],
      cards: [
        {
          title: "Paint",
          description: "Perspective, color, morality, and interpretation.",
          target: "paint",
          position: "top-left",
          depth: 14
        },
        {
          title: "Stone",
          description: "Idealization, symbolism, and being frozen in someone else’s mind.",
          target: "stone",
          position: "top-right",
          depth: 14
        },
        {
          title: "Recipe",
          description: "Creation, doubt, distortion, and the fear of ruining something meaningful.",
          target: "recipe",
          position: "bottom-left",
          depth: 14
        }
      ]
    },

    paint: {
      kicker: "Poem",
      title: "Paint",
      intro: `
        “Paint” is about how people interpret the same world through different
        internal palettes.
      `,
      sections: [
        {
          title: "Core Lens",
          text: "The poem treats morality, ambition, and joy as colors that people perceive differently. Meaning does not simply exist on the canvas; it emerges through the observer."
        }
      ],
      cards: []
    },

    stone: {
      kicker: "Poem",
      title: "Stone",
      intro: `
        “Stone” can be read as a poem about idealization, memory, and symbolic
        imprisonment.
      `,
      sections: [
        {
          title: "Core Lens",
          text: "The statue becomes a metaphor for what happens when someone is turned into an idea. They may be honored, but they are also frozen."
        }
      ],
      cards: []
    },

    recipe: {
      kicker: "Poem",
      title: "Recipe",
      intro: `
        “Recipe” explores the anxiety of creation and the fear that something
        meaningful has been ruined in the making.
      `,
      sections: [
        {
          title: "Core Lens",
          text: "The poem uses cooking as a metaphor for thought, memory, authorship, and self-doubt."
        }
      ],
      cards: []
    },

    math: {
      kicker: "Concept Space",
      title: "Math Notes",
      intro: `
        This section is for topology, graph theory, differential forms, proofs,
        and mathematical ways of describing structure.
      `,
      sections: [
        {
          title: "Purpose",
          text: "These notes are for serious learning, but also for developing new conceptual connections between math, physics, and emergence."
        }
      ],
      cards: [
        {
          title: "Topology",
          description: "Spaces, continuity, bases, quotients, and fundamental groups.",
          target: "topology",
          position: "top-left",
          depth: 14
        },
        {
          title: "Graph Theory",
          description: "Tournaments, matchings, orientations, Eulerian structure, and Hamiltonian paths.",
          target: "graph-theory",
          position: "top-right",
          depth: 14
        },
        {
          title: "Emergence",
          description: "When a collection of parts behaves approximately as one object.",
          target: "emergence",
          position: "bottom-right",
          depth: 14
        }
      ]
    },

    topology: {
      kicker: "Math Region",
      title: "Topology",
      intro: `
        Topology studies the structure of spaces through continuity, openness,
        connectedness, compactness, and deformation.
      `,
      sections: [
        {
          title: "Current Focus",
          text: "Bases, product topologies, quotient spaces, fundamental groups, and the beginnings of knot theory."
        }
      ],
      cards: []
    },

    "graph-theory": {
      kicker: "Math Region",
      title: "Graph Theory",
      intro: `
        Graph theory studies relationships through vertices, edges, directions,
        paths, cycles, and structural constraints.
      `,
      sections: [
        {
          title: "Current Focus",
          text: "Tournaments, Hamiltonian paths, strong orientations, matchings, closures, and Eulerian structure."
        }
      ],
      cards: []
    },

    emergence: {
      kicker: "Research Thread",
      title: "Emergence",
      intro: `
        Emergence asks when many interacting parts can be treated as one
        persistent effective object.
      `,
      sections: [
        {
          title: "Working Definition",
          text: "A collection of parts exhibits emergence when it behaves approximately as one object through persistence over time, internal coupling, and a reduced effective description."
        }
      ],
      cards: []
    }
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
  homeIdentity.querySelector("p").textContent = siteData.home.subtitle;

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

      return `
        <button
          class="space-card orbit-${escapeHTML(card.position ?? "right")} space-object"
          data-depth="${card.depth ?? 13}"
          ${hasTarget ? `data-link="${escapeHTML(card.target)}"` : "disabled"}
        >
          <h3>${escapeHTML(card.title)}</h3>
          <p>${escapeHTML(card.description)}</p>
        </button>
      `;
    })
    .join("");

  scene.innerHTML = `
    <button class="back-button space-object" data-back data-depth="14">
      ← Back
    </button>

    <div class="content-layout">
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

      <div class="node-cloud">
        ${cardsHTML}
      </div>
    </div>
  `;
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
  mouse.targetX = (event.clientX / window.innerWidth - 0.5) * -10;
  mouse.targetY = (event.clientY / window.innerHeight - 0.5) * -10;
});

window.addEventListener("mouseleave", () => {
  mouse.targetX = 0;
  mouse.targetY = 0;
});

window.addEventListener("resize", resizeCanvas);

renderHome();

resizeCanvas();
requestAnimationFrame(draw);

setTimeout(() => {
  document.body.classList.remove("loading");
  document.body.classList.add("warping");
  warpStart = performance.now();
}, 1000);