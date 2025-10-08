"use client";

import { useState, useEffect } from "react";
import { ApiClient } from "../../utils/api";

interface FAQ {
  id: string;
  question: { ar: string; en: string };
  answer: { ar: string; en: string };
}

export default function FAQAdmin() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  useEffect(() => {
    // Load existing data from API
    const loadFAQs = async () => {
      try {
        const response = await ApiClient.getFAQs();
        if (response.success && response.data) {
          setFaqs(response.data);
        }
      } catch (error) {
        console.error("Error loading FAQs:", error);
      }
    };

    loadFAQs();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await ApiClient.updateFAQs(faqs);
      if (response.success) {
        alert("FAQs updated successfully!");
        // Reload data from database
        const reloadResponse = await ApiClient.getFAQs();
        if (reloadResponse.success && reloadResponse.data) {
          setFaqs(reloadResponse.data);
        }
      } else {
        alert("Error saving changes: " + response.error);
      }
    } catch (error) {
      alert("Error saving changes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFaq = (faqData: Omit<FAQ, "id">) => {
    const newFaq: FAQ = {
      ...faqData,
      id: Date.now().toString(),
    };

    setFaqs((prev) => [...prev, newFaq]);
    setShowAddForm(false);
  };

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq(faq);
  };

  const handleUpdateFaq = (updatedFaq: FAQ) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === updatedFaq.id ? updatedFaq : faq))
    );
    setEditingFaq(null);
  };

  const handleDeleteFaq = (faqId: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs((prev) => prev.filter((faq) => faq.id !== faqId));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          FAQ Management
        </h2>
        <p className="text-gray-600">
          Manage frequently asked questions and their answers.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Current FAQs ({faqs.length})
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 text-white bg-teal-500 rounded-md transition-colors hover:bg-teal-600"
          >
            Add FAQ
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">FAQ #{index + 1}</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditFaq(faq)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(faq.id)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <strong className="text-sm text-gray-700">
                    Question (EN):
                  </strong>
                  <p className="text-sm text-gray-600">{faq.question.en}</p>
                </div>
                <div>
                  <strong className="text-sm text-gray-700">
                    Question (AR):
                  </strong>
                  <p className="text-sm text-gray-600">{faq.question.ar}</p>
                </div>
                <div>
                  <strong className="text-sm text-gray-700">
                    Answer (EN):
                  </strong>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {faq.answer.en}
                  </p>
                </div>
                <div>
                  <strong className="text-sm text-gray-700">
                    Answer (AR):
                  </strong>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {faq.answer.ar}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add FAQ Form */}
      {showAddForm && (
        <FAQForm
          onSubmit={handleAddFaq}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit FAQ Form */}
      {editingFaq && (
        <FAQForm
          faq={editingFaq}
          onSubmit={handleUpdateFaq}
          onCancel={() => setEditingFaq(null)}
        />
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-2 text-white bg-teal-500 rounded-md transition-colors hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// FAQ Form Component
function FAQForm({
  faq,
  onSubmit,
  onCancel,
}: {
  faq?: FAQ;
  onSubmit: (faq: FAQ) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    question: {
      ar: faq?.question.ar || "",
      en: faq?.question.en || "",
    },
    answer: {
      ar: faq?.answer.ar || "",
      en: faq?.answer.en || "",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: faq?.id || "",
      ...formData,
    });
  };

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="mb-4 text-lg font-semibold">
          {faq ? "Edit FAQ" : "Add New FAQ"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Question (English)
            </label>
            <input
              type="text"
              value={formData.question.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  question: { ...formData.question, en: e.target.value },
                })
              }
              required
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Question (Arabic)
            </label>
            <input
              type="text"
              value={formData.question.ar}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  question: { ...formData.question, ar: e.target.value },
                })
              }
              required
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Answer (English)
            </label>
            <textarea
              value={formData.answer.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  answer: { ...formData.answer, en: e.target.value },
                })
              }
              required
              rows={4}
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Answer (Arabic)
            </label>
            <textarea
              value={formData.answer.ar}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  answer: { ...formData.answer, ar: e.target.value },
                })
              }
              required
              rows={4}
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600"
            >
              {faq ? "Update" : "Add"} FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
