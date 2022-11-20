import React from 'react'
import Topbar from '../../../components/Topbar/Topbar'
import "./hr.css"
import HRTable from '../Tables/HR/HRTable'

const HR = () => {
  return (
    <div className='container'>
      <div className="hrContainer">
        <HRTable></HRTable>
      </div>
    </div>
  )
}

export default HR