// src/components/TokenBalances.tsx
import { useWallet, useTokensBalance } from '@buidlerlabs/hashgraph-react-wallets';
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';

const TokenBalances = () => {
  const { isConnected } = useWallet(HashpackConnector);
  const { data: tokensBalance } = useTokensBalance({ autoFetch: isConnected, connector: HashpackConnector });

  if (!isConnected) return <p className="text-gray-400">Connect your wallet to view tokens</p>;
  if (!tokensBalance || tokensBalance.length === 0) return <p>No tokens associated</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 px-4 py-2">Token ID</th>
            <th className="border border-gray-600 px-4 py-2">Balance</th>
            <th className="border border-gray-600 px-4 py-2">Decimals</th>
          </tr>
        </thead>
        <tbody>
          {tokensBalance.map((t) => (
            <tr key={t.token_id} className="hover:bg-gray-800">
              <td className="border border-gray-600 px-4 py-2">{t.token_id}</td>
              <td className="border border-gray-600 px-4 py-2">{t.balance}</td>
              <td className="border border-gray-600 px-4 py-2">{t.decimals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default TokenBalances; 