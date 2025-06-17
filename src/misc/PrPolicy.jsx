const PrPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-left text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-600 italic">
        Last updated: 12/6/25
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          This Privacy Policy explains how we collect, use, and protect your information when you use our platform. By using our services, you agree to the collection and use of information in accordance with this policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><strong>Personal Information:</strong> such as your name, email, and login details</li>
          <li><strong>Cookies:</strong> small files stored on your device to enhance user experience</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
        <p>
          We use your information to:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Provide and improve our services</li>
          <li>Communicate with you regarding your account</li>
          <li>Monitor usage and detect technical issues</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Sharing Your Information</h2>
        <p>
          We do not sell or rent your personal information. We may share limited data with service providers (when we have them) strictly to operate and improve the platform, under confidentiality agreements.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
        <p>
          We use standard industry measures to safeguard your information. However, no method of transmission over the internet is 100% secure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Your Choices</h2>
        <p>
          You can manage your privacy preferences through your account settings. You may also request deletion of your account or data by contacting us.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
        <p>
          We may update this policy occasionally. Any changes will be reflected on this page with an updated date.
        </p>
      </section>

      <p className="mt-6 text-sm text-gray-500">
        For any questions or concerns about this Privacy Policy, feel free to contact us.
      </p>
    </div>
  );
};

export default PrPolicy;
