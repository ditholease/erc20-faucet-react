// Network + contract configuration for the faucet.
// Override with REACT_APP_* variables in a .env file (see README).

export const TOKEN_ADDRESS =
  process.env.REACT_APP_TOKEN_ADDRESS || "0x0000000000000000000000000000000000000000"

export const CHAIN_ID = Number(process.env.REACT_APP_CHAIN_ID || 11155111) // Sepolia
export const CHAIN_NAME = process.env.REACT_APP_CHAIN_NAME || "Sepolia"

export const FAUCET_AMOUNT = "100" // whole tokens per faucet request
