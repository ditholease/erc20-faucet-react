import { ethers } from 'ethers'
import { CHAIN_ID, CHAIN_NAME, TOKEN_ADDRESS } from '../config'

// Connects MetaMask, makes sure it is on the right network and
// returns { account, signer, contract }.
export async function connect(abi) {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask (or another injected wallet) is not installed.')
  }
  if (!ethers.utils.isAddress(TOKEN_ADDRESS) || /^0x0+$/.test(TOKEN_ADDRESS)) {
    throw new Error('No token address configured. Set REACT_APP_TOKEN_ADDRESS.')
  }

  const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

  const chainIdHex = '0x' + CHAIN_ID.toString(16)
  const current = await window.ethereum.request({ method: 'eth_chainId' })
  if (current.toLowerCase() !== chainIdHex) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      })
    } catch (e) {
      throw new Error(`Please switch your wallet to the ${CHAIN_NAME} network.`)
    }
  }

  // "any" lets ethers cope with the network change we may just have made
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const signer = provider.getSigner()
  const contract = new ethers.Contract(TOKEN_ADDRESS, abi, signer)
  return { account, signer, contract }
}

export function errorMessage(e) {
  return e?.error?.message || e?.data?.message || e?.reason || e?.message || String(e)
}
