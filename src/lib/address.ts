function validateSolanaWalletAddress(address: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

function formatWalletAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export { validateSolanaWalletAddress, formatWalletAddress };
