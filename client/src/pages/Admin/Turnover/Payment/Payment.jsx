import React from 'react'
import Topbar from '../../../../components/Topbar/Topbar'
import PaymentTable from '../../Tables/Payment/PaymentTable'
import "./payment.css"

const Payment = () => {
  return (
    <div className='container'>
      <div className="paymentContainer">
        <Topbar name="Huỳnh Thế Vĩ" img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg" position="Manager"></Topbar>
        <div>Payment</div>
        <PaymentTable></PaymentTable>
      </div>
    </div>
  )
}

export default Payment