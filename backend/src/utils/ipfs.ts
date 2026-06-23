/** Extract IPFS CID from a gateway URL, or return the value as-is (dao-dashboard stores CID on-chain). */
export function extractCidFromTokenUri(tokenUri: string): string {
  const trimmed = tokenUri.trim();
  const match = trimmed.match(/\/ipfs\/([^/?#]+)/i);
  return match?.[1] ?? trimmed;
}
