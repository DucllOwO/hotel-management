import React from 'react'
import Topbar from '../../../../components/Topbar/Topbar'
import PaymentTable from '../../Tables/Payment/PaymentTable'
import "./payment.css"

const Payment = () => {
  return (
    <div className='container'>
      <div className="paymentContainer">
        <div>Payment</div>
        <PaymentTable></PaymentTable>
      </div>
    </div>
  )
}

export default Payment