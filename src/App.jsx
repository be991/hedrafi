import WalletButton from './components/WalletButton';
import WalletInfo from './components/WalletInfo';
import StakePanel from './components/StakePanel';
import StakingStats from './components/StakingStats';
import logo from "./assets/logo.png"
const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-indigo-400"><img src={logo} width={60}/></h1>
        <WalletButton />
      </header>

      {/* Main dashboard */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Wallet Info */}
        <div className="md:col-span-1">
          <WalletInfo />
        </div>

        {/* Staking Panel in center */}
        <div className="md:col-span-3">
          <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
          <span class="inline-block bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            TestNet
          </span>
            <StakingStats />
            <StakePanel />
          </div>
        </div>

        {/* NFT / Marketplace placeholders */}
        <div className="md:col-span-4 mt-6">
          <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-indigo-400">NFT Dashboard</h2>
            <p className="text-gray-400 mb-4">Coming Soon: Mint, collect, and trade NFTs.</p>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed" disabled>
              Mint NFT
            </button>
          </div>
        </div>

        <div className="md:col-span-4 mt-6">
          <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-indigo-400">Marketplace</h2>
            <p className="text-gray-400 mb-4">Coming Soon: Trade NFTs with other users.</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed" disabled>
              Open Marketplace
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 border-t border-gray-800 mt-6 text-gray-400">
        &copy; 2025 HedraFi. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
