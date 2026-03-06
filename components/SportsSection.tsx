"use client";

/* ── CSS ──────────────────────────────────────────────────────────────────── */
const CSS = `
@keyframes svg-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes svg-loop {
  0%        { stroke-dashoffset: 1; }
  40%       { stroke-dashoffset: 0; }
  60%       { stroke-dashoffset: 0; }
  100%      { stroke-dashoffset: 1; }
}
.sports-scroll::-webkit-scrollbar { display: none; }
`;

/* ── Animated SVG primitives ─────────────────────────────────────────────── */
type A = { s?: number; t?: number; w?: string };

function Ap({ d, s = 0, t = 1.2, w = "1.5" }: A & { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength="1"
      style={{
        strokeDasharray: 1,
        strokeDashoffset: 1,
        animation: `svg-loop ${t * 5 + 2}s ${s * 3}s ease-in-out infinite`,
      }}
    />
  );
}
function Ac({
  cx,
  cy,
  r,
  s = 0,
  t = 1.2,
  w = "1.5",
}: A & { cx: number; cy: number; r: number }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      strokeWidth={w}
      pathLength="1"
      style={{
        strokeDasharray: 1,
        strokeDashoffset: 1,
        animation: `svg-loop ${t * 5 + 2}s ${s * 3}s ease-in-out infinite`,
      }}
    />
  );
}
function Ae({
  cx,
  cy,
  rx,
  ry,
  s = 0,
  t = 1.2,
  w = "1.5",
  tr,
}: A & { cx: number; cy: number; rx: number; ry: number; tr?: string }) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill="none"
      strokeWidth={w}
      transform={tr}
      pathLength="1"
      style={{
        strokeDasharray: 1,
        strokeDashoffset: 1,
        animation: `svg-loop ${t * 5 + 2}s ${s * 3}s ease-in-out infinite`,
      }}
    />
  );
}
function Al({
  x1,
  y1,
  x2,
  y2,
  s = 0,
  t = 0.8,
  w = "1.5",
}: A & { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      strokeLinecap="round"
      strokeWidth={w}
      pathLength="1"
      style={{
        strokeDasharray: 1,
        strokeDashoffset: 1,
        animation: `svg-loop ${t * 5 + 2}s ${s * 3}s ease-in-out infinite`,
      }}
    />
  );
}

/* ── SVG wrapper ─────────────────────────────────────────────────────────── */
function S({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className="w-full h-full"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/* ── Sport illustrations ─────────────────────────────────────────────────── */

function AflIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ae cx={40} cy={42} rx={20} ry={28} s={0} />
      <Ap d="M40 14 C37 27 37 57 40 70" s={0.3} t={0.9} />
      <Ap d="M33 37 L47 37 M33 43 L47 43 M33 49 L47 49" s={0.6} t={0.6} />
      <Al x1={18} y1={79} x2={18} y2={67} s={0.9} t={0.4} />
      <Al x1={28} y1={79} x2={28} y2={60} s={1.0} t={0.4} />
      <Al x1={52} y1={79} x2={52} y2={60} s={1.1} t={0.4} />
      <Al x1={62} y1={79} x2={62} y2={67} s={1.2} t={0.4} />
      <Al x1={28} y1={64} x2={52} y2={64} s={1.3} t={0.3} />
    </S>
  );
}

function NrlIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ae cx={40} cy={44} rx={26} ry={20} s={0} />
      <Ap d="M14 44 C26 40 54 40 66 44" s={0.4} t={0.7} />
      <Ap d="M37 27 L37 61 M40 27 L40 61 M43 27 L43 61" s={0.6} t={0.5} />
      <Al x1={30} y1={79} x2={30} y2={67} s={0.9} t={0.4} />
      <Al x1={50} y1={79} x2={50} y2={67} s={1.0} t={0.4} />
      <Al x1={30} y1={73} x2={50} y2={73} s={1.1} t={0.3} />
    </S>
  );
}

function BasketballIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ac cx={40} cy={46} r={24} s={0} />
      <Ap d="M16 46 Q28 36 40 46 Q52 56 64 46" s={0.4} t={0.8} />
      <Ap d="M40 22 Q48 34 40 46 Q32 58 40 70" s={0.6} t={0.8} />
      <Al x1={24} y1={8} x2={56} y2={8} s={0.9} t={0.4} w="2" />
      <Al x1={40} y1={8} x2={40} y2={18} s={1.0} t={0.3} />
      <Ae cx={40} cy={20} rx={8} ry={3} s={1.1} t={0.4} />
    </S>
  );
}

function SoccerIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ac cx={40} cy={44} r={22} s={0} />
      <Ap d="M40 30 L47 35 L45 44 L35 44 L33 35 Z" s={0.4} t={0.7} />
      <Al x1={40} y1={22} x2={40} y2={30} s={0.8} t={0.3} />
      <Al x1={55} y1={30} x2={47} y2={35} s={0.9} t={0.3} />
      <Al x1={51} y1={52} x2={45} y2={44} s={1.0} t={0.3} />
      <Al x1={29} y1={52} x2={35} y2={44} s={1.0} t={0.3} />
      <Al x1={25} y1={30} x2={33} y2={35} s={0.9} t={0.3} />
      <Al x1={16} y1={72} x2={16} y2={62} s={1.1} t={0.3} />
      <Al x1={64} y1={72} x2={64} y2={62} s={1.2} t={0.3} />
      <Al x1={16} y1={62} x2={64} y2={62} s={1.3} t={0.4} />
    </S>
  );
}

function CricketIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ap d="M24 66 L32 16 L40 16 L48 66 Z" s={0} t={1.0} />
      <Al x1={36} y1={16} x2={36} y2={8} s={0.7} t={0.4} w="2" />
      <Al x1={54} y1={66} x2={54} y2={32} s={0.5} t={0.7} />
      <Al x1={60} y1={66} x2={60} y2={32} s={0.6} t={0.7} />
      <Al x1={66} y1={66} x2={66} y2={32} s={0.7} t={0.7} />
      <Al x1={52} y1={32} x2={68} y2={32} s={0.9} t={0.3} w="2" />
      <Ac cx={62} cy={22} r={7} s={1.0} t={0.5} />
      <Ap d="M56 20 Q59 22 56 24" s={1.2} t={0.3} />
    </S>
  );
}

function RugbyUnionIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ae cx={40} cy={48} rx={22} ry={17} s={0} />
      <Ap d="M18 48 C30 44 50 44 62 48" s={0.4} t={0.7} />
      <Al x1={40} y1={31} x2={40} y2={65} s={0.6} t={0.6} />
      <Al x1={28} y1={10} x2={28} y2={22} s={0.8} t={0.5} />
      <Al x1={52} y1={10} x2={52} y2={22} s={0.9} t={0.5} />
      <Al x1={28} y1={18} x2={52} y2={18} s={1.0} t={0.3} />
    </S>
  );
}

function NetballIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ac cx={40} cy={54} r={20} s={0} />
      <Ap d="M20 54 Q30 46 40 54 Q50 62 60 54" s={0.4} t={0.6} />
      <Ap d="M40 34 Q44 44 40 54 Q36 64 40 74" s={0.6} t={0.6} />
      <Al x1={40} y1={34} x2={40} y2={8} s={0.8} t={0.5} w="2" />
      <Ae cx={40} cy={16} rx={10} ry={4} s={1.0} t={0.4} />
      <Al x1={40} y1={20} x2={40} y2={34} s={1.1} t={0.3} />
    </S>
  );
}

function TennisIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ae cx={36} cy={30} rx={18} ry={22} s={0} />
      <Ap
        d="M20 22 L52 22 M20 30 L52 30 M20 38 L52 38 M22 46 L50 46"
        s={0.4}
        t={0.7}
      />
      <Ap d="M28 8 L28 52 M36 8 L36 52 M44 8 L44 52" s={0.5} t={0.7} />
      <Al x1={36} y1={52} x2={36} y2={74} s={0.8} t={0.4} w="3" />
      <Ac cx={64} cy={62} r={8} s={1.0} t={0.4} />
      <Ap d="M57 59 Q61 62 57 65" s={1.2} t={0.3} />
    </S>
  );
}

function AmFootballIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ap
        d="M40 14 C58 14 68 27 68 42 C68 57 58 70 40 70 C22 70 12 57 12 42 C12 27 22 14 40 14 Z"
        s={0}
      />
      <Al x1={12} y1={42} x2={68} y2={42} s={0.4} t={0.5} />
      <Ap
        d="M35 30 L45 30 M35 37 L45 37 M35 44 L45 44 M35 51 L45 51 M35 58 L45 58"
        s={0.6}
        t={0.7}
      />
      <Al x1={40} y1={8} x2={40} y2={4} s={1.0} t={0.3} w="2" />
      <Ap d="M40 8 L30 2 M40 8 L50 2" s={1.1} t={0.4} w="2" />
    </S>
  );
}

function BaseballIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ap d="M40 16 L64 40 L40 64 L16 40 Z" s={0} t={1.0} />
      <Ac cx={40} cy={16} r={3} s={0.8} t={0.3} />
      <Ac cx={64} cy={40} r={3} s={0.9} t={0.3} />
      <Ac cx={40} cy={64} r={3} s={1.0} t={0.3} />
      <Ac cx={16} cy={40} r={3} s={1.1} t={0.3} />
      <Ac cx={60} cy={14} r={8} s={1.2} t={0.5} />
      <Ap d="M53 11 Q57 14 53 17 M67 11 Q63 14 67 17" s={1.4} t={0.3} />
      <Al x1={8} y1={78} x2={22} y2={54} s={1.3} t={0.5} w="3" />
      <Ap d="M19 52 C21 47 28 47 26 53" s={1.5} t={0.4} w="2" />
    </S>
  );
}

function IceHockeyIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ap
        d="M12 24 C12 16 18 10 26 10 L54 10 C62 10 68 16 68 24 L68 56 C68 64 62 70 54 70 L26 70 C18 70 12 64 12 56 Z"
        s={0}
        t={1.2}
      />
      <Al x1={12} y1={40} x2={68} y2={40} s={0.5} t={0.5} />
      <Ac cx={40} cy={40} r={10} s={0.7} t={0.5} />
      <Ae cx={40} cy={40} rx={5} ry={2} s={1.0} t={0.3} w="2" />
      <Ap d="M62 78 L36 56 L28 62" s={1.1} t={0.7} w="2" />
    </S>
  );
}

function FieldHockeyIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ap d="M20 8 L20 60 C20 72 34 76 38 68" s={0} t={1.0} w="2.5" />
      <Ac cx={50} cy={58} r={8} s={0.8} t={0.4} />
      <Al x1={56} y1={12} x2={56} y2={40} s={1.0} t={0.5} />
      <Al x1={74} y1={12} x2={74} y2={40} s={1.1} t={0.5} />
      <Al x1={56} y1={12} x2={74} y2={12} s={1.2} t={0.3} />
      <Ap d="M56 26 C48 26 46 32 46 40 L56 40" s={1.3} t={0.5} />
    </S>
  );
}

function VolleyballIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ac cx={40} cy={28} r={20} s={0} />
      <Ap d="M20 28 Q30 20 40 28 Q50 36 60 28" s={0.4} t={0.6} />
      <Ap d="M40 8 Q44 18 40 28 Q36 38 40 48" s={0.6} t={0.6} />
      <Al x1={10} y1={52} x2={10} y2={74} s={0.8} t={0.4} w="2" />
      <Al x1={70} y1={52} x2={70} y2={74} s={0.9} t={0.4} w="2" />
      <Al x1={10} y1={58} x2={70} y2={58} s={1.0} t={0.4} w="2" />
      <Ap
        d="M10 63 L14 74 M24 63 L20 74 M34 63 L38 74 M44 63 L48 74 M54 63 L58 74 M64 63 L70 74"
        s={1.1}
        t={0.4}
      />
      <Al x1={10} y1={68} x2={70} y2={68} s={1.2} t={0.3} />
    </S>
  );
}

function SwimmingIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Al x1={8} y1={16} x2={72} y2={16} s={0} t={0.5} />
      <Al x1={8} y1={36} x2={72} y2={36} s={0.1} t={0.5} />
      <Al x1={8} y1={56} x2={72} y2={56} s={0.2} t={0.5} />
      <Al x1={8} y1={72} x2={72} y2={72} s={0.3} t={0.5} />
      <Ap
        d="M8 26 C16 22 22 30 30 26 C38 22 46 30 54 26 C62 22 68 26 72 26"
        s={0.5}
        t={0.8}
      />
      <Ap
        d="M8 46 C16 42 22 50 30 46 C38 42 46 50 54 46 C62 42 68 46 72 46"
        s={0.6}
        t={0.8}
      />
      <Ap
        d="M8 64 C16 60 22 68 30 64 C38 60 46 68 54 64 C62 60 68 64 72 64"
        s={0.7}
        t={0.8}
      />
      <Ac cx={22} cy={26} r={4} s={1.0} t={0.4} />
      <Ap
        d="M22 30 L22 40 M18 34 L26 34 M22 40 L18 48 M22 40 L26 48"
        s={1.1}
        t={0.5}
      />
    </S>
  );
}

function AthleticsIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ap
        d="M14 28 C14 16 22 10 32 10 L48 10 C58 10 66 16 66 28 L66 52 C66 64 58 70 48 70 L32 70 C22 70 14 64 14 52 Z"
        s={0}
        t={1.0}
      />
      <Ap
        d="M22 28 C22 20 28 16 36 16 L44 16 C52 16 58 20 58 28 L58 52 C58 60 52 64 44 64 L36 64 C28 64 22 60 22 52 Z"
        s={0.3}
        t={0.9}
      />
      <Al x1={40} y1={10} x2={40} y2={16} s={0.9} t={0.3} w="2" />
      <Ac cx={40} cy={40} r={4} s={1.1} t={0.3} />
      <Ap d="M40 44 L38 52 L34 58 M40 44 L44 52 L48 58" s={1.2} t={0.5} />
      <Ap d="M34 46 L46 44" s={1.3} t={0.3} />
    </S>
  );
}

function CyclingIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ac cx={18} cy={52} r={16} s={0} />
      <Ac cx={18} cy={52} r={3} s={0.3} t={0.3} />
      <Ac cx={62} cy={52} r={16} s={0.1} />
      <Ac cx={62} cy={52} r={3} s={0.4} t={0.3} />
      <Ap d="M18 52 L34 28 L62 52" s={0.5} t={0.7} />
      <Al x1={34} y1={28} x2={62} y2={28} s={0.6} t={0.4} />
      <Al x1={34} y1={28} x2={34} y2={52} s={0.7} t={0.4} />
      <Al x1={28} y1={24} x2={42} y2={24} s={0.9} t={0.3} w="2" />
      <Al x1={54} y1={30} x2={68} y2={34} s={0.8} t={0.3} w="2" />
      <Ac cx={34} cy={52} r={5} s={1.0} t={0.3} />
      <Al x1={29} y1={56} x2={39} y2={48} s={1.1} t={0.3} />
      <Ap
        d="M18 36 L18 52 M4 52 L18 52 M11 40 L18 52 M25 40 L18 52"
        s={1.2}
        t={0.4}
      />
    </S>
  );
}

function BadmintonIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ac cx={34} cy={28} r={20} s={0} />
      <Ap
        d="M16 20 L52 20 M16 28 L52 28 M16 36 L52 36 M18 44 L50 44"
        s={0.4}
        t={0.7}
      />
      <Ap d="M24 8 L24 48 M34 8 L34 48 M44 8 L44 48" s={0.5} t={0.7} />
      <Al x1={34} y1={48} x2={34} y2={74} s={0.7} t={0.4} w="3" />
      <Ac cx={66} cy={30} r={7} s={1.0} t={0.4} />
      <Ap d="M66 37 L60 54 M66 37 L66 56 M66 37 L72 54" s={1.1} t={0.4} />
      <Al x1={60} y1={54} x2={72} y2={54} s={1.3} t={0.3} />
    </S>
  );
}

function HandballIllus({ color }: { color: string }) {
  return (
    <S color={color}>
      <Ac cx={40} cy={44} r={22} s={0} />
      <Ap d="M18 44 Q28 36 40 44 Q52 52 62 44" s={0.4} t={0.6} />
      <Ap d="M40 22 Q44 33 40 44 Q36 55 40 66" s={0.6} t={0.6} />
      <Al x1={8} y1={78} x2={8} y2={10} s={0.9} t={0.7} />
      <Al x1={8} y1={10} x2={28} y2={10} s={1.2} t={0.4} />
      <Al x1={28} y1={10} x2={28} y2={24} s={1.3} t={0.4} />
      <Ap d="M8 20 L28 20 M8 30 L28 30" s={1.4} t={0.3} />
      <Ap d="M14 10 L14 24 M21 10 L21 24" s={1.4} t={0.3} />
    </S>
  );
}

/* ── Sports data ─────────────────────────────────────────────────────────── */
type SportConfig = {
  name: string;
  color: string;
  desc: string;
  tags: readonly string[];
  Illus: (props: { color: string }) => React.ReactElement;
};

const SPORTS: SportConfig[] = [
  {
    name: "Basketball",
    color: "#F79009",
    desc: "Fast-paced overlays for quarter scores, fouls and shot clocks.",
    tags: ["Shot Clock", "Fouls", "Quarter"],
    Illus: BasketballIllus,
  },
  {
    name: "Soccer",
    color: "#16B364",
    desc: "Goal, card, substitution and injury time graphic automation.",
    tags: ["Goal Alert", "Cards", "Subs"],
    Illus: SoccerIllus,
  },
  {
    name: "Australian Football",
    color: "#FF504E",
    desc: "Auto score, quarter & goal triggers with 4-post scoreboard.",
    tags: ["Scoreboard", "Goal Alert", "Stats"],
    Illus: AflIllus,
  },
  {
    name: "Rugby League",
    color: "#9E77ED",
    desc: "Live try, penalty and sin-bin overlays with match clock.",
    tags: ["Scoreboard", "Try Alert", "Clock"],
    Illus: NrlIllus,
  },
  {
    name: "Cricket",
    color: "#0BA5EC",
    desc: "Ball-by-ball overlays with wagon wheel and partnership stats.",
    tags: ["Ball-by-Ball", "Scorecard", "Wagon Wheel"],
    Illus: CricketIllus,
  },
  {
    name: "Rugby Union",
    color: "#EE46BC",
    desc: "Try, conversion, penalty and scrum overlay automation.",
    tags: ["Scoreboard", "Try Alert", "Lineout"],
    Illus: RugbyUnionIllus,
  },
  {
    name: "Netball",
    color: "#FF504E",
    desc: "Quarter scores, goal tally and player rotation graphics.",
    tags: ["Scoreboard", "Goals", "Quarter"],
    Illus: NetballIllus,
  },
  {
    name: "Tennis",
    color: "#F79009",
    desc: "Set-by-set scoring, ace counter and serve speed overlays.",
    tags: ["Set Score", "Serve Speed", "Stats"],
    Illus: TennisIllus,
  },
  {
    name: "American Football",
    color: "#9E77ED",
    desc: "Down & distance, score and play-clock broadcast overlays.",
    tags: ["Down & Distance", "Score", "Play Clock"],
    Illus: AmFootballIllus,
  },
  {
    name: "Baseball",
    color: "#0BA5EC",
    desc: "Pitch count, batting average and innings score graphics.",
    tags: ["Pitch Count", "Innings", "Stats"],
    Illus: BaseballIllus,
  },
  {
    name: "Ice Hockey",
    color: "#16B364",
    desc: "Goal, penalty and power play overlay triggers.",
    tags: ["Goal Alert", "Penalty", "Power Play"],
    Illus: IceHockeyIllus,
  },
  {
    name: "Field Hockey",
    color: "#EE46BC",
    desc: "Quarter score, penalty corner and player stats overlays.",
    tags: ["Scoreboard", "Penalty Corner", "Stats"],
    Illus: FieldHockeyIllus,
  },
  {
    name: "Volleyball",
    color: "#FF504E",
    desc: "Set scores, service rotation and match stat graphics.",
    tags: ["Set Score", "Rotation", "Stats"],
    Illus: VolleyballIllus,
  },
  {
    name: "Swimming",
    color: "#0BA5EC",
    desc: "Heat results, personal best alerts and lane overlays.",
    tags: ["Heat Results", "PB Alert", "Lane"],
    Illus: SwimmingIllus,
  },
  {
    name: "Athletics",
    color: "#F79009",
    desc: "Race results, personal records and split time displays.",
    tags: ["Results", "Records", "Splits"],
    Illus: AthleticsIllus,
  },
  {
    name: "Cycling",
    color: "#16B364",
    desc: "Live gap times, stage results and leader jersey graphics.",
    tags: ["Gap Time", "Stage Results", "GC"],
    Illus: CyclingIllus,
  },
  {
    name: "Badminton",
    color: "#9E77ED",
    desc: "Game score, rally counter and match stat overlays.",
    tags: ["Game Score", "Rally", "Stats"],
    Illus: BadmintonIllus,
  },
  {
    name: "Handball",
    color: "#EE46BC",
    desc: "Half score, goal tally and time-out overlay automation.",
    tags: ["Scoreboard", "Goal", "Time-out"],
    Illus: HandballIllus,
  },
];

/* ── Sport card ──────────────────────────────────────────────────────────── */
function SportCard({ name, desc, Illus }: SportConfig) {
  return (
    <div
      className="relative flex-shrink-0 rounded-[18px] overflow-hidden"
      style={{ width: 340, minWidth: 320, height: 400 }}
    >
      {/* Rotating gradient border */}
      <div
        style={{
          position: "absolute",
          inset: "-50%",
          background: "conic-gradient(from 0deg, #13161B 0%, #13161B 35%, #FF504E 50%, #13161B 65%, #13161B 100%)",
          animation: "rotateBorder 4s linear infinite",
          zIndex: 0,
        }}
      />
      {/* Inner card — inset 2px leaves border visible on all sides */}
      <div
        className="absolute flex flex-col rounded-2xl"
        style={{ inset: 2, background: "#13161B", padding: 24, gap: 32, zIndex: 1 }}
      >
        {/* Illustration area */}
        <div className="flex-1 rounded-[14px] min-h-0 overflow-hidden" style={{ background: "#22262F" }}>
          <Illus color="#CECFD2" />
        </div>
        {/* Text */}
        <div className="flex flex-col gap-1 shrink-0">
          <p className="font-semibold text-[#F7F7F7] leading-7" style={{ fontSize: 18 }}>
            {name}
          </p>
          <p className="font-normal text-[#94979C] leading-6" style={{ fontSize: 16 }}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function SportsSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="pt-[72px] md:pt-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-12 md:pb-16">
          <p className="text-base font-semibold text-[#CECFD2] mb-4">Sports</p>
          <h1
            className="text-[40px] md:text-[60px] font-bold leading-[1.2] tracking-[-0.02em] mb-6"
            style={{
              background: "linear-gradient(135deg, #FF504E 0%, #FF8A65 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Every Sport. Every level.
            <br />
            One platform.
          </h1>
          <p className="text-lg md:text-xl text-[#F7F7F7] max-w-[640px] leading-[1.7]">
            LIGR supports 20+ sports with purpose-built overlays, automated
            scoring logic, and sport-specific data bindings — from grassroots to
            elite.
          </p>
        </div>
      </div>

      {/* ── Horizontal scroll cards ───────────────────────────────────────── */}
      <div className="pb-4 md:pb-6">
        <div className="relative">
          <div
            className="sports-scroll overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div
              className="flex gap-8 pb-4"
              style={{
                width: "max-content",
                paddingLeft: "max(1rem, calc((100vw - 1280px) / 2 + 2rem))",
                paddingRight: "max(1rem, calc((100vw - 1280px) / 2 + 2rem))",
              }}
            >
              {SPORTS.map((sport) => (
                <SportCard key={sport.name} {...sport} />
              ))}
            </div>
          </div>
          {/* Right fade — hints at more content */}
          <div
            className="absolute top-0 right-0 bottom-4 w-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, #1D202A 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Scroll hint */}
        <div className="flex max-w-[1280px] mx-auto md:px-8 items-left justify-center gap-2 mt-4 mb-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8l4-4"
              stroke="#61656C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm text-[#61656C]">
            Scroll to explore all sports
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4l4 4-4 4"
              stroke="#61656C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── Every sport includes ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-[1280px] mx-auto md:px-8">
          <div className="mb-10 md:mb-14">
            <p className="text-base font-semibold text-[#94979C] mb-3">
              What&apos;s included
            </p>
            <h2
              className="text-[32px] md:text-[36px] font-semibold leading-[44px] tracking-[-0.02em] mb-5"
              style={{
                background: "linear-gradient(135deg, #FF504E 0%, #FF8A65 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Every sport includes
            </h2>
            <p className="text-lg md:text-xl text-[#94979C] max-w-[768px] leading-[1.6]">
              Purpose-built production tools that understand the rules, flow,
              and data of each sport.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              [
                "Sport-specific scoreboard overlays",
                "Automated clock and period management",
                "Team logo and colour auto-population",
              ],
              [
                "Player roster integration",
                "Event-driven graphic triggers",
                "Real-time stats overlays",
              ],
              [
                "Customisable lower-thirds",
                "Pre-built Fuse templates",
                "Data feed connectors",
              ],
            ].map((col, ci) => (
              <ul key={ci} className="flex flex-col gap-5">
                {col.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-[#FF504E]/40 bg-[#FF504E]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="#FF504E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[15px] text-[#94979c] leading-[1.6]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-6 pb-4 md:pb-6">
        <div className="max-w-[1920px] mx-auto">
          <div className="gradient-card rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 dot-grid pointer-events-none" />
            <div className="absolute inset-0 radial-mask pointer-events-none" />
            <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 py-10 md:py-16">
              <div className="max-w-[768px]">
                <h2 className="text-[30px] md:text-[36px] font-bold leading-[38px] md:leading-[44px] tracking-[-0.02em] text-[#F7F7F7] mb-5">
                  Don&apos;t see your sport?
                </h2>
                <p className="text-lg md:text-xl font-normal text-[#F7F7F7]/80 leading-[28px] md:leading-[30px] mb-8">
                  We&apos;re always adding new sports. Enterprise customers can
                  request custom sport configurations tailored to their exact
                  requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 border border-white text-[#F7F7F7] font-semibold px-[18px] py-3 rounded-lg text-base hover:bg-white/10 transition-colors shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)]"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#CECFD2"
                        strokeWidth="1.5"
                      />
                      <path d="M8.5 7.5l4 2.5-4 2.5V7.5z" fill="#CECFD2" />
                    </svg>
                    See it in action
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white text-[#FF504E] font-semibold px-[18px] py-3 rounded-lg text-base hover:bg-white/90 transition-colors shadow-[0_1px_2px_rgba(10,13,18,0.05),inset_0_0_0_1px_rgba(10,13,18,0.18),inset_0_-2px_0_rgba(10,13,18,0.05)]"
                  >
                    Request a sport
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
