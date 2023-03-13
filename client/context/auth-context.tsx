import React from 'react'


export const AuthContext = React.createContext({})

export const authReducer =  (state: any,action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
            
        
        case 'LOGOUT':
            return { user: null}
            
    
        default:
            return state
    }
}

export const AuthContextProvider = ({children}:any) => {
    const [state, dispatch] = React.useReducer(authReducer,{user:null})

    console.log('AuthContextState',state)

    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}