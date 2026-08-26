export default function Sidebar() {
  return (
    <aside className="w-[340px] bg-white rounded-r-3xl shadow-sm p-6">
      <h1 className="text-4xl font-bold">
        <span className="text-black">Veda</span>
        <span className="text-orange-500">AI</span>
      </h1>

      <div className="mt-12">
        <button className="w-full bg-black text-white rounded-full py-4">
          AI Teacher's Toolkit
        </button>
      </div>

      <nav className="mt-12 space-y-6 text-gray-600">
        <p>Home</p>
        <p>My Classroom</p>
        <p>Assignments</p>

        <div className="bg-gray-100 p-3 rounded-xl">
          Exams
        </div>

        <p>My Library</p>
      </nav>
    </aside>
  );
}