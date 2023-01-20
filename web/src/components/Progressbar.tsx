interface ProgressbarProps {
   progress: number;
}

export function Progressbar({ progress }: ProgressbarProps) {
   const progressStyles = {
      width: `${progress}%`,
   };

   return (
      <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
         <div
            className="h-3 rounded-xl bg-violet-600"
            style={progressStyles}
            role="progressbar"
            aria-label="Progresso de hábitos completados nesse dia"
            aria-valuenow={progress}
         />
      </div>
   );
}
