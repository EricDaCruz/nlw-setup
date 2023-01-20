import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
   "Domingo",
   "Segunda-feira",
   "Terça-feira",
   "Quarta-feira",
   "Quinta-feira",
   "Sexta-feira",
   "Sábado",
];

export function NewHabitForm() {
   const [title, setTitle] = useState("");
   const [weekDays, setWeekDays] = useState<number[]>([]);

   async function createNewHabit(event: FormEvent) {
      event.preventDefault();

      if (!title || weekDays.length === 0) {
         return;
      }

      await api.post("habits", {
         title,
         weekDays,
      });

      alert('Hábito Criado com sucesso')
      setTitle('')
      setWeekDays([])
   }

   function handleToggleWeekDays(weekDayIndex: number) {
      if (weekDays.includes(weekDayIndex)) {
         setWeekDays((prevState) =>
            prevState.filter((weekDay) => weekDay != weekDayIndex)
         );
         return;
      }

      setWeekDays((prevState) => [...prevState, weekDayIndex]);
   }

   return (
      <form
         method="POST"
         onSubmit={createNewHabit}
         className="w-full flex flex-col mt-6"
      >
         <label htmlFor="title" className="font-semibold leading-tight">
            Qual seu comprometimento?
         </label>

         <input
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            id="title"
            placeholder="ex.: Exercício, dormir bem, etc..."
            autoFocus
            value={title}
            className="p-4 rounded-lg mt-3 bg-zinc-800 placeholder:text-zinc-400"
         />
         <label className="font-semibold leading-tight mt-4">
            Qual a recorrência?
         </label>

         <div className="flex flex-col gap-2 mt-3">
            {availableWeekDays.map((weekDay, i) => {
               return (
                  <Checkbox.Root
                     className="flex items-center gap-3 group"
                     key={weekDay}
                     onCheckedChange={() => handleToggleWeekDays(i)}
                     checked={weekDays.includes(i)}
                  >
                     <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                        <Checkbox.Indicator>
                           <Check size={20} className="text-white" />
                        </Checkbox.Indicator>
                     </div>
                     <span className="text-white leading-tight">
                        {weekDay}
                     </span>
                  </Checkbox.Root>
               );
            })}
         </div>

         <button className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
            <Check size={20} weight="bold" />
            Confirmar
         </button>
      </form>
   );
}
