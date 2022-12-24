export default function Board() {
	return (
		<section
			id="js-kanban-board"
			// data-list-view is added/removed programmatically in KanbanViewSettings
			className="flex dark:data-[list-view=true]:flex-col"
		></section>
	);
}
