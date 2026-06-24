window.siteData = {
  home: {
    title: "NOVA",
    subtitle: "TRAVIS",
    links: [
      { label: "About", target: "about", position: "top-left", depth: 16 },
      { label: "Works", target: "projects", position: "top-right", depth: 16 },
      { label: "Writing", target: "writing", position: "bottom-left", depth: 16 },
      { label: "Math", target: "math", position: "bottom-right", depth: 16 }
    ]
  },

  pages: {
    about: {
      kicker: "Origin Point",
      title: "About",
      intro: `
        I’m Nova Travis an innovator within mathematics, technology, and creativity. I study pure mathematics and computer science at Northwestern University
      `,
      sections: [
        {
          title: "Core Direction",
          text: "I’m interested in places where structure and art meet: proofs, poems, software, physics, design, and systems that help people understand the world differently."
        },
        {
          title: "This Site",
          text: "This website is built like a personal universe. Each section is not just a page, but a region of thought you travel into. Click around and explore my projects, mathematical insights, and poetry. I hope you find something that sparks your curiosity or resonates with your experience."
        },
        {
          title: "Contact",
          text: "I’m always open to connecting with fellow thinkers, collaborators, and anyone interested in my work. Feel free to reach out through email: spr.novatravis29@gmail.com"
        }
      ],
      cards: [],
      media: [
        {
          src: "media/nts_me1.jpg",
          alt: "Nova Travis",
          caption: "",
          position: "left-top"
        },
        {
          src: "media/nts_me2.PNG",
          alt: "Nova Travis",
          caption: "",
          position: "left-bottom"
        },
        {
          src: "media/nts_me3.PNG",
          alt: "Nova Travis",
          caption: "",
          position: "left-middle"
        },
        {
          src: "media/nts_me4.jpg",
          alt: "Nova Travis",
          caption: "",
          position: "right-top"
        },
        {
          src: "media/nts_me5.PNG",
          alt: "Nova Travis",
          caption: "",
          position: "right-middle"
        },
        {
          src: "media/nts_me6.jpg",
          alt: "Nova Travis",
          caption: "",
          position: "right-bottom"
        }
      ]
    },

    projects: {
      kicker: "Planetary Systems",
      title: "Works",
      intro: `
        Here I include my work experience, ventures, and personal projects.
      `,
      sections: [
        {
          title: "Project Philosophy",
          text: "I like building things that feel conceptually deep and practically useful. Technical systems with a strong identity. Once a project claims it's own identity, it takes on a life of its own, and becomes a vehicle for creativity and impact that can be more powerful than its creator alone."
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
          title: "SPRNOVA",
          description: "A research and innovation company turning bold STEM ideas into projects, prototypes, and future technologies.",
          target: "sprnova",
          position: "bottom-right",
          depth: 14
        },
        {
          title: "Machine Learning Intern",
          description: "My work as an ML intern during Summer 2025.",
          target: "kep",
          position: "top-left",
          depth: 13
        }
      ]
    },

    iar: {
      kicker: "2Techi Presents...",
      title: "I.A.R.",
      intro: `
        I am co-founder and CTO of 2Techi LLC, where we are building Instant Accident Report (I.A.R.): an accident reporting platform designed to make post-accident
        information exchange faster, safer, and more reliable.
      `,
      sections: [
        {
          title: "Purpose",
          text: "The idea is to help people in accidents capture evidence, exchange necessary information securely, and generate organized reports that can help insurance companies and law enforcement."
        },
        {
          title: "Core Features",
          text: "Includes automatic photo/video evidence capture, encrypted driver verification, accident timeline generation, and insurance/police-ready summaries."
        },
        {
          title: "Why It Matters",
          text: "After an accident, people are stressed and disorganized. I.A.R. attempts to turn that chaos into structured, trustworthy information."
        }
      ],
      cards: [
        {
          title: "Website",
          description: "Visit the 2Techi website to learn more.",
          link: "https://www.2techi.com/",
          position: "bottom-right",
          depth: 14
        },
        {
          title: "Features",
          description: "More info on app features and functionality.",
          target: "iar-exchange",
          position: "bottom-left",
          depth: 14
        }
      ],
      media: [
        {
          src: "media/nts_iar_1.png",
          alt: "IAR Image 1",
          caption: ""
        },
        {
          src: "media/nts_iar_2.png",
          alt: "IAR Image 2",
          caption: "",
        }
      ]
    },

    "iar-exchange": {
      kicker: "I.A.R.",
      title: "Features",
      intro: `
        This focuses on information exchange without making users
        expose more personal information than necessary.
      `,
      sections: [
        {
          title: "Concept",
          text: "Drivers could verify and exchange required accident information through a controlled encrypted flow instead of manually copying sensitive documents."
        },
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

    sprnova: {
      kicker: "Research Collective",
      title: "SPRNOVA",
      intro: `
        SPRNOVA is a student-led research collective at Northwestern built to bring together ambitious young mathematicians, scientists, programmers, designers, and builders. Its purpose is to turn creative STEM ideas into serious research, prototypes, publications, and eventually real-world technologies.
      `,
      sections: [
        {
          title: "What It Is",
          text: "SPRNOVA functions as a high-performance research community: part club, part lab, part startup-style innovation bubble. Members collaborate on interdisciplinary projects involving mathematics, computer science, data science, physics, psychology, behavioral modeling, simulation, and emerging technologies."
        },
        {
          title: "How It Works",
          text: "The group is organized around focused research projects with core teams, project leaders, and contributors. The goal is not just to discuss ideas, but to build proof-of-concepts, produce formal writeups, pursue publication, and create systems that could scale beyond campus."
        },
        {
          title: "Current Focus",
          text: "The first major pilot project is Spectrum, a campus-wide game designed to be fun for students while also generating a mathematically analyzable behavioral system."
        },
        {
          title: "Follow Us",
          text: "Instagram: @nu.sprnova"
        }
      ],
      cards: [
        {
          title: "Spectrum",
          description: "SPRNOVA's first research project: a social game powered by mathematical prediction.",
          target: "spectrum",
          position: "top-left",
          depth: 14
        },
        {
          title: "Mission",
          description: "The philosophy behind SPRNOVA and the future it is trying to build.",
          target: "spr-why",
          position: "bottom-right",
          depth: 14
        }
      ]
    },

    "spr-why": {
      kicker: "Core Philosophy",
      title: "Mission",
      intro: `
        SPRNOVA exists to unite people through science, mathematics, and the relentless pursuit of technological progress.
      `,
      sections: [
        {
          title: "The Big Idea",
          text: "SPRNOVA is based on the belief that mathematics and science are not just academic subjects, but engines for civilization. They are languages for understanding reality, designing systems, predicting behavior, and building technologies that can change the future."
        },
        {
          title: "Research Culture",
          text: "The goal is to create a serious but imaginative environment where students can work on problems that feel alive: abstract enough to be intellectually deep, but concrete enough to become models, software, experiments, games, prototypes, papers, or companies."
        },
        {
          title: "Long-Term Vision",
          text: "SPRNOVA aims to become a pipeline from curiosity to impact. A strong idea should be able to move from discussion, to research, to simulation, to prototype, to publication, to real-world application."
        },
        {
          title: "Why It Matters",
          text: "Many students have creative technical ideas but lack the structure, collaborators, or confidence to pursue them seriously. SPRNOVA is meant to provide that structure: a place where ambitious people can find each other and build."
        }
      ],
      cards: [
        {
          title: "Spectrum",
          description: "The first experiment in turning SPRNOVA's research model into a live system.",
          target: "spectrum",
          position: "top-right",
          depth: 14
        }
      ]
    },

    spectrum: {
      kicker: "Research Project",
      title: "Spectrum",
      intro: `
        Spectrum is SPRNOVA's first major research project: a campus-wide game where students join color-based teams, but the rules are designed so the outcome can be studied, simulated, and predicted mathematically.
      `,
      sections: [
        {
          title: "The Game",
          text: "Players aim to finish on the team with the smallest number of members. This creates a strange incentive structure where popularity can become a disadvantage, switching teams becomes strategic, and social behavior becomes part of the mathematical system."
        },
        {
          title: "The Research",
          text: "Spectrum sits at the intersection of game theory, graph theory, stochastic processes, Markov chains, agent-based simulation, optimization, data science, psychology, and behavioral decision-making."
        },
        {
          title: "The Build",
          text: "The project involves multiple teams: math researchers modeling incentives and switching behavior, programmers building the game infrastructure, data science contributors analyzing player behavior, and marketing/design members shaping the campus experience."
        },
        {
          title: "The Goal",
          text: "Spectrum is designed to be both engaging and analyzable. If successful, it becomes a proof-of-concept for SPRNOVA's broader model: create systems that people interact with, collect meaningful data, model the behavior, and turn the result into publishable research."
        }
      ],
      cards: [
        {
          title: "Mission",
          description: "The broader philosophy behind SPRNOVA.",
          target: "spr-why",
          position: "bottom-right",
          depth: 14
        }
      ]
    },

    "kep": {
      kicker: "Technical System",
      title: "Machine Learning Intern",
      intro: `
        At Kessler-Ellis Products (June-August 2025), I utilized math, programming, and data analysis skills to complete several tasks and contribute to several projects.
      `,
      sections: [
        {
          title: "kepSmart",
          text: "I worked on improving the kepSmart model, developing an ML model with XGBoost to maintain a target room temperature, and creating an EMA-based smoothing technique to optimize comfort and energy efficiency."
        },
        {
          title: "Data Analysis and Visualization",
          text: "I analyzed and visualized data from kepSmart sensors to identify trends, patterns, and insights that informed decision-making and strategy. I created several visualizations in the form of charts, graphs, and diagrams using Python and graphic editing software. These were used in reports and communication with partnering companies."
        }
      ],
      cards: [
        {
          title: "KEP",
          description: "More about Kessler-Ellis Products.",
          target: "kepmore",
          position: "top-right",
          depth: 14
        },
        {
          title: "Math in ML",
          description: "Things I learned in applying math to machine learning.",
          target: "mml",
          position: "bottom-right",
          depth: 14
        },
      ],
      media: [
        {
          src: "media/nts_kepSens1.png",
          alt: "Time difference histogram",
          caption: "A histogram I made with Python to learn about the data I was working with."
        },
        {
          src: "media/nts_kepBee.png",
          alt: "Beeswarm Plot",
          caption: "Beeswarm plot used to analyze feature usefulness including raw and engineered features."
        },
        {
          src: "media/nts_kepSens2.png",
          alt: "DPC Tables",
          caption: "A scatter plot used to determine how I should filter the dataset."
        }
      ]
    },

    kepmore: {
      kicker: "Company Context",
      title: "Kessler-Ellis Products",
      intro: `
        Kessler-Ellis Products, or KEP, is a long-standing New Jersey-based company
        in industrial automation, process control, and smart building technology.
        Founded in 1961, KEP has grown from a machine-shop origin into a diversified
        designer, manufacturer, and service provider for industrial control systems.
      `,
      sections: [
        {
          title: "Industrial Technology with Real-World Weight",
          text: "KEP operates in the kind of engineering space that quietly supports the physical world: flow instrumentation, control interfaces, HMI systems, displays, counters, timers, rate meters, automation software, and contract manufacturing. It is not just software floating in abstraction; it is technology connected to buildings, machines, sensors, energy systems, and industrial environments."
        },
        {
          title: "A History of Reinvention",
          text: "One of the most impressive things about KEP is how many times the company has expanded its technical identity. It began in 1961, grew into electromechanical counting devices, broadened into flow measurement and PLC interface products in the 1980s, and later became associated with major technology ventures such as KEPtel and KEPware."
        },
        {
          title: "A Company That Builds Infrastructure",
          text: "KEP’s work sits in the background of systems that need to be reliable, measurable, and controllable. That kind of company matters because industrial and building technologies do not get to be merely flashy; they have to function consistently in real environments where failure has consequences."
        },
        {
          title: "kepSmart",
          text: "kepSmart represents KEP’s forward-looking side: applying controls, data, sensors, and automation to smarter building management. It fits naturally into KEP’s broader identity as a company that turns measurement and control into practical tools for efficiency, transparency, and better decision-making."
        }
      ],
      cards: [
        {
          title: "Math in Machine Learning",
          description: "Gradient descent, model logic, and my EMA smoothing layer.",
          target: "mml",
          position: "bottom-right",
          depth: 14
        },
        {
          title: "Website",
          description: "Visit the kepSmart website to learn more.",
          link: "https://kepsmart.com/",
          position: "top-right",
          depth: 14
        }
      ]
    },

    mml: {
      kicker: "Applied Mathematics",
      title: "Math in Machine Learning",
      intro: `
        This page explains the math I learned and applied while working on the kepSmart actuator model: 
        gradient descent as an optimization idea, gradient-boosted trees as a practical predictive system, 
        and my EMA smoothing layer as a control-oriented mathematical filter.
      `,
      sections: [
        {
          title: "Gradient Descent",
          text: "Gradient descent is an optimization method for minimizing a loss function. If a model has parameters θ and loss L(θ), the update rule is θ_new = θ_old - η∇L(θ), where η is the learning rate. The gradient points in the direction of steepest increase, so subtracting it moves the model toward lower error."
        },
        {
          title: "Why It Matters",
          text: "Even when a model is not literally trained by basic gradient descent, the idea is central to machine learning: define an error, measure how the model’s choices affect that error, and update the model to reduce it. This changed how I thought about learning mathematically: learning is not magic, it is structured error correction."
        },
        {
          title: "XGBoost and Error Reduction",
          text: "For kepSmart, I used XGBoost, a gradient-boosted decision tree model. Instead of fitting one huge model all at once, boosting builds an ensemble of trees that successively correct previous errors. The model was trained to predict Past Valve Percentage, or PVP, using room data, boiler status, weather features, and engineered candlestick-style environmental features."
        },
        {
          title: "The Reversal Strategy",
          text: "The training problem used historical data to learn what valve percentage corresponded to temperature changes. For deployment, the strategy had to be reversed: instead of asking what valve setting previously led to the observed temperature change, the system asks what valve setting is needed now to move toward a target temperature. In the report, this deployment delta becomes δ = 72 - temp."
        },
        {
          title: "EMA Smoothing Layer",
          text: "The raw model prediction can fluctuate too much for a physical actuator. To prevent wasteful tiny adjustments, I designed an Exponential Moving Average smoothing layer. The smoothed signal follows s(t) = s(rt - 1) + α(g(t/r) - s(rt - 1)), where g is the model prediction, r is the update frequency per hour, and α controls adherence to the model."
        },
        {
          title: "Meaning of α",
          text: "The adherence parameter α ranges from 0 to 1. If α = 0, the actuator essentially freezes because the smoothed value does not move toward the prediction. If α = 1, the actuator fully follows each model prediction. Values between 0 and 1 create a compromise between responsiveness and stability."
        },
        {
          title: "Daily Percentage Change",
          text: "To measure actuator movement, I used Daily Percentage Change, or DPC: the total vertical movement of the valve signal over a day. This can be calculated both continuously and discretely, the formulas I used for both are shown in an image."
        },
        {
          title: "Energy Result",
          text: "In the report’s example, the raw model prediction had DPC = 915, roughly 9 full valve toggles per day. The EMA-smoothed signal had DPC = 217.057, roughly 2.5 full toggles per day, which was about 76.28% less energy movement than strict adherence to the raw prediction."
        },
        {
          title: "What I Learned",
          text: "The biggest lesson was that machine learning does not end when the model predicts well. A useful deployed system also needs mathematical control around the model: smoothing, constraints, interpretability, energy limits, and a way for humans to understand and override the system."
        }
      ],
      cards: [
        {
          title: "KEP",
          description: "More about the company and the kepSmart system context.",
          target: "kepmore",
          position: "top-right",
          depth: 14
        }
      ],
      media: [
        {
          src: "media/nts_emaGraph.png",
          alt: "Model Prediction EMA Smoothing Graph Example",
          caption: "Energy saving EMA adjustments overlaying a theoretical model prediction over a day."
        },
        {
          src: "media/nts_DPC.png",
          alt: "DPC calculations",
          caption: "Daily Percentage Change (DPC) computations used to evaluate saved energy."
        },
        {
          src: "media/nts_emaTable.png",
          alt: "DPC Tables",
          caption: "Table used to compare graphs with different alpha and r values."
        }
      ]
    },


    writing: {
      kicker: "Galaxy of Thought",
      title: "Writing",
      intro: `
        I write to explore my own mind, and ground abstract ideas in human experience.
        Poetry is especially important to me as a way of expressing things that can’t
        be fully captured by direct explanation, sort of like mathematics. On the right is a collection of most of my poems.
      `,
      sections: [
        {
          title: "\"Pure mathematics is, in its way, the poetry of logical ideas.\"",
          text: "~ Albert Einstein"
        },
        {
          title: "Themes",
          text: "I write about reflecting all parts of my life experience: perspective, creativity, love, hate, ambition, regret, idealization, self-discovery..."
        },
        {
          title: "Instagram",
          text: "I post these poems alongside art on Instagram @stars.nbars"
        }
      ],
      cards: [],
      stack: {
        label: "Poem Archive",
        depth: 11,
        items: [
          {
            title: "Mirage",
            description: "Dreams and their uncertain pursuit.",
            target: "mirage"
          },
          {
            title: "Glass",
            description: "Emotional road to clarity from distortion.",
            target: "glass"
          },
          {
            title: "Stone",
            description: "Distinguishing symbol vs human, ideal vs reality.",
            target: "stone"
          },
          {
            title: "Recipe",
            description: "The fear of innovation.",
            target: "recipe"
          },
          {
            title: "Dreams",
            description: "Haiku - Dreams",
            target: "dreams"
          },
          {
            title: "Hypocrite",
            description: "Ambition, love, and disalignment.",
            target: "hypocrite"
          },
          {
            title: "Scales",
            description: "Pain, comparison, and emotional measurement.",
            target: "scales"
          },
          {
            title: "Paint",
            description: "Perspective, color, morality, and interpretation.",
            target: "paint"
          },
          {
            title: "Do Unto Others",
            description: "Haiku - Do Unto Others",
            target: "do-unto-others"
          },
          {
            title: "Shadows",
            description: "Impression, trust and lack thereof.",
            target: "shadows"
          },
          {
            title: "Blink",
            description: "Perception, joy, and acceptance of impermanence.",
            target: "blink"
          },
          {
            title: "Cold",
            description: "Paralysis, passion, and fear.",
            target: "cold"
          }
          
        ]
      }
    },
    //All poems start

    paint: {
      kicker: "5/31/26",
      title: "Paint",
      intro: "",
      sections: [],
      cards: [],
      poem: {
        note: "we all have our style",
        text: `
    red paint stripes bound your morals
    yes I see them, but i am colorblind,
    and they are green in my eyes.
    blue paint lines trace my ambition
    others see them black and shadowed,
    dreams trapped behind white lies.
    yellow paint blobs fill their vision
    and spread their smiles, your mind
    can’t find the joy, scowls and sighs.

    view from the sky. our worldly canvas 
    splattered with our blobs and lines and stripes
    is mind’s modern art. interpret. glance again,
    and unlock your own meaning. our worldly canvas
    colored by our reds and blues and yellows
    is our map to learn oneself. we may all 
    recognize patterns, but the emotion comes 
    from within. the art has meaning because
    we mean it. paint, and view from the sky.`
      }
    },
    stone: {
      kicker: "5/17/26",
      title: "Stone",
      intro: "",
      sections: [],
      cards: [],
      poem: {
        note: "immortalized and idolized, the person is lost",
        text: `
        to have a statue made of you 
        for some to honor and to awe 
        isn’t great for reasons many. 
        one be that it captures you 
        and freezes oscillations of 
        the heart and mind, stuck 
        as though your humanity 
        matters not, and only the 
        symbolic nature of a morsel 
        of your existence. another be 
        that you’re immortalized not only 
        in stone, but in minds. and what is 
        you for a moment will never be again, 
        a shadow that never dies, kept alive 
        in souls and sediments. a third be 
        those who awe didn’t build you, 
        they found you, and now they 
        wince at sight of chip or crack. 
        your stone doesn’t sweat, or cry, 
        or wish it had a chance to say goodbye, 
        your rocks don’t hurt, they don’t ache 
        when they give their all, and the aweing 
        critique, then take. or even burn with new 
        passions, to mistake and then learn. 
        your stone never dies, for it never lives, 
        a symbol that lies, for the human it 
        pretends to be left that rock behind.
        `
      }
    },
    recipe: {
      kicker: "5/20/26",
      title: "Recipe",
        intro: "",
        sections: [],
        cards: [],
        poem: {
            note: "and still can't make bread",
            text: `
    why do you burn? 
    flour counted down to grain and butter portioned, 
    but move with cupped hands 
    instead of cupped cups. 
    lost mid stir, eyes locked in vortex 
    as no longer do they see, whisk slows. 
    fruit? and honey? your recipe sighs… 
    what’s right is being forgotten, 
    as what’s wrong mixes in with right 
    with written, first touched by light, 
    but is now tainted by color. 
    why don’t you count seconds 
    as yeast grows, convinced now 
    your bread is dead, and it begs you 
    to see it is not bread. 
    why do you prep from fresh mind 
    instead of thoughtted ink, 
    your creation yours, but sadly unclaimed. 
    oven slams and breath is held 
    as the smoke fills… 
    why, why do you burn?`
        }
    },
    mirage: {
      kicker: "2/25/26",
      title: "Mirage",
        intro: "",
        sections: [],
        cards: [],
        poem: {
            note: "it's still there isn't it",
            text: `
    A trip I’d planned for only in my dreams. 
    My tools and maps collapsed 
    Through hands which never held them, 
    But in dreams I’ve seen they could. 
    In wake I knew they would. 
    Thirst will be the strength they need. 
    
    Its blue and silky surface gleams. 
    Yet people walk tangent as if in 
    Fear. Fear. I wait. Not frightening 
    As it seems, so please, head the oasis? 
    It’s there, my parched hand grips 
    The compass tight. And so I go. 
    
    Through glassy rocks the river streams. 
    My telescope zooms out and the glass 
    Cracks. And I fear I’ve already fallen through. 
    But no, I look up and it’s there. Then 
    It rains briefly, and I wait of course. 
    Those people drift with no remorse. 
    
    I near, so I think. It skews, for this 
    I did not plan. I did not plan. 
    Those people had buckets! They drank! 
    And here lies mine, forgotten and dry. 
    I do not thirst. 
    I only wait, as heat destroys my fan, 
    my feet are charred by burning sand, 
    And no, I said I didn’t plan 
    For the worst!!! I grip nothing but air. 
    The oasis moved, but it’s still there. 
    I could’ve sworn, and I still swear. 
    
    People are long gone. Or they will be. 
    I do not thirst. I only wait, but as i’d 
    Had never a watch, from time I am free. 
    No waiting. I head the oasis, not to drink, 
    But to swim. To fly. Quicken, blink. 
    It’s there! Wait! I trip over my own head. 
    No waiting! I head the oasis to fly! 
    Sandy ribbons taint the sky, 
    They settle, whip, then ask me why. 
    And yes, my mouth is still so dry, 
    But I do not thirst. It sways yet 
    I know it’s there, and I wish to fly.` 
        }
    },
    scales: {
      kicker: "5/16/26",
      title: "Scales",
        intro: "",
        sections: [],
        cards: [],
        poem: {
            note: "the world deserves not one's comparisons, but their kindness",
            text: `
    one must learn that his pain 
    does not equate the world’s. 
    a view that is easy to grasp, 
    but impossible to master. 
    one must learn that this view 
    is IMPOSSIBLE to master. 
    
    his blood is feathers, against 
    the hearts of those unbroken… 
    his scars are paint strokes, stains 
    compared with gash of those in 
    life whom he will come across 
    and kill “without committing crime”. 
    
    the weights don’t balance now, 
    rethink. absorb, don’t blink. how 
    cant you see your scales are shattered? 
    not tough, nor balance in your favor. 
    no armored scales to shield your pain, 
    please don’t berate the world in vain.
            `
        }
    },
    shadows: {
      kicker: "4/6/26",
        title: "Shadows",
        intro: "",
        sections: [],
        cards: [],
        poem: {
            note: "they really are everything",
            text: `
    I’ll meet most around life’s alleyway corners, 
    With bright orange lamps stretching 
    Their silhouettes across the ground. 
    Scary, are some, though source may not be. 
    I plea that now I know it’d ought be. 
    That void of light shines brighter than 
    Their faces ever will. Without a sound 
    A shadow tells their tale, etching 
    Symbols in stone that life’s wind 
    Cannot erode. Their shadow hits the wall 
    As they turn the corner to fill those 
    Carvings. But they fail. Those lamps 
    May shatter, yet still may I trust the shadows.
            `
        }
    },
    blink: {
      kicker: "2/28/25",
        title: "Blink",
        intro: "",
        sections: [],
        cards: [],
        poem: {
            note: "smile, for you experience",
            text: `
    A blast from far away threw 
    A rock to end our lives. 
    Unfortunate, yet true 
    Just a blink, it’ll all be gone… 
    
    A morsel of time to make 
    A quick thought or crack a smile. 
    Moments, free to take 
    But then a blink, they pass along… 
    
    Some are brawling, cheating, spying. 
    Others bawling, stealing, lying. 
    That’s their final scene of life 
    A blink… no more will see the dawn! 
    
    Not a second more will pass 
    The brink of all experience 
    So live the better end of it, 
    Hold no regard for future tense! 
    
    Some are loving, teaching, guiding. 
    Others laughing, healing, trying. 
    Ameliorating certain doom 
    With nothing but a glowing heart. 
    
    You wish which thought to pass your mind? 
    How wide and bright should your grin shine? 
    Before our world is smashed to dust, 
    Before the cease of life and time? 
    
    “With good and bad, I am Content!” 
    A stretch across that shines for several! 
    A blink… although it’ll all be gone, 
    Your soul may sing a joyous song.
            `
        }
    },
    hypocrite: {
      kicker: "11/7/25",
        title: "Hypocrite",
        intro: "",
        sections: [],
        cards: [],
        poem: {
            note: "though expired thoughts, for only so long do the weak endure",
            text: `
    I laughed at them for getting wet. 
    They step outside and toss their coats! 
    I see, yet “Oh, not me,” I said, 
    I’ll wear my coat, stay warm instead. 
    
    You see, I’m in my suit and tie. 
    Rain may be nice and comforting, 
    However, theres too much to vie 
    For I will caution rain outside. 
    
    The drops fell in a wild calm, 
    Enticing me to step outside. 
    One foot, then next, ignore the qualms 
    that fill me, like drops do my palms. 
    
    My new suit dampens, verdant now 
    As is the grass she holds me with. 
    The water trickles down my brow 
    and runs away with it my vow. 
    
    The sun still shines with ardent flame, 
    Im soaked in gleaming tenderness, 
    I grin, for am I not the same? 
    I stand here now, amused, ashamed. 
    
    Is rain exempt from my intent? 
    She’s everything I curse and crave. 
    i’ve fallen and my voice is spent, 
    my mind, my heart, to all extent.
            `
        }
    },
    glass: {
      kicker: "3/7/26",
        title: "Glass",
        intro: "",
        sections: [],
        cards: [],
        poem: {
            note: "wrong, though not a mistake",
            text: `
    It’s thick enough to drown the sound 
    Of voice that tells the truth (sometimes), 
    And clear enough to muffle lies 
    That don’t try to disguise themselves. 
    
    But they do in your eyes, don’t they? 
    Like lightning these cracks appear 
    With these gleaming dew drops,
    And glow with light reflecting. A web 
    That sticks and holds in loving fear, 
    That lets go once you see the day. 
    
    These splits, touch them and you’ll bleed. 
    The voice warns no more and calls you… 
    These cracks don’t raise opacity, I need 
    you just to see! But the crimson river 
    Looks quite nice, your fingers may 
    Obtain some hazed immunity? I plead. 
    
    She’s spreading fog beyond the glass… 
    No longer can you see. Yet you have seen. 
    A crack. And you are seeing. 
    A split. And you remain in this gleaming web, 
    Attacked, submit. Fog and glass make a mirror, 
    And now, angrily, you may know you are free.
            `
        }
    },
    "do-unto-others": {
      kicker: "3/26/26",
        title: "Do Unto Others",
        intro: "",
        sections: [],
        cards: [],
        poem: {
            note: "haiku",
            text: `
    had, but have? no more
    so i won't become that pain
    which plagued me too long
            `
        }
    },
    dreams: {
      kicker: "3/15/26",
        title: "Dreams",
        intro: "",
        sections: [],
        cards: [],
        poem: {
            note: "haiku",
            text: `
    i fear there's a night
    where i forgo all my dreams
    and remain asleep
            `
        }
    },
    cold: {
      kicker: "6/17/26",
        title: "Cold",
        intro: "",
        sections: [],
        cards: [],
        poem: {
            note: "the flame was born again",
            text: `
    my scavenged leather coat soaks… 
    and i’m sitting slumped staring at 
    my screen in my resourceful room… 
    rain accelerates, now without shelter 
    i run to the nearest safe overhang… 
    so much to do for myself, for the world. 
    and i am paralyzed, my brain gone cold… 
    cold. it’s unforgiving, as i am to myself. 
    how could one let so many moments 
    pass him by? and there is a rumble 
    from my stomach mistook for thunder… 
    full from dinner, full of desire, with rage. 
    but that fire is brutally tamed by fear, 
    and my embers go cold…
            `
        }
    },


    //All poems end

    math: {
      kicker: "Omphalos",
      title: "Mathematics",
      intro: `
        Math is one of my greatest passions. Other than English, it is the only language I know. It is an artform. Outside of formal studies, I've dedicated countless hours to learning it, honing it, and creating with it. 
      `,
      sections: [
        {
          title: "Purpose",
          text: "This section compiles my independent research, notes, and ideas within the field of math."
        }
      ],
      cards: [
        {
          title: "Research",
          description: "My work of the past and present.",
          target: "research",
          position: "bottom-right",
          depth: 14
        },
        {
          title: "Coursework",
          description: "Notes from formal coursework at Northwestern University.",
          target: "courses",
          position: "bottom-left",
          depth: 14
        }
      ],
      media: [
        {
          src: "media/nts_mathaward_1.jpeg",
          alt: "Northwestern University 2026 Award for Excellence in Mathematics: Nova Travis",
          caption: "2026 Award for Excellence in Mathematics by a First-Year Student",
          position: "left-top"
        },
        {
          src: "media/nts_collatz_7.jpeg",
          alt: "NUMS Talk Research Presentation",
          caption: "(January 28th, 2026) - Me presenting my research on the Collatz Conjecture for the Northwestern Undergraduate Math Society (NUMS)",
          position: "right-top"
        }
      ]
    },

    research: {
      kicker: "Voyages",
      title: "Research, Exploration, and Application",
      intro: `
        Math research, whether it be through formal collaboration or independent rabbit holes, is the gateway to our understanding of the universe.
      `,
      sections: [
        {
          title: "My Focus",
          text: "Anything, really. On this page I've documented some of my math research endeavors over the past 18 months, ranging from machine learning to unsolved problems."
        },
        {
          title: "Current Work",
          text: "I am building Spectrum with my team on SPRNOVA, as well as pursuing an idea born from chaos theory and topology, more on that coming soon!"
        },
        {
          title: "The Future",
          text: "I intend as a mathematician to find math's trails across anything I can in the world. We may never get the full story of our universe, but like we are forensic scientists with mathematical magnifying glasses, we can get a pretty good idea."
        },
      ],
      cards: [
        {
          title: "3x+1",
          description: "My attempt at the infamous Collatz Conjecture",
          target: "collatz",
          position: "top-left",
          depth: 14
        },
        {
          title: "Hyper-Operations",
          description: "Studies on tetration, and solving a related problem.",
          target: "tetration",
          position: "top-right",
          depth: 14
        },
        {
          title: "Machine Learning",
          description: "My work for KEP during my Summer2025 internship.",
          target: "mml",
          position: "bottom-right",
          depth: 14
        },
        {
          title: "Designing Spectrum",
          description: "SPRNOVA's first research project: a social game powered by mathematical prediction.",
          target: "spectrum",
          position: "bottom-left",
          depth: 14
        },
      ]
    },

    collatz: {
      kicker: "Unsolved problem",
      title: "Collatz Conjecture",
      intro: `
        The Collatz (3x+1) Conjecture asks whether every positive integer eventually
        reaches the loop 4, 2, 1 under a rule that halves even values and sends
        odd values to 3n + 1.
      `,
      sections: [
        {
          title: "\"Mind Virus\"",
          text: "The rule is so simple, the problem is said to be a trap for young mathematicians. I heard this and fell right in, not out of naivety, but out of curiousity. It was my first solo introduction to conducting rigorous proofs."
        },
        {
          title: "My Exploration",
          text: "Parity patterns, prime-divisor chains, inverse transformations, generating functions... I am interested in finding structure stable enough to become a rigorous argument, and have come across several promising approaches that I've verified with Northwestern professors."
        },
        {
          title: "Research Notebook",
          text: "This page contains some early highlights from a year of research. I presented some of my work at Northwestern as well (right). I have taken a break from Collatz, but I am certainly not finished with the problem."
        }
      ],
      cards: [
      ],
      media: [
        {
          src: "media/nts_collatz_6.png",
          alt: "Collatz Conjecture Research Image 1",
          caption: "Problem framing that I used, representing backwards movement through a specific Collatz sequence with a vector"
        },
        {
          src: "media/nts_collatz_2.png",
          alt: "Collatz Conjecture Research Image 2",
          caption: "A looping integer as a function of a specfic backwards sequence. An integer input N produces an integer x if and only if x is in a loop."
        },
        {
          src: "media/nts_collatz_3.png",
          alt: "Collatz Conjecture Research Image 3",
          caption: "Graphs which show the number of confirmed integers we must have before eliminating a loop with m odd numbers in it"
        },
        {
          src: "media/nts_collatz_4.png",
          alt: "Collatz Conjecture Research Image 4",
          caption: "For every point (x,y), if we have found no looping numbers greater than y, there are no loops with x odd numbers."
        },
        {
          src: "media/nts_collatz_5.png",
          alt: "Collatz Conjecture Research Image 5",
          caption: "Beautiful plot obtained by turning F(N) into a complex function. A red line passing through a lattice point corresponds to a looping integer. Ex: (2,2) -> 1"
        },
        {
          src: "media/nts_306_coll.jpeg",
          alt: "Collatz Conjecture Research Image 6",
          caption: "Using generating functions to break apart the trajectory of a number through the collatz sequence."
        }
      ]
    },

    tetration: {
      kicker: "Independent Research",
      title: "Tetration Investigation",
      intro: `
        Hyper-operations extend the familiar ladder of arithmetic: addition,
        multiplication, exponentiation, tetration, pentation... My focus has been
        tetration, or repeated exponentiation.
      `,
      sections: [
        {
          title: "Why Tetration",
          text: "Exponentiation already grows quickly; tetration creates a new kind of recursive object. It raises questions about inverse problems, derivatives, iteration, and how enormous numbers can still have describable structure."
        },
        {
          title: "Current Work",
          text: "In 2025, I studied tetration for a few months while working through a related problem of my own. This page includes some of the mathematics behind my approach to that problem statement."
        },
        {
          title: "Real-World Applications",
          text: "Interestingly, tetration's real world applications are rare. In physics, you can derive units of physical quantities by combination of multiplication and exponentiation, but tetration has no place. There no unit m^m, or kg^kg^kg. But computationally, there do exist problems to which tetration offers solutions."
        }
      ],
      cards: [
        {
          title: "Graham's Number",
          description: "Learn about this beast born from hyperoperations, used explicitly in mathematical proof.",
          link: "https://en.wikipedia.org/wiki/Graham%27s_number",
          position: "bottom-right",
          depth: 14
        },
        {
          title: "Real and Complex Tetration",
          description: "View this arXiv paper on extention of tetration from N -> C",
          link: "https://arxiv.org/abs/2105.00247",
          position: "top-right",
          depth: 14
        }
      ],
      media: [
        {
          src: "media/nts_ti_3.png",
          alt: "Tetration Research Image 1",
          caption: "Defining some recursive notation and an earlier derived formula for the derivative of x^^n using chain rule."
        },
        {
          src: "media/nts_ti_2.png",
          alt: "Tetration Research Image 2",
          caption: "Finding an expression that shows when the derivative of x^^n = 0."
        },
        {
          src: "media/nts_ti_1.png",
          alt: "Tetration Research Image 3",
          caption: "Graphs which shows several even tetration functions, and how the derived expression finds the zeroes of their derivatives (vertical lines)."
        }
      ]
    },

    courses: {
      kicker: "Navigation Training",
      title: "Formal Coursework",
      intro: `
        Section compiling all of my formal coursework in mathematics at Northwestern University (Current: Sept2025-June2026)
      `,
      sections: [
        {
          title: "MENU",
          text: "Stands for Mathematical Experience for Northwestern Undergraduates, and all courses with MENU are a more mathematically advanced extension of their non-MENU counterparts.",
          link: "https://www.math.northwestern.edu/undergraduate/mathematical-experience-for-northwestern-undergraduates-menu/"
        },
        {
          title: "Fall Classes",
          text: "Some classes listed are ones that I am enrolled to take in Fall2026, but have not yet taken. Clicking on them links to more course info instead, so that you may join in my excitement to take them.",
        }
      ],
      cards: [],
      stack: {
        label: "Courses",
        depth: 11,
        items: [
          {
            title: "Math105-7",
            description: "Tools of the Trade",
            target: "m105"
          },
          {
            title: "Math291-(1,2,3)",
            description: "MENU Intensive Lin Alg/MV Calc",
            target: "m291"
          },
          {
            title: "Math306",
            description: "Combinatorics & Discrete Math",
            target: "m306"
          },
          {
            title: "Math308",
            description: "Graph Theory",
            target: "m308"
          },
          {
            title: "Math366",
            description: "Mathematical Models in Finance",
            target: "m366"
          },
          {
            title: "Math368",
            description: "Introduction to Optimization",
            target: "m368"
          },
          {
            title: "Math321-(1,2,3)",
            description: "(Fall2026) MENU Real Analysis",
            link: "https://class-descriptions.northwestern.edu/5010/WCAS/MATH/20783"
          },
          {
            title: "Math310-(1,2,3)",
            description: "(Fall2026) Probability and Stochastic Processes",
            link: "https://class-descriptions.northwestern.edu/5000/WCAS/MATH/10944"
          },
          {
            title: "NeuroSci366",
            description: "(Fall2026) Brain Function Through the Lens of Computation",
            link: "https://catalogs.northwestern.edu/undergraduate/courses-az/neurosci/#:~:text=NEUROSCI%C2%A0366%2D0%20Brain%20Function%20Through%20the%20Lens%20of%20Computation%20(1%20Unit)%C2%A0%C2%A0"
          },          
        ]
      }
    },

    m105: {
      kicker: "Northwestern Coursework",
      title: "MATH 105-7",
      intro: `
        Tools of the Trade was an early bridge into communicating and thinking
        mathematically with greater precision.
      `,
      sections: [
        {
          title: "What I Built",
          text: "The course strengthened the habits behind serious mathematical work: reading definitions carefully, testing examples, writing arguments clearly, and treating notation as part of the reasoning."
        },
        {
          title: "Notes",
          text: "I will add selected notes, problems, and early proof-writing takeaways here."
        }
      ],
      cards: []
    },

    m291: {
      kicker: "Northwestern Coursework",
      title: "MATH 291 (1, 2, 3)",
      intro: `
        MENU's intensive linear algebra and multivariable calculus sequence made
        familiar computational ideas feel structural, geometric, and proof-based.
      `,
      sections: [
        {
          title: "Core Themes",
          text: "Linear transformations, vector spaces, eigenvalues, multivariable differentiation and integration, and the geometric meaning behind the tools."
        },
        {
          title: "What Stayed With Me",
          text: "The sequence helped make linear algebra feel like a language for structure, while multivariable calculus became a way of describing change across higher-dimensional spaces."
        }
      ],
      cards: [

      ],
      media: [
        {
          src: "media/nts_291_1.jpeg",
          alt: "Math 291 Notes Page 1",
          caption: "Some notes on vector projections and a boredom sketch"
        },
        {
          src: "media/nts_291_2.jpeg",
          alt: "Math 291 Notes Page 2",
          caption: "Homework problem showing eigenvectors as a basis"
        },
        {
          src: "media/nts_291_3.jpeg",
          alt: "Math 291 Notes Page 3",
          caption: "Homework problem proving a matrix is non-diagonalizable"
        },
        {
          src: "media/nts_291_4.jpeg",
          alt: "Math 291 Notes Page 4",
          caption: "Limit proof "
        },
        {
          src: "media/nts_291_5.jpeg",
          alt: "Math 291 Notes Page 5",
          caption: "Proof using differential forms"
        },
        {
          src: "media/nts_291_6.jpeg",
          alt: "Math 291 Notes Page 6",
          caption: "Last minute notes given to a friend before our final"
        }
      ]
    },

    m306: {
      kicker: "Northwestern Coursework",
      title: "MATH 306",
      intro: `
        Combinatorics and Discrete Mathematics introduced the art of extracting
        rigid structure from finite systems.
      `,
      sections: [
        {
          title: "Core Themes",
          text: "Counting, recurrence relations, generating functions, inclusion-exclusion, discrete structures, and proof techniques tailored to mathematics with hidden counting principles."
        },
        {
          title: "Why I Loved It",
          text: "Combinatorics rewards invention. A small change in viewpoint can turn a difficult problem into counting, which births something inevitable. Before I knew much about it, I didn't like combinatorics, and thought of it only as memorizing tons of formulas for specific circumstances. Oh, how glad I am that I took this course!"
        }
      ],
      cards: [
        {
          title: "3x+1",
          description: "My attempt at the infamous Collatz Conjecture",
          target: "collatz",
          position: "bottom-left",
          depth: 14
        }
      ],
      media: [
        {
          src: "media/nts_306_1.jpeg",
          alt: "Math 306 Notes Page 1",
          caption: "A shot of the board during a lecture proof which almost literally had my jaw on the floor, and gave my professor quite a laugh."
        },
        {
          src: "media/nts_306_coll.jpeg",
          alt: "Math 306 Notes Page 2",
          caption: "Utilization of generating functions learned in class to approach the Collatz Conjecture!"
        }
      ]
    },

    m308: {
      kicker: "Northwestern Coursework",
      title: "MATH 308",
      intro: `
        Graph Theory studies networks through vertices and edges, but its real
        strength is how naturally it turns relationships into mathematics.
      `,
      sections: [
        {
          title: "Core Themes",
          text: "Connectivity, trees, matchings, planarity, tournaments, colorings, cycles, and the balance between local constraints and global behavior."
        },
        {
          title: "Favorite Idea",
          text: "A graph can look simple while hiding an enormous amount of structure. This course sharpened my instinct for asking what a condition forces everywhere else in the system. This is a good takeaway for everything elsewhere in mathematics, not just for vertices and edges."
        }
      ],
      cards: []
    },

    m366: {
      kicker: "Northwestern Coursework",
      title: "MATH 366",
      intro: `
        Mathematical Models in Finance examined how probability, stochastic
        processes, and optimization can model uncertainty in financial systems.
      `,
      sections: [
        {
          title: "Core Themes",
          text: "Random walks, arbitrage, pricing, risk, discrete-time models, and the mathematical assumptions that make a financial model meaningful."
        },
        {
          title: "What Interested Me",
          text: "The course made applied probability feel alive: an abstract model can become a decision tool, provided its assumptions are understood well enough to know where it breaks."
        },
        {
          title: "Notes",
          text: "I will add notes and selected model explorations here."
        }
      ],
      cards: [],
      media: [
        {
          src: "media/nts_366_1.jpeg",
          alt: "Math 366 Notes Page 1",
          caption: "Week 2 Notes, efficient frontier",
          position: "top-left"
        },
        {
          src: "media/nts_366_2.jpeg",
          alt: "Math 366 Notes Page 2",
          caption: "Midterm prep, lots of notes",
          position: "top-right"
        },
        {
          src: "media/nts_366_3.jpeg",
          alt: "Math 366 Notes Page 3",
          caption: "Brownian motion intuition and formulas",
          position: "bottom-left"
        },
        {
          src: "media/nts_366_4.jpeg",
          alt: "Math 366 Notes Page 4",
          caption: "Formulas for the final",
          position: "bottom-right"
        }
      ]
    },

    m368: {
      kicker: "Northwestern Coursework",
      title: "MATH 368",
      intro: `
        Introduction to Optimization studies how to make the best possible choice
        under constraints, from linear programs to smooth nonlinear systems.
      `,
      sections: [
        {
          title: "Core Themes",
          text: "Linear programming, simplex, duality, convexity, complementary slackness, Lagrange multipliers, and the KKT conditions."
        },
        {
          title: "The Central Idea",
          text: "Optimization turns a question of preference into a question of structure: which constraints are active, which directions improve the objective, and when can we prove that no better solution exists?"
        }
      ],
      cards: [],
      media: [
        {
          src: "media/nts_368_1.jpeg",
          alt: "Math 368 Notes Page 1",
          caption: "Gaining intuition on LP problems which are unbounded or have multiple optimal solutions"
        },
        {
          src: "media/nts_368_2.jpeg",
          alt: "Math 368 Notes Page 2",
          caption: "KKT Optimization conditions plus intuition sketch"
        },
        {
          src: "media/nts_368_3.jpeg",
          alt: "Math 368 Notes Page 3",
          caption: "Linear programming introduction"
        },
        {
          src: "media/nts_368_4.jpeg",
          alt: "Math 368 Notes Page 4",
          caption: "Duality and it's linear algebra connections"
        }
      ]
    },
  }
};