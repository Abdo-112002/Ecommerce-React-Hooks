

import React, { createContext, useContext, useEffect, useReducer , useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ACTION_TYPES } from '../reducers/ActionTypes';
import { INITIAL_STATE, productReducer } from '../reducers/ProductsReducer';
import Swal from 'sweetalert2';

export const appContext = createContext();

function DataContext({children}) {

    const [data,dispatch] =  useReducer(productReducer, INITIAL_STATE);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const navigate = useNavigate();
    const location = useLocation();
    let redirect = location.state?.path || '/';

    function addToCard(item) {
        if(!user) {
            showNotification(true,'you have to login first');
            navigate('/login');
            return;
        }
        let checkItem = data.cardList?.find((product) => {
            return product.id === item.id;
        });
        if(checkItem) {
            showNotification(false,'this product actually added');
            return;
        };
        dispatch({type : ACTION_TYPES.ADD_CARD_LIST , payload : {...item , quantity :1}})
    }

    function deleteProduct(ID){
        dispatch({type : ACTION_TYPES.REMOVE_CARD_LIST , payload : ID});
        data.cardList.length === 1 && navigate('/');
    }

    function login(user){
        const areFalsy = Object.values(user).every(value => value);
        if(!areFalsy) {
            showNotification(false,'please fill your data');
            return;
        };
        setUser(user);
        navigate(redirect, {replace : true});
        console.log("user added");
    }

    function logout(){
        setUser(null);
        dispatch({type : ACTION_TYPES.CLEAR_CART_LIST , payload : []});
        navigate('/');
    }

    function showNotification(status,statusText) {
        Swal.fire({
          position: 'top-center',
          icon: status ? 'success' : "error",
          title: statusText,
          showConfirmButton: false,
          timer: 2500
        })
    }

    // save cart list and user in localStorage
    useEffect(() => {
        if(navigator.onLine){
            localStorage.setItem('cardList',JSON.stringify(data.cardList));
            localStorage.setItem('user',JSON.stringify(user));
        }
    }, [data.cardList , user]);

    return (
        <appContext.Provider value={
            {
                productsData : data , 
                dispatch ,
                addToCard ,
                deleteProduct,
                user,
                login,
                logout,
                showNotification,
            }
        }>
            {children}
        </appContext.Provider>
    )
}



export const useDataContext = () => {
    return useContext(appContext);
}

export default DataContext;
