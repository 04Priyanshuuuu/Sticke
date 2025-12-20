"use client";
import React from "react";

const TermsOfUsePage = () => {
  return (
    <div className="bg-black min-h-screen text-white px-6 mt-22 md:px-16 py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center">
          Terms of Use
        </h1>

        <p className="text-gray-400 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-gray-300">
            By accessing or using Sticke, you agree to be bound by these
            Terms of Use. If you do not agree with any part of these terms,
            you must not use the website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">2. Use of the Website</h2>
          <p className="text-gray-300">
            Sticke is an online platform that allows users to browse,
            purchase, and order custom stickers. You agree to use the
            website only for lawful purposes and in a manner that does not
            violate any applicable laws or regulations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">3. User Accounts</h2>
          <p className="text-gray-300">
            Certain features of the website may require you to create an
            account. You are responsible for maintaining the confidentiality
            of your account credentials and for all activities that occur
            under your account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">4. Orders and Payments</h2>
          <p className="text-gray-300">
            All orders placed through Sticke are subject to product
            availability and confirmation. Prices, offers, and products
            may change at any time without prior notice. Sticke is not
            responsible for payment failures caused by third-party
            services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">5. Custom Stickers</h2>
          <p className="text-gray-300">
            When uploading content for custom stickers, you confirm that
            you own the rights to the content or have legal permission to
            use it. Content that infringes on intellectual property rights
            or violates any laws is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>
          <p className="text-gray-300">
            All content on Sticke, including but not limited to text,
            graphics, logos, images, and website design, is the property
            of Sticke and is protected by applicable intellectual property
            laws. Unauthorized use is not permitted.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">7. Returns and Refunds</h2>
          <p className="text-gray-300">
            Returns and refunds are subject to our Return Policy, if
            applicable. Custom stickers are generally non-refundable
            unless they are defective or damaged.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">8. Limitation of Liability</h2>
          <p className="text-gray-300">
            Sticke shall not be liable for any direct, indirect, incidental,
            or consequential damages arising from your use of the website.
            The website is provided on an "as is" and "as available" basis.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">9. Termination</h2>
          <p className="text-gray-300">
            Sticke reserves the right to suspend or terminate your access
            to the website at any time, without prior notice, if you violate
            these Terms of Use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">10. Changes to These Terms</h2>
          <p className="text-gray-300">
            Sticke may update these Terms of Use at any time. Any changes
            will be effective immediately upon being posted on the website.
            Continued use of the website constitutes acceptance of the
            updated terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">11. Contact Information</h2>
          <p className="text-gray-300">
            If you have any questions or concerns about these Terms of Use,
            you may contact us at:
          </p>
          <p className="text-gray-300">
            📧 Email: <span className="text-blue-400">normallllthe@gmail.com</span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
