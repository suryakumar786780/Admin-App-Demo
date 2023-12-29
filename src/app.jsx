import React, { createContext, useState } from 'react'
import RouterComp from './router'
export const UserContext = createContext();
const App = () => {
    const [user, setUser] = useState(localStorage.getItem('isLogin'));
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <RouterComp />
        </UserContext.Provider>
    )
}

export default App