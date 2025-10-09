"use client";

import { useState, useEffect } from "react";
import { ApiClient } from "../../utils/api";

interface Course {
  id: string;
  img: string;
  t: string;
  d: { ar: string; en: string };
  order?: number;
}

interface LevelData {
  [key: string]: Course[];
}

export default function LearningPathAdmin() {
  const [levels, setLevels] = useState<LevelData>({});
  const [activeLevel, setActiveLevel] = useState<string>("المستوى الاول");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const levelNames = {
    "المستوى الاول": "Level 1",
    "المستوى الثاني": "Level 2",
    "المستوى الثالث": "Level 3",
  };

  useEffect(() => {
    // Load existing data from API
    const loadCourses = async () => {
      try {
        const response = await ApiClient.getCourses();
        if (response.success && response.data) {
          setLevels(response.data);
        }
      } catch (error) {
        console.error("Error loading courses:", error);
      }
    };

    loadCourses();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await ApiClient.updateCourses(levels);
      if (response.success) {
        alert("Learning path updated successfully!");
        // Reload data from database
        const reloadResponse = await ApiClient.getCourses();
        if (reloadResponse.success && reloadResponse.data) {
          setLevels(reloadResponse.data);
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

  const handleAddCourse = (courseData: Omit<Course, "id">) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
    };

    setLevels((prev) => ({
      ...prev,
      [activeLevel]: [...(prev[activeLevel] || []), newCourse],
    }));
    setShowAddForm(false);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    setLevels((prev) => ({
      ...prev,
      [activeLevel]: prev[activeLevel].map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      ),
    }));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setLevels((prev) => ({
        ...prev,
        [activeLevel]: prev[activeLevel].filter(
          (course) => course.id !== courseId
        ),
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Learning Path Management
        </h2>
        <p className="text-gray-600">Manage courses for each learning level.</p>
      </div>

      {/* Level Selection */}
      <div className="flex gap-2 flex-wrap">
        {Object.keys(levelNames).map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeLevel === level
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {levelNames[level as keyof typeof levelNames]}
          </button>
        ))}
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Courses in {levelNames[activeLevel as keyof typeof levelNames]}
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
          >
            Add Course
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels[activeLevel]?.map((course) => (
            <div key={course.id} className="border rounded-lg p-4 bg-gray-50">
              <img
                src={course.img}
                alt={course.t}
                className="w-full h-32 object-contain mb-3 rounded"
              />
              <h4 className="font-medium text-gray-900 mb-1">{course.t}</h4>
              <p className="text-sm text-gray-600 mb-3">
                AR: {course.d.ar} | EN: {course.d.en}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditCourse(course)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Course Form */}
      {showAddForm && (
        <CourseForm
          onSubmit={handleAddCourse}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Course Form */}
      {editingCourse && (
        <CourseForm
          course={editingCourse}
          onSubmit={handleUpdateCourse}
          onCancel={() => setEditingCourse(null)}
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

// Course Form Component
function CourseForm({
  course,
  onSubmit,
  onCancel,
}: {
  course?: Course;
  onSubmit: (course: Course) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    img: course?.img || "",
    t: course?.t || "",
    d: {
      ar: course?.d.ar || "",
      en: course?.d.en || "",
    },
    order: course?.order || 1,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setFormData({ ...formData, img: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: course?.id || "",
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">
          {course ? "Edit Course" : "Add New Course"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name
            </label>
            <input
              type="text"
              value={formData.t}
              onChange={(e) => setFormData({ ...formData, t: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order (Position)
            </label>
            <input
              type="number"
              min="1"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Lower numbers appear first (1 = first position)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!course}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {formData.img && (
              <div className="mt-2">
                <img
                  src={formData.img}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sessions (Arabic)
            </label>
            <input
              type="text"
              value={formData.d.ar}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  d: { ...formData.d, ar: e.target.value },
                })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sessions (English)
            </label>
            <input
              type="text"
              value={formData.d.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  d: { ...formData.d, en: e.target.value },
                })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
            >
              {course ? "Update" : "Add"} Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
