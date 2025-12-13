import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null); // { type: 'success' | 'error' | 'info', message: '' }
    const [modal, setModal] = useState(null); // { title, content, onConfirm, showCancel }

    const showLoading = (show = true) => setIsLoading(show);

    const showNotification = (type, message, duration = 3000) => {
        setNotification({ type, message });
        if (duration > 0) {
            setTimeout(() => setNotification(null), duration);
        }
    };

    const showModal = (content) => setModal(content);
    const closeModal = () => setModal(null);

    return (
        <UIContext.Provider value={{
            isLoading, showLoading,
            notification, showNotification, setNotification,
            modal, showModal, closeModal
        }}>
            {children}
        </UIContext.Provider>
    );
};
