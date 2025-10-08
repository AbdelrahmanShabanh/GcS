"use client";

import { useState, useEffect } from "react";
import { ApiClient } from "@/utils/api";

interface Leader {
  id: string;
  name: { ar: string; en: string };
  age: { ar: string; en: string };
  video: string;
  thumbnail: string;
}

export default function LeadersAdmin() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null);

  useEffect(() => {
    // Load existing data from API
    const loadLeaders = async () => {
      try {
        const response = await ApiClient.getLeaders();
        if (response.success && response.data) {
          setLeaders(response.data);
        }
      } catch (error) {
        console.error("Error loading leaders:", error);
      }
    };

    loadLeaders();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await ApiClient.updateLeaders(leaders);
      if (response.success) {
        alert("Leaders updated successfully!");
        // Reload data from database
        const reloadResponse = await ApiClient.getLeaders();
        if (reloadResponse.success && reloadResponse.data) {
          setLeaders(reloadResponse.data);
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

  const handleAddLeader = (leaderData: Omit<Leader, "id">) => {
    const newLeader: Leader = {
      ...leaderData,
      id: Date.now().toString(),
    };

    setLeaders((prev) => [...prev, newLeader]);
    setShowAddForm(false);
  };

  const handleEditLeader = (leader: Leader) => {
    setEditingLeader(leader);
  };

  const handleUpdateLeader = (updatedLeader: Leader) => {
    setLeaders((prev) =>
      prev.map((leader) =>
        leader.id === updatedLeader.id ? updatedLeader : leader
      )
    );
    setEditingLeader(null);
  };

  const handleDeleteLeader = (leaderId: string) => {
    // Don't allow deletion of the original 3 videos
    if (["malek", "saja", "parent"].includes(leaderId)) {
      alert(
        "Cannot delete the original placeholder videos. You can only edit them."
      );
      return;
    }

    if (confirm("Are you sure you want to delete this leader?")) {
      setLeaders((prev) => prev.filter((leader) => leader.id !== leaderId));
    }
  };

  const getEmbedUrl = (url: string) => {
    const videoId = url.split("/shorts/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Leaders Management
        </h2>
        <p className="text-gray-600">
          Manage student testimonials and parent feedback videos.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Note: The original 3 videos (Malek, Saja, Parent) are placeholders and
          cannot be deleted, only edited.
        </p>
      </div>

      {/* Leaders List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Current Leaders ({leaders.length})
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
          >
            Add Leader
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaders.map((leader) => (
            <div key={leader.id} className="border rounded-lg p-4 bg-gray-50">
              <img
                src={leader.thumbnail}
                alt={`${leader.name.en} testimonial`}
                className="w-full h-32 object-cover mb-3 rounded"
              />
              <h4 className="font-medium text-gray-900 mb-1">
                {leader.name.en} ({leader.name.ar})
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Age: {leader.age.en} ({leader.age.ar})
              </p>
              <div className="mb-3">
                <iframe
                  src={getEmbedUrl(leader.video)}
                  title="YouTube video"
                  className="w-full h-20 rounded"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditLeader(leader)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteLeader(leader.id)}
                  className={`text-sm ${
                    ["malek", "saja", "parent"].includes(leader.id)
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 hover:text-red-800"
                  }`}
                  disabled={["malek", "saja", "parent"].includes(leader.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Leader Form */}
      {showAddForm && (
        <LeaderForm
          onSubmit={handleAddLeader}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Leader Form */}
      {editingLeader && (
        <LeaderForm
          leader={editingLeader}
          onSubmit={handleUpdateLeader}
          onCancel={() => setEditingLeader(null)}
        />
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

// Leader Form Component
function LeaderForm({
  leader,
  onSubmit,
  onCancel,
}: {
  leader?: Leader;
  onSubmit: (leader: Leader) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: {
      ar: leader?.name.ar || "",
      en: leader?.name.en || "",
    },
    age: {
      ar: leader?.age.ar || "",
      en: leader?.age.en || "",
    },
    video: leader?.video || "",
    thumbnail: leader?.thumbnail || "",
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setFormData({ ...formData, thumbnail: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: leader?.id || "",
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">
          {leader ? "Edit Leader" : "Add New Leader"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name (English)
            </label>
            <input
              type="text"
              value={formData.name.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: { ...formData.name, en: e.target.value },
                })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name (Arabic)
            </label>
            <input
              type="text"
              value={formData.name.ar}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: { ...formData.name, ar: e.target.value },
                })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age (English)
            </label>
            <input
              type="text"
              value={formData.age.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  age: { ...formData.age, en: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age (Arabic)
            </label>
            <input
              type="text"
              value={formData.age.ar}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  age: { ...formData.age, ar: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              YouTube Video URL
            </label>
            <input
              type="url"
              value={formData.video}
              onChange={(e) =>
                setFormData({ ...formData, video: e.target.value })
              }
              required
              placeholder="https://youtube.com/shorts/..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              required={!leader}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {formData.thumbnail && (
              <div className="mt-2">
                <img
                  src={formData.thumbnail}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-md border"
                />
              </div>
            )}
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
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
            >
              {leader ? "Update" : "Add"} Leader
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
