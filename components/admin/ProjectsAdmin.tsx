"use client";

import { useState, useEffect } from "react";
import { ApiClient } from "../../utils/api";

interface Project {
  id: string;
  name: string;
  img: string;
  description: { ar: string; en: string };
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saveProgress, setSaveProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    // Load existing data from API
    const loadProjects = async () => {
      try {
        const response = await ApiClient.getProjects();
        if (response.success && response.data) {
          // Transform data to match the expected format
          const transformedProjects = response.data.map((project: any) => ({
            id: project.id,
            name: project.name,
            img: project.image,
            description: project.description,
          }));
          setProjects(transformedProjects);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    loadProjects();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    setSaveProgress({ current: 0, total: projects.length });

    try {
      // Try the new individual save approach first
      try {
        // First, clear all existing projects
        const clearResponse = await fetch("/api/projects/clear", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!clearResponse.ok) {
          throw new Error("Failed to clear existing projects");
        }

        // Then save projects one by one
        for (let i = 0; i < projects.length; i++) {
          const project = projects[i];
          const projectData = {
            name: project.name,
            image: project.img,
            description: project.description,
          };

          console.log(
            `Saving project ${i + 1}/${projects.length}:`,
            project.name
          );
          setSaveProgress({ current: i + 1, total: projects.length });

          const response = await fetch("/api/projects/single", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
          });

          if (!response.ok) {
            throw new Error(
              `Failed to save project ${project.name}: ${response.status}`
            );
          }
        }

        alert("All projects saved successfully!");
      } catch (individualError) {
        console.log("Individual save failed, trying bulk save:", individualError);
        
        // Fallback to bulk save with aggressive compression
        const transformedProjects = projects.map((project) => ({
          name: project.name,
          image: project.img,
          description: project.description,
        }));

        // Check if we can compress the data enough
        const payloadSize = JSON.stringify(transformedProjects).length;
        console.log("Fallback payload size:", payloadSize, "bytes");
        
        if (payloadSize > 500000) { // 500KB limit for fallback
          throw new Error("Data is still too large even for fallback. Please reduce image sizes.");
        }

        const response = await ApiClient.updateProjects(transformedProjects);
        if (response.success) {
          alert("Projects saved successfully using fallback method!");
        } else {
          throw new Error(response.error || "Fallback save failed");
        }
      }

      // Reload data from database
      const reloadResponse = await ApiClient.getProjects();
      if (reloadResponse.success && reloadResponse.data) {
        const transformedProjects = reloadResponse.data.map((project: any) => ({
          id: project.id,
          name: project.name,
          img: project.image,
          description: project.description,
        }));
        setProjects(transformedProjects);
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving projects: " + error);
    } finally {
      setIsLoading(false);
      setSaveProgress({ current: 0, total: 0 });
    }
  };

  const handleAddProject = (projectData: Omit<Project, "id">) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
    };

    setProjects((prev) => [...prev, newProject]);
    setShowAddForm(false);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Projects Management
        </h2>
        <p className="text-gray-600">
          Manage student projects showcased on your website.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Current Projects ({projects.length})
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
          >
            Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 bg-gray-50">
              <img
                src={project.img}
                alt={project.name}
                className="w-full h-32 object-cover mb-3 rounded"
              />
              <h4 className="font-medium text-gray-900 mb-2">{project.name}</h4>
              <p className="text-sm text-gray-600 mb-1">
                <strong>AR:</strong> {project.description.ar}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>EN:</strong> {project.description.en}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditProject(project)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Project Form */}
      {showAddForm && (
        <ProjectForm
          onSubmit={handleAddProject}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Project Form */}
      {editingProject && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleUpdateProject}
          onCancel={() => setEditingProject(null)}
        />
      )}

      {/* Save Button */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Total projects: {projects.length} | Payload size:{" "}
          {Math.round(
            JSON.stringify(
              projects.map((p) => ({
                name: p.name,
                image: p.img,
                description: p.description,
              }))
            ).length / 1024
          )}
          KB
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading
            ? `Saving... ${saveProgress.current}/${saveProgress.total}`
            : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// Project Form Component
function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: {
  project?: Project;
  onSubmit: (project: Project) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: project?.name || "",
    img: project?.img || "",
    description: {
      ar: project?.description.ar || "",
      en: project?.description.en || "",
    },
  });
  const [isCompressing, setIsCompressing] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert(
          "Image size must be less than 2MB. Please compress the image or choose a smaller file."
        );
        return;
      }

      setIsCompressing(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;

        // Check if it's a GIF
        if (
          file.type === "image/gif" ||
          file.name.toLowerCase().endsWith(".gif")
        ) {
          // For GIFs, we'll use the original file but with size validation
          if (file.size > 500 * 1024) {
            // 500KB limit for GIFs
            alert(
              "GIF size must be less than 500KB. Please compress the GIF or choose a smaller file."
            );
            setIsCompressing(false);
            return;
          }
          setFormData({ ...formData, img: imageUrl });
          setIsCompressing(false);
        } else {
          // For other images, compress them
          compressImage(imageUrl, (compressedUrl) => {
            setFormData({ ...formData, img: compressedUrl });
            setIsCompressing(false);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (
    src: string,
    callback: (compressedSrc: string) => void
  ) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions (max 400px width for better compression)
      const maxWidth = 400;
      const maxHeight = 300;
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);

      // Convert to base64 with high compression (0.5 quality)
      const compressedSrc = canvas.toDataURL("image/jpeg", 0.5);

      // Check if compressed size is still too large (limit to 200KB)
      const sizeInBytes = (compressedSrc.length * 3) / 4;
      if (sizeInBytes > 200 * 1024) {
        // Further compress with even lower quality
        const furtherCompressedSrc = canvas.toDataURL("image/jpeg", 0.3);
        callback(furtherCompressedSrc);
      } else {
        callback(compressedSrc);
      }
    };

    img.src = src;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: project?.id || "",
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">
          {project ? "Edit Project" : "Add New Project"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Image/GIF
            </label>
            <input
              type="file"
              accept="image/*,.gif,image/gif"
              onChange={handleImageChange}
              required={!project}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supports images (JPG, PNG, WebP) and GIFs. Max size: 2MB for
              images, 500KB for GIFs (images will be compressed automatically,
              GIFs keep original quality)
            </p>
            {isCompressing && (
              <div className="mt-2 text-sm text-blue-600">
                Processing image...
              </div>
            )}
            {formData.img && (
              <div className="mt-2">
                <img
                  src={formData.img}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-md border"
                />
                {formData.img.includes("data:image/gif") && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ GIF animation preserved
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Arabic)
            </label>
            <textarea
              value={formData.description.ar}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { ...formData.description, ar: e.target.value },
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (English)
            </label>
            <textarea
              value={formData.description.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { ...formData.description, en: e.target.value },
                })
              }
              rows={3}
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
              {project ? "Update" : "Add"} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
