import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
   app.post("/habits", async (req, res) => {
      const createHabitBody = z.object({
         title: z.string(),
         weekDays: z.array(z.number().min(0).max(6)),
      });

      const { title, weekDays } = createHabitBody.parse(req.body);

      const today = dayjs().startOf("day").toDate();
      const habit = await prisma.habit.create({
         data: {
            title,
            created_at: today,
            weekDays: {
               create: weekDays.map((weekDay) => {
                  return {
                     week_day: weekDay,
                  };
               }),
            },
         },
      });

      res.status(201);
   });

   app.get("/day", async (req, res) => {
      const getDayParams = z.object({
         date: z.coerce.date(),
      });

      const { date } = getDayParams.parse(req.query);

      const parsedDate = dayjs(date).startOf("day");
      const weekDay = parsedDate.get("day");

      const possibleHabits = await prisma.habit.findMany({
         where: {
            created_at: {
               lte: date,
            },
            weekDays: {
               some: {
                  week_day: weekDay,
               },
            },
         },
      });

      const day = await prisma.day.findUnique({
         where: {
            date: parsedDate.toDate(),
         },
         include: {
            dayHabits: true,
         },
      });

      const completedHabits = day?.dayHabits.map(
         (dayHabit) => dayHabit.habit_id
      );

      res.status(201).send({ possibleHabits, completedHabits });
   });

   app.patch("/habits/:id/toggle", async (req, res) => {
      const toggleHabitsParam = z.object({
         id: z.string().uuid(),
      });

      const { id } = toggleHabitsParam.parse(req.params);

      const today = dayjs().startOf("day").toDate();

      let day = await prisma.day.findUnique({
         where: {
            date: today,
         },
      });

      if (!day) {
         day = await prisma.day.create({
            data: {
               date: today,
            },
         });
      }

      const dayHabit = await prisma.dayHabit.findUnique({
         where: {
            day_id_habit_id: {
               day_id: day.id,
               habit_id: id,
            },
         },
      });

      if (dayHabit) {
         await prisma.dayHabit.delete({
            where: {
               id: dayHabit.id,
            },
         });
      } else {
         await prisma.dayHabit.create({
            data: {
               day_id: day.id,
               habit_id: id,
            },
         });
      }
   });
}
