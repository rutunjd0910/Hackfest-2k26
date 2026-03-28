import { useState } from "react";
import { Leaf, Mail, Lock, User, MapPin, Building, ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'business' ? 'business' : 'individual';
  
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store role and name for sidebar detection across routes
    sessionStorage.setItem("envify_role", role);
    if (!isLogin && name) {
      sessionStorage.setItem("envify_user_name", name);
    } else if (isLogin) {
      // If logging in, always forcefully reset to the correct default demo name for the selected role
      sessionStorage.setItem("envify_user_name", role === 'business' ? "Acme Industries" : "Rutunj Dewase");
    }

    if (role === 'business') {
      navigate('/business/dashboard');
    } else {
      navigate('/individual/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Leaf className="w-12 h-12 text-brand-green" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create an Envify account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Role Toggle for Registration */}
            {!isLogin && (
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setRole('individual')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${role === 'individual' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Individual
                </button>
                <button
                  type="button"
                  onClick={() => setRole('business')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${role === 'business' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Business
                </button>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="focus:ring-brand-green focus:border-brand-green block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 bg-gray-50" placeholder="Rutunj Dewase" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" required className="focus:ring-brand-green focus:border-brand-green block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 bg-gray-50" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input type="password" required className="focus:ring-brand-green focus:border-brand-green block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 bg-gray-50" placeholder="••••••••" />
              </div>
            </div>

            {/* Extra fields for registration */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location (City)</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" required className="focus:ring-brand-green focus:border-brand-green block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 bg-gray-50" placeholder="Nagpur" />
                  </div>
                </div>

                {role === 'business' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Industry Type</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="text" required className="focus:ring-brand-green focus:border-brand-green block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 bg-gray-50" placeholder="Manufacturing" />
                    </div>
                  </div>
                )}
              </>
            )}

            <div>
              {/* Login mode role selector for Demo purposes */}
              {isLogin && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Login as (Demo Setting)</label>
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm rounded-lg bg-gray-50"
                  >
                    <option value="individual">Individual</option>
                    <option value="business">Business</option>
                  </select>
                </div>
              )}

              <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition">
                {isLogin ? 'Sign in' : 'Create account'} 
                <ArrowRight className="ml-2 w-4 h-4 mt-0.5" />
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isLogin ? 'New to Envify?' : 'Already have an account?'}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-medium text-brand-blue hover:text-blue-800 transition"
              >
                {isLogin ? 'Create an account now' : 'Sign in to existing account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
