// utils/api.ts
const API_BASE_URL = "/api";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class ApiClient {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API request failed:", error);
      return {
        success: false,
        error: "Network error",
      };
    }
  }

  // Auth API
  static async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // Hero API
  static async getHeroData() {
    return this.request("/hero");
  }

  static async updateHeroData(imageUrl: string) {
    return this.request("/hero", {
      method: "POST",
      body: JSON.stringify({ image: imageUrl }),
    });
  }

  // Courses API
  static async getCourses() {
    return this.request("/courses");
  }

  static async updateCourses(courses: any) {
    return this.request("/courses", {
      method: "POST",
      body: JSON.stringify({ courses }),
    });
  }

  // Projects API
  static async getProjects() {
    return this.request("/projects");
  }

  static async updateProjects(projects: any) {
    return this.request("/projects", {
      method: "POST",
      body: JSON.stringify({ projects }),
    });
  }

  // Leaders API
  static async getLeaders() {
    return this.request("/leaders");
  }

  static async updateLeaders(leaders: any) {
    return this.request("/leaders", {
      method: "POST",
      body: JSON.stringify({ leaders }),
    });
  }

  // FAQ API
  static async getFAQs() {
    return this.request("/faq");
  }

  static async updateFAQs(faqs: any) {
    return this.request("/faq", {
      method: "POST",
      body: JSON.stringify({ faqs }),
    });
  }

  // Pricing API
  static async getPricing() {
    return this.request("/pricing");
  }

  static async updatePricing(pricing: any) {
    return this.request("/pricing", {
      method: "POST",
      body: JSON.stringify({ pricing }),
    });
  }
}
