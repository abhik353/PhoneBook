import React, { useReducer } from 'react'
import {v4 as uuidv4} from 'uuid'
import ContactContext from './ContactContext'
import ContactReducer from './ContactReducer'
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER } from '../Types'


const ContactState = props => {
    const initialState = {
        contacts:[  
            {
                id: 1,
                name: 'ABhinav',
                email: 'aks@gmail.com',
                phone: '12345',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Ares',
                email: 'ares@gmail.com',
                phone: '12345',
                type: 'professional'
            },
            {
                id: 5,
                name: 'Aresss',
                email: 'ares@gmail.com',
                phone: '12345',
                type: 'professional'
            }
        ],
        current: null,
        filtered: null
    }
    const [state, dispatch] = useReducer(ContactReducer, initialState)

    // add contact
    const addContact = (contact) => {
        contact.id = uuidv4()
        dispatch({ type: ADD_CONTACT, payload: contact})
    }
    // delete contact
    const deleteContact = id => {        
        dispatch({ type: DELETE_CONTACT, payload: id})
    }
    // set current contact
    const setCurrent = contact => {        
        dispatch({ type: SET_CURRENT, payload: contact})
    }
    // clear current contact
    const clearCurrent = () => {        
        dispatch({ type: CLEAR_CURRENT})
    }
    // update contact
    const updateContact = contact => {        
        dispatch({ type: UPDATE_CONTACT, payload: contact})
    }
    // filter contact
    const filterContact = text => {        
        dispatch({ type: FILTER_CONTACT, payload: text})
    }
    // clear filter
    const clearFilter = () => {        
        dispatch({ type: CLEAR_FILTER})
    }

    return(
        <ContactContext.Provider
            value={{
                contacts : state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContact,
                clearFilter
            }}
        >{props.children}

        </ContactContext.Provider>
    )
}

export default ContactState