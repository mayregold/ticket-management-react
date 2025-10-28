export const validateRegister = ({ username, password }) => {
  const errors = {};

  if (!username || username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters long.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  } else if (!/\d/.test(password)) {
    errors.password = "Password must include at least one number.";
  }

  return errors;
};

export const validateTicket = ({ title, description, priority, status }) => {
  const errors = {};

  
  if (!title || !title.trim()) {
    errors.title = "Title is required.";
  }

  if (!description || description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters long.";
  }

  const validPriorities = ["low", "medium", "high"];
  if (!validPriorities.includes(priority)) {
    errors.priority = "Invalid priority value.";
  }

  const validStatuses = ["open", "pending", "closed"];
  if (!validStatuses.includes(status)) {
    errors.status = "Invalid status value.";
  }

  return errors;
};
