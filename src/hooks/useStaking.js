import { useWallet } from "@buidlerlabs/hashgraph-react-wallets";
import { Client, Hbar, ContractExecuteTransaction } from "@hashgraph/sdk";

export const useStaking = () => {
  const { account, isConnected } = useWallet();

  const stake = async (amount) => {
    if (!isConnected) return alert("Connect your wallet first");

    const client = Client.forTestnet();
    client.setOperator(account.accountId, account.privateKey);

    // Example staking contract call
    const tx = new ContractExecuteTransaction()
      .setContractId("0.0.YOUR_CONTRACT_ID")
      .setGas(100000)
      .setFunction("stake", [{ type: "uint256", value: parseInt(amount) }]);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);

    alert(`Staked ${amount} HBAR! Status: ${receipt.status.toString()}`);
  };

  return { stake };
};
