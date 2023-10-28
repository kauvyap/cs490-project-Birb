import React from 'react';

const Signup = () => {
  const handleGoogleSignup = () => {
    try {
      // Redirect the user to the Google OAuth URL
      window.location.href = 'http://localhost:5000/auth/google';
    } catch (error) {
      console.error('Error initiating Google OAuth:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {/* Other signup form fields */}
      <button onClick={handleGoogleSignup}>Sign up with Google</button>
    </div>
  );
};

export default Signup;
