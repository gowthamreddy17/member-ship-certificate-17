// src/components/Signup.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      // Insert user data into users table
      await supabase
        .from('users')
        .insert([{ id: user.id, email, full_name: fullName, role: 'user' }]);
      window.location.href = '/user'; // Redirect to User Dashboard
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <a href="/">Already have an account? Login</a>
    </div>
  );
};

export default Signup;
