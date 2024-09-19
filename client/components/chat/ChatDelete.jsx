const ChatDelete = async (id) => {
  const deleteTask = async (id) => {
    try {
      const deleteTask = await fetch("/api/chat/" + id, {
        method: "DELETE",
      });

      if (!deleteTask.ok) {
        console.log(
          `Error, failed to delete task ${deleteTask.status} ${deleteTask.statusText}`,
        );
      }

      if (deleteTask.ok) {
        console.log("Task deleted successfully");
      }
    } catch (error) {
      console.log("Error while using delete button" + error);
    }
  };

  await deleteTask(id);
};

export default ChatDelete;
