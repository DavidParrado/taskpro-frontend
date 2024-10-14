'use client';
import { getUser, updateUser } from '@/actions';
import { getDecodedToken, getToken } from '@/utils/authHelpers';
import { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile>({
    name: '',
    email: '',
    password: '',
    avatarUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch user profile data
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const decoded = getDecodedToken();
        const response = await getUser(decoded?.user.id || "", getToken() || "");// Adjust endpoint
        setUser({...response, password: ''});
      } catch (err) {
        setError('Failed to load profile data');
      }
    }
    fetchUserProfile();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const decoded = getDecodedToken();
      const response = await updateUser(decoded?.user.id ?? "", { ...user, password: user.password.length > 0 ? user.password : undefined }, getToken() || "");// Adjust endpoint
      setUser({ ...response, password: '' });
      setLoading(false);
    } catch (err) {
      setError('Failed to update profile');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Optional: Image Upload */}
        {user.avatarUrl && (
          <div>
            <label className="block text-sm font-medium">Avatar</label>
            <img src={user.avatarUrl} alt="Avatar" className="h-16 w-16 rounded-full mt-2" />
            <input
              type="file"
              accept="image/*"
              className="mt-2 block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        )}

        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
