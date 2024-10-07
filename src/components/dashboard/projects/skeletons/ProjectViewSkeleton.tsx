export const ProjectViewSkeleton = () => {
  return (
    <div className="space-y-6 p-6 animate-pulse">
      {/* Project Title */}
      <div className="h-8 bg-gray-300 dark:bg-trueGray-700 rounded w-1/2 mb-4"></div>

      {/* Project Status, Dates */}
      <div className="flex space-x-4 mb-4">
        <div className="h-4 bg-gray-300 dark:bg-trueGray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-trueGray-700 rounded w-1/4"></div>
      </div>

      {/* Kanban Board Simulation */}
      <div className="grid grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="col-span-1">
          <div className="h-6 bg-gray-300 dark:bg-trueGray-700 rounded mb-2"></div>
          <div className="space-y-2">
            <div className="h-16 bg-gray-300 dark:bg-trueGray-700 rounded"></div>
            <div className="h-16 bg-gray-300 dark:bg-trueGray-700 rounded"></div>
            <div className="h-16 bg-gray-300 dark:bg-trueGray-700 rounded"></div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="col-span-1">
          <div className="h-6 bg-gray-300 dark:bg-trueGray-700 rounded mb-2"></div>
          <div className="space-y-2">
            <div className="h-16 bg-gray-300 dark:bg-trueGray-700 rounded"></div>
            <div className="h-16 bg-gray-300 dark:bg-trueGray-700 rounded"></div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="col-span-1">
          <div className="h-6 bg-gray-300 dark:bg-trueGray-700 rounded mb-2"></div>
          <div className="space-y-2">
            <div className="h-16 bg-gray-300 dark:bg-trueGray-700 rounded"></div>
            <div className="h-16 bg-gray-300 dark:bg-trueGray-700 rounded"></div>
            <div className="h-16 bg-gray-300 dark:bg-trueGray-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* New Task Button */}
      <div className="h-10 bg-indigo-300 dark:bg-indigo-700 rounded-md w-32 mt-6"></div>
    </div>
  );
};
