const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 my-27 text-gray-700">
      <h2 className="text-2xl font-bold">📃 Terms & Conditions</h2>
      <p>
        By using BazaarTracker, you agree to our platform’s rules and responsibilities. This includes using real data, respectful communication, and proper use of our services.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>You must provide accurate information when registering or submitting data.</li>
        <li>Vendors must not upload fake or misleading price data.</li>
        <li>We store your data securely and do not sell it to third parties.</li>
        <li>All payments are processed through Stripe, and transactions are final.</li>
        <li>We may modify these terms without prior notice.</li>
      </ul>
      <p>If you have any questions, contact us at <strong>support@bazaartracker.com</strong></p>
    </div>
  );
};

export default Terms;
