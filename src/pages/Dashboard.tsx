import React from 'react';
import { Mail, Calendar, Hash, Shield, CheckCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-display font-bold text-primary-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">Here's your account overview</p>
        </div>

        {/* User Details Card */}
        <div className="glass-effect rounded-2xl p-8">
          <h2 className="text-xl font-display font-bold text-primary-900 mb-6">
            Account Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Hash className="h-5 w-5 text-primary-900" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">User ID</p>
                <p className="font-medium text-gray-900">{user.id}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-secondary-100 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Role</p>
                <p className="font-medium text-gray-900">{user.role}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {user.status}
                </span>
              </div>
            </div>

            {user.createdAt && (
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}

            {user.mobile && (
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Mobile</p>
                  <p className="font-medium text-gray-900">{user.mobile}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats (Placeholder) */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-effect rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Projects</p>
              <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center">
                <Hash className="h-4 w-4 text-primary-900" />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary-900">0</p>
          </div>

          <div className="glass-effect rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Active Tasks</p>
              <div className="h-8 w-8 rounded-lg bg-secondary-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-secondary-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary-900">0</p>
          </div>

          <div className="glass-effect rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Completed</p>
              <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary-900">0</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
