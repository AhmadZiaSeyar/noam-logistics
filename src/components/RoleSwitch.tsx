"use client";

import { UserRole } from "@/types";
import { Switch } from "@/components/ui/switch";
import { User as UserIcon } from "lucide-react";

interface RoleSwitchProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function RoleSwitch({ currentRole, onRoleChange }: RoleSwitchProps) {
  const handleRoleSwitch = (checked: boolean) => {
    onRoleChange(checked ? UserRole.SHIPPER : UserRole.DRIVER);
  };

  return (
    <div className="flex items-center space-x-3 bg-card rounded-lg px-4 py-2 shadow-sm border border-border">
      <UserIcon className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm font-medium text-card-foreground">Driver</span>
      <Switch
        checked={currentRole === UserRole.SHIPPER}
        onCheckedChange={handleRoleSwitch}
      />
      <span className="text-sm font-medium text-card-foreground">
        Shipper
      </span>
    </div>
  );
}
