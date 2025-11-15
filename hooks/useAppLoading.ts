"use client";

import { useState, useEffect } from "react";
import { ApiClient } from "../utils/api";

export function useAppLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadAllData = async () => {
      const totalSteps = 6; // Number of API calls
      let completedSteps = 0;

      const updateProgress = () => {
        completedSteps++;
        setLoadingProgress(Math.round((completedSteps / totalSteps) * 100));
      };

      try {
        // Load all data in parallel for better performance
        const promises = [
          ApiClient.getHeroData().then(() => updateProgress()),
          ApiClient.getCourses().then(() => updateProgress()),
          ApiClient.getProjects().then(() => updateProgress()),
          ApiClient.getPricing().then(() => updateProgress()),
          ApiClient.getLeaders().then(() => updateProgress()),
          ApiClient.getFAQs().then(() => updateProgress()),
        ];

        await Promise.allSettled(promises);

        // Add a small delay to show the loader
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error loading app data:", error);
        // Still hide loader even if some requests fail
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    loadAllData();
  }, []);

  return { isLoading, loadingProgress };
}
