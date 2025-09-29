import React, { useState } from 'react';
import { User, Settings, LogOut, Camera, CreditCard as Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContexts';

const ProfileSection = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 9876543210',
    department: 'Health Department',
    location: 'Guwahati, Assam',
    avatarFile: null as File | null,
  });
  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSave = () => {
    if (activeTab === 'profile' && isEditing) {
      setIsEditing(false);
      alert('Profile updated successfully!');
    } else if (activeTab === 'settings') {
      if (passwords.newPassword !== passwords.confirmPassword) {
        alert('New password and confirm password do not match!');
        return;
      }
      alert('Settings updated successfully!');
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditedUser({ ...editedUser, avatarFile: e.target.files[0] });
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="relative">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user.avatar}
          </div>
        </div>
      </button>

      {isOpen && (
        <>
        <div
          className="fixed inset-0 z-40 bg-gray-800 bg-opacity-30"
          onClick={() => setIsOpen(false)}
        ></div>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {user.avatar}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700">
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Settings
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Profile Information</h4>
                    <button
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                      <span>{isEditing ? 'Save' : 'Edit'}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedUser.name}
                          onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : <p className="text-sm text-gray-900">{editedUser.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : <p className="text-sm text-gray-900">{editedUser.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedUser.phone}
                          onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : <p className="text-sm text-gray-900">{editedUser.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Department</label>
                      <p className="text-sm text-gray-900">{editedUser.department}</p>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                      <p className="text-sm text-gray-900">{editedUser.location}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Preferences & Security</h4>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Profile Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="w-full text-sm"
                    />
                    {editedUser.avatarFile && (
                      <p className="text-xs text-gray-500 mt-1">{editedUser.avatarFile.name}</p>
                    )}
                  </div>

                  {/* Change Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Change Password</label>
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={passwords.confirmPassword}
                      onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>

                  {/* Existing Preferences */}
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Email Notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">SMS Alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Push Notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Language</label>
                      <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                        <option>English</option>
                        <option>Assamese</option>
                        <option>Bengali</option>
                        <option>Hindi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Theme</label>
                      <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                        <option>Light</option>
                        <option>Dark</option>
                        <option>Auto</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleSave}
                    className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Logout */}
            <div className="border-t border-gray-200 p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSection;
