import { useContext, useState } from "react";
import { crudContext } from "../../context/crudContext";
import "./Task.css";
import { ModalType, TaskStructure } from "../../types";
import { modalContext } from "../../context/modalContext";
import { Button } from "../Button/Button";
import { patchStatusTask } from "../../service/ApiService";

interface Props {
  item: TaskStructure;
}
export const Task = ({ item }: Props) => {
  const [isChecked, setIsChecked] = useState(item.isDone);

  const { setAllData } = useContext(crudContext);
  const { openModal } = useContext(modalContext);

  const { Edit, Delete } = ModalType;

  /**
   * Updates the task in the state with the current item.
   */
  const setTask = () => {
    setAllData((prevData) => ({
      ...prevData,
      task: item,
    }));
  };

  /**
   * Handles the click event to open a modal and set the current task.
   *
   * @param {ModalType.Edit | ModalType.Delete} modal - The type of modal to open.
   */
  const handleOnClicked = (modal: ModalType.Edit | ModalType.Delete) => {
    openModal(modal); // Open the specified modal
    setTask(); // Set the current task in the state
  };

  /**
   * Handles the change event for the task status checkbox.
   *
   * @param {number} id - The ID of the task to update.
   */
  const handleOnChange = async (id: number) => {
    setIsChecked((prevChecked) => !prevChecked); // Toggle the checked state
    await patchStatusTask(id); // Update the task status on the server
  };

  /**
   * Determines the CSS class for the task's due date based on how soon it is.
   *
   * @returns {string} The CSS class indicating the urgency of the due date.
   */
  const handleDateStyle = () => {
    // If there is no due date, return an empty string
    if (!item.dueDate) {
      return "";
    }

    // Base class for due date styling
    let dateStyle = "due";

    // Get the current date
    const actualDate: Date = new Date();

    // Calculate the difference in milliseconds between the due date and the current date
    const dateComparison: number =
      new Date(item.dueDate).getTime() - actualDate.getTime();

    // Convert the difference from milliseconds to days
    const dateComparisonDays: number = Math.ceil(
      dateComparison / (1000 * 3600 * 24)
    );

    // Determine the appropriate CSS class based on the number of days until the due date
    if (dateComparisonDays <= 7) {
      dateStyle += "__soon"; // Due within a week
    } else if (dateComparisonDays <= 14) {
      dateStyle += "__soonish"; // Due within two weeks
    } else {
      dateStyle += "__later"; // Due in more than two weeks
    }

    return dateStyle;
  };
  const dateStyle = handleDateStyle();

  return (
    <div className="task">
      <input
        type="checkbox"
        name="done"
        id=""
        checked={isChecked}
        onChange={() => {
          void handleOnChange(item.id);
        }}
      />
      <p className="task__name">{item.text}</p>
      <div className={`task__priority task__info  high__prio ${item.priority}`}>
        <p>{item.priority}</p>
      </div>
      <div className={`task__date task__info ${dateStyle}`}>
        <p>
          {item.dueDate
            ? new Date(item.dueDate).toLocaleDateString()
            : "No due date"}
        </p>
      </div>

      <div className="actions">
        <Button
          className="button__actions button__blue"
          onClick={() => {
            handleOnClicked(Edit);
          }}
        >
          Edit
        </Button>
        <Button
          className="button__actions button__red"
          onClick={() => {
            handleOnClicked(Delete);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
