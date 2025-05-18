import DashboardLayout from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function SettingsPage() {
  // Dummy user info
  const [profile, setProfile] = useState({
    name: 'Sriram Kiran',
    email: 'sriramkirand.apk@gmail.com',
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  // Dummy app settings
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
  });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [privacy, setPrivacy] = useState({ twoFA: false });
  const [preferences, setPreferences] = useState({ language: 'en', dateFormat: 'MM/DD/YYYY' });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSettingChange = (key: keyof typeof settings) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChanged(true);
    setTimeout(() => setPasswordChanged(false), 2000);
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy((p) => ({ ...p, [key]: !p[key] }));
  };

  const handlePreferencesChange = (key: keyof typeof preferences, value: string) => {
    setPreferences((p) => ({ ...p, [key]: value }));
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Info</CardTitle>
          </CardHeader>
          <CardContent>
            {editing ? (
              <form onSubmit={handleProfileSave} className="space-y-4">
                <Input name="name" value={form.name} onChange={handleProfileChange} placeholder="Full Name" required />
                <Input name="email" value={form.email} onChange={handleProfileChange} placeholder="Email" type="email" required />
                <div className="flex gap-2">
                  <Button type="submit">Save</Button>
                  <Button type="button" variant="outline" onClick={() => { setEditing(false); setForm(profile); }}>Cancel</Button>
                </div>
                {saved && <div className="text-green-600 font-semibold">Profile updated!</div>}
              </form>
            ) : (
              <div className="space-y-2">
                <div><span className="font-semibold">Name:</span> {profile.name}</div>
                <div><span className="font-semibold">Email:</span> {profile.email}</div>
                <Button className="mt-2" onClick={() => setEditing(true)}>Edit</Button>
              </div>
            )}
          </CardContent>
        </Card>
        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle>App Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span>Enable Notifications</span>
              <Switch checked={settings.notifications} onCheckedChange={() => handleSettingChange('notifications')} />
            </div>
            <div className="flex items-center justify-between mb-4">
              <span>Dark Mode</span>
              <Switch checked={settings.darkMode} onCheckedChange={() => handleSettingChange('darkMode')} />
            </div>
            <div className="text-gray-500 text-sm">(These settings are for demo only and not persisted.)</div>
          </CardContent>
        </Card>
        {/* Password Management */}
        <Card>
          <CardHeader>
            <CardTitle>Password Management</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input name="current" type="password" value={passwordForm.current} onChange={handlePasswordChange} placeholder="Current Password" required />
              <Input name="new" type="password" value={passwordForm.new} onChange={handlePasswordChange} placeholder="New Password" required />
              <Input name="confirm" type="password" value={passwordForm.confirm} onChange={handlePasswordChange} placeholder="Confirm New Password" required />
              <Button type="submit">Change Password</Button>
              {passwordChanged && <div className="text-green-600 font-semibold">Password changed! (demo only)</div>}
            </form>
            <div className="text-gray-500 text-sm mt-2">(This is a demo form and does not change your real password.)</div>
          </CardContent>
        </Card>
        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span>Enable Two-Factor Authentication (2FA)</span>
              <Switch checked={privacy.twoFA} onCheckedChange={() => handlePrivacyChange('twoFA')} />
            </div>
            <Button variant="outline" className="mb-2">Export My Data</Button>
            <div className="text-gray-500 text-sm">(These features are for demo only and not functional.)</div>
          </CardContent>
        </Card>
        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="block mb-1 font-medium">Language</span>
              <Select value={preferences.language} onValueChange={v => handlePreferencesChange('language', v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <span className="block mb-1 font-medium">Date/Time Format</span>
              <Select value={preferences.dateFormat} onValueChange={v => handlePreferencesChange('dateFormat', v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-gray-500 text-sm">(Preferences are for demo only and not persisted.)</div>
          </CardContent>
        </Card>
        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>Delete My Account</Button>
            <div className="text-gray-500 text-sm mt-2">(This is a demo button and does not actually delete your account.)</div>
          </CardContent>
        </Card>
      </div>
      {/* Delete Account Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>
          <div>Are you sure you want to delete your account? This action cannot be undone. (Demo only)</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(false)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
} 