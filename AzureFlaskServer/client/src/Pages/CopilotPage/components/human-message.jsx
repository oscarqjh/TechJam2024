import { useState } from "react";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { BotMessageSquare } from "lucide-react";
import { MdOutlinePerson2 } from "react-icons/md";

export default function HumanMessage({ text }) {
  return (
    <>
      <div className="p-2 flex items-start justify-end w-full">
        <div className="flex rounded-2xl bg-slate-200 hover:bg-slate-300 transition mr-3">
          <p className="p-2 m-1 font-medium text-right">{text}</p>
        </div>
        <Avatar className="mt-2">
          <AvatarFallback>
            <MdOutlinePerson2 />

          </AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}
