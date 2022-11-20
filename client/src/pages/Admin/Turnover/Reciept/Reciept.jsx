import React from 'react'
import Topbar from '../../../../components/Topbar/Topbar'
import ReceiptTable from '../../Tables/Receipt/Receipt'
import "./reciept.css"

const Reciept = () => {
  return (
    <div className='container'>
      <div className="recieptContainer">
        <div>Reciept</div>
        <ReceiptTable></ReceiptTable>
      </div>
    </div>
  )
}

export default Reciept