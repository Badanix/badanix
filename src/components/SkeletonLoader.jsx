export const SkeletonLoader = () => (
    <div className="space-y-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-200 animate-skeleton rounded w-full mx-auto"
        ></div>
      ))}
    </div>
  );
  