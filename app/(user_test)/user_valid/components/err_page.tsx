'use client';
import { useOrigin } from "@/hooks/use-origin";

//'use client';
export default function Error(){
    const origin = useOrigin();
    console.log('Origin value ',origin);
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md">
              <h1 className="text-3xl font-bold text-center text-red-500 mb-4">Access Denied</h1>
              <p className="text-center text-gray-300">You do not have the necessary role to access this page.</p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => null}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Go to Home
                </button>
              </div>
            </div>
          </div>
          );
    
}