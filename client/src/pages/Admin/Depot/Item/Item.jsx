import React from 'react'
import Topbar from '../../../../components/Topbar/Topbar'
import ItemTable from '../../Tables/Item/ItemTable'
import "./item.css"

const Item = () => {
  return (
    <div className='container'>
      <div className="itemContainer">
        <Topbar name="Huỳnh Thế Vĩ" img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg" position="Manager"></Topbar>
        <div>Item</div>
        <ItemTable></ItemTable>
      </div>
    </div>
  )
}

export default Item