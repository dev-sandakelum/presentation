import { redirect } from 'next/navigation'

// Legacy /remote route — redirect to the default presentation
export default function RemoteIndexPage() {
  redirect('/remote/azure-ai')
}
