import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Progressbar } from "./Progressbar";

// interface HabitProps {
//    completed: number;
// }

export function HabitDay() {
   return (
      <Popover.Root>
         <Popover.Trigger>
            <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg"></div>
         </Popover.Trigger>

         <Popover.Portal>
            <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
               <span className="font-semibold text-zinc-400">sexta-feira</span>
               <span className="mt-1 font-extrabold leading-tight text-3xl">
                  20/01
               </span>

               <Progressbar progress={50}/>

               <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
            </Popover.Content>
         </Popover.Portal>
      </Popover.Root>
   );
}
