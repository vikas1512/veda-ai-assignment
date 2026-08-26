export default function Topbar() {
  return (
    <div className="h-20 bg-white rounded-2xl px-6 flex items-center justify-between shadow-sm text-black">
      <div className="flex items-center gap-4">
        <span>←</span>
        <span className="text-gray-500">Exams</span>
      </div>

      <div className="flex items-center gap-6">
        <span>❔</span>
        <span>🔔</span>
        <span>✨</span>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-orange-300" />
          <span>Madhur Rastogi</span>
        </div>
      </div>
    </div>
  );
}