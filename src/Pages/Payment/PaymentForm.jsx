import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";

const PaymentForm = () => {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { productId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  
console.log(productId)

  const { isPending, data: productInfo ={} } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-products/${productId}`);
      return res.data;
    },
  });

  const amount = productInfo?.pricePerUnit;
  const amountInCents = amount * 100;
  
  if (isPending || !productInfo?.pricePerUnit) {
  return <Loading></Loading>;
}
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    //step-1
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error", error);
      setError(error.message);
    } else {
      setError("");
      console.log("paymentMethod", paymentMethod);
      // step-2: create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        productId,
      });
      console.log("res form intent ", res);
      const clientSecret = res.data.clientSecret;
      // step-3: confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!");
          console.log(result);
          // step-4  mark parcel paid also payment history
          const transactionId = result.paymentIntent.id;
          const paymentData = {
            productId,
            email: user.email,
            name: user.displayName,
            amount,
            transactionId: result.paymentIntent.id,
            paymentMethod: result.paymentIntent.payment_method_types,
          };
          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            console.log("payment successfully llllllll");

            // Show SweetAlert with transaction ID
            await Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              confirmButtonText: "Go to all Product",
            });
           
            //  Redirect to /myParcels
            navigate("/AllProduct");
          }
        }
      }
    }
  };
  return (
    <div className="mt-38">
      <form
        onSubmit={handelSubmit}
        className="p-6 space-y-4 bg-white rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className=" p-2 border rounded"></CardElement>
        <button
          className="btn btn-primary w-full text-white"
          type="submit"
          disabled={!stripe}
        >
          pay $ {amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
