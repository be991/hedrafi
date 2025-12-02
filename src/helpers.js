export const truncateAddress = (hash) =>
  !hash ? "" : `${hash.slice(0, 6)}...${hash.slice(-4)}`;