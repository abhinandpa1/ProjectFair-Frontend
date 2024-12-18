import React, {  createContext, useState } from 'react'
// 1 create context
export const addProjectContextResponse = createContext()
export const editProjectContextResponse = createContext()
function ContextShare({children}) {
    // 2 create a state
    const [addProjectContext,setAddProjectContext] = useState("")
    const [editProjectContext,setEditProjectContext] = useState("")
  return (
    <div>
        <addProjectContextResponse.Provider value= {{addProjectContext,setAddProjectContext }}>
          <editProjectContextResponse.Provider value={{editProjectContext,setEditProjectContext }}>
            {children}
            </editProjectContextResponse.Provider>
            </addProjectContextResponse.Provider>
    </div>
  )
}

export default ContextShare 
