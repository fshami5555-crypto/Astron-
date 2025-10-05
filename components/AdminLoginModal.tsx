import React, { useState } from 'react';

interface AdminLoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const adminPassword = "150150";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      onSuccess();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-[#0a0a0a] border astren-border-accent rounded-lg shadow-2xl shadow-black/50 p-8 w-full max-w-sm m-4"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-2xl text-center font-semibold text-white mb-4">Admin Access</h2>
        <p className="text-center text-gray-400 mb-6">Please enter the password to continue.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white text-center text-lg tracking-widest focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full mt-6 astren-bg-accent text-black px-6 py-3 rounded-md hover:bg-amber-500 transition-colors duration-300 font-semibold"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
