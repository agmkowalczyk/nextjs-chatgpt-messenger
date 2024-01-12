import React from 'react'
import NewChat from './NewChat'

const SideBar = () => {
  return (
    <aside className='p-2 flex flex-col h-screen'>
      <div className='flex-1'>
        <div>
          <NewChat />
          <div>
            model selection
          </div>
          chat rows
        </div>
      </div>
    </aside>
  )
}

export default SideBar
