import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Bell, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                CampusConnect
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            Bridge the gap between <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Teachers and Students
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto mb-10">
            A unified platform for seamless communication, interactive quizzes, and real-time announcements. Enhance the learning experience today.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3.5 border border-transparent text-lg font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Get Started for Free
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-3.5 border border-gray-300 text-lg font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="relative p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="absolute top-8 left-8 bg-emerald-100 rounded-xl p-3">
                <Bell className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mt-16 text-xl font-bold text-gray-900">Real-time Announcements</h3>
              <p className="mt-4 text-base text-gray-600">
                Teachers can instantly broadcast important updates, assignments, and schedules to all students in their classes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="relative p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="absolute top-8 left-8 bg-teal-100 rounded-xl p-3">
                <BookOpen className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="mt-16 text-xl font-bold text-gray-900">Interactive Quizzes</h3>
              <p className="mt-4 text-base text-gray-600">
                Engage students with customized quizzes and assessments. Track progress and provide immediate feedback.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="relative p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="absolute top-8 left-8 bg-green-100 rounded-xl p-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-16 text-xl font-bold text-gray-900">Role-Based Access</h3>
              <p className="mt-4 text-base text-gray-600">
                Dedicated dashboards and tools tailored specifically for the needs of both educators and learners.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BookOpen className="h-6 w-6 text-emerald-400" />
            <span className="ml-2 text-xl font-bold">CampusConnect</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CampusConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
