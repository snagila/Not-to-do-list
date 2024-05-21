const handleOnSubmit = (e) => {
  const newForm = new FormData(e);
  const task = newForm.get("task");
  const hr = newForm.get("hr");
  console.log(task, hr);
};
