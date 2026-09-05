// AssistantVideoPage — a pixel-recreation of the "FleetView Assistant" landing
// screen, built as a standalone full-screen route so it can be screen-recorded
// for a video (an After-Effects-style loop built in the browser instead).
// Renders over the app's own light theme/nav — it is not wired to real data.
//
// The centerpiece is the AI "thinking" indicator that appears after the user
// submits a prompt: a pill holding an orb + status text (Searching / Thinking
// / Working / Solving...) that vanishes and reappears as the status cycles.
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Sparkles,
  FolderKanban,
  MessageSquare,
  Users,
  Plug,
  Settings,
  Puzzle,
  Moon,
  Bell,
  Paperclip,
  Globe,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mic,
  ArrowUp,
  Activity,
  ClipboardList,
  ShieldAlert,
  Flag,
  ListChecks,
  TriangleAlert,
  X,
  Download,
  Share2,
  Cpu,
  CircuitBoard,
  Radio,
  Camera,
  Disc3,
  Fan,
  CheckCircle2,
  Clock3,
  Circle,
  type LucideIcon,
} from "lucide-react";

function OpenPlanLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 259 258"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="OpenPlan AI"
    >
      <g clipPath="url(#clip0_1_73)">
        <path
          d="M253.559 6.33138C252.017 4.59692 250.137 3.19598 248.034 2.21463L247.396 1.91685C244.69 0.6543 241.741 0 238.755 0H190.531C187.658 0 184.819 0.629769 182.215 1.84499C179.594 3.06807 177.275 4.8542 175.423 7.07608L174.698 7.94705C173.54 9.336 172.653 10.9292 172.081 12.6444C171.603 14.0785 171.352 15.5786 171.338 17.0903L170.877 65.0131C170.846 68.1804 170.176 71.309 168.907 74.2109C167.731 76.8968 166.064 79.3393 163.991 81.4123L163.829 81.5748C162.159 83.2451 160.258 84.6674 158.184 85.7984L156.987 86.4513C155.994 86.993 154.944 87.4232 153.856 87.734C152.486 88.1256 151.068 88.3242 149.642 88.3242H110.716C108.148 88.3242 105.599 87.8826 103.18 87.0188C100.7 86.133 98.3954 84.8169 96.3722 83.1309L96.1268 82.9264C94.1118 81.2472 92.3831 79.2516 91.0084 77.0177L90.4888 76.1735C89.4039 74.4104 88.5765 72.5014 88.0318 70.5042C87.5238 68.6414 87.2664 66.7193 87.2664 64.7885V19.1023C87.2664 16.6138 86.8083 14.1467 85.915 11.8241L85.7771 11.4655C85.013 9.47885 83.9047 7.64245 82.5031 6.04058L82.2379 5.73749C81.363 4.73762 80.3598 3.85776 79.2543 3.12078C78.2527 2.45303 77.1747 1.90763 76.0433 1.49624L75.3871 1.2576C73.0991 0.425606 70.6833 0 68.2487 0H18.028C15.9014 0 13.7944 0.405782 11.8199 1.19558C10.2949 1.80556 8.86821 2.63696 7.58568 3.66298L6.40918 4.60419C4.96751 5.75752 3.73128 7.14636 2.75277 8.71197C1.97884 9.95026 1.37403 11.2865 0.954435 12.6852L0.828315 13.1056C0.279047 14.9365 0 16.8377 0 18.7492V69.0338C0 70.9512 0.309117 72.856 0.915455 74.675C1.36135 76.0127 1.96428 77.2929 2.71161 78.4886L3.3558 79.5193C3.93745 80.4499 4.62287 81.3115 5.39889 82.0876C6.37827 83.0669 7.49291 83.9009 8.70884 84.5642L9.78274 85.1499C11.7107 86.2015 13.7945 86.9377 15.9552 87.3306C17.6524 87.6392 19.3816 87.7331 21.1022 87.6102L25.9155 87.2664L66.2223 88.2377C68.5918 88.2948 70.9253 88.8297 73.083 89.8105C74.771 90.5778 76.3272 91.6069 77.694 92.8598L78.8137 93.8862C80.9081 95.806 82.6654 98.0638 84.0124 100.565L84.3901 101.267C85.2458 102.856 85.8783 104.555 86.2699 106.317C86.5807 107.716 86.7375 109.145 86.7375 110.578V146.848C86.7375 148.375 86.5703 149.899 86.2389 151.39L86.2182 151.483C85.8606 153.092 85.3069 154.652 84.5696 156.126C83.9014 157.463 83.0867 158.721 82.1405 159.877L81.7056 160.409C79.7858 162.755 77.4751 164.753 74.8754 166.312L72.9175 167.487C71.5606 168.301 70.0906 168.91 68.5554 169.294C67.2831 169.612 65.9767 169.773 64.6652 169.773H19.4939C16.7517 169.773 14.0381 170.33 11.5176 171.41L11.204 171.544C9.0434 172.47 7.07931 173.8 5.41712 175.462C3.58902 177.29 2.16341 179.486 1.23533 181.899C0.419616 184.02 0 186.276 0 188.548V237.918C0 240.074 0.347521 242.215 1.02919 244.26L1.08534 244.429C1.76718 246.474 2.79189 248.389 4.11566 250.091L4.28831 250.313C5.30258 251.617 6.50059 252.767 7.84494 253.727C8.95761 254.522 10.1616 255.18 11.4312 255.688L11.555 255.738C13.7045 256.598 15.9983 257.039 18.3133 257.039H69.7086C71.5293 257.039 73.3382 256.746 75.0654 256.17L75.3508 256.075C76.5898 255.662 77.7682 255.086 78.8548 254.361C79.8748 253.681 80.8058 252.876 81.6259 251.965L82.9477 250.496C84.4029 248.879 85.533 246.997 86.2763 244.953C86.9316 243.151 87.2762 241.251 87.2954 239.333L87.7573 193.145C87.7824 190.63 88.2577 188.139 89.1606 185.792C90.0073 183.59 91.2178 181.547 92.7415 179.746L93.5146 178.832C95.3299 176.687 97.4979 174.867 99.9254 173.451L101.032 172.805C102.076 172.196 103.192 171.72 104.354 171.388C105.649 171.018 106.99 170.831 108.337 170.831H151.504C153.798 170.831 156.079 170.488 158.271 169.813L159.353 169.48C161 168.973 162.554 168.205 163.956 167.203C165.009 166.451 165.968 165.574 166.81 164.591L166.92 164.462C168.109 163.075 169.073 161.509 169.776 159.823L169.883 159.565C170.858 157.226 171.359 154.717 171.359 152.183V114.444C171.359 111.151 171.831 107.876 172.76 104.717L173.561 101.996C173.855 100.995 174.276 100.036 174.812 99.1413C175.329 98.2798 175.95 97.4849 176.66 96.7745L178.762 94.6729C180.517 92.9176 182.515 91.4229 184.694 90.2342L185.732 89.6682C186.725 89.1264 187.775 88.6962 188.863 88.3855C190.233 87.9939 191.651 87.7953 193.077 87.7953H237.538C239.945 87.7953 242.337 87.4072 244.621 86.6459L245.431 86.3758C247.854 85.5681 250.082 84.2634 251.972 82.5452C253.917 80.777 255.46 78.6116 256.495 76.1956L256.556 76.0536C257.573 73.681 258.097 71.1265 258.097 68.5452V18.551C258.097 16.0807 257.608 13.6348 256.658 11.3546L256.549 11.0938C255.823 9.35154 254.812 7.7421 253.559 6.33138Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_73">
          <rect width="258.097" height="257.039" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
import { ThinkingOrb, type OrbState } from "../components/ui/thinking-orbs";
import { VanishText } from "../components/ui/vanish-text";

// Scroll stays functional everywhere on this page; the browser's own
// scrollbar chrome never should — Firefox/IE via the standard properties,
// WebKit (Chrome/Safari) via its pseudo-element, targeted through Tailwind's
// arbitrary-variant syntax so no separate stylesheet is needed.
const NO_SCROLLBAR = "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

const USER_NAME = "John";

const SIDEBAR_ICONS = [
  { icon: LayoutGrid, active: false, label: "Dashboard" },
  { icon: Sparkles, active: true, label: "Assistant" },
  { icon: FolderKanban, active: false, label: "Projects" },
  { icon: MessageSquare, active: false, label: "Chat" },
  { icon: Users, active: false, label: "People" },
  { icon: Plug, active: false, label: "Integrations" },
  { icon: Settings, active: false, label: "Settings" },
];

const SUGGESTIONS = [
  { icon: Activity, text: "What's the status of High-Performance FPV Drone Development?" },
  { icon: ClipboardList, text: "Create a task in High-Performance FPV Drone Development and assign it to me, due Friday" },
  { icon: ShieldAlert, text: "What's blocking Electric Vehicle Charging Station?" },
  { icon: Flag, text: "Push Electric Vehicle Charging Station's next milestone out by a week" },
  { icon: ListChecks, text: "How's requirements coverage looking for Autonomous Agricultural Robot System (AgriBot-X1)?" },
  { icon: TriangleAlert, text: "Raise an issue in Autonomous Agricultural Robot System (AgriBot-X1) and assign it to me" },
];

// The AI "response body" pill cycles through these while it's working,
// each one a fresh vanish -> appear beat of the status text.
const THINKING_STATES: { label: string; orb: OrbState }[] = [
  { label: "Searching...", orb: "searching" },
  { label: "Thinking...", orb: "breathing" },
  { label: "Working...", orb: "working" },
  { label: "Solving...", orb: "solving" },
];
const THINKING_STATE_INTERVAL_MS = 1600;

// Document title bar with Download / Share actions, shown at the top of
// every card. Static chrome — not part of the typewriter reveal below.
function DocHeader({ title, onInvite }: { title: string; onInvite?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-[#1e1e24]">
      <h2 className="text-[16px] font-semibold text-white">{title}</h2>
      <div className="flex items-center gap-2 shrink-0">
        <button className="flex items-center gap-1.5 h-8 px-3 rounded-full border border-[#26262c] bg-[#1a1a1f] text-[12px] text-[#a8a8ae] hover:text-white hover:bg-[#202027] transition-colors">
          <Download size={13} />
          Download
        </button>
        <button
          onClick={onInvite}
          className="flex items-center gap-1.5 h-8 px-3 rounded-full border border-[#26262c] bg-[#1a1a1f] text-[12px] text-[#a8a8ae] hover:text-white hover:bg-[#202027] transition-colors"
        >
          <Users size={13} />
          Invite
        </button>
        <button className="flex items-center gap-1.5 h-8 px-3 rounded-full border border-[#26262c] bg-[#1a1a1f] text-[12px] text-[#a8a8ae] hover:text-white hover:bg-[#202027] transition-colors">
          <Share2 size={13} />
          Share
        </button>
      </div>
    </div>
  );
}

// --- Document content model -------------------------------------------
// The body of each card is data (not JSX) so the typewriter can compute a
// single running character budget across the whole document up front, then
// walk the same blocks twice: once to size things, once to render with
// however many characters are currently "typed".
type BomCardItem = {
  version: string;
  status: "Approved" | "Draft";
  name: string;
  partNumber: string;
  qty: string;
  unitPrice: string;
  manufacturer: string;
  leadTime: string;
  icon: LucideIcon;
  image?: string;
};

type ReqTreeLeaf = {
  type: "Subsystem" | "Component";
  id: string;
  label: string;
  status: "Approved" | "Reviewed" | "Draft";
  verification: "Passed" | "In Progress" | "Not Verified";
};
type ReqTreeBranch = { label: string; leaves: ReqTreeLeaf[] };
type ReqTreeData = { root: string; rootSub: string; branches: ReqTreeBranch[] };

type DocBlock =
  | { kind: "section"; heading: string; children: DocBlock[] }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "spec"; rows: { label: string; value: string }[] }
  | { kind: "bom"; rows: { item: string; qty: string; cost: string }[]; total: string }
  | { kind: "bomCards"; items: BomCardItem[]; total: string }
  | { kind: "reqTree"; data: ReqTreeData; weight: number };

function section(heading: string, children: DocBlock[]): DocBlock {
  return { kind: "section", heading, children };
}
function p(text: string): DocBlock {
  return { kind: "p", text };
}
function ul(items: string[]): DocBlock {
  return { kind: "ul", items };
}
function spec(rows: { label: string; value: string }[]): DocBlock {
  return { kind: "spec", rows };
}
function bomCards(items: BomCardItem[], total: string): DocBlock {
  return { kind: "bomCards", items, total };
}
// `weight` stands in for typing length in the reveal budget — the tree isn't
// typed character by character (it appears "completely done," all at once),
// but it still needs to occupy a proportional slice of the document's pacing
// rather than popping in instantly the moment the heading above it finishes.
function reqTree(data: ReqTreeData, weight = 480): DocBlock {
  return { kind: "reqTree", data, weight };
}

function blockHasReqTree(blocks: DocBlock[]): boolean {
  return blocks.some((b) => b.kind === "reqTree" || (b.kind === "section" && blockHasReqTree(b.children)));
}

// Sums the length of every piece of "typeable" text in a block tree, in the
// same order it will be rendered/typed.
function blockTextLength(blocks: DocBlock[]): number {
  return blocks.reduce((sum, b) => {
    switch (b.kind) {
      case "section":
        return sum + b.heading.length + blockTextLength(b.children);
      case "p":
        return sum + b.text.length;
      case "ul":
        return sum + b.items.reduce((s, i) => s + i.length, 0);
      case "spec":
        return sum + b.rows.reduce((s, r) => s + r.label.length + r.value.length, 0);
      case "bom":
        return (
          sum +
          b.rows.reduce((s, r) => s + r.item.length + r.qty.length + r.cost.length, 0) +
          b.total.length
        );
      case "bomCards":
        return (
          sum +
          b.items.reduce(
            (s, it) =>
              s +
              it.name.length +
              it.partNumber.length +
              it.qty.length +
              it.unitPrice.length +
              it.manufacturer.length +
              it.leadTime.length,
            0,
          ) +
          b.total.length
        );
      case "reqTree":
        return sum + b.weight;
    }
  }, 0);
}

const REQ_STATUS_STYLES: Record<ReqTreeLeaf["status"], string> = {
  Approved: "text-[#7fb2f0] bg-[#132a45]/70 border-[#1e3a5c]",
  Reviewed: "text-[#c79bf0] bg-[#2a1f3d]/70 border-[#3d2a54]",
  Draft: "text-[#a8a8ae] bg-[#1a1a1f] border-[#26262c]",
};

function ReqVerificationBadge({ v }: { v: ReqTreeLeaf["verification"] }) {
  if (v === "Passed")
    return (
      <span className="inline-flex items-center gap-1 text-[9.5px] text-[#7fd8a8]">
        <CheckCircle2 size={11} />
        Passed
      </span>
    );
  if (v === "In Progress")
    return (
      <span className="inline-flex items-center gap-1 text-[9.5px] text-[#e8b374]">
        <Clock3 size={11} />
        In Progress
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[9.5px] text-[#6b6b76]">
      <Circle size={11} />
      Not Verified
    </span>
  );
}

function ReqLeafCard({ leaf }: { leaf: ReqTreeLeaf }) {
  return (
    <div className="w-max min-w-[168px] shrink-0 rounded-lg border border-[#1e1e24] bg-[#111114] px-3.5 py-2.5 flex flex-col gap-1.5">
      <div className="flex items-center gap-2.5">
        <span
          className={`text-[9px] font-medium rounded-full px-1.5 py-0.5 border shrink-0 ${leaf.type === "Component"
            ? "text-[#7fd8a8] bg-[#123521]/60 border-[#1e5b39]"
            : "text-[#8fb8e8] bg-[#101d2e]/60 border-[#1c3654]"
            }`}
        >
          {leaf.type}
        </span>
        <span className="text-[9px] text-[#6b6b76] whitespace-nowrap">{leaf.id}</span>
      </div>
      <p className="text-[11px] font-medium text-[#e8e8ea] leading-snug whitespace-nowrap">{leaf.label}</p>
      <div className="flex items-center gap-2 pt-1.5 border-t border-[#1e1e24]">
        <span className={`text-[9.5px] rounded-full px-1.5 py-0.5 border shrink-0 ${REQ_STATUS_STYLES[leaf.status]}`}>
          {leaf.status}
        </span>
        <ReqVerificationBadge v={leaf.verification} />
      </div>
    </div>
  );
}

// One step in the tree's reveal sequence — either a branch label appearing,
// or a single leaf card appearing under whichever branch it belongs to.
type TreeStep = { kind: "branch"; bi: number } | { kind: "leaf"; bi: number; li: number };

function flattenTreeSteps(data: ReqTreeData): TreeStep[] {
  const steps: TreeStep[] = [];
  data.branches.forEach((branch, bi) => {
    steps.push({ kind: "branch", bi });
    branch.leaves.forEach((_, li) => steps.push({ kind: "leaf", bi, li }));
  });
  return steps;
}

// A point (in the tree container's own content coordinate space, not
// viewport space) that a connector line should touch.
type TreePoint = { x: number; y: number };
type TreeLine = { key: string; d: string };

// A "completely done" requirements mind map: the root node is there from the
// start, then branches and their leaf cards reveal one at a time — each with
// its own connector line drawn to it — auto-scrolling into view as they land,
// the same way the rest of the document's text keeps its typing caret in
// view. Node positions come from actual measured layout (getBoundingClientRect
// after each reveal), not precomputed arithmetic, so variable-height labels
// (a branch name that wraps to two lines, a long leaf title) can never
// overlap a neighbor — the flow just grows to fit, and the lines follow.
function RequirementTree({ data, onDone }: { data: ReqTreeData; onDone?: () => void }) {
  const steps = useMemo(() => flattenTreeSteps(data), [data]);
  const [revealCount, setRevealCount] = useState(0);
  const [lines, setLines] = useState<TreeLine[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const branchRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leafRefs = useRef<(HTMLDivElement | null)[][]>(data.branches.map(() => []));
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const firedDoneRef = useRef(false);

  // Reveal one step at a time — a branch label gets a slightly longer beat
  // (it's the start of a new group), a leaf card a shorter one.
  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    firedDoneRef.current = false;
    setRevealCount(0);

    const revealNext = (count: number) => {
      if (cancelled) return;
      setRevealCount(count);
      if (count >= steps.length) {
        if (!firedDoneRef.current) {
          firedDoneRef.current = true;
          timeouts.push(setTimeout(() => !cancelled && onDoneRef.current?.(), 300));
        }
        return;
      }
      const justShown = count > 0 ? steps[count - 1] : null;
      const delay = justShown?.kind === "branch" ? 380 : 220;
      timeouts.push(setTimeout(() => revealNext(count + 1), delay));
    };
    timeouts.push(setTimeout(() => revealNext(1), 320));

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [steps]);

  // Scroll whichever node just appeared into view — bubbles up through every
  // scrollable ancestor that needs it, including this tree's own horizontal
  // strip AND the document card's outer vertical scroll area, with no prop
  // drilling required.
  useEffect(() => {
    if (revealCount === 0) return;
    stepRefs.current[revealCount - 1]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [revealCount]);

  // Re-measure every visible node's connector anchor point after each reveal
  // (and on resize) and redraw the SVG overlay to match. All positions are
  // content-space (relative to the container's own scrolled content, not the
  // viewport), so the overlay scrolls in lockstep with the nodes it connects.
  useLayoutEffect(() => {
    const recompute = () => {
      const container = containerRef.current;
      if (!container) return;
      setSvgSize({ w: container.scrollWidth, h: container.scrollHeight });

      const point = (el: HTMLElement | null, side: "left" | "right"): TreePoint | null => {
        if (!el) return null;
        const containerRect = container.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        return {
          x: (side === "left" ? r.left : r.right) - containerRect.left + container.scrollLeft,
          y: r.top + r.height / 2 - containerRect.top + container.scrollTop,
        };
      };
      const curve = (a: TreePoint, b: TreePoint) => {
        const midX = (a.x + b.x) / 2;
        return `M${a.x},${a.y} C${midX},${a.y} ${midX},${b.y} ${b.x},${b.y}`;
      };

      const rootPt = point(rootRef.current, "right");
      const next: TreeLine[] = [];
      data.branches.forEach((branch, bi) => {
        const branchEl = branchRefs.current[bi];
        const branchLeftPt = point(branchEl, "left");
        if (rootPt && branchLeftPt) next.push({ key: `b${bi}`, d: curve(rootPt, branchLeftPt) });
        const branchRightPt = point(branchEl, "right");
        branch.leaves.forEach((_, li) => {
          const leafPt = point(leafRefs.current[bi]?.[li] ?? null, "left");
          if (branchRightPt && leafPt) next.push({ key: `b${bi}l${li}`, d: curve(branchRightPt, leafPt) });
        });
      });
      setLines(next);
    };

    recompute();
    const ro = new ResizeObserver(recompute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, [revealCount, data]);

  let stepIndex = -1;

  return (
    <div
      ref={containerRef}
      className={`req-tree-scroll relative rounded-xl border border-[#1e1e24] bg-[#0d0d10] p-4 overflow-x-auto ${NO_SCROLLBAR}`}
    >
      <svg
        width={svgSize.w}
        height={svgSize.h}
        className="absolute top-0 left-0 pointer-events-none overflow-visible"
      >
        {lines.map((l) => (
          <path key={l.key} d={l.d} stroke="#2a2a31" strokeWidth={1.5} fill="none" />
        ))}
      </svg>

      <div className="relative flex items-start gap-10 w-fit">
        <div ref={rootRef} className="shrink-0 w-[130px] self-center">
          <div className="rounded-xl border border-[#2a2a31] bg-[#16161b] px-3.5 py-3 text-center shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
            <p className="text-[12.5px] font-semibold text-white leading-snug">{data.root}</p>
            <p className="text-[10px] text-[#8b8b93] mt-1">{data.rootSub}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {data.branches.map((branch, bi) => {
            stepIndex += 1;
            const branchIdx = stepIndex;
            const branchVisible = revealCount > branchIdx;
            if (!branchVisible) {
              // Not revealed yet — advance past this branch's leaf indices too
              // (so later branches still get the right step numbers) without
              // rendering anything, so nothing below the current reveal point
              // reserves empty space ahead of time.
              stepIndex += branch.leaves.length;
              return null;
            }
            return (
              <div key={bi} className="flex items-start gap-4">
                <motion.div
                  ref={(el: HTMLDivElement | null) => {
                    branchRefs.current[bi] = el;
                    stepRefs.current[branchIdx] = el;
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-[128px] shrink-0 rounded-lg border border-[#3a2e1f] bg-[#241d12] px-3 py-2"
                >
                  <p className="text-[11.5px] font-semibold text-[#e8b374] leading-snug">{branch.label}</p>
                  <p className="text-[9.5px] text-[#8b8b93] mt-0.5">{branch.leaves.length} items</p>
                </motion.div>
                <div className="flex gap-2.5">
                  {branch.leaves.map((leaf, li) => {
                    stepIndex += 1;
                    const leafIdx = stepIndex;
                    const leafVisible = revealCount > leafIdx;
                    if (!leafVisible) return null;
                    return (
                      <motion.div
                        key={li}
                        ref={(el: HTMLDivElement | null) => {
                          if (!leafRefs.current[bi]) leafRefs.current[bi] = [];
                          leafRefs.current[bi][li] = el;
                          stepRefs.current[leafIdx] = el;
                        }}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ReqLeafCard leaf={leaf} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// A single typed span: purely a function of its own props (start + revealed)
// — no side effects during render. Shows text.slice(0, revealed - start) and
// draws a blinking caret exactly at the point where typing currently is.
//
// Offsets are computed separately, by walkBlocks below, and threaded in as
// plain props — NOT mutated here. Mutating a shared "cursor" object as a
// side effect inside a component's own render is exactly the kind of
// impure render React's StrictMode double-invokes to catch: each Typed
// instance would get called twice, incrementing a shared cursor twice, and
// every leaf after the first would end up with a wildly inflated offset —
// which is why text used to freeze partway through and never resume.
function Typed({ text, start, revealed }: { text: string; start: number; revealed: number }) {
  const shown = Math.max(0, Math.min(text.length, revealed - start));
  const isTypingHere = shown > 0 && shown < text.length;
  return (
    <>
      {text.slice(0, shown)}
      {isTypingHere && (
        <span
          data-typing-caret="true"
          className="inline-block w-[2px] h-[1em] -mb-[0.15em] ml-[1px] bg-[#e8e8ea] animate-pulse"
        />
      )}
    </>
  );
}

// Advances a plain (non-React) cursor object and returns the start offset
// for a piece of text. Called from renderBlocks — a plain function, invoked
// once per actual render, not a component React can double-invoke on its
// own — so this mutation is safe here even though it wouldn't be inside a
// component.
function consume(cursor: { pos: number }, length: number): number {
  const start = cursor.pos;
  cursor.pos += length;
  return start;
}

// The bill-of-materials horizontal strip, with left/right chevrons that only
// show up on whichever side actually has more to scroll to — measured live
// off the row's own scrollLeft/scrollWidth (via a scroll listener and a
// ResizeObserver, since the row's content width can't be known up front)
// rather than always shown regardless of whether there's anything to scroll.
function BomCardsRow({ cards, total }: { cards: ReactNode[]; total: ReactNode }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const updateEdges = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      ro.disconnect();
    };
  }, [cards.length]);

  const scrollBy = (dir: 1 | -1) => rowRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <div
          ref={rowRef}
          className={`bom-scroll-row flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 ${NO_SCROLLBAR}`}
        >
          {cards}
        </div>
        {canScrollLeft && (
          <button
            type="button"
            aria-label="Scroll components left"
            onClick={() => scrollBy(-1)}
            className="absolute left-1 top-0 h-[110px] flex items-center text-[#a8a8ae] hover:text-white transition-colors"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1a1a1f]/90 border border-[#26262c] shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              <ChevronLeft size={14} />
            </span>
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            aria-label="Scroll components right"
            onClick={() => scrollBy(1)}
            className="absolute right-1 top-0 h-[110px] flex items-center text-[#a8a8ae] hover:text-white transition-colors"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1a1a1f]/90 border border-[#26262c] shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              <ChevronRight size={14} />
            </span>
          </button>
        )}
      </div>
      {total}
    </div>
  );
}

type RenderBlocksCtx = { onTreeDone?: () => void };

function renderBlocks(
  blocks: DocBlock[],
  cursor: { pos: number },
  revealed: number,
  ctx?: RenderBlocksCtx,
): ReactNode {
  return blocks.map((b, i) => {
    switch (b.kind) {
      case "section":
        return (
          <div key={i} className="flex flex-col gap-2.5">
            <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[#8b8b93]">
              <Typed text={b.heading} start={consume(cursor, b.heading.length)} revealed={revealed} />
            </h3>
            {renderBlocks(b.children, cursor, revealed, ctx)}
          </div>
        );
      case "p":
        return (
          <p key={i} className="text-[13.5px] leading-relaxed text-[#c8c8cc]">
            <Typed text={b.text} start={consume(cursor, b.text.length)} revealed={revealed} />
          </p>
        );
      case "ul":
        return (
          <ul key={i} className="flex flex-col gap-2">
            {b.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-[#e8e8ea]">
                <span className="mt-[7px] w-1 h-1 rounded-full bg-[#6b6b76] shrink-0" />
                <span>
                  <Typed text={item} start={consume(cursor, item.length)} revealed={revealed} />
                </span>
              </li>
            ))}
          </ul>
        );
      case "spec":
        return (
          <dl
            key={i}
            className="rounded-xl border border-[#1e1e24] divide-y divide-[#1e1e24] overflow-hidden bg-[#0d0d10]"
          >
            {b.rows.map((row, j) => (
              <div key={j} className="flex items-center justify-between gap-4 px-3.5 py-2.5">
                <dt className="text-[12px] text-[#8b8b93]">
                  <Typed text={row.label} start={consume(cursor, row.label.length)} revealed={revealed} />
                </dt>
                <dd className="text-[12.5px] font-medium text-[#e8e8ea] text-right">
                  <Typed text={row.value} start={consume(cursor, row.value.length)} revealed={revealed} />
                </dd>
              </div>
            ))}
          </dl>
        );
      case "bom":
        return (
          <div key={i} className="rounded-xl border border-[#1e1e24] overflow-hidden bg-[#0d0d10]">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 px-3.5 py-2 text-[10.5px] font-semibold uppercase tracking-wide text-[#6b6b76] border-b border-[#1e1e24]">
              <span>Component</span>
              <span className="text-right">Qty</span>
              <span className="text-right">Cost</span>
            </div>
            <div className="divide-y divide-[#1e1e24]">
              {b.rows.map((row, j) => (
                <div key={j} className="grid grid-cols-[1fr_auto_auto] gap-x-3 px-3.5 py-2">
                  <span className="text-[12.5px] text-[#e8e8ea]">
                    <Typed text={row.item} start={consume(cursor, row.item.length)} revealed={revealed} />
                  </span>
                  <span className="text-[12.5px] text-[#8b8b93] text-right">
                    <Typed text={row.qty} start={consume(cursor, row.qty.length)} revealed={revealed} />
                  </span>
                  <span className="text-[12.5px] font-medium text-[#e8e8ea] text-right">
                    <Typed text={row.cost} start={consume(cursor, row.cost.length)} revealed={revealed} />
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 px-3.5 py-2.5 border-t border-[#1e1e24] bg-[#111114]">
              <span className="text-[12px] font-semibold text-[#c8c8cc]">Estimated total</span>
              <span />
              <span className="text-[12.5px] font-semibold text-[#e8e8ea] text-right">
                <Typed text={b.total} start={consume(cursor, b.total.length)} revealed={revealed} />
              </span>
            </div>
          </div>
        );
      case "bomCards": {
        const cards = b.items.map((it, j) => {
          const Icon = it.icon;
          const nameStart = consume(cursor, it.name.length);
          const partStart = consume(cursor, it.partNumber.length);
          const qtyStart = consume(cursor, it.qty.length);
          const priceStart = consume(cursor, it.unitPrice.length);
          const mfgStart = consume(cursor, it.manufacturer.length);
          const leadStart = consume(cursor, it.leadTime.length);
          return (
            <div
              key={j}
              className="shrink-0 w-[210px] rounded-xl border border-[#1e1e24] bg-[#0d0d10] overflow-hidden flex flex-col"
            >
              <div
                className={`relative h-[110px] flex items-center justify-center ${it.image ? "bg-[#f2f2f0]" : "bg-gradient-to-br from-[#1c1c22] to-[#101013]"
                  }`}
              >

                <span className="absolute top-2 left-2 text-[10px] font-semibold text-[#c8c8cc] bg-[#1a1a1f]/90 border border-[#26262c] rounded-full px-1.5 py-0.5">
                  {it.version}
                </span>
                <span
                  className={`absolute top-2 right-2 text-[10px] font-medium rounded-full px-1.5 py-0.5 border ${it.status === "Approved"
                    ? "text-[#7fd8a8] bg-[#123521]/80 border-[#1e5b39]"
                    : "text-[#a8a8ae] bg-[#1a1a1f]/90 border-[#26262c]"
                    }`}
                >
                  {it.status}
                </span>
                {it.image ? (
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-full h-full object-contain p-3"
                  />
                ) : (
                  <Icon size={34} className="text-[#5a5a63]" />
                )}
              </div>
              <div className="flex flex-col gap-2 px-3 py-3">
                <div>
                  <p className="text-[12.5px] font-medium text-white leading-snug">
                    <Typed text={it.name} start={nameStart} revealed={revealed} />
                  </p>
                  <p className="text-[10.5px] text-[#6b6b76] mt-0.5">
                    <Typed text={it.partNumber} start={partStart} revealed={revealed} />
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 pt-1 border-t border-[#1e1e24]">
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wide text-[#6b6b76]">Qty</p>
                    <p className="text-[11.5px] text-[#e8e8ea]">
                      <Typed text={it.qty} start={qtyStart} revealed={revealed} />
                    </p>
                  </div>
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wide text-[#6b6b76]">Unit price</p>
                    <p className="text-[11.5px] text-[#e8e8ea]">
                      <Typed text={it.unitPrice} start={priceStart} revealed={revealed} />
                    </p>
                  </div>
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wide text-[#6b6b76]">Manufacturer</p>
                    <p className="text-[11.5px] text-[#e8e8ea] truncate">
                      <Typed text={it.manufacturer} start={mfgStart} revealed={revealed} />
                    </p>
                  </div>
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wide text-[#6b6b76]">Lead time</p>
                    <p className="text-[11.5px] text-[#e8e8ea]">
                      <Typed text={it.leadTime} start={leadStart} revealed={revealed} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        });
        return (
          <BomCardsRow
            key={i}
            cards={cards}
            total={
              <div className="flex items-center justify-between rounded-xl border border-[#1e1e24] bg-[#111114] px-3.5 py-2.5">
                <span className="text-[12px] font-semibold text-[#c8c8cc]">Estimated total</span>
                <span className="text-[12.5px] font-semibold text-[#e8e8ea]">
                  <Typed text={b.total} start={consume(cursor, b.total.length)} revealed={revealed} />
                </span>
              </div>
            }
          />
        );
      }
      case "reqTree": {
        const start = consume(cursor, b.weight);
        // Unlike the rest of the document, the tree doesn't type itself out
        // character by character — it waits its turn in the reveal sequence
        // like everything else, but once it starts it runs its own node-by-
        // node reveal animation and reports back via onTreeDone when that's
        // actually finished, so the card doesn't reset scroll/shimmer while
        // the tree is still mid-animation.
        if (revealed <= start) return <div key={i} />;
        return (
          <div key={i}>
            <RequirementTree data={b.data} onDone={ctx?.onTreeDone} />
          </div>
        );
      }
    }
  });
}

// Fast typewriter: reveals characters based on real elapsed time (not a
// fixed per-tick increment), so it can't get stuck — if the tab is
// backgrounded and the browser throttles setInterval to ~1 tick/sec, the
// next tick just jumps straight to wherever it should be by now instead of
// crawling forever. Flags done once every character has landed, so the card
// can play its "complete" shimmer once, instead of fading everything in
// together.
const TYPE_TICK_MS = 16;
const TYPE_CHARS_PER_SEC = 190;

function useTypewriter(totalLength: number, enabled: boolean) {
  const [revealed, setRevealed] = useState(enabled ? 0 : totalLength);
  const [done, setDone] = useState(!enabled || totalLength === 0);

  useEffect(() => {
    if (!enabled || totalLength === 0) return;
    const startedAt = performance.now();
    const id = setInterval(() => {
      const elapsedMs = performance.now() - startedAt;
      const target = Math.min(totalLength, Math.floor((elapsedMs / 1000) * TYPE_CHARS_PER_SEC));
      setRevealed(target);
      if (target >= totalLength) clearInterval(id);
    }, TYPE_TICK_MS);
    return () => clearInterval(id);
  }, [totalLength, enabled]);

  useEffect(() => {
    if (enabled && revealed >= totalLength && totalLength > 0) setDone(true);
  }, [enabled, revealed, totalLength]);

  return { revealed, done };
}

// A diagonal shimmer band sweeps top-left -> bottom-right across the
// document body once, right after typing finishes — the "this card is
// complete" beat.
function CompletionShimmer({ play }: { play: boolean }) {
  return (
    <AnimatePresence>
      {play && (
        <motion.div
          key="shimmer"
          className="pointer-events-none absolute -inset-[40%]"
          style={{
            background:
              "linear-gradient(135deg, transparent 42%, rgba(255,255,255,0.18) 50%, transparent 58%)",
          }}
          initial={{ x: "-60%", y: "-60%" }}
          animate={{ x: "60%", y: "60%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}

// The three documents the AI sends in sequence. Only the final one carries a
// follow-up question — the earlier ones just deliver their content and move
// on, like a real multi-step agent run.
const AI_TURNS: { title: string; blocks: DocBlock[] }[] = [
  {
    title: "Requirement Document",
    blocks: [
      section("Overview", [
        p(
          "This document captures the preliminary requirements for a last-mile delivery drone with a 10km one-way operating range, based on the brief provided.",
        ),
      ]),
      section("Requirements Breakdown", [
        reqTree({
          root: "Delivery Drone",
          rootSub: "10km range · 2.5kg payload",
          branches: [
            {
              label: "Airframe & Propulsion",
              leaves: [
                { type: "Subsystem", id: "ARP-001", label: "Quad-rotor frame", status: "Approved", verification: "Passed" },
                { type: "Subsystem", id: "ARP-002", label: "Propeller sizing", status: "Approved", verification: "Passed" },
              ],
            },
            {
              label: "Power System",
              leaves: [
                { type: "Subsystem", id: "PWR-001", label: "Swappable battery bay", status: "Approved", verification: "In Progress" },
                { type: "Subsystem", id: "PWR-002", label: "Power distribution", status: "Reviewed", verification: "Passed" },
                { type: "Component", id: "PWR-011", label: "Battery swap latch", status: "Draft", verification: "Not Verified" },
                { type: "Component", id: "PWR-012", label: "Charge controller", status: "Draft", verification: "Not Verified" },
              ],
            },
            {
              label: "Avionics & Navigation",
              leaves: [
                { type: "Subsystem", id: "AVN-001", label: "Flight controller (F7)", status: "Approved", verification: "Passed" },
                { type: "Subsystem", id: "AVN-002", label: "GPS + IMU redundancy", status: "Reviewed", verification: "In Progress" },
                { type: "Component", id: "AVN-011", label: "Telemetry link (915MHz)", status: "Draft", verification: "Not Verified" },
              ],
            },
            {
              label: "Payload & Delivery",
              leaves: [
                { type: "Subsystem", id: "PLD-001", label: "Payload bay (2.5kg)", status: "Approved", verification: "Passed" },
                { type: "Subsystem", id: "PLD-002", label: "Release mechanism", status: "Approved", verification: "In Progress" },
              ],
            },
            {
              label: "Autonomy & Safety",
              leaves: [
                { type: "Subsystem", id: "SAF-001", label: "Obstacle avoidance", status: "Reviewed", verification: "In Progress" },
                { type: "Subsystem", id: "SAF-002", label: "Return-to-home failsafe", status: "Approved", verification: "Passed" },
                { type: "Component", id: "SAF-011", label: "Geofencing", status: "Draft", verification: "Not Verified" },
                { type: "Component", id: "SAF-012", label: "Collision alert system", status: "Draft", verification: "Not Verified" },
              ],
            },
            {
              label: "Ground Ops & Compliance",
              leaves: [
                { type: "Subsystem", id: "GND-001", label: "Charging dock interface", status: "Draft", verification: "Not Verified" },
                { type: "Subsystem", id: "GND-002", label: "Remote ID broadcast", status: "Reviewed", verification: "Passed" },
                { type: "Subsystem", id: "GND-003", label: "Firmware OTA updates", status: "Draft", verification: "Not Verified" },
              ],
            },
          ],
        }),
      ]),
    ],
  },
  {
    title: "Build Plan & Bill of Materials",
    blocks: [
      section("Bill of Materials", [
        bomCards(
          [
            {
              version: "1.0",
              status: "Approved",
              name: "Carbon-fiber frame kit",
              partNumber: "CMP-0405-001",
              qty: "1 EA",
              unitPrice: "$180.00",
              manufacturer: "TrueRC",
              leadTime: "—",
              icon: CircuitBoard,
              image: "/assets/bom/carbon-fibre-frame-kit.webp",
            },
            {
              version: "2.0",
              status: "Draft",
              name: "Brushless motors (2212, 920KV)",
              partNumber: "CMP-MOT-001",
              qty: "4 EA",
              unitPrice: "$96.00",
              manufacturer: "RCINPower",
              leadTime: "—",
              icon: Fan,
              image: "/assets/bom/motor.png",
            },
            {
              version: "3.0",
              status: "Draft",
              name: "Flight controller (F7)",
              partNumber: "CMP-FC-001",
              qty: "1 EA",
              unitPrice: "$65.00",
              manufacturer: "SpeedyBee",
              leadTime: "—",
              icon: Cpu,
              image: "/assets/bom/flight-controller.png",
            },
            {
              version: "4.0",
              status: "Draft",
              name: "GPS module",
              partNumber: "CMP-GPS-001",
              qty: "1 EA",
              unitPrice: "$28.00",
              manufacturer: "RadioMaster",
              leadTime: "—",
              icon: Radio,
              image: "/assets/bom/gps-module.jpg",
            },
            {
              version: "5.0",
              status: "Draft",
              name: "LiPo battery (6S 10,000mAh, swappable)",
              partNumber: "CMP-BAT-001",
              qty: "2 EA",
              unitPrice: "$220.00",
              manufacturer: "Tattu",
              leadTime: "—",
              icon: CircuitBoard,
              image: "/assets/bom/lipi-battery-swappable.jpeg",
            },
            {
              version: "6.0",
              status: "Draft",
              name: "ESCs (40A)",
              partNumber: "CMP-055A-001",
              qty: "4 EA",
              unitPrice: "$52.00",
              manufacturer: "SpeedyBee",
              leadTime: "—",
              icon: Cpu,
              image: "/assets/bom/esc.png",
            },
            {
              version: "7.0",
              status: "Draft",
              name: "Payload release mechanism",
              partNumber: "CMP-PLD-001",
              qty: "1 EA",
              unitPrice: "$45.00",
              manufacturer: "DJI",
              leadTime: "—",
              icon: Camera,
              image: "/assets/bom/payload-release-mechanism.webp",
            },
            {
              version: "8.0",
              status: "Draft",
              name: "Propellers (15in, pair)",
              partNumber: "CMP-PROP-001",
              qty: "2 EA",
              unitPrice: "$18.00",
              manufacturer: "HQProp",
              leadTime: "—",
              icon: Disc3,
              image: "/assets/bom/propeller.png",
            },
          ],
          "$704",
        ),
      ]),
      section("Timeline & Cost Summary", [
        spec([
          { label: "Total build time", value: "8 days" },
          { label: "Estimated total cost", value: "$704" },
          { label: "Target first flight", value: "Day 9" },
        ]),
      ]),
    ],
  },
  {
    title: "Engineering Change Notice",
    blocks: [
      section("Summary of Changes", [
        p(
          "A few engineering changes from the initial concept, made during the planning pass above. These refine the airframe, power, and avionics decisions to better match the 10km range and 2.5kg payload targets.",
        ),
      ]),
      section("Reason for Change", [
        p(
          "Bench testing of the original single-battery layout showed unacceptable turnaround time between deliveries, and the stock flight controller lacked the sensor redundancy needed for reliable autonomous operation over suburban routes.",
        ),
      ]),
      section("Change Log", [
        ul([
          "Switched to swappable battery packs for faster turnaround between deliveries",
          "Upgraded to an F7 flight controller for redundant IMU and better autonomy support",
          "Added a payload release mechanism rated for 2.5kg",
          "Increased frame arm length by 12% for prop clearance with the larger payload bay",
          "Revised propeller guard geometry, reducing aerodynamic drag by an estimated 6%",
          "Added a secondary GPS antenna for improved signal lock in dense urban canyons",
        ]),
      ]),
      section("Affected Subsystems", [
        spec([
          { label: "Airframe", value: "Arm length, propeller guards" },
          { label: "Power system", value: "Battery mount, swap mechanism" },
          { label: "Avionics", value: "Flight controller, GPS antenna" },
          { label: "Payload bay", value: "Release mechanism, bay liner" },
        ]),
      ]),
      section("Verification & Testing", [
        ul([
          "Bench test: payload release mechanism cycled 200x under rated 2.5kg load",
          "Static thrust test: confirmed prop clearance at full arm deflection",
          "Bench test: battery swap timed at under 90 seconds across 10 trials",
          "Flight test: 3 test flights at 8km range to validate GPS lock and IMU redundancy",
        ]),
      ]),
      section("Impact Assessment", [
        p(
          "These changes increase unit cost by roughly 4%, but improve payload margin and cut estimated turnaround time between deliveries by about 35%.",
        ),
      ]),
      section("Approval & Rollout", [
        spec([
          { label: "Change ID", value: "ECN-2026-0142" },
          { label: "Status", value: "Pending review" },
          { label: "Effective date", value: "Upon approval" },
        ]),
      ]),
      p("Want me to open these as tasks in the project?"),
    ],
  },
];

// The settled document card. A fixed height (rather than sizing to content)
// keeps every card in the stack the same height, so a shorter front card
// never lets a taller one behind it peek out below — long content just
// scrolls within the card instead. The body types itself out fast, then
// plays a one-shot shimmer sweep once every character has landed.
// How long the completion shimmer takes to sweep across — kept in sync with
// CompletionShimmer's own transition duration below.
const SHIMMER_DURATION_MS = 800;

function AITurnBox({
  title,
  blocks,
  instant,
  isFront,
  layoutId,
  onSettled,
  onInvite,
}: {
  title: string;
  blocks: DocBlock[];
  instant?: boolean;
  // Whether this card is currently the frontmost one in the stack. Typing
  // itself only ever happens on the front card, but a card can also be
  // *revisited* — scrolled back to the front again after already finishing —
  // and it should land back at the top every time that happens, not wherever
  // its scroll last happened to be left.
  isFront?: boolean;
  // When set, this card's own box (not its outer stack-position wrapper)
  // shares a Framer layoutId with the thinking pill it grew out of, so it
  // morphs shape from that pill instead of using the usual rise-from-below
  // entrance. Only the very first card in a conversation uses this.
  layoutId?: string;
  onSettled?: () => void;
  onInvite?: () => void;
}) {
  const totalLength = useMemo(() => blockTextLength(blocks), [blocks]);
  const { revealed, done } = useTypewriter(totalLength, !instant);
  const cursor = { pos: 0 };
  const scrollRef = useRef<HTMLDivElement>(null);
  // Gates the shimmer separately from `done`: typing finishes, we scroll
  // back to the top first, and only once that's settled does the shimmer
  // actually play — so it always sweeps the document from the top, not
  // wherever the follow-scroll left off.
  const [shimmerReady, setShimmerReady] = useState(false);
  // The completion shimmer is a one-shot effect — without this guard,
  // scrolling back to revisit an already-finished card (isFront flipping
  // true again) would replay it every time.
  const hasPlayedShimmerRef = useRef(false);
  // A requirements tree runs its own node-by-node reveal animation, separate
  // from the character-based typewriter above — the card shouldn't reset
  // scroll/fire the shimmer just because the *text* budget ran out while the
  // tree is still mid-animation. Defaults to already-done for every document
  // that doesn't have one.
  const hasTree = useMemo(() => blockHasReqTree(blocks), [blocks]);
  const [treeDone, setTreeDone] = useState(!hasTree);

  // Every new card gets a fresh scroll position at the top — explicit so
  // it doesn't depend on incidental DOM defaults or the follow-effect below
  // catching up in time.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  // Keep the currently-typing line in view while typing is still going.
  // renderBlocks lays out every block's full skeleton up front — bullets,
  // spec rows, bom cards — and only the text within each one is partial, so
  // the container's scrollHeight is already at its final size from the very
  // first frame. Jumping to scrollHeight (the actual bottom of that already-
  // full-height skeleton) would immediately hide everything typed so far
  // above the fold instead of following it, so scroll only the caret itself
  // into view — the minimum nudge needed to keep pace with typing.
  useEffect(() => {
    if (done) return;
    const el = scrollRef.current;
    if (!el) return;
    const caret = el.querySelector('[data-typing-caret="true"]');
    caret?.scrollIntoView({ block: "nearest" });
  }, [revealed, done]);

  // Once typing finishes AND (if this document has one) the requirements
  // tree has finished its own reveal animation — or whenever this card
  // becomes the front card again after already finishing — scroll back to
  // the top. A single rAF-deferred follow-up covers content (like the
  // bill-of-materials images) that finishes laying out a frame late and
  // would otherwise nudge scrollHeight/scrollTop again right after this runs.
  useEffect(() => {
    if (!done || !treeDone) return;
    const el = scrollRef.current;
    if (!el) return;
    // Typing the bill-of-materials cards drags their own horizontal row
    // along with it (the caret's scrollIntoView follows it card by card), and
    // the requirements tree's own reveal animation does the same to its
    // horizontal strip — both are left scrolled over to whichever card/node
    // was last revealed instead of back at the start once things finish.
    const resetScrolls = () => {
      el.scrollTop = 0;
      el.querySelectorAll<HTMLDivElement>(".bom-scroll-row, .req-tree-scroll").forEach((row) => {
        row.scrollLeft = 0;
      });
    };
    resetScrolls();
    const raf = requestAnimationFrame(resetScrolls);
    if (isFront && !hasPlayedShimmerRef.current) {
      hasPlayedShimmerRef.current = true;
      const id = setTimeout(() => setShimmerReady(true), 60);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(id);
      };
    }
    return () => cancelAnimationFrame(raf);
  }, [done, treeDone, isFront]);

  // Let the completion shimmer actually play out before telling the parent
  // this card is "settled" — the next turn's thinking pill shouldn't
  // appear until the shimmer has swept through.
  useEffect(() => {
    if (!shimmerReady || !onSettled) return;
    const id = setTimeout(onSettled, SHIMMER_DURATION_MS + 100);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shimmerReady]);

  return (
    <motion.div
      layoutId={layoutId}
      // Must match the pill's own transition exactly (see ThinkingPill) —
      // mismatched timing/easing on the two ends of a shared layoutId morph
      // is what made it read as "grow, then jump" instead of one continuous
      // motion: Framer was blending an outgoing tween against an incoming
      // default spring.
      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
      className="relative w-full h-[63vh] rounded-3xl border border-[#1e1e24] bg-[#111114] px-5 sm:px-6 py-5 sm:py-6 overflow-hidden flex flex-col"
    >
      <DocHeader title={title} onInvite={onInvite} />
      <div ref={scrollRef} className={`flex-1 min-h-0 overflow-y-auto pr-1 ${NO_SCROLLBAR}`}>
        <div className="flex flex-col gap-5 pb-1">
          {renderBlocks(blocks, cursor, revealed, { onTreeDone: () => setTreeDone(true) })}
        </div>
      </div>
      <CompletionShimmer play={shimmerReady} />
    </motion.div>
  );
}

// The small floating "Searching / Thinking / Working / Solving..." pill. For
// the first turn it's rendered inline in the content flow (no card exists
// yet); for every turn after that it's pinned in the footer, right above the
// input box, instead of living inside the card stack. A fresh instance is
// mounted per turn (keyed by the caller), so its cycling always restarts
// clean.
function ThinkingPill({ layoutId, hideContent }: { layoutId?: string; hideContent?: boolean }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % THINKING_STATES.length),
      THINKING_STATE_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  const current = THINKING_STATES[idx];

  return (
    <motion.div
      layoutId={layoutId}
      // When this pill shares a layoutId (the very first turn), size is
      // owned entirely by Framer's layout projection as it morphs into the
      // card — a manual `scale` here would compound on top of that and read
      // as an extra, separate "growing" beat right before the morph proper.
      // Every other pill (no layoutId) keeps the small pop-in/out scale.
      initial={layoutId ? { opacity: 0, y: 8 } : { opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={layoutId ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
      className="mx-auto inline-flex w-fit items-center gap-2.5 rounded-full border border-[#1e1e24] bg-[#111114] px-4 py-2.5"
    >
      {/* Kept separate from the outer box's own layoutId animation: when the
          pill is about to morph into the card, this inner content fades+
          blurs out on its own first, so the icon/text are already gone
          before the shape starts growing instead of stretching along with
          it. */}
      <motion.div
        className="flex items-center gap-2.5"
        animate={{ opacity: hideContent ? 0 : 1, filter: hideContent ? "blur(6px)" : "blur(0px)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <span className="shrink-0 -ml-0.5 flex items-center justify-center [&_canvas]:!size-[18px]">
          <ThinkingOrb state={current.orb} size={20} theme="dark" />
        </span>
        <span className="text-[13.5px] text-[#c8c8cc]">
          <VanishText text={current.label} cycleKey={idx} />
        </span>
      </motion.div>
    </motion.div>
  );
}

type InviteMember = { name: string; role: string; you?: boolean; avatar?: string; initial: string };

// Ordered oldest -> newest added; the header cluster shows the most recently
// added four (see InviteTrigger) with a "+N" for however many earlier
// members that leaves out, same as the reference widget's collapsed pill.
const INVITE_MEMBERS: InviteMember[] = [
  { name: "John", role: "Owner", you: true, avatar: "/assets/profile.jpg", initial: "J" },
  { name: "Noah", role: "Editor", avatar: "/assets/collaborators/noah.jpg", initial: "N" },
  { name: "Mariana", role: "Editor", avatar: "/assets/collaborators/mariana.jpg", initial: "M" },
  { name: "Jonathan", role: "Editor", avatar: "/assets/collaborators/jonathan.jpg", initial: "J" },
  { name: "Ana", role: "Viewer", avatar: "/assets/collaborators/ana.jpg", initial: "A" },
  { name: "Marcus", role: "Viewer", avatar: "/assets/collaborators/marcus.jpg", initial: "M" },
];

// Both the header trigger and the expanded panel below share this layoutId —
// the same shape-morph technique used for the first reply card growing out
// of its thinking pill. Framer measures the trigger's rect right before it
// unmounts and the panel's rect right after it mounts (both changes land in
// the same commit, driven by the one `inviteOpen` flip) and interpolates
// size, position, and border-radius between them, so the small round icon
// button visibly grows into the full panel instead of the two just
// crossfading in place.
const INVITE_LAYOUT_ID = "invite-panel";

// The header's collapsed state: just the round icon button. Swapped out for
// an invisible same-size placeholder while the panel is open, so the header
// doesn't reflow when this unmounts.
// A cluster of overlapping collaborator avatars in a pill, chevron at the
// end — the collapsed state a viewer actually recognizes as "who's on this,
// click to manage" rather than a bare chevron with no context.
function InviteTrigger({ onOpen }: { onOpen: () => void }) {
  const shown = INVITE_MEMBERS.slice(-4);
  const extra = INVITE_MEMBERS.length - shown.length;
  return (
    <motion.button
      layoutId={INVITE_LAYOUT_ID}
      onClick={onOpen}
      title="Invite"
      className="flex items-center h-9 pl-1.5 pr-2.5 gap-1.5 rounded-full border border-[#26262c] bg-[#151519] hover:bg-[#1c1c22] transition-colors"
    >
      <div className="flex items-center -space-x-2">
        {shown.map((m) => (
          <span
            key={m.name}
            className="block h-[26px] w-[26px] shrink-0 rounded-full ring-2 ring-[#151519] overflow-hidden"
          >
            {m.avatar ? (
              <img src={m.avatar} alt={m.name} className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#6d6aff] to-[#3fc2ac] text-[10px] font-semibold text-white">
                {m.initial}
              </span>
            )}
          </span>
        ))}
      </div>
      {extra > 0 && <span className="text-[12px] font-medium text-[#c8c8cc]">+{extra}</span>}
      <ChevronDown size={14} className="text-[#8b8b93]" />
    </motion.button>
  );
}

// The expanded state of that same morphing element — a centered dark panel
// styled to match the rest of this page (AITurnBox's borders/backgrounds),
// carrying the invite-by-email row and member list from the reference design
// plus a primary "Invite Now" CTA in the spirit of the reference widget's
// own bottom action button.
const INVITE_AUTO_TYPE_EMAIL = "lucy@openplanai.com";

function InvitePanel({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const hasAutoTypedRef = useRef(false);
  const autoTypeTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => autoTypeTimeouts.current.forEach(clearTimeout);
  }, []);

  // Scripted for video capture, same as the main composer's auto-type:
  // clicking (or focusing) the empty field types the sample address into it
  // on its own, once, rather than sitting there waiting for real input.
  const startEmailAutoType = () => {
    if (hasAutoTypedRef.current || email) return;
    hasAutoTypedRef.current = true;
    const typeChar = (i: number) => {
      setEmail(INVITE_AUTO_TYPE_EMAIL.slice(0, i));
      if (i < INVITE_AUTO_TYPE_EMAIL.length) {
        autoTypeTimeouts.current.push(setTimeout(() => typeChar(i + 1), AUTO_TYPE_CHAR_MS));
      }
    };
    typeChar(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={INVITE_LAYOUT_ID}
        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[380px] rounded-[24px] border border-[#1e1e24] bg-[#111114] shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <div className="relative flex items-center justify-center px-5 pt-4 pb-3 border-b border-[#1e1e24]">
          <h2 className="text-[15px] font-semibold text-white">Invite</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-[#6b6b76] hover:bg-[#1c1c22] hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-5 pt-4 flex items-center gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={startEmailAutoType}
            onFocus={startEmailAutoType}
            placeholder="Who else is in?"
            className="h-10 flex-1 min-w-0 rounded-full border border-[#26262c] bg-[#0d0d10] px-4 text-[13px] text-[#e8e8ea] placeholder:text-[#6b6b76] outline-none focus:border-[#3a3a42] transition-colors"
          />
          <button
            type="button"
            onClick={() => setEmail("")}
            className="group relative h-10 shrink-0 rounded-full overflow-hidden bg-[#1a1a1f] border border-[#26262c] transition-colors"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-90 blur transition-opacity duration-500" />
            <span className="relative flex items-center px-4 text-[13px] font-medium text-[#c8c8cc] group-hover:text-white transition-colors">
              Add
            </span>
          </button>
        </div>
        <p className="px-5 pt-2 text-[11px] text-[#6b6b76]">They'll get an email invite to join this project.</p>

        <div className="px-5 pt-4 pb-5 flex flex-col gap-3.5">
          {INVITE_MEMBERS.map((m, idx) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.06, duration: 0.3 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {m.avatar ? (
                  <img src={m.avatar} alt={m.name} className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#6d6aff] to-[#3fc2ac] text-[12px] font-semibold text-white">
                    {m.initial}
                  </div>
                )}
                <span className="text-[13.5px] font-medium text-[#e8e8ea]">
                  {m.name}
                  {m.you && <span className="text-[#6b6b76] font-normal"> (You)</span>}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[12.5px] text-[#8b8b93]">
                {m.role}
                <ChevronDown size={14} className="text-[#6b6b76]" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

type ChatMessage = { id: string; text: string };

// Scripted for video capture: clicking the idle-screen input types this out
// on its own, then pauses so the finished prompt is readable, then
// auto-submits into the AI response screen.
const AUTO_TYPE_TEXT =
  "Build a delivery drone for last-mile logistics with operating range of 10km";
const AUTO_TYPE_CHAR_MS = 45;
const THINKING_WAIT_MS = 5000; // each thinking pill iterates for ~5s before its card appears
const AI_TURN_GAP_MS = 400; // brief pause after a card finishes typing+shimmer, before the next pill appears
// How long before the first pill morphs into the card its own contents (icon
// + text) get to fade+blur out — so they're already gone by the time the
// shape starts growing, instead of stretching along with it.
const PILL_CONTENT_FADE_MS = 220;

export default function AssistantVideoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  // Indices into AI_TURNS whose card has been added to the stack (started
  // typing — not necessarily finished yet).
  const [doneTurns, setDoneTurns] = useState<number[]>([]);
  // Which turn's pill is currently iterating (inline for the first turn,
  // pinned above the input after that) — or null if none is active.
  const [thinkingTurn, setThinkingTurn] = useState<number | null>(null);
  // True for the brief window, right before the first pill morphs into its
  // card, where the pill's own icon+text are fading out — see PILL_CONTENT_FADE_MS.
  const [pillContentHidden, setPillContentHidden] = useState(false);
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  // True once every AI turn has finished appearing, typing itself out, and
  // settling — from then on the stack stops auto-advancing and hands control
  // to the user, who can scroll back through the earlier documents.
  const [allSettled, setAllSettled] = useState(false);
  // Index into `doneTurns` of the card currently pinned to the front of the
  // stack. Tracks the newest turn until `allSettled`, at which point the
  // wheel handler below takes over.
  const [focusedPos, setFocusedPos] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const lastWheelStepAt = useRef(0);
  const autoTypeTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const turnTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const started = messages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, doneTurns, thinkingTurn]);

  // While the conversation is still playing out, the front card is always
  // whichever one is newest — derived at render time rather than synced via
  // an effect, so a brand-new card's very first render already has depth 0.
  // (An effect-based sync landed one render late: the new card would mount
  // with the *previous* focusedPos still in state, putting it at depth -1 —
  // the "already scrolled past" position — for a frame, which hijacked its
  // entrance animation into sliding down from above instead of up from
  // below.) Once settled, the wheel handler below takes over via state.
  const effectiveFocusedPos = allSettled ? focusedPos : Math.max(0, doneTurns.length - 1);

  // Once settled, a wheel gesture over the *empty area around* the stack
  // steps the focused card forward/backward — like flipping through a stack
  // of papers one at a time. A gesture that starts on the front card itself
  // is left alone so it can scroll that card's own content (or the
  // horizontal bill-of-materials row inside it) normally — otherwise the two
  // scroll behaviors fight over the same gesture. Attached as a native,
  // non-passive listener (on the whole scrollable pane, not just the narrow
  // card column) so preventDefault actually stops the page from scrolling
  // too, and so the wide margins beside the card also count as "empty area".
  useEffect(() => {
    if (!allSettled) return;
    const el = paneRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (doneTurns.length <= 1 || e.deltaY === 0) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-stack-front="true"]')) return;
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelStepAt.current < 350) return;
      lastWheelStepAt.current = now;
      const dir = e.deltaY > 0 ? 1 : -1;
      setFocusedPos((prev) => Math.max(0, Math.min(doneTurns.length - 1, prev + dir)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [allSettled, doneTurns.length]);

  // Cancel any in-flight timers on unmount.
  useEffect(() => {
    return () => {
      autoTypeTimeouts.current.forEach(clearTimeout);
      turnTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  // Shows turn i's thinking pill, lets it iterate for ~5s, then adds that
  // turn's card to the stack (it starts typing itself out immediately).
  // Advancing to turn i+1 is NOT scheduled here — the card calls
  // handleCardSettled once its own typing + completion shimmer have
  // actually finished, and THAT triggers the next pill.
  const startTurn = (i: number) => {
    if (i >= AI_TURNS.length) return;
    setThinkingTurn(i);
    setPillContentHidden(false);
    // Only the first turn's pill shares a layoutId and morphs into a card —
    // give its contents a head start fading out so the shape-morph starts on
    // an empty pill instead of visibly stretching the icon/text with it.
    if (i === 0) {
      const fadeId = setTimeout(
        () => setPillContentHidden(true),
        THINKING_WAIT_MS - PILL_CONTENT_FADE_MS,
      );
      turnTimeouts.current.push(fadeId);
    }
    const id = setTimeout(() => {
      setThinkingTurn(null);
      setDoneTurns((prev) => [...prev, i]);
    }, THINKING_WAIT_MS);
    turnTimeouts.current.push(id);
  };

  const handleCardSettled = (i: number) => {
    if (i + 1 >= AI_TURNS.length) {
      // Hand off from the derived auto-follow position to the user-
      // controlled one at the exact same spot, so nothing jumps.
      setFocusedPos(doneTurns.length - 1);
      setAllSettled(true);
      return;
    }
    const id = setTimeout(() => startTurn(i + 1), AI_TURN_GAP_MS);
    turnTimeouts.current.push(id);
  };

  const handleSend = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), text: value }]);
    setInput("");
    turnTimeouts.current.forEach(clearTimeout);
    turnTimeouts.current = [];
    setDoneTurns([]);
    setThinkingTurn(null);
    setAllSettled(false);
    setFocusedPos(0);
    startTurn(0);
  };

  // Triggered by clicking the idle-screen input: types the demo prompt out
  // character by character. Sending is left to the user (Enter or the send
  // button) — no auto-submit timer.
  const startAutoType = () => {
    if (isAutoTyping || started) return;
    setIsAutoTyping(true);
    setInput("");

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      autoTypeTimeouts.current.push(id);
      return id;
    };

    const typeChar = (i: number) => {
      setInput(AUTO_TYPE_TEXT.slice(0, i));
      if (i < AUTO_TYPE_TEXT.length) {
        schedule(() => typeChar(i + 1), AUTO_TYPE_CHAR_MS);
      } else {
        setIsAutoTyping(false);
      }
    };

    schedule(() => typeChar(1), 0);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0d] text-[#e8e8ea] flex font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-[64px] shrink-0 border-r border-[#1c1c22] flex flex-col items-center py-4 gap-2">
        <img
          src="/assets/project-pic.png"
          alt="Project"
          className="w-8 h-8 rounded-lg object-cover border border-[#26262c] mb-4"
        />
        {SIDEBAR_ICONS.map(({ icon: Icon, active, label }) => (
          <div
            key={label}
            title={label}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${active
              ? "bg-[#f2f2f2] text-[#0a0a0d]"
              : "text-[#6b6b76] hover:text-[#c8c8cc] hover:bg-[#151519]"
              }`}
          >
            <Icon size={18} />
          </div>
        ))}
        <div className="flex-1" />
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f2f2f2] text-[#0a0a0d] shrink-0">
          <OpenPlanLogo className="shrink-0 h-3.5 w-3.5" />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-[56px] shrink-0 flex items-center justify-between px-6 border-b border-[#1c1c22]">
          <div className="flex items-baseline gap-2">
            <span className="text-[15px] font-semibold text-white">Assistant</span>
            <span className="text-[10px] font-semibold tracking-wide text-[#6b6b76]">(BETA)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b6b76] hover:text-[#e8e8ea] hover:bg-[#151519] transition-colors">
              <Puzzle size={17} />
            </div>
            {/* Unmounts while the panel is open — needed for the layoutId
                shared-shape morph below to actually trigger. The icon group
                is right-anchored (justify-between on its parent), so losing
                this one icon from the middle doesn't shift anything to its
                right (the avatar, etc.) — only the group's own left edge
                moves, so no placeholder is needed to prevent reflow. */}
            {!inviteOpen && <InviteTrigger onOpen={() => setInviteOpen(true)} />}
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b6b76] hover:text-[#e8e8ea] hover:bg-[#151519] transition-colors">
              <Moon size={17} />
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b6b76] hover:text-[#e8e8ea] hover:bg-[#151519] transition-colors">
              <Bell size={17} />
            </div>
            <img
              src="/assets/profile.jpg"
              alt={USER_NAME}
              className="w-8 h-8 rounded-full object-cover ml-2"
            />
          </div>
        </div>

        {!started ? (
          /* Idle / landing state */
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[28px] font-bold text-white mb-6"
            >
              What can I help with, {USER_NAME}?
            </motion.h1>

            <InputPill
              value={input}
              onChange={setInput}
              onSubmit={() => handleSend()}
              onBoxClick={startAutoType}
            />

            {/* Suggestion pills — plain, static, no orb/animation; width hugs content */}
            <div className="flex flex-col items-center gap-2.5 mt-6 w-full max-w-[690px]">
              {SUGGESTIONS.map(({ icon: Icon, text }, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
                  onClick={() => handleSend(text)}
                  className="w-fit max-w-full flex items-center gap-2.5 rounded-full border border-[#1e1e24] bg-[#111114] hover:bg-[#16161b] hover:border-[#2a2a31] px-4 py-2.5 text-left transition-colors"
                >
                  <span className="shrink-0 flex items-center justify-center text-[#8b8b93]">
                    <Icon size={14} />
                  </span>
                  <span className="text-[13.5px] text-[#c8c8cc] leading-snug">{text}</span>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          /* Chat state */
          <div className="flex-1 flex flex-col min-h-0">
            <div ref={paneRef} className={`flex-1 overflow-y-auto px-6 py-8 ${NO_SCROLLBAR}`}>
              <div className="max-w-[690px] mx-auto flex flex-col gap-4">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="self-end max-w-[85%] rounded-2xl rounded-tr-sm bg-white text-[#111114] px-4 py-2.5 text-[14px] font-medium"
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* The very first turn's thinking pill: no card exists yet, so
                  it just sits inline in the content flow. It shares a
                  layoutId with the first card's own box below — when this
                  pill unmounts the instant that card mounts (both state
                  updates land in the same commit), Framer morphs the pill's
                  shape directly into the card instead of the two crossfading
                  independently. */}
              <AnimatePresence>
                {doneTurns.length === 0 && thinkingTurn !== null && (
                  <div className="max-w-[690px] mx-auto mt-5">
                    <ThinkingPill
                      key={thinkingTurn}
                      layoutId="assistant-first-reply"
                      hideContent={pillContentHidden}
                    />
                  </div>
                )}
              </AnimatePresence>

              {/* AI documents: every card is always absolutely positioned and
                  pinned to the same top edge, so older ones sit directly
                  behind the newest and only a thin rounded sliver peeks out
                  above it — like a stack of papers. (Cards never switch
                  between relative/absolute after mounting — toggling that
                  mid-animation was freezing Framer Motion's transform
                  tracking on the demoted card.) An invisible clone of the
                  front card, in normal flow, reserves the scroll height that
                  the real (absolute) cards no longer contribute. */}
              {doneTurns.length > 0 && (
                // mt-16 clears the tallest peek offset (34px at depth 2) with
                // room to spare, so the stacked-back cards never creep up
                // into the user's prompt pill above. Once allSettled, this
                // area also owns wheel input (see the effect above) so the
                // user can scroll back through earlier documents instead of
                // only ever seeing the newest one.
                <div className="relative w-full max-w-[940px] mx-auto mt-16">
                  <div className="invisible pointer-events-none" aria-hidden="true">
                    <AITurnBox
                      title={AI_TURNS[doneTurns[effectiveFocusedPos] ?? doneTurns[doneTurns.length - 1]].title}
                      blocks={AI_TURNS[doneTurns[effectiveFocusedPos] ?? doneTurns[doneTurns.length - 1]].blocks}
                      instant
                    />
                  </div>

                  {doneTurns.map((turnIdx, pos) => {
                    // Cards behind the focused one recede (depth > 0); a
                    // card ahead of it (depth < 0) — only reachable once
                    // settled, by scrolling back past it — lifts out of
                    // view entirely rather than covering the focused card.
                    const depth = effectiveFocusedPos - pos;
                    const hidden = depth < 0;
                    // opacity/blur are applied directly (snap instantly on each
                    // depth change) rather than through `animate` — mixing them
                    // into the same animate object as scale/y caused Framer
                    // Motion to freeze them on a card's second+ re-target while
                    // the transform kept animating fine. Only scale/y need to
                    // be smooth here.
                    return (
                      <motion.div
                        key={turnIdx}
                        data-stack-front={depth === 0 ? "true" : undefined}
                        className="absolute inset-x-0 top-0 w-full"
                        style={{
                          zIndex: hidden ? 0 : 100 - depth,
                          transformOrigin: "top center",
                          transformPerspective: 1400,
                          opacity: hidden ? 0 : depth === 0 ? 1 : Math.max(1 - depth * 0.16, 0.55),
                          filter: hidden || depth === 0 ? undefined : `blur(${Math.min(depth, 3)}px)`,
                          pointerEvents: hidden ? "none" : undefined,
                        }}
                        // A brand-new front card rises up from below the
                        // bottom of the viewport, tilted back on its bottom
                        // edge like it's being lifted into place — reads as
                        // "emerging" from the pill that sat above the input a
                        // moment ago. Cards already in the stack just keep
                        // animating scale/y/rotateX as they get demoted. The
                        // very first card skips this entirely — it shape-
                        // morphs directly out of the thinking pill instead
                        // (via AITurnBox's own layoutId, below), so it needs
                        // no rise-from-below transform of its own here.
                        initial={depth === 0 && turnIdx !== 0 ? { scale: 0.82, y: 640, rotateX: -28 } : false}
                        animate={{
                          scale: hidden ? 1 : 1 - depth * 0.02,
                          y: hidden ? -400 : -(depth * 14 + (depth > 0 ? 6 : 0)),
                          rotateX: 0,
                        }}
                        transition={{ type: "spring", bounce: 0.12, duration: 0.7 }}
                      >
                        {/* Separate from the transform animation above (mixing
                            opacity/filter into that same animate object once
                            froze Framer's transform tracking on later
                            re-targets) — this handles only the one-time
                            motion-blur-in on a brand-new card, fading from
                            heavily blurred to sharp as it settles. Skipped for
                            the first card too — its own box already carries
                            the pill's layoutId, and fading blur on top of a
                            shape morph would just muddy the transition. */}
                        <motion.div
                          initial={
                            depth === 0 && turnIdx !== 0 ? { opacity: 0, filter: "blur(24px)" } : false
                          }
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          transition={{ duration: 0.55, ease: "easeOut" }}
                        >
                          <AITurnBox
                            title={AI_TURNS[turnIdx].title}
                            blocks={AI_TURNS[turnIdx].blocks}
                            isFront={depth === 0}
                            layoutId={turnIdx === 0 ? "assistant-first-reply" : undefined}
                            onSettled={() => handleCardSettled(turnIdx)}
                            onInvite={() => setInviteOpen(true)}
                          />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              <div ref={messagesEndRef} className="h-1" />
            </div>

            <div className="relative shrink-0 px-6 pb-6 pt-2 flex flex-col items-center">
              {/* From the second turn on, the thinking pill lives here —
                  floating just above the input box — instead of inside the
                  stack. It's absolutely positioned (not a flex sibling of the
                  input) so it never adds height to this footer: taking up
                  flow space here would shrink the scroll area above by that
                  same amount every time it mounts/unmounts, reading as the
                  card stack "jumping" up and down. Floating it lets it sit on
                  top of whatever's behind it instead. */}
              <AnimatePresence>
                {doneTurns.length > 0 && thinkingTurn !== null && (
                  <div className="absolute inset-x-0 bottom-full mb-3 flex justify-center px-6 pointer-events-none">
                    <ThinkingPill key={thinkingTurn} />
                  </div>
                )}
              </AnimatePresence>
              <InputPill value={input} onChange={setInput} onSubmit={() => handleSend()} compact />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>{inviteOpen && <InvitePanel onClose={() => setInviteOpen(false)} />}</AnimatePresence>
    </div>
  );
}

// A light that travels around a div's exact rectangular border, traced via
// `offset-path` against the element's own live pixel dimensions (so corners
// are sharp, not approximated the way a conic-gradient sweep would be).
//
// Clipping is done the same way the earlier conic-gradient version did it —
// this element sits absolutely positioned *behind* a solid, normal-flow
// sibling that's inset by the parent's padding, so only that padding-width
// ring is ever visible. (The CSS mask-composite ring trick — clip one layer
// to padding-box, one to border-box, intersect them — looked right in
// isolation but bled a big soft blob into the input's interior once actually
// rendered here; not worth chasing further when this approach is already
// proven to clip cleanly.) Must be the first child of a `relative`,
// `overflow-hidden`, padded parent — see InputPill below.
function BorderBeam({
  lightWidth = 220,
  duration = 3.5,
  lightColor = "#ffffff",
}: {
  lightWidth?: number;
  duration?: number;
  lightColor?: string;
}) {
  const pathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePath = () => {
      const div = pathRef.current;
      if (!div) return;
      div.style.setProperty(
        "--path",
        `path("M 0 0 H ${div.offsetWidth} V ${div.offsetHeight} H 0 V 0")`,
      );
    };
    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, []);

  return (
    <div ref={pathRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute inset-0 aspect-square"
        style={
          {
            background: `radial-gradient(ellipse at center, ${lightColor}, transparent, transparent)`,
            width: `${lightWidth}px`,
            offsetPath: "var(--path)",
          } as CSSProperties
        }
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function InputPill({
  value,
  onChange,
  onSubmit,
  compact,
  onBoxClick,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  compact?: boolean;
  onBoxClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: compact ? 0 : 0.05 }}
      className={`relative w-full max-w-[690px] rounded-[23px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)] ${compact ? "border border-[#1e1e24]" : "p-[1.5px]"
        }`}
    >
      {!compact && <BorderBeam duration={3.5} lightColor="#ffffff" lightWidth={220} />}
      <div className="relative z-10 rounded-[21.5px] bg-[#131316] px-5 pt-4 pb-3 flex flex-col gap-4">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={onBoxClick}
          onFocus={onBoxClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder="Ask, and you shall receive..."
          className="bg-transparent outline-none border-none text-[15px] text-[#e8e8ea] placeholder:text-[#6b6b76]"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#6b6b76] hover:text-[#c8c8cc] hover:bg-[#1c1c22] transition-colors">
              <Paperclip size={16} />
            </button>
            <button className="flex items-center gap-1.5 pl-3 pr-2.5 h-8 rounded-full bg-[#1a1a1f] border border-[#26262c] text-[13px] text-[#a8a8ae] hover:text-white transition-colors">
              <Globe size={13} />
              Select a project
              <ChevronDown size={13} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#6b6b76] hover:text-[#c8c8cc] hover:bg-[#1c1c22] transition-colors">
              <Mic size={16} />
            </button>
            <button
              onClick={onSubmit}
              className="group relative w-9 h-9 rounded-full overflow-hidden bg-[#3a3a42] transition-colors"
            >
              {/* Colorful glow, hidden behind the icon at rest and blooming
                  in on hover — same recipe as a "ButtonColorful": a blurred
                  gradient layer under the content, opacity-only animated. */}
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-90 blur transition-opacity duration-500" />
              <span className="relative flex items-center justify-center w-full h-full text-[#e8e8ea] group-hover:text-white transition-colors">
                <ArrowUp size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
