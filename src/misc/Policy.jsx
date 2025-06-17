const Policy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-left text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Content Policy</h1>
      <p className="mb-4 text-sm text-gray-600 italic">
        Last updated: 12/6/25
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. User-Generated Content</h2>
        <p className="mb-2">
          Users are responsible for the content they create and share on this platform.
          Content must not include illegal, abusive, or harmful material, including but not limited to:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Hate speech, threats, or harassment</li>
          <li>Graphic violence or explicit adult content</li>
          <li>Plagiarized or copyrighted material without permission (Little bit of AI is permitted)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Respectful Communication</h2>
        <p>
          We encourage constructive discussion and respectful interactions. Offensive, misleading,
          or spammy behavior may lead to account suspension or removal of content.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Content Moderation</h2>
        <p>
          Our team (It's just me and homie) may review and moderate posts that are reported by us. We reserve the right to edit, hide, or remove any content that violates
          our guidelines without prior notice.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
        <p>
          All content must respect the intellectual property rights of others. By publishing
          content, you affirm that you have the necessary rights or licenses to do so.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Changes to the Policy</h2>
        <p>
          We may update this policy from time to time. Continued use of the platform after
          changes are made will be considered acceptance of those changes.
        </p>
      </section>

      <p className="mt-6 text-sm text-gray-500">
        If you have questions or concerns about this policy, feel free to reach out to us.
      </p>
    </div>
  );
};

export default Policy;
