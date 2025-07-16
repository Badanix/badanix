// Custom Hook to use wallet balance and handle transactions
import { useWalletStore } from '../hooks/useWalletStore'; // Update path as needed
import Swal from "sweetalert2";
import { APIURLS, NAMES } from "../components/Constants";
import { getUserData } from "../components/Helper";

export const usePayment = () => {
    const { addToWalletBalance } = useWalletStore();

    const handlePayStack = async (amountInNaira) => {
        if (!amountInNaira || parseFloat(amountInNaira) <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Amount',
                text: 'Please enter a valid amount.',
            });
            return;
        }

        // Convert Naira input to Kobo (multiply by 100)
        const amountInKobo = amountInNaira * 100;

        // Payment data
        const paymentData = {
            amount: Math.round(amountInKobo), // Round to avoid floating-point errors
            currency: NAMES.currency || 'NGN',
            email: getUserData()?.data?.email,
        };

        try {
            // Step 1: Initiate payment
            const response = await fetch(APIURLS.APIURLPATIENTSPAY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error initiating payment: ${errorText}`);
            }

            const responseData = await response.json();
            const { authorization_url, reference } = responseData.data.data;

            // Step 2: Debugging Info and Redirect
            await Swal.fire({
                icon: 'info',
                title: 'Payment Initiated',
                html: `
                    <strong>Email:</strong> ${paymentData.email}<br>
                    <strong>Amount:</strong> ${NAMES.NairaSymbol}${amountInNaira}<br>
                    <strong>Currency:</strong> ${paymentData.currency}<br>
                    <strong>Authorization URL:</strong> <a href="${authorization_url}" target="_blank">${authorization_url}</a><br>
                    <strong>Reference:</strong> ${reference}
                `,
                confirmButtonText: 'Proceed to Pay',
            });

            // Redirect to Paystack payment page
            window.location.href = authorization_url;

            // Update wallet balance in Zustand store
            addToWalletBalance(amountInNaira); // Update balance after successful payment
        } catch (error) {
            console.error('Error initializing payment:', error);

            Swal.fire({
                icon: 'error',
                title: 'Payment Initialization Failed',
                text: `An error occurred: ${error.message}`,
            });
        }
    };

    return {
        handlePayStack,
    };
};
