import React from 'react';

const Signin = () => {
  return (
  <div className="h-screen flex items-center justify-center  bg-blue-500">
  <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
    
  
    <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>
    <p className="text-center text-gray-200 mt-2">Sign in to your account</p>

    
    <form className="mt-8 space-y-6">
      
      <div>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 bg-white/20 border border-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
       
      </div>

    
      <div>
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 bg-white/20 border border-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
            </div>

      {/* Remember & Forgot Password */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center text-gray-200 gap-2">
          <input type="checkbox" className="w-4 h-4" /> Remember me
        </label>
        <a href="#" className="text-blue-300 hover:underline">
          Forgot password?
        </a>
      </div>


      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition"
      >
        Sign In
      </button>
    </form>

  
    <div className="flex items-center gap-4 my-6">
      <div className="flex-grow h-px bg-gray-400/40"></div>
      
    
    </div>
  </div>
</div>



  );
}

export default Signin;
