export default function Loading() {
  return (
    <div className="min-h-screen bg-[#111714] flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-2 border-[#3d9e6e]/20 border-t-[#4fd196] rounded-full animate-spin" />
        <span className="text-xs text-white/50 font-mono tracking-wider">Loading...</span>
      </div>
    </div>
  );
}
