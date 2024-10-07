import React from 'react';

export const ProjectModalSkeleton = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white dark:bg-trueGray-900 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto animate-pulse">
        <h2 className="h-6 w-32 bg-gray-300 dark:bg-trueGray-700 rounded mb-4"></h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Project Name</label>
            <div className="mt-1 h-10 bg-gray-300 dark:bg-trueGray-700 rounded-md"></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
            <div className="mt-1 h-20 bg-gray-300 dark:bg-trueGray-700 rounded-md"></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Status</label>
            <div className="mt-1 h-10 bg-gray-300 dark:bg-trueGray-700 rounded-md"></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Start Date</label>
            <div className="mt-1 h-10 bg-gray-300 dark:bg-trueGray-700 rounded-md"></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">End Date</label>
            <div className="mt-1 h-10 bg-gray-300 dark:bg-trueGray-700 rounded-md"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-10 w-24 bg-indigo-300 rounded-md"></div>
            <div className="h-10 w-24 bg-gray-300 dark:bg-trueGray-700 rounded-md"></div>
          </div>
        </form>
      </div>
    </div>
  );
};
