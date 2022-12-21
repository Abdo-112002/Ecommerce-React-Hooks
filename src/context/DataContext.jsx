

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router';
import { ACTION_TYPES } from '../reducers/ActionTypes';
import { INITIAL_STATE, productReducer } from '../reducers/ProductsReducer';

export const appContext = createContext();

function DataContext({children}) {

    const [data,dispatch] =  useReducer(productReducer, INITIAL_STATE);
    const navigate = useNavigate();

    function addToCard(item) {
        let checkItem = data.cardList?.find((product) => {
            return product.id === item.id;
        });
        if(checkItem) return;
        dispatch({type : ACTION_TYPES.ADD_CARD_LIST , payload : {...item , quantity :1}})
    }

    function deleteProduct(ID){
        dispatch({type : ACTION_TYPES.REMOVE_CARD_LIST , payload : ID});
        data.cardList.length === 1 && navigate('/orders_list');
    }

    // save cart list in localStorage
    useEffect(() => {
        if(navigator.onLine){
            localStorage.setItem('cardList',JSON.stringify(data.cardList));
        }
    }, [data.cardList]);

    return (
        <appContext.Provider value={{productsData : data , dispatch: dispatch ,addToCard: addToCard ,deleteProduct: deleteProduct }} >
            {children}
        </appContext.Provider>
    )
}



export const useDataContext = () => {
    return useContext(appContext);
}

export default DataContext;
