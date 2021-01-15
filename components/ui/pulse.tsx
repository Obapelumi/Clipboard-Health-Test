export default function Pulse() {
  return (
    <div className="animate-pulse mb-8">
      <div className="h-4 bg-gray-300 rounded w-2/4 mb-4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-300"></div>
        <div className="h-3 bg-gray-300 w-5/6"></div>
        <div className="h-3 bg-gray-300 w-4/6"></div>
      </div>
    </div>
  );
}
