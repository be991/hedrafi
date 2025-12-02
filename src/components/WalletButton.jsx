import { useWallet } from '@buidlerlabs/hashgraph-react-wallets';
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';

const WalletButton = () => {
  const { isConnected, connect, disconnect, isExtensionRequired, extensionReady } =
    useWallet(HashpackConnector);

  if (isExtensionRequired && !extensionReady) {
    return <span className="text-red-500">Extension not found. Install Hashpack!</span>;
  }

  return isConnected ? (
    <button
      onClick={disconnect}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
    >
      Disconnect
    </button>
  ) : (
    <button
      onClick={connect}
      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
    >
      Connect Wallet
    </button>
  );
};


export default WalletButton; 