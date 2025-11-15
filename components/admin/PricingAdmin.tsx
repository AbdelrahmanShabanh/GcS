"use client";

import { useState, useEffect } from "react";
import { ApiClient } from "../../utils/api";

interface PricingPlan {
  id: string;
  title: { ar: string; en: string };
  price: string;
  period: { ar: string; en: string };
  features: {
    ar: string[];
    en: string[];
  };
}

export default function PricingAdmin() {
  const [plans, setPlans] = useState<PricingPlan[]>([
    {
      id: "beginner",
      title: { ar: "مبتدأ", en: "Beginner" },
      price: "4800",
      period: { ar: "ربع سنوي", en: "Quarterly" },
      features: {
        ar: [
          "شهادة إتمام المستويات",
          "إرشاد تقني",
          "جلسات فردية تفاعلية عبر الإنترنت",
          "3 شهور - 12 جلسة",
          "اتاحة تجميد جلستين",
        ],
        en: [
          "Levels Completion Certificate",
          "Technical Guidance",
          "Interactive One-to-One Online Sessions",
          "3 months - 12 sessions",
          "Ability to Freeze 2 Sessions",
        ],
      },
    },
    {
      id: "expert",
      title: { ar: "احترافي", en: "Expert" },
      price: "16800",
      period: { ar: "سنوي", en: "Annually" },
      features: {
        ar: [
          "شهادة إتمام المستويات",
          "إرشاد تقني",
          "جلسات فردية تفاعلية عبر الإنترنت",
          "12 شهور - 48 جلسة",
          "اتاحة تجميد 8 جلسات",
        ],
        en: [
          "Levels Completion Certificate",
          "Technical Guidance",
          "Interactive One-to-One Online Sessions",
          "12 months - 48 sessions",
          "Ability to Freeze 8 Sessions",
        ],
      },
    },
    {
      id: "advanced",
      title: { ar: "متقدم", en: "Advanced" },
      price: "9120",
      period: { ar: "نصف سنوي", en: "Biannual" },
      features: {
        ar: [
          "شهادة إتمام المستويات",
          "إرشاد تقني",
          "جلسات فردية تفاعلية عبر الإنترنت",
          "6 شهور - 24 جلسة",
          "اتاحة تجميد 4 جلسات",
        ],
        en: [
          "Levels Completion Certificate",
          "Technical Guidance",
          "Interactive One-to-One Online Sessions",
          "6 months - 24 sessions",
          "Ability to Freeze 4 Sessions",
        ],
      },
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const response = await ApiClient.getPricing();
        if (response.success && response.data && response.data.length > 0) {
          setPlans(response.data);
        }
        // If no data from API, keep the default plans
      } catch (error) {
        console.error("Error loading pricing:", error);
        // Keep the default plans if API fails
      }
    };
    loadPricing();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await ApiClient.updatePricing(plans);
      if (response.success) {
        alert("Pricing updated successfully!");
        const reloadResponse = await ApiClient.getPricing();
        if (reloadResponse.success && reloadResponse.data) {
          setPlans(reloadResponse.data);
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

  const handleEditPlan = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: PricingPlan) => {
    if (editingPlan) {
      setPlans(
        plans.map((plan) => (plan.id === editingPlan.id ? formData : plan))
      );
    }
    setShowForm(false);
    setEditingPlan(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPlan(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Pricing Management</h2>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {plan.title.en || plan.title.ar || "Untitled Plan"}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditPlan(plan)}
                  className="p-1 text-blue-500 hover:text-blue-700"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="text-2xl font-bold text-teal-600 mb-2">
              {plan.price} EGP
            </div>
            <div className="text-sm text-gray-600 mb-3">
              {plan.period.en || plan.period.ar || "No period"}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Features:</strong>
              <ul className="mt-1 list-disc list-inside">
                {(plan.features.en || plan.features.ar || [])
                  .slice(0, 3)
                  .map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                {(plan.features.en || plan.features.ar || []).length > 3 && (
                  <li>
                    ...and{" "}
                    {(plan.features.en || plan.features.ar || []).length - 3}{" "}
                    more
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {showForm && editingPlan && (
        <PricingForm
          plan={editingPlan}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}

function PricingForm({
  plan,
  onSubmit,
  onCancel,
}: {
  plan: PricingPlan;
  onSubmit: (plan: PricingPlan) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<PricingPlan>(plan);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addFeature = (lang: "ar" | "en") => {
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [lang]: [...formData.features[lang], ""],
      },
    });
  };

  const updateFeature = (lang: "ar" | "en", index: number, value: string) => {
    const newFeatures = [...formData.features[lang]];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [lang]: newFeatures,
      },
    });
  };

  const removeFeature = (lang: "ar" | "en", index: number) => {
    const newFeatures = formData.features[lang].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [lang]: newFeatures,
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Edit Pricing Plan</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title (Arabic)
              </label>
              <input
                type="text"
                value={formData.title.ar}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: { ...formData.title, ar: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title (English)
              </label>
              <input
                type="text"
                value={formData.title.en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: { ...formData.title, en: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (EGP)
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Period (Arabic)
              </label>
              <input
                type="text"
                value={formData.period.ar}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    period: { ...formData.period, ar: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period (English)
            </label>
            <input
              type="text"
              value={formData.period.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  period: { ...formData.period, en: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Features (Arabic)
                </label>
                <button
                  type="button"
                  onClick={() => addFeature("ar")}
                  className="text-sm text-teal-500 hover:text-teal-700"
                >
                  + Add Feature
                </button>
              </div>
              {formData.features.ar.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature("ar", index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature("ar", index)}
                    className="px-2 py-1 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Features (English)
                </label>
                <button
                  type="button"
                  onClick={() => addFeature("en")}
                  className="text-sm text-teal-500 hover:text-teal-700"
                >
                  + Add Feature
                </button>
              </div>
              {formData.features.en.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature("en", index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature("en", index)}
                    className="px-2 py-1 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
            >
              Save Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
