import { Category } from "./category";
import { Subtask } from "./subtask";

export interface Task {
    id: number; // wird vergeben
    headline: string; // required
    text?: string;
    task_user?: []; // [ {full_name: "Vanessa Franken", color: "rgb(110, 82, 255)", name: "VF"}, {full_name: "Max Mustermann", color: "rgb(255, 102, 102)", name: "MM"}]
    date: string; // required
    priority: string; // wird vergeben wenn nicht ausgewählt
    category: Category; // required {text: "Privat", color: "#0038FF"}
    subtasks?: Subtask[]; // [ {text: "Arrange Furniture", completed: 1}, {text: "Set Up Technology", completed: 1}]
    task_board: string; // wird vergeben
}
