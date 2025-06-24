import CheckoutCard from "./_components/checkout-card";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center">
      <div className="bg-card shadow-shadow @container w-full rounded p-6 shadow-lg lg:max-w-[550px]">
        <CheckoutCard />
      </div>
    </div>
  );
}
