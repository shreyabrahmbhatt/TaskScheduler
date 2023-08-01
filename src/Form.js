import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Import the external CSS file

const API_BASE_URL = 'https://ib7xufe0m7.execute-api.us-east-1.amazonaws.com/prod';

const Form = ({ email }) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user's tasks and deadlines using the userId from DynamoDB via API Gateway
    fetchUserTasks();
  }, [email]);

  const fetchUserTasks = async () => {
    try {
      const URL = process.env.REACT_APP_API_LINK + "/gettask";
      const response = await axios.post(URL, { email });
      console.log('API Response:', response.data);
      const responseData = JSON.parse(response.data.body);

      if (Array.isArray(responseData)) {
        // If the response data is an array (tasks found), set the tasks
        setTasks(responseData);
      } else {
        // If the response data is not an array (e.g., error message), set an empty task list
        setTasks([]);
      }

      setLoading(false); // Set loading to false after setting tasks
    } catch (error) {
      console.error('Error fetching user tasks:', error);
      setLoading(false); // Set loading to false even if there's an error
      setError(error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Save the new task and deadline for the user in DynamoDB via API Gateway
      const URL = process.env.REACT_APP_API_LINK + "/saveTask";
      console.log("you were here")
      const response = await axios.post(URL, { email, task, deadline });
      console.log(response);
      // Refresh the list of tasks after submission
      fetchUserTasks();
      // Clear the input fields
      setTask('');
      setDeadline('');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Form</h1>
      <div className="task-form">
        <input type="text" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} />
        <input
          type="date"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="task-list">
        <h2>Tasks List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching tasks.</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found for the given user.</p>
        ) : (
          <ul>
            {/* Use a for loop to manually build the task list */}
            {(() => {
              const taskList = [];
              for (let i = 0; i < tasks.length; i++) {
                const taskItem = tasks[i];
                taskList.push(
                  <li key={taskItem.taskId}>
                    Task: {taskItem.task} | Deadline: {taskItem.deadline}
                  </li>
                );
              }
              return taskList;
            })()}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Form;
