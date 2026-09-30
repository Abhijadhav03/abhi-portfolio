export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-900 via-gray-900 to-gray-800 flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-2 border-lime-400/20 border-t-lime-400 rounded-full animate-spin" />
        <span className="text-xs text-white/50 font-mono tracking-wider">Loading...</span>
      </div>
    </div>
  );
}
