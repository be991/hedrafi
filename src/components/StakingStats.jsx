import { useState, useEffect } from 'react';
import { useReadContract } from '@buidlerlabs/hashgraph-react-wallets';
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import CONTRACT_ABI from '../ABIs/stakingABI.json';
import { ContractId } from '@hashgraph/sdk';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const REWARD_TOKEN_ID = process.env.REACT_APP_HTS_REWARD_TOKEN;

const StakingStats = () => {
  const { readContract } = useReadContract({ connector: HashpackConnector });
  const [stats, setStats] = useState({
    totalStakedHBAR: 0,
    totalHRTLocked: 0,
    totalRewardPaid: 0,
    totalUsers: 0
  });

  const fetchStats = async () => {
    try {
      const [totalStakedHBAR, totalRewardPaid, totalUsers] = await Promise.all([
        readContract({
          address: `0x${ContractId.fromString(CONTRACT_ADDRESS).toEvmAddress()}`,
          abi: CONTRACT_ABI,
          functionName: 'totalStakedHBAR'
        }),
        readContract({
          address: `0x${ContractId.fromString(CONTRACT_ADDRESS).toEvmAddress()}`,
          abi: CONTRACT_ABI,
          functionName: 'totalRewardPaid'
        }),
        readContract({
          address: `0x${ContractId.fromString(CONTRACT_ADDRESS).toEvmAddress()}`,
          abi: CONTRACT_ABI,
          functionName: 'totalUsers'
        })
      ]);

      // Fetch HRT balance of contract
      const totalHRTLocked = await readContract({
        address: `0x${ContractId.fromString(REWARD_TOKEN_ID).toEvmAddress()}`,
        abi: [
          {
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function'
          }
        ],
        functionName: 'balanceOf',
        args: [`0x${ContractId.fromString(CONTRACT_ADDRESS).toEvmAddress()}`]
      });

      setStats({
        totalStakedHBAR: Number(totalStakedHBAR) / 1e8,
        totalRewardPaid: Number(totalRewardPaid) / 1e8,
        totalUsers: Number(totalUsers),
        totalHRTLocked: Number(totalHRTLocked) / 1e8
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gray-700 p-4 rounded-xl text-center">
        <p className="text-gray-400">Total HBAR Locked</p>
        <p className="text-xl font-semibold">{stats.totalStakedHBAR.toLocaleString()} ℏ</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-xl text-center">
        <p className="text-gray-400">Total HRT Locked</p>
        <p className="text-xl font-semibold">{stats.totalHRTLocked.toLocaleString()} HRT</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-xl text-center">
        <p className="text-gray-400">Total Reward Paid</p>
        <p className="text-xl font-semibold">{stats.totalRewardPaid.toLocaleString()} HRT</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-xl text-center">
        <p className="text-gray-400">Total Users</p>
        <p className="text-xl font-semibold">{stats.totalUsers}</p>
      </div>
    </div>
  );
};

export default StakingStats;
