import React from 'react'
import Topbar from '../../../components/Topbar/Topbar'
import AccountTable from '../Tables/Account/AccountTable'
import "./account.css"

const Account = () => {
  return (
    <div className='container'>
      <div className="accountContainer">
        <Topbar name="Huỳnh Thế Vĩ" img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg" position="Manager"></Topbar>
        <div>Account</div>
        <AccountTable></AccountTable>
      </div>
    </div>
  )
}

export default Account