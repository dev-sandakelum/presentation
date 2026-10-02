import { redirect } from 'next/navigation'

// Legacy /display route — redirect to the default presentation
export default function DisplayIndexPage() {
  redirect('/display/azure-ai')
}
