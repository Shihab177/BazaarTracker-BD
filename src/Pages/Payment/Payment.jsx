import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';
const stripePromice = loadStripe(import.meta.env.VITE_PAYMENT_KEY)
const Payment = () => {
    return (
       <Elements stripe={stripePromice}>
             <PaymentForm></PaymentForm>
       </Elements>
    );
};

export default Payment;