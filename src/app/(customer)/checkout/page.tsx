import CheckoutCard from "./_components/checkout-card";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center">
      <div className="bg-background-card @container w-full rounded border p-6 shadow-lg lg:max-w-[550px] dark:shadow-black">
        <CheckoutCard />
      </div>
    </div>
  );
}
