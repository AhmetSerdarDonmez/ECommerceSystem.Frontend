/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
    Elements
} from '@stripe/react-stripe-js';
import PaymentService from '../services/PaymentTestService';
import styles from './PaymentForm.module.css'; 

const stripePromise = loadStripe('pk_test_51R2Qy6HJRKmLY8vDUG45M5KoY34MG4D01GA7L4sb9gJUBKj0pXQH7xepw0M0Cu314lqfF9EN3MoKN3OjdUVelXOk00XHHYOgdh');

const stripeOptions = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

const PaymentForm = () => {
    const [amount, setAmount] = useState(50); // Default amount
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!stripe || !elements) {
            return;
        }

        // Use the CardNumberElement to create the token when using split fields
        const cardNumberElement = elements.getElement(CardNumberElement);
        const { token, error: stripeError } = await stripe.createToken(cardNumberElement);

        if (stripeError) {
            setError(stripeError.message);
            setLoading(false);
            return;
        }

        try {
            const result = await PaymentService.charge(amount, token.id);
            if (result.isSuccessful) {
                setSuccess('Payment successful!');
            } else {
                setError('Payment failed!');
            }
        } catch (err) {
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Make a Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="amount" className={styles.label}>Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Enter amount"
                        className={styles.input}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Card Number:</label>
                    <div className={styles.stripeInput}>
                        <CardNumberElement options={stripeOptions} />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Expiration Date:</label>
                    <div className={styles.stripeInput}>
                        <CardExpiryElement options={stripeOptions} />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>CVC:</label>
                    <div className={styles.stripeInput}>
                        <CardCvcElement options={stripeOptions} />
                    </div>
                </div>
                <button type="submit" className={styles.button} disabled={loading || !stripe}>
                    {loading ? 'Processing...' : 'Pay'}
                </button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}
        </div>
    );
};

const StripePaymentWrapper = () => (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
);

export default StripePaymentWrapper;
