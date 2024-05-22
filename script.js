const taskList = [];

const handleOnSubmit = (e) => {
  const newForm = new FormData(e);
  const task = newForm.get("task");
  const hr = newForm.get("hr");

  const obj = {
    task,
    hr,
  };
  taskList.push(obj);
  displayEntryList();
};

const displayEntryList = () => {
  let str = "";
  const entryList = document.getElementById("entryList");
  taskList.map((item, index) => {
    str += `<tr class="md">
    <td>${index + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
      <button class="rounded bg-danger btn">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button class="btn bg-success">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
  </tr>`;
  });
  entryList.innerHTML = str;
  console.log(str);
};
