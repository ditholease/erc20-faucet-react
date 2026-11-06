import { useState } from 'react';
import { ethers } from 'ethers'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Message from './Message'
import { connect, errorMessage } from './wallet'
import { FAUCET_AMOUNT } from '../config'

const Faucet = (props) => {

  const [balance, setBalance] = useState()
  const [showBalance, setShowBalance] = useState(false)
  const [status, setStatus] = useState()
  const [busy, setBusy] = useState(false)

  async function getBalance() {
    setStatus(null)
    try {
      const { account, contract } = await connect(props.tokenContract.abi)
      const raw = await contract.balanceOf(account)
      setBalance(ethers.utils.formatUnits(raw, 18))
      setShowBalance(true)
    } catch (e) {
      setStatus({ variant: 'danger', text: errorMessage(e) })
    }
  }

  async function faucet() {
    setStatus(null)
    setBusy(true)
    try {
      const { account, contract } = await connect(props.tokenContract.abi)
      const tx = await contract.faucet(account, ethers.utils.parseUnits(FAUCET_AMOUNT, 18))
      setStatus({ variant: 'info', text: `Transaction sent: ${tx.hash}` })
      await tx.wait()
      setStatus({ variant: 'success', text: `${FAUCET_AMOUNT} FCT received!` })
      await getBalance()
    } catch (e) {
      setStatus({ variant: 'danger', text: errorMessage(e) })
    } finally {
      setBusy(false)
    }
  }

    return (
        <div>
        <Card style={{background: "rgba(227, 104, 222, 0.71)"}}>
        <Card.Body>
        <Card.Subtitle>receive faucet ERC20 to your wallet
        </Card.Subtitle><br></br>
        <div className="d-grid gap-2">
        <Button onClick={faucet} disabled={busy}>{busy ? 'waiting…' : 'get faucet token!'}</Button>
        <Button onClick={getBalance} variant="warning">check my balance</Button>
        { showBalance ? <Message balance={balance}/> : null }
        { status ? <Alert variant={status.variant} style={{wordBreak: 'break-all'}}>{status.text}</Alert> : null }
        </div>
        </Card.Body>
        </Card>
        </div>
    )
}

export default Faucet
