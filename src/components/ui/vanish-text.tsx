// VanishText — words fade + blur out, then the (same or next) text fades +
// blurs back in, staggered word by word. Built for the assistant-suggestion
// pills: bump `cycleKey` to replay the vanish -> appear beat on demand or on
// a loop (used to capture a repeatable animation for video).
import { motion, AnimatePresence, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 4 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    filter: "blur(6px)",
    y: -4,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
};

export function VanishText({
  text,
  cycleKey,
  className,
}: {
  text: string;
  cycleKey: number | string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={cycleKey}
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={className}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            variants={word}
            style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}

export default VanishText;
