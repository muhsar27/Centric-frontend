"use client";

import React from "react";
import { motion } from "framer-motion";
import { Package, Bike, Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setRole, nextStep } from "@/store/slices/onboardingSlice";
import { UserRole } from "@/types/auth";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import Image from "next/image";

type RoleCardProps = {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

function RoleCard({
  active,
  icon,
  title,
  description,
  onClick,
}: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex h-[171px] w-full flex-col justify-between rounded-xl border bg-white p-5 text-left transition-all",
        active ? "border-stone-800" : "border-stone-200 hover:border-stone-300",
      )}>
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 text-slate-900">
        {icon}
      </div>

      <div className="pr-8">
        <h3 className="text-[15px] font-medium text-slate-900">{title}</h3>
        <p className="mt-2 max-w-[16rem] text-[13px] leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <div
        className={cn(
          "absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border",
          active
            ? "border-stone-900 bg-slate-900 text-white"
            : "border-stone-300 bg-white text-transparent",
        )}>
        {active ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : null}
      </div>
    </button>
  );
}

export default function RoleSelector() {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.onboarding);

  const handleSelectRole = (selectedRole: UserRole) => {
    dispatch(setRole(selectedRole));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}>
      <div className="text-center">
        <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2.25rem]">
          What best describes you?
        </h2>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        <div className="relative">
          <RoleCard
            active={role === "sender"}
            icon={
              <Image
                src="delivery-box.svg"
                width="50"
                height="50"
                alt="delivery box"
              />
            }
            title="I want to send a package"
            description="Send packages to anyone safely"
            onClick={() => handleSelectRole("sender")}
          />
        </div>

        <div className="relative">
          <RoleCard
            active={role === "traveler"}
            icon={<Bike className="h-6 w-6" />}
            title="I want to deliver packages"
            description="Earn by delivering packages"
            onClick={() => handleSelectRole("traveler")}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={() => dispatch(nextStep())}
          className="h-[53px] w-full max-w-[470px] rounded-full text-base">
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
