import Alert from 'react-bootstrap/Alert'

const Message = ({ balance }) => {
    return (
      <div>
      <Alert variant="info"> balance : {balance} FCT</Alert>
      </div>
  )
}

export default Message
