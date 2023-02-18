import React, { createContext,useContext, useReducer } from 'react'
import AppReducer from './AppReducer';


export const  deleteTransaction = (id:number) => {};

export interface GProviderProps{
    children: React.ReactNode;
}

export interface transactionProps{
    transactions:{
        id: number
        text:string,
        amount :number,
    }[]
}
export type Actions =
{
    type:  "DELETE_TRANSACTION";
    payload: number;
}|{
    type: "ADD_TRANSACTION";
    payload: { id: number | any; amount: number; text: string };
  };


//initial state
const initialState:transactionProps = {
    //dummy
    transactions: [
        { id: 1, text: 'Flower', amount: -20 },
        { id: 2, text: 'Salary', amount: 300 },
        { id: 3, text: 'Book', amount: -10 },
        { id: 4, text: 'Camera', amount: 150 }
    ]
}
    

//create context
export const GlobalContext = createContext<transactionProps>(initialState);

//Provider Component
export const GlobalProvider = ({ children}:GProviderProps) =>{
     const [state, dispatch] = useReducer(AppReducer, initialState)

     //actions
     const  deleteTransaction = (id:number) =>{
        dispatch({
            type: "DELETE_TRANSACTION",
            payload : id
        });
     }
    return(
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction
        }}>

            {children}
        </GlobalContext.Provider>
    )
}