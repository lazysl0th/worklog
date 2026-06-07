import { PrismaPg } from '@prisma/adapter-pg';

import type { Prisma } from './generated/client.js';

import { PrismaClient } from './generated/client.js';

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const workTypesToSeed: Prisma.WorkTypeCreateInput[] = [
  { name: 'Разработка грунта' },
  { name: 'Обратная засыпка грунта' },
  { name: 'Планировка территории' },

  { name: 'Монтаж опалубки' },
  { name: 'Армирование железобетонных конструкций' },
  { name: 'Бетонирование' },
  { name: 'Кладка перегородок и стен' },

  { name: 'Штукатурка стен' },
  { name: 'Устройство стяжки пола' },
  { name: 'Облицовка плиткой' },
  { name: 'Малярные работы (покраска стен и потолков)' },

  { name: 'Прокладка силового кабеля' },
  { name: 'Монтаж трубопроводов водоснабжения' },
  { name: 'Монтаж воздуховодов вентиляции' },
  { name: 'Монтаж и сборка распределительных щитов' },

  { name: 'Устройство гидроизоляции' },
  { name: 'Устройство теплоизоляции кровли' },
  { name: 'Монтаж кровельного покрытия' },
];

async function main(): Promise<void> {
  for (const workType of workTypesToSeed) {
    await prisma.workType.upsert({
      where: { name: workType.name },
      update: { name: workType.name },
      create: workType,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
