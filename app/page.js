import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-10">
      <nav className="w-full max-w-4xl flex justify-between items-center py-6 mt-2">
        <h1 className="text-2xl font-semibold text-white">Society Complaint Log</h1>
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/login"
              className="text-gray-200 hover:text-white hover:underline transition"
            >
              Admin Login
            </Link>
          </li>
          <li>
            <Link
              href="/userLogin"
              className="text-gray-200 hover:text-white hover:underline transition"
            >
              User Login
            </Link>
          </li>
        </ul>
      </nav>

      <main className="text-center mt-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to the Society Complaint Log
        </h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
          A streamlined platform for residents and administrators to manage complaints efficiently and transparently.
        </p>
        <div className="flex space-x-4 justify-center">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-medium transition shadow-md"
          >
            Login as Admin
          </Link>
          <Link
            href="/userLogin"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-white font-medium transition shadow-md"
          >
            Login as User
          </Link>
        </div>
      </main>
    </div>
  );
}
