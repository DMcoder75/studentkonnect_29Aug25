import React, { useState } from 'react'
import AdminLayout from './AdminLayout'
import { Settings, Save, RefreshCw, Shield, Globe, Mail, Bell, Database, Server, Key } from 'lucide-react'

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    general: {
      siteName: 'YourUniPathway',
      siteDescription: 'Find Your Perfect Global University',
      adminEmail: 'admin@yourunipathway.com',
      timezone: 'UTC',
      language: 'English',
      maintenanceMode: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordPolicy: 'strong',
      loginAttempts: 5,
      ipWhitelist: '',
      sslRequired: true
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: 'noreply@yourunipathway.com',
      smtpPassword: '••••••••',
      fromEmail: 'noreply@yourunipathway.com',
      fromName: 'YourUniPathway'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      adminAlerts: true,
      userWelcome: true,
      systemUpdates: true
    }
  })

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'api', name: 'API', icon: Key }
  ]

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings)
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
        <input
          type="email"
          value={settings.general.adminEmail}
          onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
            <option value="GMT">Greenwich Mean Time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="maintenanceMode"
          checked={settings.general.maintenanceMode}
          onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="maintenanceMode" className="ml-2 text-sm text-gray-700">
          Enable Maintenance Mode
        </label>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="twoFactorAuth"
          checked={settings.security.twoFactorAuth}
          onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="twoFactorAuth" className="ml-2 text-sm text-gray-700">
          Enable Two-Factor Authentication
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
        <input
          type="number"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
        <select
          value={settings.security.passwordPolicy}
          onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="weak">Weak (6+ characters)</option>
          <option value="medium">Medium (8+ characters, mixed case)</option>
          <option value="strong">Strong (12+ characters, mixed case, numbers, symbols)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
        <input
          type="number"
          value={settings.security.loginAttempts}
          onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="sslRequired"
          checked={settings.security.sslRequired}
          onChange={(e) => handleSettingChange('security', 'sslRequired', e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="sslRequired" className="ml-2 text-sm text-gray-700">
          Require SSL/HTTPS
        </label>
      </div>
    </div>
  )

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => handleSettingChange('email', 'smtpHost', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
          <input
            type="number"
            value={settings.email.smtpPort}
            onChange={(e) => handleSettingChange('email', 'smtpPort', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
        <input
          type="text"
          value={settings.email.smtpUsername}
          onChange={(e) => handleSettingChange('email', 'smtpUsername', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
        <input
          type="password"
          value={settings.email.smtpPassword}
          onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
          <input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => handleSettingChange('email', 'fromEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
          <input
            type="text"
            value={settings.email.fromName}
            onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={settings.notifications.emailNotifications}
            onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="emailNotifications" className="ml-2 text-sm text-gray-700">
            Enable Email Notifications
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="pushNotifications"
            checked={settings.notifications.pushNotifications}
            onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="pushNotifications" className="ml-2 text-sm text-gray-700">
            Enable Push Notifications
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="smsNotifications"
            checked={settings.notifications.smsNotifications}
            onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="smsNotifications" className="ml-2 text-sm text-gray-700">
            Enable SMS Notifications
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="adminAlerts"
            checked={settings.notifications.adminAlerts}
            onChange={(e) => handleSettingChange('notifications', 'adminAlerts', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="adminAlerts" className="ml-2 text-sm text-gray-700">
            Admin System Alerts
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="userWelcome"
            checked={settings.notifications.userWelcome}
            onChange={(e) => handleSettingChange('notifications', 'userWelcome', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="userWelcome" className="ml-2 text-sm text-gray-700">
            User Welcome Messages
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="systemUpdates"
            checked={settings.notifications.systemUpdates}
            onChange={(e) => handleSettingChange('notifications', 'systemUpdates', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="systemUpdates" className="ml-2 text-sm text-gray-700">
            System Update Notifications
          </label>
        </div>
      </div>
    </div>
  )

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Database className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Database Configuration</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Database settings are managed through environment variables for security.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Connection Status</h4>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Connected</span>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Database Size</h4>
          <span className="text-sm text-gray-600">2.4 GB</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Last Backup</h4>
          <span className="text-sm text-gray-600">2024-01-15 03:00 UTC</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Active Connections</h4>
          <span className="text-sm text-gray-600">12 / 100</span>
        </div>
      </div>
    </div>
  )

  const renderAPISettings = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Key className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">API Configuration</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Manage API keys and access controls for external integrations.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">API Rate Limit (requests/hour)</label>
          <input
            type="number"
            defaultValue={1000}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="apiLogging"
            defaultChecked={true}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="apiLogging" className="ml-2 text-sm text-gray-700">
            Enable API Request Logging
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="apiAuth"
            defaultChecked={true}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="apiAuth" className="ml-2 text-sm text-gray-700">
            Require API Authentication
          </label>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings()
      case 'security': return renderSecuritySettings()
      case 'email': return renderEmailSettings()
      case 'notifications': return renderNotificationSettings()
      case 'database': return renderDatabaseSettings()
      case 'api': return renderAPISettings()
      default: return renderGeneralSettings()
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600">Configure system-wide settings and preferences</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
            <button 
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default SystemSettings

