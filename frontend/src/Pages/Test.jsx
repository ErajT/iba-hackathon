import React from 'react'
import {checkContractBalance, sendPaymentFromContract, sendPaymentToContract} from "../services/blockchain"

function Test() {
  return (
    <div>
        Testing metamask

        <button>Connect Wallet</button>
        <button onClick={checkContractBalance}>Check balance</button>
        <button onClick={sendPaymentToContract}>Send</button>
        <button onClick={sendPaymentFromContract}>Receive</button>
    </div>
  )
}

export default Test