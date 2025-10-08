"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import HeroAdmin from "../../components/admin/HeroAdmin";
import LearningPathAdmin from "../../components/admin/LearningPathAdmin";
import ProjectsAdmin from "../../components/admin/ProjectsAdmin";
import LeadersAdmin from "../../components/admin/LeadersAdmin";
import FAQAdmin from "../../components/admin/FAQAdmin";

type AdminSection = "hero" | "learning-path" | "projects" | "leaders" | "faq";

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<AdminSection>("hero");

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return null;
  }

  const sections = [
    { id: "hero" as AdminSection, name: "Hero Section", icon: "🏠" },
    { id: "learning-path" as AdminSection, name: "Learning Path", icon: "📚" },
    { id: "projects" as AdminSection, name: "Projects", icon: "🚀" },
    { id: "leaders" as AdminSection, name: "Leaders", icon: "👥" },
    { id: "faq" as AdminSection, name: "FAQ", icon: "❓" },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "hero":
        return <HeroAdmin />;
      case "learning-path":
        return <LearningPathAdmin />;
      case "projects":
        return <ProjectsAdmin />;
      case "leaders":
        return <LeadersAdmin />;
      case "faq":
        return <FAQAdmin />;
      default:
        return <HeroAdmin />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Manage your website content
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.email}
              </span>
              <button
                onClick={() => router.push("/")}
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
              >
                View Site
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Sections
              </h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        activeSection === section.id
                          ? "bg-teal-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-2">{section.icon}</span>
                      {section.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

