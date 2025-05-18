// @ts-ignore
declare module 'papaparse';

import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth, User } from "@/hooks/use-auth";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus, Trash2, Edit, AlertCircle, UserCircle, FileDown, Users as UsersIcon } from "lucide-react";
import Papa, { ParseResult } from "papaparse";

type RegisterData = {
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: "admin" | "attorney" | "insuranceAgency" | "doctor";
};

export default function UsersPage() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState<RegisterData>({
    username: "",
    password: "",
    fullName: "",
    email: "",
    role: "attorney",
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[], Error>({
    queryKey: ["/api/users"],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!isAdmin, // Only fetch if user is admin
  });

  const { register } = useAuth();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    await register(newUser);
    setIsRegistering(false);
        setIsCreateUserDialogOpen(false);
        setNewUser({
          username: "",
          password: "",
          fullName: "",
          email: "",
          role: "attorney",
    });
  };

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      await apiRequest("DELETE", `/api/users/${userId}`);
    },
    onSuccess: () => {
      toast({
        title: "User deleted",
        description: "The user has been deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDeleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      deleteUserMutation.mutate(userId);
    }
  };

  const sampleCsv = `fullName,email,username,password,role\nJohn Doe,john@example.com,johndoe,Password123,attorney\nJane Smith,jane@example.com,janesmith,Password456,doctor`;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground">
              You need administrator privileges to access this page.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-xl bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 p-8 shadow-lg text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <UsersIcon className="h-8 w-8 text-white/80" />
            <h1 className="text-3xl md:text-4xl font-bold mb-1">User Management</h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white font-semibold flex gap-2 border-0" onClick={() => {
              const blob = new Blob([sampleCsv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'sample-users.csv';
              a.click();
              URL.revokeObjectURL(url);
            }}>
              <FileDown className="h-5 w-5" /> Sample CSV
            </Button>
            <Button
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white font-semibold flex gap-2 border-0"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <UserPlus className="h-5 w-5" /> Import CSV
            </Button>
            <input
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                Papa.parse(file, {
                  header: true,
                  skipEmptyLines: true,
                  complete: async (results: ParseResult<any>) => {
                    const rows = results.data as RegisterData[];
                    const requiredFields = ["fullName", "email", "username", "password", "role"];
                    const invalidRows = rows.filter(row => !requiredFields.every(f => row[f as keyof RegisterData]));
                    if (invalidRows.length > 0) {
                      toast({
                        title: "Invalid CSV Format",
                        description: "Some rows are missing required fields. Please use the sample format.",
                        variant: "destructive",
                      });
                      return;
                    }
                    for (const row of rows) {
                      if (!["admin", "attorney", "insuranceAgency", "doctor"].includes(row.role)) {
                        toast({
                          title: "Invalid Role",
                          description: `Role must be one of admin, attorney, insuranceAgency, doctor. Found: ${row.role}`,
                          variant: "destructive",
                        });
                        return;
                      }
                    }
                    for (const row of rows) {
                      await register(row);
                    }
                    toast({ title: "Users imported", description: `${rows.length} users created.` });
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  },
                  error: () => {
                    toast({
                      title: "CSV Parse Error",
                      description: "Could not parse the uploaded file.",
                      variant: "destructive",
                    });
                  },
                });
              }}
            />
            <Dialog open={isCreateUserDialogOpen} onOpenChange={setIsCreateUserDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-white/20 hover:bg-white/30 text-white font-semibold flex gap-2 border-0">
                <UserPlus className="mr-2 h-4 w-4" /> Add New User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreateUser}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl"><UserCircle className="h-6 w-6 text-indigo-500" /> Create New User</DialogTitle>
                  <DialogDescription>
                    Add a new user to the system. They'll receive an email with login instructions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fullName" className="text-right">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                        placeholder="e.g. John Doe"
                      value={newUser.fullName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, fullName: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                        placeholder="e.g. john@example.com"
                      value={newUser.email}
                      onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                        placeholder="e.g. johndoe"
                      value={newUser.username}
                      onChange={(e) =>
                        setNewUser({ ...newUser, username: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                        placeholder="e.g. StrongPassword123"
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value: any) =>
                        setNewUser({
                          ...newUser,
                          role: value,
                        })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="attorney">Attorney</SelectItem>
                        <SelectItem value="insuranceAgency">Insurance Agency</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                    <Button type="submit" disabled={isRegistering} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      {isRegistering ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</>) : ("Create User")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        </div>
        {/* User Table Card */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl"><UsersIcon className="h-6 w-6 text-indigo-500" /> Users</CardTitle>
            <CardDescription>Manage users and their access levels. Only administrators can create and delete users.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="h-10 w-10 text-destructive mb-2" />
                <p className="text-lg font-medium">Error loading users: {error.message}</p>
              </div>
            ) : (
              <Table className="text-xs">
                <TableHeader>
                  <TableRow className="h-7 py-0">
                    <TableHead className="py-0">Name</TableHead>
                    <TableHead className="py-0">Email</TableHead>
                    <TableHead className="py-0">Role</TableHead>
                    <TableHead className="text-right py-0">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user.id} className="h-7 py-0 hover:bg-indigo-50/40 transition-colors">
                      <TableCell className="font-medium flex items-center gap-2 py-0">
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-base">
                          {user.fullName?.charAt(0).toUpperCase() || '?'}
                        </span>
                        {user.fullName}
                      </TableCell>
                      <TableCell className="py-0">{user.email}</TableCell>
                      <TableCell className="py-0">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold capitalize ${user.role === 'admin' ? 'bg-red-100 text-red-700' : user.role === 'attorney' ? 'bg-green-100 text-green-700' : user.role === 'insuranceAgency' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{user.role}</span>
                      </TableCell>
                      <TableCell className="text-right py-0">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete User</DialogTitle>
                              <DialogDescription>Are you sure you want to delete this user? This action cannot be undone.</DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => {}} autoFocus>Cancel</Button>
                              <Button variant="destructive" onClick={() => handleDeleteUser(Number(user.id))} disabled={deleteUserMutation.isPending}>Delete</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <div className="flex flex-col items-center gap-2">
                          <UsersIcon className="h-10 w-10 text-indigo-200 mb-2" />
                          <span className="text-lg font-semibold text-gray-500">No users found.</span>
                          <span className="text-sm text-gray-400">Add a new user to get started.</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}