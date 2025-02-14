import React from 'react'
import { Users, BarChart, Settings } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const AdminCard = ({ title, description, icon: Icon, linkText, linkHref,num }) => (
  <Card className={`flex flex-col justify-between  transition-all duration-${300 * num} ease-in-out hover:shadow-lg hover:-translate-y-1 `}>
    <CardHeader className="text-center">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold text-center m-auto">{title}</CardTitle>
        <Icon className="h-6 w-6 text-[#003644] dark:text-[#d4f6ff]" />
      </div>
      <CardDescription className="text-center">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Button 
        asChild 
        className="w-full bg-[#003644] text-white hover:bg-[#002630] dark:bg-[#08242c] dark:hover:bg-[#061f26]"
      >
        <a href={linkHref}>{linkText}</a>
      </Button>
    </CardContent>
  </Card>
)

export function AdminHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-center my-5">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AdminCard
          title="User Management"
          description="Manage user accounts, roles, and permissions"
          icon={Users}
          linkText="Manage Users"
          linkHref="/admin/users"
          num={0}
        />
        <AdminCard
          title="Analytics"
          description="View site statistics and user engagement data"
          icon={BarChart}
          linkText="View Analytics"
          linkHref="/admin/analytics"
          num={0}
        />
        <AdminCard
          title="System Settings"
          description="Configure system-wide settings and preferences"
          icon={Settings}
          linkText="Configure Settings"
          linkHref="/admin/settings"
          num={0}
        />
      </div>
    </div>
  )
}