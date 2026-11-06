import { useState } from 'react';
import { ethers } from 'ethers'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { connect, errorMessage } from './wallet'

const TokenSend = (props) => {

  const [userAccount, setUserAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState()
  const [busy, setBusy] = useState(false)

  async function sendCoins() {
    setStatus(null)
    if (!ethers.utils.isAddress(userAccount)) {
      setStatus({ variant: 'danger', text: 'Invalid recipient address.' })
      return
    }
    let value
    try {
      value = ethers.utils.parseUnits(amount || '0', 18)
    } catch (e) {
      setStatus({ variant: 'danger', text: 'Invalid amount.' })
      return
    }
    if (value.isZero()) {
      setStatus({ variant: 'danger', text: 'Amount must be greater than 0.' })
      return
    }
    setBusy(true)
    try {
      const { contract } = await connect(props.tokenContract.abi)
      const tx = await contract.transfer(userAccount, value)
      setStatus({ variant: 'info', text: `Transaction sent: ${tx.hash}` })
      await tx.wait()
      setStatus({ variant: 'success', text: `${amount} FCT sent to ${userAccount}` })
    } catch (e) {
      setStatus({ variant: 'danger', text: errorMessage(e) })
    } finally {
      setBusy(false)
    }
  }

    return (
        <Card style={{background: "rgba(227, 104, 222, 0.71)"}}>
        <Card.Body>
        <Card.Subtitle> send faucet to an address
        </Card.Subtitle>
        <br></br>
        <div className="d-grid gap-2">
        <input value={userAccount} onChange={e => setUserAccount(e.target.value.trim())} placeholder="Payee 0x address" />
        <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (FCT)" />
        <Button onClick={sendCoins} variant="success" disabled={busy}>{busy ? 'waiting…' : 'send'}</Button>
        { status ? <Alert variant={status.variant} style={{wordBreak: 'break-all'}}>{status.text}</Alert> : null }
        </div>
        </Card.Body>
        </Card>
    )
}

export default TokenSend
