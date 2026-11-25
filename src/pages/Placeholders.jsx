import { Settings as SettingsIcon } from 'lucide-react'
import { PagePlaceholder } from '../components/ui/PagePlaceholder.jsx'

export function Settings({ navigate }) {
  return (
    <PagePlaceholder
      navigate={navigate}
      icon={SettingsIcon}
      title="Settings"
      description="Manage your profile, notification preferences, appearance and portal integrations."
      features={[
        'Profile details and contact information',
        'Notification preferences and reminders',
        'Appearance — theme and sidebar defaults',
        'Language selection (Bahasa Melayu / English)',
        'Connected accounts and privacy controls',
      ]}
    />
  )
}