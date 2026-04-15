import {
  Globe,
  ShieldCheck,
  ShoppingBag,
  Trophy,
  TrendingUp,
  Users,
} from "lucide-react";
import WalletInfo from "./WalletInfo";
import StakePanel from "./StakePanel";
import StakingStats from "./StakingStats";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-blue/5 rounded-full blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container-main space-y-20">
          <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#081026]/80 p-6 shadow-2xl backdrop-blur-3xl md:p-10 lg:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,240,255,0.18),_transparent_40%)] opacity-70 pointer-events-none"></div>
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.9fr] items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] text-cyan-100 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300 animate-pulse"></span>
                  Premium staking infrastructure
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                  Staking Infrastructure
                </h1>
                <p className="max-w-2xl text-lg text-slate-300 leading-relaxed">
                  Secure your assets within the HedraFi protocol. Monitor
                  multi-layered yield streams and participate in ecosystem
                  governance through a 100% non-custodial interface.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#stake-panel"
                    className="btn-primary inline-flex items-center justify-center !py-5 !px-8 text-base"
                  >
                    Join the First 400 Pioneers
                  </a>
                  <div className="rounded-[2rem] border border-white/10 bg-slate-950/20 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                    <div className="text-[11px] uppercase tracking-[0.32em] text-slate-400 mb-2">
                      Live Counter
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-white">
                        18
                      </span>
                      <span className="text-base text-slate-400">/ 400</span>
                    </div>
                    <div className="text-sm uppercase tracking-[0.24em] text-cyan-300 mt-1">
                      Pioneers Joined
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-white/10 bg-[#071025]/80 p-8 shadow-[0_35px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
                <div className="mb-6 inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.32em] text-cyan-100 border border-cyan-400/20">
                  Join the First 400 Pioneers
                </div>
                <p className="text-slate-300 text-base leading-relaxed">
                  We are currently in Phase 1 of the HedraFi rollout. The first
                  400 stakers are more than just users—they are the Pioneers who
                  anchor the network. By staking 1,000 HBAR or more, you secure
                  your place in the governance of the next great Hedera utility.
                </p>
                <a
                  href="#stake-panel"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-white/10"
                >
                  Secure your spot
                </a>
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Yield",
                desc: "Earn $HRT daily as the protocol scales.",
                icon: TrendingUp,
                accent: "from-blue-500 to-cyan-400",
              },
              {
                title: "Safety",
                desc: "Assets are secured via Hedera Token Service and smart contracts. Fully non-custodial.",
                icon: ShieldCheck,
                accent: "from-slate-500 to-blue-600",
              },
              {
                title: "Governance",
                desc: "Early stakers gain influence over protocol decisions.",
                icon: Users,
                accent: "from-fuchsia-500 to-violet-500",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card group overflow-hidden rounded-[2.5rem] border-white/10 p-8 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${item.accent} text-white shadow-[0_20px_60px_rgba(56,189,248,0.18)]`}
                >
                  <item.icon size={24} />
                </div>
                <h3 className="text-2xl font-black mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </section>

          <section className="space-y-8">
            <div className="space-y-4">
              <div className="w-16 h-1 bg-cyber-blue rounded-full"></div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Security You Can Verify
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "No Middlemen",
                  desc: "Assets are locked in transparent smart contracts, not private wallets.",
                },
                {
                  title: "Self-Custody",
                  desc: "Only the depositor’s key can trigger withdrawals.",
                },
                {
                  title: "Real-Time Rewards",
                  desc: "$HRT rewards are distributed automatically with no manual approval.",
                },
                {
                  title: "$HRT Utility",
                  desc: "$HRT is the fuel powering the marketplace and real-world asset (RWA) ecosystem.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass-card rounded-[2.5rem] border-white/10 p-6 shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/5 text-cyan-300 border border-white/10">
                    <ShieldCheck size={20} className="text-cyan-300" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="space-y-4">
              <div className="w-16 h-1 bg-cyber-blue rounded-full"></div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                One Stake, Multiple Horizons
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: TrendingUp,
                  title: "Yield",
                  desc: "Earn $HRT daily",
                },
                {
                  icon: ShoppingBag,
                  title: "Marketplace",
                  desc: "Discounted fees + exclusive NFT access",
                },
                {
                  icon: Globe,
                  title: "RWA Access",
                  desc: "Priority access to tokenized real-world assets",
                },
                {
                  icon: Trophy,
                  title: "Early Contributor Perk",
                  desc: "Pioneer Status in future modules",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass-card rounded-[2.5rem] border-white/10 p-6 shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-[0_20px_50px_rgba(14,165,233,0.18)]">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="space-y-4">
              <div className="w-16 h-1 bg-cyber-blue rounded-full"></div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Staking Statistics</h2>
            </div>
            <StakingStats />
          </section>

          <section
            id="stake-panel"
            className="grid gap-8 xl:grid-cols-2 items-start"
          >
            <div className="space-y-8">
              <StakePanel />
            </div>
            <div className="space-y-8">
              <div className="glass-card rounded-[3rem] border-white/10 p-8 shadow-2xl">
                <WalletInfo />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
