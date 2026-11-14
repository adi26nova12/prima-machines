/* =========================================================
   PRIMA MACHINERY CO. | PRODUCT CATALOGUE DATA
   ---------------------------------------------------------
   HOW TO MANAGE PRODUCTS
   • Add / remove / reorder machines in PRIMA_PRODUCTS below.
   • categories: first one is the main category; a machine can
     appear in more than one category.
   • Photos: put files in assets/img/products/ named
     <id>-1.jpg, <id>-2.jpg ... (or set "images" yourself).
     Missing photos automatically show a neutral placeholder.
   • features / applications: if left out, the category's
     defaults are used.
   • specs: ONLY add verified figures, e.g.
       specs: [["Cutting width", "xx inch"], ["Motor", "x HP"]]
     Empty -> "Specifications available on request".
   • featured: true -> shown on the homepage.
   ========================================================= */

window.PRIMA_CATEGORIES = [
  {
    id: "platen-die-cutting", name: "Platen Die Cutting & Creasing Machines", icon: "die",
    blurb: "Platen machines for die cutting, creasing, embossing and punching of cartons and box blanks.",
    features: ["Die cutting and creasing in a single operation", "For paperboard, duplex and corrugated sheets", "Accepts custom cutting dies for different designs", "Built for regular production runs"],
    applications: ["Folding cartons", "Corrugated box blanks", "Labels, tags and stationery", "Offset and packaging printers"]
  },
  {
    id: "paper-corrugation", name: "Paper Corrugation Machines", icon: "flute",
    blurb: "Single-face corrugation machines that form fluted paper for corrugated board and boxes.",
    features: ["Forms flutes in kraft paper", "Produces single-face corrugated board", "Feeds from paper reels", "Flute size as per your requirement"],
    applications: ["Corrugated box manufacturing", "Single-face corrugated rolls and sheets", "E-commerce packaging units", "Carton and display box producers"]
  },
  {
    id: "reel-stands", name: "Reel Stand & Rolling Mill Stand", icon: "reel",
    blurb: "Shaftless reel and mill roll stands for feeding kraft paper reels into corrugation lines.",
    features: ["Holds and unwinds heavy paper reels", "Shaftless reel loading", "Feeds corrugators and sheet cutters", "Hydraulic or electric operation"],
    applications: ["Corrugated box plants", "Paper conversion units", "Sheet making and lamination plants"]
  },
  {
    id: "reel-to-sheet", name: "Reel to Sheet Cutters", icon: "sheet",
    blurb: "High-speed cutters that convert paper and corrugated reels into sheets of set length.",
    features: ["Converts reels into cut sheets", "Adjustable sheet length", "For kraft paper and single-face board"],
    applications: ["Corrugated board making", "Paper sheeting", "Packaging units"]
  },
  {
    id: "production-line", name: "3/5 Ply Automatic Production Line", icon: "line",
    blurb: "Machines that make up a complete automatic line for 3-ply and 5-ply corrugated board.",
    features: ["Part of a continuous 3-ply / 5-ply board line", "Configured to your output requirement", "Works with matching line sections"],
    applications: ["Corrugated box plants", "Corrugated board production", "High-volume packaging"]
  },
  {
    id: "pasting-laminators", name: "Sheet Pasting & Flute Laminators", icon: "layers",
    blurb: "Sheet pasting machines and flute laminators for multi-ply and print-laminated board.",
    features: ["Even adhesive application", "Builds multi-ply and laminated board", "For corrugated and printed sheets"],
    applications: ["3-ply and 5-ply board", "Printed retail boxes", "Display packaging"]
  },
  {
    id: "cutting-creasing", name: "Cutting & Creasing Machines", icon: "crease",
    blurb: "Slitter scorers and rotary cutting & creasing machines for corrugated board.",
    features: ["Slitting, scoring and creasing of corrugated board", "Adjustable sizes", "For box blank preparation"],
    applications: ["Corrugated box units", "Board converting", "Shipping cartons"]
  },
  {
    id: "rotary-creaser-slotter", name: "Combined Rotary Creaser Slotter Machine (RS4)", icon: "slot",
    blurb: "Combined rotary creasing and slotting for preparing corrugated box blanks.",
    features: ["Creasing and slotting in one machine", "For corrugated board", "Adjustable box sizes"],
    applications: ["Regular slotted cartons", "Shipping boxes", "Corrugated box units"]
  },
  {
    id: "flexo-printer-slotters", name: "Flexo Printer Slotters & Rotary Die Cutters", icon: "print",
    blurb: "1 to 4 colour flexo printing, slotting and rotary die cutting for corrugated packaging.",
    features: ["Flexographic printing on corrugated board", "Slotting and rotary die cutting options", "1 to 4 colour configurations", "Chain feeder or lead edge feeder"],
    applications: ["Printed shipping boxes", "E-commerce packaging", "Retail and FMCG cartons", "Custom die-cut boxes"]
  },
  {
    id: "stitchers-gluers", name: "Stitchers & Gluers", icon: "staple",
    blurb: "Box stitching and folder gluer machines for joining corrugated cartons.",
    features: ["Joins corrugated box flaps", "Stitching or gluing options", "For corrugated cartons"],
    applications: ["Shipping and export cartons", "Retail cartons", "Corrugated box units"]
  },
  {
    id: "guillotine", name: "Guillotine Paper Cutting Machines", icon: "blade",
    blurb: "Semi-automatic, automatic and programmable guillotine cutters for paper and board.",
    features: ["Guillotine blade cutting", "Clamping for accurate stack cutting", "Back gauge for repeat cut sizes"],
    applications: ["Commercial printing presses", "Notebook and stationery manufacturing", "Publishing houses", "Label and sticker units"]
  },
  {
    id: "print-finishing", name: "Print Finishing", icon: "film",
    blurb: "Thermal and cold film lamination machines and sheet separators for printed sheets.",
    features: ["Film lamination of printed sheets", "For gloss, matt and special films", "Improves durability and finish"],
    applications: ["Book covers", "Cartons and packaging", "Commercial printing", "Labels"]
  }
];

window.PRIMA_PRODUCTS = [
  /* ---------- PRIMA'S OWN MACHINES (from owner's photographs) ---------- */
  {
    id: "paper-cutting-machine", name: "Paper Cutting Machine", model: "", categories: ["guillotine"], featured: true,
    images: ["assets/img/products/paper-cutting-machine-1.jpg", "assets/img/products/paper-cutting-machine-2.jpg", "assets/img/products/paper-cutting-machine-3.jpg"],
    short: "Guillotine paper cutting machine for clean, straight cuts on stacks of paper, board and printed sheets.",
    description: "The Prima Paper Cutting Machine is a guillotine-type cutter used to cut and trim stacks of paper, paperboard and printed sheets to size. It is suited to printing presses, packaging units and paper converters that need consistent, square cuts in day-to-day production."
  },
  {
    id: "paper-corrugation-machine", name: "Paper Corrugation Machine", model: "", categories: ["paper-corrugation"], featured: true,
    images: ["assets/img/products/paper-corrugation-machine-1.jpg", "assets/img/products/paper-corrugation-machine-2.jpg", "assets/img/products/paper-corrugation-machine-3.jpg"],
    short: "Corrugation machine for forming fluted paper used in corrugated board and box manufacturing.",
    description: "The Prima Paper Corrugation Machine forms flutes in kraft paper and bonds it to a liner to produce single-face corrugated board, the starting point for corrugated sheets and boxes."
  },
  {
    id: "prima-35-die-punching-machine", name: "Die Punching Machine", model: "PRIMA-35", categories: ["platen-die-cutting"], featured: true,
    images: ["assets/img/products/prima-35-die-punching-machine-1.jpg", "assets/img/products/prima-35-die-punching-machine-2.jpg", "assets/img/products/prima-35-die-punching-machine-3.jpg"],
    short: "PRIMA-35 die punching machine for cutting and creasing cartons, box blanks and paperboard shapes.",
    description: "The PRIMA-35 is a die punching machine used to cut and crease paperboard and corrugated sheets into cartons, box blanks and custom shapes using a cutting die."
  },

  /* ---------- PLATEN DIE CUTTING & CREASING ---------- */
  { id: "die-cutting-creasing-machine", name: "Die Cutting and Creasing Machine", categories: ["platen-die-cutting"],
    short: "Platen die cutting and creasing machine for cartons, box blanks, labels and tags." },
  { id: "die-cutting-creasing-heated-platen", name: "Die Cutting and Creasing Machine with Heated Platen", categories: ["platen-die-cutting"],
    short: "Die cutting and creasing with a heated platen for embossing and heat-assisted work." },
  { id: "die-cutting-creasing-jumbo", name: "Die Cutting and Creasing Machine (Jumbo Series)", categories: ["platen-die-cutting"],
    short: "Large-format platen die cutter for bigger sheets and heavy corrugated board." },
  { id: "die-cutting-creasing-hot-foil", name: "Die Cutting and Creasing Machine with Hot Foil", categories: ["platen-die-cutting"],
    short: "Combines die cutting and creasing with hot foil stamping for premium cartons." },

  /* ---------- PAPER CORRUGATION ---------- */
  { id: "oblique-corrugation-with-finger", name: "High Speed Oblique Type Paper Corrugation Machine (With Finger)", categories: ["paper-corrugation"],
    short: "Oblique-type single-face corrugation machine with finger-type paper guiding." },
  { id: "oblique-corrugation-fingerless", name: "High Speed Oblique Type Paper Corrugation Machine (Fingerless)", categories: ["paper-corrugation"],
    short: "Fingerless oblique-type corrugation machine for clean, mark-free flutes." },
  { id: "pneumatic-corrugation-fingerless", name: "High Speed Pneumatic Type Paper Corrugation Machine (Fingerless)", categories: ["paper-corrugation"],
    short: "Pneumatic-pressure fingerless corrugation machine for consistent flute formation." },
  { id: "double-profile-corrugation-twin-flute", name: "High Speed Double Profile Paper Corrugation Machine (Twin Flute)", categories: ["paper-corrugation"],
    short: "Double-profile corrugation machine with two flute sizes in one machine." },
  { id: "double-profile-corrugation-twin-flute-fingerless", name: "High Speed Double Profile Paper Corrugation Machine (Twin Flute, Fingerless)", categories: ["paper-corrugation"],
    short: "Twin-flute double-profile corrugation machine in fingerless configuration." },

  /* ---------- REEL STAND & MILL ROLL STAND ---------- */
  { id: "hydraulic-shaftless-mill-roll-stand", name: "Hydraulic Shaftless Mill Roll Stand", categories: ["reel-stands", "production-line"],
    short: "Hydraulic shaftless stand for lifting, holding and unwinding heavy kraft paper reels." },
  { id: "shaftless-mill-roll-stand-electric", name: "Shaftless Mill Roll Stand Electric Type", categories: ["reel-stands", "production-line"],
    short: "Electrically operated shaftless mill roll stand for easy reel loading and feeding." },

  /* ---------- REEL TO SHEET CUTTERS ---------- */
  { id: "reel-to-sheet-cutter-gear", name: "High Speed Reel to Sheet Cutter (Gear Type)", categories: ["reel-to-sheet"],
    short: "Gear-driven reel to sheet cutter for converting reels into sheets of set length." },
  { id: "reel-to-sheet-cutter-servo", name: "High Speed Reel to Sheet Cutter (Servo Type)", categories: ["reel-to-sheet"],
    short: "Servo-controlled reel to sheet cutter for accurate, adjustable sheet lengths." },

  /* ---------- 3/5 PLY AUTOMATIC PRODUCTION LINE ---------- */
  { id: "cassette-single-facer", name: "High Speed Cassette Type Single Facer", categories: ["production-line"],
    short: "Cassette-type single facer for quick, easy change of flute rolls." },
  { id: "single-facer-gimbal-gearbox", name: "Single Facer with Gimbal Gear Box", categories: ["production-line"],
    short: "Single facer driven through a gimbal gearbox for single-face board production." },
  { id: "nc-cut-off-high-speed", name: "NC Cut Off High Speed", categories: ["production-line", "reel-to-sheet"],
    short: "High-speed NC cut-off for cutting continuous corrugated board into sheets." },
  { id: "nc-cut-off", name: "NC Cut Off", categories: ["production-line", "reel-to-sheet"],
    short: "NC-controlled cut-off for accurate sheet lengths at the end of the board line." },
  { id: "thin-blade-slitter-scorer", name: "Thin Blade Slitter Scorer", categories: ["cutting-creasing", "production-line"],
    short: "Thin blade slitter scorer for clean slitting and scoring of corrugated board." },
  { id: "thin-blade-slitter-scorer-electric", name: "Thin Blade Slitter Scorer Electric Type", categories: ["cutting-creasing", "production-line"],
    short: "Electric-adjustment thin blade slitter scorer for quick size changes." },
  { id: "four-bar-rotary-cutting-creasing", name: "4 Bar Rotary Cutting and Creasing", categories: ["cutting-creasing", "production-line"],
    short: "4-bar rotary machine for cutting and creasing corrugated board in one pass." },

  /* ---------- SHEET PASTING & FLUTE LAMINATORS ---------- */
  { id: "sheet-pasting-machine", name: "Sheet Pasting Machine", categories: ["pasting-laminators"],
    short: "Applies adhesive and pastes sheets together to build 3-ply, 5-ply and thicker board." },
  { id: "semi-auto-flute-laminator-3-ply", name: "Semi-Automatic Flute Laminator 3 Ply with Auto Lift", categories: ["pasting-laminators"],
    short: "Semi-automatic 3-ply flute laminator with auto lift table for printed sheets." },
  { id: "auto-flute-laminator-3-ply", name: "Fully Automatic Flute Laminator 3 Ply", categories: ["pasting-laminators"],
    short: "Fully automatic laminator bonding printed sheets to 3-ply flute board." },
  { id: "auto-flute-laminator-5-ply", name: "Fully Automatic Flute Laminator 5 Ply", categories: ["pasting-laminators"],
    short: "Fully automatic laminator for 5-ply print-laminated corrugated board." },

  /* ---------- COMBINED ROTARY CREASER SLOTTER (RS4) ---------- */
  { id: "rotary-creaser-slotter-rs4", name: "Combined Rotary Creaser Slotter Machine", model: "RS4", categories: ["rotary-creaser-slotter"],
    short: "Combined rotary creaser and slotter for preparing regular slotted carton blanks." },

  /* ---------- FLEXO PRINTER SLOTTERS & ROTARY DIE CUTTERS ---------- */
  { id: "flexo-printing-chain-feeder", name: "1/2/3/4 Color Flexo Printing Machine with Chain Feeder", categories: ["flexo-printer-slotters"],
    short: "1 to 4 colour flexo printing machine with chain feeder for corrugated sheets." },
  { id: "rotary-die-cutter-chain-feeder", name: "Rotary Die Cutting Machine with Chain Feeder", categories: ["flexo-printer-slotters"],
    short: "Rotary die cutter with chain feeder for die-cut corrugated boxes." },
  { id: "printer-slotter-chain-feeder", name: "1/2/3/4 Color Printer Slotter Machine with Chain Feeder", categories: ["flexo-printer-slotters"],
    short: "Flexo printing and slotting in one machine, with chain feeder." },
  { id: "printer-slotter-lead-edge-feeder", name: "1/2/3/4 Color Printer Slotter with Lead Edge Feeder", categories: ["flexo-printer-slotters"],
    short: "Printer slotter with lead edge feeder for accurate sheet feeding." },
  { id: "printer-slotter-rotary-die-cutter", name: "1/2/3/4 Color Printer Slotter with Rotary Die Cutter with Chain Feeder", categories: ["flexo-printer-slotters"],
    short: "Printing, slotting and rotary die cutting combined, with chain feeder." },

  /* ---------- STITCHERS & GLUERS ---------- */
  { id: "angular-box-stitching-machine", name: "Angular Type Box Stitching Machine", categories: ["stitchers-gluers"],
    short: "Angular-type stitcher for joining corrugated box flaps with wire stitches." },
  { id: "semi-auto-box-stitching-auto-lift", name: "Semi Automatic Box Stitching Machine with Auto Lift Table", categories: ["stitchers-gluers"],
    short: "Semi-automatic box stitcher with auto lift table for faster stitching." },
  { id: "semi-auto-folder-gluer-combined-pressure", name: "Semi Automatic Folder Gluer Machine (Combined Pressure)", categories: ["stitchers-gluers"],
    short: "Semi-automatic folder gluer with combined pressure section for glued cartons." },
  { id: "semi-auto-folder-gluer-stacker", name: "Semi Automatic Folder Gluer Machine with Stacker", categories: ["stitchers-gluers"],
    short: "Semi-automatic folder gluer with stacker for neat output collection." },

  /* ---------- GUILLOTINE PAPER CUTTING ---------- */
  { id: "semi-auto-paper-cutting-3-motor", name: "Semi Automatic Paper Cutting Machine with 3 Motor", categories: ["guillotine"],
    short: "Semi-automatic three-motor guillotine for paper and board stacks." },
  { id: "fully-auto-paper-cutting-self-clamp", name: "Fully Automatic Paper Cutting Machine (Self Clamp)", categories: ["guillotine"],
    short: "Fully automatic guillotine with self clamp for accurate stack cutting." },
  { id: "programmable-paper-cutting-hydraulic-clamp", name: "Programmable Paper Cutting Machine (Hydraulic Clamp)", categories: ["guillotine"],
    short: "Programmable guillotine with hydraulic clamp for repeat cutting programmes." },

  /* ---------- PRINT FINISHING ---------- */
  { id: "thermal-lamination-machine", name: "Thermal Lamination Machine", categories: ["print-finishing"],
    short: "Thermal film lamination of printed sheets for gloss or matt finish." },
  { id: "cold-film-lamination-plain", name: "Cold Film Lamination (Plain)", categories: ["print-finishing"],
    short: "Cold film lamination machine for plain lamination of printed sheets." },
  { id: "lamination-strip-gumming", name: "Lamination with Strip Gumming", categories: ["print-finishing"],
    short: "Film lamination combined with strip gumming." },
  { id: "cold-film-lamination-window-plain", name: "Cold Film Lamination (Window cum Plain)", categories: ["print-finishing"],
    short: "Cold film lamination for both window patching and plain lamination." },
  { id: "thermal-lamination-sheet-separator", name: "Thermal Lamination with Inline Sheet Separator", categories: ["print-finishing"],
    short: "Thermal laminator with inline sheet separator for continuous output." },
  { id: "hot-cold-film-lamination", name: "Hot and Cold Film Lamination Machine", categories: ["print-finishing"],
    short: "Single machine for both hot (thermal) and cold film lamination." },
  { id: "lamination-sheet-separator", name: "Lamination Sheet Separator", categories: ["print-finishing"],
    short: "Separates laminated sheets after lamination for clean, stacked output." },
  { id: "roll-to-roll-film-lamination", name: "Roll to Roll Film Lamination (Film Paper and Metalized Lamination)", categories: ["print-finishing"],
    short: "Roll to roll lamination for film-paper and metallised film lamination." },
  { id: "double-side-thermal-lamination", name: "Double Side Thermal Lamination", categories: ["print-finishing"],
    short: "Thermal lamination of both sides of a printed sheet in one pass." }
];

/* Additional gallery-only photos (factory, assembly, dispatch, exhibitions).
   Product photos are added to the gallery automatically. */
window.PRIMA_GALLERY_EXTRA = [
  // { src: "assets/img/gallery/workshop-1.jpg", caption: "Our workshop, Amritsar", category: "workshop" }
];

/* ---------- Fill in defaults (no need to edit) ---------- */
(function () {
  const cats = Object.fromEntries(window.PRIMA_CATEGORIES.map((c) => [c.id, c]));
  window.PRIMA_PRODUCTS.forEach((p) => {
    p.categories = p.categories || [p.category];
    p.category = p.categories[0];
    const c = cats[p.category] || {};
    p.model = p.model || "";
    p.images = p.images || [`assets/img/products/${p.id}-1.jpg`];
    p.description = p.description || `${p.short} ${c.blurb || ""}`.trim();
    p.features = p.features || c.features || [];
    p.applications = p.applications || c.applications || [];
    p.specs = p.specs || [];
  });
})();
