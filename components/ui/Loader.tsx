"use client";

interface LoaderProps {
  isLoading: boolean;
  progress?: number;
}

export default function Loader({ isLoading, progress = 0 }: LoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative">
        {/* Main spinning circle */}
        <div className="w-20 h-20 border-4 border-gray-200 border-t-teal-500 rounded-full animate-spin"></div>

        {/* Inner pulsing circle */}
        <div
          className="absolute inset-2 w-16 h-16 border-4 border-gray-100 border-t-orange-500 rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>

        {/* Center pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full animate-pulse"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          <div
            className="absolute top-2 left-2 w-2 h-2 bg-teal-400 rounded-full animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "2s" }}
          ></div>
          <div
            className="absolute top-4 right-3 w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}
          ></div>
          <div
            className="absolute bottom-3 left-4 w-1 h-1 bg-teal-300 rounded-full animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "1.8s" }}
          ></div>
          <div
            className="absolute bottom-2 right-2 w-2 h-2 bg-orange-300 rounded-full animate-bounce"
            style={{ animationDelay: "1.5s", animationDuration: "2.2s" }}
          ></div>
        </div>
      </div>

      {/* Loading text and progress */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Loading GC School
          </h3>

          {/* Progress bar */}
          <div className="w-64 bg-gray-200 rounded-full h-2 mb-3">
            <div
              className="bg-gradient-to-r from-teal-500 to-orange-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-sm text-gray-600 mb-2">{progress}% Complete</p>

          <div className="flex items-center justify-center space-x-1">
            <div
              className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-orange-50 opacity-30"></div>
    </div>
  );
}
