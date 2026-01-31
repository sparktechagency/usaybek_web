import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { modifyPayload } from "@/lib";
import {
  useStorePaymentMutation,
  useSuccessPaymentMutation,
} from "@/redux/api/stripeApi";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { Button } from "@/components/ui";
import { loadStripe } from "@stripe/stripe-js";

// ---------------------------
// usePayment Hook
// ---------------------------
export const usePayment = (paymentInfo: any) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [successPayment] = useSuccessPaymentMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !paymentInfo?.client_secret || loading) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      // Validate PaymentElement first
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message as any);
        setLoading(false);
        return;
      }

      // Confirm payment using PaymentElement
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: paymentInfo.client_secret,
        confirmParams: {},
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message as any);
        setLoading(false);
        return;
      }
      console.log(paymentIntent);

      // Payment succeeded
      if (paymentIntent?.status === "succeeded") {
        const paymentSuccessPayload = {
          amount: paymentIntent.amount,
          payment_intent_id: paymentIntent.id,
          user_id: paymentInfo.user_id,
          reason: paymentInfo.reason,
          ...(paymentInfo.promoted_until && {
            promoted_until: paymentInfo.promoted_until,
          }),
          ...(paymentInfo.video_id && { video_id: paymentInfo.video_id }),
        };

        const res = await successPayment(
          modifyPayload(paymentSuccessPayload),
        ).unwrap();

        if (res.status) {
          toast.success("Payment Successful!", {
            description: "Your payment has been processed.",
          });

          setIsPaymentSuccessful(true);
        }
      }
    } catch (err) {
      setErrorMessage("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMessage, isPaymentSuccessful, handleSubmit };
};

// -------- StripeBox Component ----------
interface StripeBoxProps {
  paymentInfo: any;
  onSuccess: () => void;
}

const StripeBox: React.FC<StripeBoxProps> = ({ paymentInfo, onSuccess }) => {
  const { loading, errorMessage, isPaymentSuccessful, handleSubmit } =
    usePayment(paymentInfo);

  useEffect(() => {
    if (isPaymentSuccessful) {
      onSuccess();
    }
  }, [isPaymentSuccessful, onSuccess]);

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: "tabs" }} />

      <Button
        variant={"primary"}
        className="mt-10 float-end"
        type="submit"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay"}
      </Button>

      {errorMessage && (
        <p className="text-red-500 text-center mt-3">{errorMessage}</p>
      )}
    </form>
  );
};

//  -------------------- StripePayment Wrapper -------------------
// node: promoted_until , video_id added new value
//  ---------------------- X --------------------------------
interface StripePaymentWrapperProps {
  amount: number;
  reason: string;
  onSuccess: () => void;
  promoted_until?: string;
  video_id?: string;
}

const StripePaymentWrapper: React.FC<StripePaymentWrapperProps> = ({
  amount,
  reason,
  promoted_until,
  video_id,
  onSuccess,
}) => {
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const { data: profile } = useGetProfileQuery({});
  const { id: user_id } = profile?.data || {};

  const [storePayment] = useStorePaymentMutation();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_CLIENT_KEY as string,
  );

  console.log(paymentInfo);

  // STEP 1: Create PaymentIntent on mount
  useEffect(() => {
    const initializePayment = async () => {
      try {
        const payload = modifyPayload({
          amount,
          payment_method: "pm_card_visa",
          reason,
        });
        const res = await storePayment(payload).unwrap();

        setPaymentInfo({
          reason: res?.data?.metadata?.service_name,
          amount: res?.data?.amount,
          payment_intent_id: res?.data?.id,
          user_id,
          client_secret: res?.data?.client_secret,
          ...(promoted_until && { promoted_until }),
          ...(video_id && { video_id }),
        });
      } catch (err) {
        console.error("Unable to initialize payment", err);
      }
    };

    initializePayment();
  }, [storePayment, amount, reason, user_id]);

  if (!paymentInfo?.client_secret) return <p>Loading payment...</p>;

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: paymentInfo.client_secret }}
    >
      <StripeBox paymentInfo={paymentInfo} onSuccess={onSuccess} />
    </Elements>
  );
};

export default StripePaymentWrapper;
