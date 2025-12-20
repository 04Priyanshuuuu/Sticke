"use client";
import React from "react";

const RefundPolicyPage = () => {
  return (
    <div className="bg-black min-h-screen text-white px-6 mt-22 md:px-16 py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center">
          Refund & Return Policy
        </h1>

        <p className="text-gray-400 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">1. General Policy</h2>
          <p className="text-gray-300">
            We strive to ensure customer satisfaction. If you are not fully
            satisfied with your purchase, please review our refund and
            return policy below.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">2. Returns</h2>
          <p className="text-gray-300">
            Returns are accepted only for defective, damaged, or incorrect
            items. The request must be made within a reasonable time after
            receiving the product.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">3. Non-Returnable Items</h2>
          <p className="text-gray-300">
            Custom-made or personalized stickers are non-returnable and
            non-refundable unless there is a manufacturing defect or
            damage during delivery.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">4. Refunds</h2>
          <p className="text-gray-300">
            Once your return is approved, refunds will be processed using
            the original payment method. Processing time may vary depending
            on the payment provider.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">5. Order Cancellations</h2>
          <p className="text-gray-300">
            Orders may be canceled only before they are shipped. Once an
            order has been dispatched, it cannot be canceled.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">6. Shipping Issues</h2>
          <p className="text-gray-300">
            Sticke is not responsible for delays or damages caused by
            third-party shipping providers, but we will assist in resolving
            such issues whenever possible.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">7. Contact</h2>
          <p className="text-gray-300">
            For refund or return-related queries, please contact us at:
          </p>
          <p className="text-gray-300">
            📧 Email: <span className="text-blue-400">normallllthe@gmail.com</span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
