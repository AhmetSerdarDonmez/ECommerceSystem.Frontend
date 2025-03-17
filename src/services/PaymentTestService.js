import axios from 'axios';

const PaymentService = {
    charge: async (amount, token, currency = 'usd') => {
        const paymentData = {
            amount: amount,
            token: token,
            currency: currency,
        };

        try {
            const response = await axios.post('/api/Payment/charge', paymentData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data; // Return the response from the API
        } catch (error) {       
            throw error.response ? error.response.data : error.message;
        }
    },
};

export default PaymentService;