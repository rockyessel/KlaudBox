import React from 'react'


const AuthContext = React.createContext({})

export const authReducer = (state:any,action:any) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}

        case 'LOGOUT':
            return {user: null}
        
        default:
            return state
    }
}

export const AuthContextProvider = ({children}:any) => {
    const [state, dispatch] = React.useReducer(authReducer, {user:null})

    // console.log('AuthContext state: ', state)


    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        
        </AuthContext.Provider>

    )
}

export const useGuestContext = () => React.useContext(AuthContext);