'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import UsersTable from "@/components/UsersTable"
import { CircleFadingPlus } from "lucide-react"
import ProfileForm from "@/hooks/use-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Admin = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex justify-center px-4 py-8 min-h-screen">
      <div className="w-full max-w-6xl">
        <div className="flex justify-end mb-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700 flex items-center space-x-2 transition-colors duration-200">
                <CircleFadingPlus className="w-4 h-4" />
                <span>Add Users</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <ProfileForm
                onSubmit={(data) => {
                  console.log("Form submitted:", data)
                  setOpen(false)
                }}
                onCancel={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <UsersTable />
      </div>
    </div>
  )
}

export default Admin
