import { Task } from "@prisma/client";

const isTask = (data: any): data is Task => {
  const keysToCheck = [
    "id",
    "title",
    "description",
    "attachments",
    "assignedUsersIds",
    "taskStatusId",
    "creatorId",
    "projectId",
    "deadline",
    "createdAt",
    "updatedAt",
  ];
  return Object.keys(data).every((item) => keysToCheck.includes(item));
};

export default isTask;
