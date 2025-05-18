import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, FileText, Upload, UserPlus, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCases: 226,
    totalAttorneys: 42,
    totalAgencies: 6,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Dummy recent activity
  const recentActivity = [
    { type: 'upload', user: 'Alice', detail: 'Uploaded 12 police reports', time: '2 min ago' },
    { type: 'analysis', user: 'Bob', detail: 'Analyzed 5 cases', time: '10 min ago' },
    { type: 'user', user: 'Admin', detail: 'Added new attorney', time: '1 hour ago' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-xl bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 p-8 shadow-lg text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {user?.fullName || 'User'}!</h1>
            <p className="text-lg opacity-90">Role: <span className="capitalize font-semibold">{user?.role || 'N/A'}</span></p>
          </div>
          <div className="flex gap-4">
            <Link href="/upload">
              <Button className="bg-white/20 hover:bg-white/30 text-white font-semibold flex gap-2" size="lg">
                <Upload className="h-5 w-5" /> Upload Report
              </Button>
            </Link>
            <Link href="/users">
              <Button className="bg-white/20 hover:bg-white/30 text-white font-semibold flex gap-2" size="lg">
                <UserPlus className="h-5 w-5" /> Add User
              </Button>
            </Link>
          </div>
      </div>

        {/* Stat Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-indigo-100 to-indigo-50 shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium text-indigo-700">Total Cases</CardTitle>
              <FileText className="h-6 w-6 text-indigo-500" />
          </CardHeader>
          <CardContent>
              <div className="text-3xl font-bold text-indigo-900">{stats.totalCases}</div>
              <p className="text-xs text-indigo-600 mt-1">Total police reports analyzed</p>
          </CardContent>
        </Card>
          <Card className="bg-gradient-to-br from-green-100 to-green-50 shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium text-green-700">Attorneys</CardTitle>
              <Users className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
              <div className="text-3xl font-bold text-green-900">{stats.totalAttorneys}</div>
              <p className="text-xs text-green-600 mt-1">Registered attorney contacts</p>
          </CardContent>
        </Card>
          <Card className="bg-gradient-to-br from-orange-100 to-orange-50 shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium text-orange-700">Insurance Agencies</CardTitle>
              <BarChart3 className="h-6 w-6 text-orange-500" />
          </CardHeader>
          <CardContent>
              <div className="text-3xl font-bold text-orange-900">{stats.totalAgencies}</div>
              <p className="text-xs text-orange-600 mt-1">Partner insurance companies</p>
          </CardContent>
        </Card>
      </div>

        {/* Analytics and Activity */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Analytics Charts */}
          <Card className="md:col-span-2 p-4 shadow-md">
          <CardHeader>
              <CardTitle className="text-xl font-bold">Dashboard Analytics</CardTitle>
              <CardDescription>Case statistics and performance metrics</CardDescription>
          </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div>
                <h4 className="font-semibold mb-2">Cases by Month</h4>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={[
                    { month: 'Jan', cases: 30 },
                    { month: 'Feb', cases: 45 },
                    { month: 'Mar', cases: 60 },
                    { month: 'Apr', cases: 50 },
                    { month: 'May', cases: 80 },
                    { month: 'Jun', cases: 65 },
                  ]}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cases" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Pie Chart */}
              <div>
                <h4 className="font-semibold mb-2">Case Distribution</h4>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Open', value: 120 },
                        { name: 'Closed', value: 80 },
                        { name: 'Pending', value: 40 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#6366f1" />
                      <Cell fill="#f59e42" />
                      <Cell fill="#10b981" />
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Line Chart */}
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-2">Attorney Growth</h4>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={[
                    { month: 'Jan', attorneys: 10 },
                    { month: 'Feb', attorneys: 15 },
                    { month: 'Mar', attorneys: 20 },
                    { month: 'Apr', attorneys: 25 },
                    { month: 'May', attorneys: 35 },
                    { month: 'Jun', attorneys: 42 },
                  ]}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="attorneys" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#10b981' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="p-4 shadow-md flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Recent Activity</CardTitle>
              <CardDescription>Latest uploads, analyses, and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivity.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      {item.type === 'upload' && <Upload className="h-5 w-5 text-primary" />}
                      {item.type === 'analysis' && <BarChart3 className="h-5 w-5 text-primary" />}
                      {item.type === 'user' && <UserPlus className="h-5 w-5 text-primary" />}
              </div>
                    <div>
                      <div className="font-semibold text-gray-800">{item.user}</div>
                      <div className="text-gray-600 text-sm">{item.detail}</div>
                      <div className="text-xs text-gray-400 mt-1">{item.time}</div>
            </div>
                  </li>
                ))}
              </ul>
          </CardContent>
        </Card>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Home;
