import { useRouter } from "next/router";

export default function TasksBoard() {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <ul
      id="js-kanban-board"
      // data-list-view is added/removed programmatically in KanbanViewSettings
      className="group flex w-full snap-x snap-mandatory flex-nowrap gap-4 overflow-y-scroll dark:data-[list-view=true]:flex-col"
    ></ul>
  );
}
