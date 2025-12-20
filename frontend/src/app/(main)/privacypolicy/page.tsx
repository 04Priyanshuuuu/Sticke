"use client";
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-black min-h-screen text-white px-6 mt-22 md:px-16 py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-400 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-gray-300">
            At Sticke, we value your privacy and are committed to protecting
            your personal information. This Privacy Policy explains how we
            collect, use, and safeguard your data when you use our website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          <p className="text-gray-300">
            We may collect personal information such as your name, email
            address, shipping address, and payment-related details when you
            register, place an order, or contact us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
          <p className="text-gray-300">
            Your information is used to process orders, manage your account,
            improve our services, and communicate important updates related
            to your purchases or our platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">4. Data Sharing</h2>
          <p className="text-gray-300">
            We do not sell or rent your personal data to third parties.
            Information may only be shared with trusted service providers
            (such as payment gateways or delivery partners) when necessary
            to complete your order.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">5. Data Security</h2>
          <p className="text-gray-300">
            We implement reasonable security measures to protect your
            personal data. However, no method of transmission over the
            internet is 100% secure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">6. Cookies</h2>
          <p className="text-gray-300">
            Sticke may use cookies to enhance your browsing experience,
            analyze website traffic, and improve functionality. You may
            choose to disable cookies through your browser settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">7. Your Rights</h2>
          <p className="text-gray-300">
            You have the right to access, update, or request deletion of
            your personal information, subject to legal requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
          <p className="text-gray-300">
            We may update this Privacy Policy from time to time. Any changes
            will be effective immediately once posted on the website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">9. Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions regarding this Privacy Policy, you may
            contact us at:
          </p>
          <p className="text-gray-300">
            📧 Email: <span className="text-blue-400">normallllthe@gmail.com</span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
