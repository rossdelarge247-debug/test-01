import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, User } from 'lucide-react';

export function ProfileComplete() {
  return (
    <div className="max-w-xl mx-auto px-6 py-20 text-center">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={28} className="text-emerald-600" />
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-4">
        Your signal profile is ready
      </h1>
      <p className="text-gray-500 leading-relaxed mb-10">
        Your responses have been captured and your profile has been generated. You can view it in full, or explore how you align with sample roles.
      </p>

      <div className="flex flex-col gap-3">
        <Link
          to="/candidate/profile"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <User size={16} />
          View my signal profile
        </Link>
        <Link
          to="/candidate/dashboard"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
        >
          Go to dashboard
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
