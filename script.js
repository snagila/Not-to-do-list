let taskList = [];

const handleOnSubmit = (e) => {
  const newForm = new FormData(e);
  const task = newForm.get("task");
  const hr = newForm.get("hr");

  const obj = {
    task,
    hr,
    id: randomIdGenerator(),
  };
  taskList.push(obj);
  console.log(taskList);
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
        <i class="fa-solid fa-trash"  onclick = handleOnDelete('${
          item.id
        }')></i>
      </button>
      <button class="btn bg-success">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
  </tr>`;
  });
  entryList.innerHTML = str;
};

const randomIdGenerator = () => {
  const str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  let id = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    id += str[randomIndex];
  }
  return id;
};

const handleOnDelete = (id) => {
  if (window.confirm("Are you sure you want to delete the item?")) {
    const filteredArray = taskList.filter((item) => item.id !== id);
    taskList = filteredArray;
    displayEntryList();
  }
};

const switchTask = () => {};
