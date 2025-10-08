"use client";

import { useState, useEffect } from "react";
import { ApiClient } from "../../utils/api";

interface HeroData {
  image: string;
}

export default function HeroAdmin() {
  const [heroData, setHeroData] = useState<HeroData>({
    image: "/age-range.png",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load existing data from API
    const loadHeroData = async () => {
      try {
        const response = await ApiClient.getHeroData();
        if (response.success && response.data) {
          setHeroData(response.data);
        }
      } catch (error) {
        console.error("Error loading hero data:", error);
      }
    };

    loadHeroData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setHeroData({ ...heroData, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await ApiClient.updateHeroData(heroData.image);
      if (response.success) {
        alert("Hero section updated successfully!");
      } else {
        alert("Error saving changes: " + response.error);
      }
    } catch (error) {
      alert("Error saving changes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Hero Section
        </h2>
        <p className="text-gray-600">
          Manage the main hero image displayed on your homepage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Hero Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <img
              src={heroData.image}
              alt="Current hero image"
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        </div>

        {/* Upload New Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload New Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            Recommended size: 640x520px or similar aspect ratio
          </p>
        </div>
      </div>

      {/* Preview */}
      {heroData.image && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview
          </label>
          <div className="border rounded-lg p-4 bg-gray-50">
            <img
              src={heroData.image}
              alt="Preview"
              className="w-full max-w-md mx-auto rounded-lg shadow-sm"
            />
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
