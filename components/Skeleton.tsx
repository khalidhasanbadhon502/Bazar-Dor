export default function Skeleton() {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm animate-pulse">
      <div className="w-10 h-10 bg-gray-200 rounded-lg mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="flex justify-between items-center border-t pt-3">
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
}