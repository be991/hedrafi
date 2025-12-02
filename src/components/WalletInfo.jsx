import { useWallet, useBalance, useAccountId, useEvmAddress, useTokensBalance } from '@buidlerlabs/hashgraph-react-wallets';
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import { truncateAddress } from "../helpers";

const HRT_TOKEN_ID = process.env.REACT_APP_HTS_REWARD_TOKEN;

const WalletInfo = () => {
  const { isConnected } = useWallet(HashpackConnector);
  const { data: balance } = useBalance({ autoFetch: isConnected });
  const { data: accountId } = useAccountId({ autoFetch: isConnected });
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });
  const { data: tokensBalance } = useTokensBalance({
    tokens: [HRT_TOKEN_ID],
    autoFetch: isConnected
  });

  const hrtBalance = tokensBalance?.find(t => t.token_id === HRT_TOKEN_ID)?.balance ?? 0;

  if (!isConnected)
    return (
      <div className="p-4 bg-gray-700 rounded-xl shadow-inner text-gray-400 text-center">
        Wallet not connected
      </div>
    );

  return (
    <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-lg space-y-3">
      <h3 className="text-lg font-semibold text-indigo-400">Wallet Info</h3>

      <div className="flex justify-between bg-gray-900 p-3 rounded-lg">
        <span>HBAR Balance:</span>
        <span className="font-mono">{balance?.formatted ?? '0 ℏ'}</span>
      </div>

      <div className="flex justify-between bg-gray-900 p-3 rounded-lg">
        <span>Account ID:</span>
        <span className="font-mono">{accountId ?? '-'}</span>
      </div>

      <div className="flex justify-between bg-gray-900 p-3 rounded-lg">
        <span>EVM Address:</span>
        <span className="font-mono">{truncateAddress(evmAddress) ?? '-'}</span>
      </div>

      <div className="flex justify-between bg-gray-900 p-3 rounded-lg">
        <span>HRT Balance:</span>
        <span className="font-mono">{(hrtBalance / 1e8).toFixed(4)}</span>
      </div>

      <div className="flex justify-between bg-gray-900 p-3 rounded-lg">
        <span>NFTs Owned:</span>
        <span className="font-mono">0</span> {/* Placeholder */}
      </div>
    </div>
  );
};

export default WalletInfo;
