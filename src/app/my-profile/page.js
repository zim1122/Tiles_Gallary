import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, Calendar, Edit3 } from "lucide-react";

export default async function MyProfilePage() {
  const session = await getAuth().api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login?redirect=/my-profile");
  }

  const { user } = session;

  return (
    <div className="min-h-[85vh] bg-base-200/30 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-base-content tracking-tight">My Profile</h1>
          <p className="mt-2 text-base-content/60">Manage your personal information</p>
        </div>

        <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary to-secondary relative">
            <div className="absolute -bottom-16 inset-x-0 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-base-100 bg-base-200 overflow-hidden shadow-lg relative flex items-center justify-center">
                {user.image ? (
                  <Image 
                    src={user.image} 
                    alt={user.name} 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-base-content/50">
                    {user.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-20 pb-10 px-8 text-center sm:text-left">
            <div className="max-w-xl mx-auto space-y-8">
              
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-base-content">{user.name}</h2>
                <p className="text-base-content/60 flex items-center justify-center gap-2 mt-1">
                  <Mail className="w-4 h-4" /> {user.email}
                </p>
              </div>

              <div className="bg-base-200/50 rounded-2xl p-6 border border-base-300 space-y-4">
                <h3 className="font-semibold text-lg border-b border-base-300 pb-2 mb-4">Account Details</h3>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
                  <div className="flex items-center gap-3 text-base-content/70">
                    <User className="w-5 h-5 text-primary" />
                    <span>Full Name</span>
                  </div>
                  <span className="font-medium text-base-content">{user.name}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
                  <div className="flex items-center gap-3 text-base-content/70">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>Email Address</span>
                  </div>
                  <span className="font-medium text-base-content">{user.email}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
                  <div className="flex items-center gap-3 text-base-content/70">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Joined At</span>
                  </div>
                  <span className="font-medium text-base-content">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Link href="/my-profile/update" className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Update Information
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
