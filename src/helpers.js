export const truncateAddress = (hash) =>
  !hash ? "" : `${hash.slice(0, 6)}...${hash.slice(-4)}`;




export const checkTokenAssociation = async (accountId, tokenId) => {
    // 1. Construct the Mirror Node URL for mainnet
    const mirrorNodeUrl = `https://testnet.mirrornode.hedera.com/api/v1/accounts/${accountId}/tokens`;

    try {
        const response = await fetch(mirrorNodeUrl);
        const data = await response.json();

        // 2. Check if the account is associated with the specific token
        const isAssociated = data.tokens.some(
            (token) => token.token_id === tokenId
        );

        return isAssociated;

    } catch (error) {
        console.error("Error checking token association:", error);
        // Safe fallback: assume not associated
        return false; 
    }
};