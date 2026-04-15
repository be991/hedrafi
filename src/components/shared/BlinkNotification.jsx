import { Link } from "react-router-dom";

const BlinkNotification = ({ enabled = true }) => {
  if (!enabled) return null;

  return (
    <div className="mt-4 flex justify-center px-4 sm:px-6 lg:px-8">
      <Link
        to="/staking"
        className="group inline-flex w-full max-w-2xl items-center justify-center gap-3 rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 shadow-[0_0_30px_rgba(0,255,255,0.12)] transition duration-300 hover:bg-cyan-400/15 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 animate-blink-subtle"
        aria-live="polite"
      >
        <span>Phase 1 Live: Only 400 Pioneer slots available. Stake now →</span>
      </Link>
    </div>
  );
};

export default BlinkNotification;
