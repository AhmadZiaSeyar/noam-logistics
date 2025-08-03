"use client";

import { UserRole, User } from "@/types";
import { RoleSwitch } from "./RoleSwitch";

interface DashboardHeaderProps {
  currentUser: User;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function DashboardHeader({
  currentUser,
  currentRole,
  onRoleChange,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Noam Logistics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Welcome back, {currentUser.name} ({currentRole.toLowerCase()})
          </p>
        </div>

        <RoleSwitch currentRole={currentRole} onRoleChange={onRoleChange} />
      </div>
    </div>
  );
}
