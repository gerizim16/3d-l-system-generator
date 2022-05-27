export default Object.freeze([
  {
    name: "Plant Nature",
    lsystem: {
      axiom: "m{0x594d30, 0.9, 0} A{0.2}",
      productions:
        "A{r} -> l{0.2, r, r} +x +y +z [ [ A{r/2} ] -x A{r/2} ] -x -y -z l{0.2, r, r} [ -x l{0.2, r, r/2} A{r/2} m{0xf695c3, 0.7, 0, false, true, false, true, 0.8, 0} sphere ] +x A{r/2}\nl{a, b, c} -> l{a*2.5, b, c}\nl{a, b, c} -> l{a*2, b, c}\nsphere -> sphere{random()/7+0.3}",
      iterations: 4,
    },
    defaults: { length: 0.2, angle: 25, radius: 0.05, size: 0.3 },
    environment: {
      autoRotate: true,
      modelAngle: 0,
      envName: "Sunset",
    },
  },
  {
    name: "Plant Dark",
    lsystem: {
      axiom: "m{0xffffff, 0.1, 0} A{0.2}",
      productions:
        "A{r} -> l{0.2, r, r} +x +y +z [ [ A{r/2} ] -x A{r/2} ] -x -y -z l{0.2, r, r} [ -x l{0.2, r, r/2} A{r/2} sphere ] +x A{r/2}\nl{a, b, c} -> l{a*2.5, b, c}\nl{a, b, c} -> l{a*2, b, c}\nsphere -> sphere{random()/7+0.1}",
      iterations: 4,
    },
    defaults: { length: 0.2, angle: 25, radius: 0.05, size: 0.3 },
    environment: {
      autoRotate: true,
      modelAngle: 0,
      envName: "Dark Neon",
    },
  },
  {
    name: "Hilbert curve",
    lsystem: {
      axiom: "X",
      productions:
        "X -> +x -z X l +x -z X l X +y l +x +z +z X l X -x l -y +z +z X l X +y l +z X +y +z",
      iterations: 3,
    },
    defaults: { length: 1, angle: 90, radius: 0.2, size: 0.3 },
    environment: {
      autoRotate: false,
      modelAngle: 45,
      envName: "Sky",
    },
  },
  {
    name: "Hilbert curve smooth",
    lsystem: {
      axiom: "t{0.5} s X e",
      productions:
        "X -> +x -z X f +x -z X f X +y f +x +z +z X f X -x f -y +z +z X f X +y f +z X +y +z",
      iterations: 3,
    },
    defaults: { length: 1, angle: 90, radius: 0.2, size: 0.3 },
    environment: {
      autoRotate: false,
      modelAngle: 45,
      envName: "Dark Neon",
    },
  },
  {
    name: "Sierpinski Pyramid",
    lsystem: {
      axiom: "m{0xffffff, 0.9, 0.9, true} f{8/2} cone{8, 8, 3}",
      productions:
        "cone{s, s} -> f{s/4} cone{s/2, s/2, 3} f{-s/2} [ +x{90} f{s*sin(pi/6)} -x{90} cone{s/2, s/2, 3} ] [ +z{120} +x{90} f{s*sin(pi/6)} -x{90} cone{s/2, s/2, 3} ] [ -z{120} +x{90} f{s*sin(pi/6)} -x{90} cone{s/2, s/2, 3} ] f{s/4}",
      iterations: 3,
    },
    defaults: { length: 1, angle: 90, radius: 0.2, size: 0.3 },
    environment: {
      autoRotate: false,
      modelAngle: 60,
      envName: "Dark Neon",
    },
  },
  {
    name: "Plant 2",
    lsystem: {
      axiom: "s m{0x228B22} t{0.3} f X e",
      productions:
        "X -> f{1} X [ -x +z{183} +y{10} f{1} X ] [ +x +z{16} +y{5} f{1} X ]",
      iterations: 5,
    },
    defaults: { length: 0.9, angle: 25, radius: 0.3, size: 0.3 },
    environment: {
      autoRotate: false,
      modelAngle: 0,
      envName: "Nature",
    },
  },
  {
    name: "Palm Tree",
    lsystem: {
      axiom: "J m{0x00FF00} K K K K K K K K K K K K K K K K K K K K",
      productions:
        "J -> J m{0x964B00} -y cone s f e\nK -> -z{30} [ -y{32} L A ]\nL -> L -y{4}\nA -> s f e [ -x{24} B ] -y{16} [ A ] [ +x{24} B ]\nB -> s f e -y{16} B\ncone -> m{0x964B00} cone{random()/7+0.3}",
      iterations: 8,
    },
    defaults: { length: 1.2, angle: 2, radius: 0.2, size: 0.4 },
    environment: {
      autoRotate: true,
      modelAngle: 0,
      envName: "Nature",
    },
  },
  {
    name: "Tree",
    lsystem: {
      axiom: "A B m{0x8B4513} sphere",
      productions:
        "A -> s f f e\nB -> r{0.08} C I +z{60} B\nC -> C s f e\nE -> -y{4} E\nI -> r{0.04} J J J J J J J J\nJ -> +z{60} [ -y{48} E G ]\nG -> r{0.08} C F [ -x{30} m{0x50C878} D sphere ] +y +y [ -x{30} m{0x50C878} D sphere ] G\nD -> F [ -x{30} ] +y [ +x{30} ] D\ncone -> m{0x50C878} cone{random()/5+0.1}\nsphere -> m{0x50C878, 0.7, 0, false, true, false, true, 0.8, 2} sphere{random()/7+1, 12, 6, 0, pi/2, 0, pi}",
      iterations: 9,
    },
    defaults: { length: 0.4, angle: 2, radius: 0.3, size: 0.2 },
    environment: {
      autoRotate: true,
      modelAngle: 0,
      envName: "Sunset",
    },
  },
  {
    name: "Cartoon Tree",
    lsystem: {
      axiom: "A B m{0x8B4513} sphere",
      productions:
        "A -> s f e\nB -> r{0.4} C I +z{60} B\nC -> C s f e\nE -> -y{4} E\nI -> r{0.4} J J J J J J J J\nJ -> +z{60} [ -y{12} E G ]\nG -> r{0.08} C F [ -x{30} m{0x50C878} D cube ] +y +y [ -x{30} m{0x50C878} D cube ] G\nD -> F [ -x{30} ] +y [ +x{30} ] D\nsphere -> m{0x50C878} sphere{0.5}\ncube -> m{0x50C878} cube{1}",
      iterations: 9,
    },
    defaults: { length: 0.2, angle: 2, radius: 0.6, size: 1 },
    environment: {
      autoRotate: true,
      modelAngle: 0,
      envName: "Sunset",
    },
  },
  {
    name: "Simple Flower",
    lsystem: {
      axiom: "m{0x00FF00} J m{0xFF0000} K K K K K K K KK K K K K K K K K K K K",
      productions:
        "J -> J -y s f f f e m{0x00FF00}\nK -> -z{30} [ -y{32} L A ]\nL -> L -y{4}\nA -> s f e [ -x{24} B ] -y{16} [ A ] [ +x{24} B ]\nB -> s f e -y{16} B",
      iterations: 5,
    },
    defaults: { length: 0.2, angle: 10, radius: 0.1, size: 0.1 },
    environment: {
      autoRotate: true,
      modelAngle: 0,
      envName: "Sunset",
    },
  },
  {
    name: "Heighway Dragon (2D)",
    lsystem: {
      axiom: "f l X",
      productions:
        "X -> X +x Y l +x\nY -> -x l X -x Y",
      iterations: 6,
    },
    defaults: { length: 0.2, angle: 90, radius: 0.05, size: 2 },
    environment: {
      autoRotate: true,
      modelAngle: 0,
      envName: "Sky",
    },
  },
  {
    name: "Heighway Dragon Smooth (2D)",
    lsystem: {
      axiom: "s t{0.7} f X e",
      productions:
        "X -> X +x Y f +x\nY -> -x f X -x Y",
      iterations: 5,
    },
    defaults: { length: 0.4, angle: 90, radius: 0.1, size: 2.1 },
    environment: {
      autoRotate: true,
      modelAngle: 0,
      envName: "Dark Pink",
    },
  },
  {
    name: "Pentaplexity (2D)",
    lsystem: {
      axiom: "s m{0x66cdaa} f +x +x f +x +x f +x +x f +x +x f e",
      productions:
        "f -> s f +x +x f +x +x f +x{180} f -x f +x +x f e",
      iterations: 3,
    },
    defaults: { length: 0.5, angle: 36, radius: 0.1, size: 0.1 },
    environment: {
      autoRotate: false,
      modelAngle: 0,
      envName: "Sky",
    },
  },
  {
    name: "Pattern (2D)",
    lsystem: {
      axiom: "s f e",
      productions:
        "f -> f +x f -x f -x f +x f",
      iterations: 4,
    },
    defaults: { length: 0.1, angle: 90, radius: 0.1, size: 0.9 },
    environment: {
      autoRotate: true,
      modelAngle: 0,
      envName: "Dark Pink",
    },
  },

]);
