import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@gmail.com",
      passwordHash:
        "$2b$10$AHzzgUz6PZcMrOnXvsPht.fz2Bn4ipwdDwtUNpAPE9xcGRHBY0SK2",
      name: "Hello world",
    },
  });

  const project = await prisma.project.create({
    data: {
      title: "Test project",
      client: "Boring company",
      completionPercentage: 28,
      deadline: new Date("2023/01/15"),
    },
  });

  await prisma.taskStatus.createMany({
    data: [
      { name: "Backlog" },
      { name: "To do" },
      { name: "In Progress" },
      { name: "Done" },
    ],
  });

  await prisma.task.create({
    data: {
      title: "Testing task",
      projectId: project.id,
      assignedUsersIds: [user.id],
      creatorId: user.id,
      taskStatusId: 1,
      description: "This is testing task",
      deadline: new Date("2023/01/10"),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
