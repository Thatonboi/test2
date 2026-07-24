/* ============================================================================
   SITE CONTENT — EDIT THIS FILE ONLY
   ----------------------------------------------------------------------------
   Everything shown on the site is generated from the CONTENT object below.
   To update the site — change text, add a project, swap a photo — edit the
   values here and save. You never need to touch app.js, style.css, or
   index.html for a normal content update.

   Images: point any "image" field at a file in /assets. Recommended sizes:
     - person.avatar        portrait, at least 800x1000px  (jpg/png/webp)
     - project.cover        4:3 landscape, at least 1200x900px — used as the
                             gallery thumbnail (the overlay's main visual is
                             the 3D model instead, if one is set)
     - project.gallery[]    same as cover, any number of extra photos/renders
   If an image file is missing, a generated placeholder is shown instead,
   so the site never breaks — just drop in real files and refresh.

   3D MODELS: set project.model to the path of a .stl file (see //models)
   to make that project's overlay show a live, drag-to-rotate 3D viewer
   instead of a static cover image. Leave it blank ("") to just show the
   cover image. project.modelColor optionally sets the material color
   (any hex number, e.g. 0xc9a76b).
============================================================================ */

const CONTENT = {

  /* ---------------------------------------------------------------------
     PERSON — hero / about info shown on the Home screen
  --------------------------------------------------------------------- */
  person: {
    name: "Jordan Blake",
    title: "Design Engineer",
    greeting: "Hello, I'm",                 // small eyebrow line above the big name
    roleLine: "I'm a Design Engineer specializing in biomechanics & 3D printing", // short line under the name
    tagline: "I design and prototype physical products — from concept sketch to CAD to a part you can hold.",
    location: "Miami, FL",
    availability: "Available for new work",   // shown on the small chip over the hero photo
    avatar: "profile.svg",     // replace with profile.jpg for a real photo
    bio: "With a focus on biomedical and mechanical design, I bridge the gap between clinical or functional requirements and technical feasibility. My work is defined by CAD precision and a commitment to solving complex physical problems through advanced engineering design — from first sketch through simulation, 3D-printed prototype, and finished part.",
    focusAreas: ["Biomechanics", "Prosthetics", "3D Printing", "Robotics"], // interactive list under the hero bio
    resumeUrl: "resume.pdf",   // add a resume.pdf next to index.html and this will link to it
    email: "jordan@example.com",
    phone: "+1 (305) 555-0148",
    socials: [
      { name: "GitHub",   url: "https://github.com/",   icon: "github" },
      { name: "LinkedIn", url: "https://linkedin.com/", icon: "linkedin" },
      { name: "X",        url: "https://x.com/",        icon: "twitter" }
    ]
  },

  /* ---------------------------------------------------------------------
     EXPERIENCE — reverse-chronological list, shown on Home screen
  --------------------------------------------------------------------- */
  experience: [
    {
      role: "Senior Design Engineer",
      company: "Northwind Biomedical",
      period: "2023 — Present",
      description: "Lead mechanical designer for a line of upper-limb prosthetic devices. Own the design process from clinical requirements through CAD, FEA validation, and 3D-printed production tooling.",
      tags: ["SolidWorks", "FEA", "3D Printing", "Biomechanics"]
    },
    {
      role: "Mechanical Design Engineer",
      company: "Fieldstone Robotics",
      period: "2021 — 2023",
      description: "Designed modular joint assemblies for a light industrial robotic arm, and built the rapid-prototyping pipeline the team used to iterate on parts within a day of a design change.",
      tags: ["Fusion 360", "Robotics", "GD&T"]
    },
    {
      role: "Design Engineering Intern",
      company: "Halcyon Systems",
      period: "Summer 2020",
      description: "Supported the enclosure and bracket design for a portable diagnostic device, and helped set up the team's first in-house SLA printing workflow.",
      tags: ["CAD", "Rapid Prototyping"]
    }
  ],

  /* ---------------------------------------------------------------------
     PROJECTS — shown as a preview on Home and in full on the Portfolio
     screen. Each opens a detail overlay when clicked. If "model" is set,
     the overlay shows a live rotating 3D viewer instead of the cover image.
  --------------------------------------------------------------------- */
  projects: [
    {
      id: "prosthetic-socket",
      title: "Trans-Radial Socket",
      category: "Prosthetics · Biomechanics",
      summary: "A parametric, 3D-printed prosthetic socket designed for a faster, more comfortable fitting process.",
      description: "A parametric trans-radial prosthetic socket designed to cut fitting time from multiple clinic visits down to one. I built a parametric CAD model driven by a handful of patient measurements, validated wall thickness and load paths with FEA, and iterated the final fit through three rounds of 3D-printed prototypes with a local clinic.",
      tags: ["Fusion 360", "FEA", "SLS Printing"],
      cover: "project1.svg",
      gallery: ["project1.svg", "project2.svg"],
      model: "socket.stl",
      modelColor: 0xc9a76b,
      links: { live: "", code: "" }
    },
    {
      id: "spur-gear",
      title: "Precision Spur Gear",
      category: "Mechanical · Robotics",
      summary: "A 14-tooth spur gear designed and optimized for a compact robotic joint drivetrain.",
      description: "Part of a compact drivetrain redesign for a robotic joint assembly. I modeled the involute-style tooth profile parametrically so tooth count and module could be tuned quickly, then validated backlash and load tolerance before releasing it for production machining.",
      tags: ["SolidWorks", "GD&T", "CNC"],
      cover: "project2.svg",
      gallery: ["project2.svg", "project3.svg"],
      model: "gear.stl",
      modelColor: 0xb8bfc7,
      links: { live: "", code: "" }
    },
    {
      id: "mounting-bracket",
      title: "Modular Mounting Bracket",
      category: "Mechanical · Structural",
      summary: "A lightweight L-bracket designed for tool-free assembly across a modular robotics platform.",
      description: "A structural L-bracket designed for a modular robotics platform where components needed to be reconfigured in the field without tools. I ran topology-informed material removal to cut weight by 30% while holding to the platform's load spec, then validated the design with 3D-printed prototypes before machining.",
      tags: ["Fusion 360", "Topology Optimization", "Aluminum"],
      cover: "project3.svg",
      gallery: ["project3.svg", "project4.svg"],
      model: "bracket.stl",
      modelColor: 0x9fb4c7,
      links: { live: "", code: "" }
    },
    {
      id: "robotic-joint",
      title: "Robotic Ball Joint",
      category: "Robotics · Actuation",
      summary: "A two-axis ball-jointed linkage designed for a light industrial robotic arm.",
      description: "A two-axis ball-jointed linkage for a light industrial robotic arm, designed to maximize range of motion within a tight envelope. I prototyped four joint geometries in PLA before settling on this design, which shipped in the arm's production revision.",
      tags: ["Fusion 360", "Kinematics", "PLA Prototyping"],
      cover: "project4.svg",
      gallery: ["project4.svg", "project5.svg"],
      model: "joint.stl",
      modelColor: 0xc7ccd1,
      links: { live: "", code: "" }
    },
    {
      id: "fastener-study",
      title: "High-Torque Fastener Study",
      category: "Mechanical · Hardware",
      summary: "A comparative study of fastener head geometries for a field-serviceable enclosure.",
      description: "A short design study comparing fastener head geometries for a field-serviceable outdoor enclosure, balancing torque capacity against tool accessibility for technicians working in the field. This hex-head design became the platform standard.",
      tags: ["DFM", "Hardware", "Field Service"],
      cover: "project5.svg",
      gallery: ["project5.svg", "project6.svg"],
      model: "hexbolt.stl",
      modelColor: 0xa8adb3,
      links: { live: "", code: "" }
    },
    {
      id: "sensor-housing",
      title: "Sealed Sensor Housing",
      category: "Product · Enclosure Design",
      summary: "An IP65-rated enclosure designed to house an environmental sensor package in the field.",
      description: "A sealed enclosure designed to house an environmental sensor package for long-term outdoor deployment. I designed the housing around an IP65 gasket interface and validated thermal performance before moving to injection-molding tooling.",
      tags: ["SolidWorks", "IP65", "Injection Molding"],
      cover: "project6.svg",
      gallery: ["project6.svg", "project1.svg"],
      model: "housing.stl",
      modelColor: 0xd6c9a8,
      links: { live: "", code: "" }
    }
  ],

  /* ---------------------------------------------------------------------
     CONTACT — small overlay page
  --------------------------------------------------------------------- */
  contact: {
    heading: "Let's talk",
    message: "Open to new roles, freelance design work, or just a good conversation about engineering. Reach out however's easiest."
    // email, phone, and socials are reused from `person` above
  }
};
