import { useContext, useReducer, createContext, useEffect } from "react";

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch(action.type){
        case 'NEW_ANECDOTE':
            return [action.payload]
        case 'VOTED_ANECDOTE':
            return [action.payload]
        case 'ERROR':
            return action.payload    
        case 'CLEAR_NOTIFICATION':
            return ""    
        default:
            return state
    }
}

export const NotificationProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, "");

    useEffect(() => {
        if (notification) {
            const timeoutId = setTimeout(() => {
                notificationDispatch({
                    type: 'CLEAR_NOTIFICATION'
                });
            }, 5000);

            // Clear the timeout if the component unmounts or a new notification is added
            return () => clearTimeout(timeoutId);
        }
    }, [notification]);

    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

// In the below two fuctions.. prefix "use" is neccessary 
// because useContext hook can only be used within react
// components and custom hooks and custom hooks has "use"
// as a prefix in them.

export const useNotificationValue = () => {
    const notifyAndDispatch = useContext(NotificationContext)
    return notifyAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notifyAndDispatch = useContext(NotificationContext)
    return notifyAndDispatch[1]
}


export default NotificationContext