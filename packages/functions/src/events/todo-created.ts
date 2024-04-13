import { EventHandler } from "sst/node/event-bus";
import { Todo } from "@free-index-scraper/core/todo";

export const handler = EventHandler(Todo.Events.Created, async (evt) => {
  console.log("Todo created", evt);
});
