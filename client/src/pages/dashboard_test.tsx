import React, { useEffect, useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, FileText, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { supabase } from '@/integrations/supabase/client';

const Dashboard: React.FC = () => {
  // const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalCases: 3,
    totalAttorneys: 0,
    totalAgencies: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        
        // Get total cases
        // const { count: casesCount, error: casesError } = await supabase
        //   .from('cases')
        //   .select('*', { count: 'exact', head: true });
          
        // if (casesError) throw casesError;
        
        // // Get total attorneys
        // const { count: attorneysCount, error: attorneysError } = await supabase
        //   .from('attorneys')
        //   .select('*', { count: 'exact', head: true });
          
        // if (attorneysError) throw attorneysError;
        
        // // Get total insurance agencies
        // const { count: agenciesCount, error: agenciesError } = await supabase
        //   .from('insurance_agencies')
        //   .select('*', { count: 'exact', head: true });
          
        // if (agenciesError) throw agenciesError;
        
        // setStats({
        //   totalCases: casesCount || 0,
        //   totalAttorneys: attorneysCount || 0,
        //   totalAgencies: agenciesCount || 0,
        // });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          {/* Welcome back, {profile?.full_name || 'User'} */}
        </p>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Link href="/upload">
          <Button className="bg-primary text-white font-semibold px-6 py-2 rounded shadow hover:bg-primary/90 transition">Upload Report</Button>
        </Link>
        <Link href="/users">
          <Button className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded shadow hover:bg-indigo-700 transition">Add User</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 animate-pulse rounded-md bg-gray-200"></div>
              ) : (
                stats.totalCases
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Total police reports analyzed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attorneys</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 animate-pulse rounded-md bg-gray-200"></div>
              ) : (
                stats.totalAttorneys
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered attorney contacts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insurance Agencies</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 animate-pulse rounded-md bg-gray-200"></div>
              ) : (
                stats.totalAgencies
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Partner insurance companies
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest report uploads and analyses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {Array(3).fill(null).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-12 w-12 animate-pulse rounded-md bg-gray-200"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-[250px] animate-pulse rounded-md bg-gray-200"></div>
                      <div className="h-4 w-[200px] animate-pulse rounded-md bg-gray-200"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : stats.totalCases > 0 ? (
              <div className="space-y-8">
                <p>Activity data will appear here</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 py-8 text-center text-muted-foreground">
                <FileText className="h-12 w-12 opacity-30" />
                <h3 className="text-lg font-semibold">No reports yet</h3>
                <p className="text-sm">Upload your first police report to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard Analytics</CardTitle>
            <CardDescription>
              Case statistics and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {isLoading ? (
              <div className="h-full w-full animate-pulse rounded-md bg-gray-200"></div>
            ) : stats.totalCases > 0 ? (
              <p>Analytics charts will appear here</p>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 py-8 text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 opacity-30" />
                <h3 className="text-lg font-semibold">No analytics data</h3>
                <p className="text-sm">Analytics will be available after processing cases</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
