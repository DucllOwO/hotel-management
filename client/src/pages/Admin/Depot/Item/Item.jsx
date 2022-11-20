import React from 'react'
import Topbar from '../../../../components/Topbar/Topbar'
import ItemTable from '../../Tables/Item/ItemTable'
import "./item.css"

const Item = () => {
  return (
    <div className='container'>
      <div className="itemContainer">
        <div>Item</div>
        <ItemTable></ItemTable>
      </div>
    </div>
  )
}

export default Item