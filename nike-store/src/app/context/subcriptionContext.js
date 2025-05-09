// context/SubscriptionContext.js

import { createContext, useContext, useState } from 'react';

// Create the Subscription Context
const SubscriptionContext = createContext();

// Custom hook to use subscription context
export const useSubscription = () => {
  return useContext(SubscriptionContext);
};

// Subscription Provider component to wrap the app
export const SubscriptionProvider = ({ children }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // Handle subscription logic
  const subscribe = (email, name) => {
    // Simulate subscription logic
    setEmail(email);
    setName(name);
    setSubscribed(true);
    // Here you can also add axios calls to backend API for subscription
  };

  return (
    <SubscriptionContext.Provider value={{ subscribed, subscribe, email, name }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
