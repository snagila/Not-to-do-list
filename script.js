let taskList = [];

const hrsPerWeek = 24 * 7;

const handleOnSubmit = (e) => {
  const newForm = new FormData(e);
  const task = newForm.get("task");
  const hr = +newForm.get("hr");

  const obj = {
    task,
    hr,
    id: randomIdGenerator(),
    type: "entry",
  };
  // check total hrs in a week
  const existingTtl = taskTotal();
  if (existingTtl + hr > hrsPerWeek) {
    return alert("Sorry! Maximun hours per week has been spended");
  }
  taskList.push(obj);
  displayEntryList();
};

const displayEntryList = () => {
  let str = "";
  const entryElm = document.getElementById("entryList");

  const entryList = taskList.filter((item) => item.type === "entry");

  entryList.map((item, index) => {
    str += `<tr class="md">
    <td>${index + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
      <button class="rounded bg-danger btn">
        <i class="fa-solid fa-trash"  onclick = "handleOnDelete('${
          item.id
        }')"></i>
      </button>
      <button class="btn bg-success" onclick = "switchTask('${
        item.id
      }','bad')"=>
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
  </tr>`;
  });

  entryElm.innerHTML = str;
  displayBadList();
  taskTotal();
};

const displayBadList = () => {
  let str = "";
  const badElm = document.getElementById("badList");

  const badList = taskList.filter((item) => item.type === "bad");

  badList.map((item, index) => {
    str += `<tr class="md">
    <td>${index + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
    <button onclick="switchTask('${item.id}','entry')" class="btn bg-warning" =>
      <i class="fa-solid fa-arrow-left"></i>
    </button>
    <button class="rounded bg-danger btn">
      <i class="fa-solid fa-trash"  onclick = "handleOnDelete('${
        item.id
      }')"></i>
    </button>
      
    </td>
  </tr>`;
  });
  badElm.innerHTML = str;

  document.getElementById("savedHrs").innerText = badList.reduce(
    (acc, item) => acc + item.hr,
    0
  );
};

const switchTask = (id, type) => {
  console.log(id, type);
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    console.log(item);
    return item;
  });

  displayEntryList();
  displayBadList();
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
    displayBadList();
  }
};

const taskTotal = () => {
  const ttlhrsElm = document.getElementById("ttlHrs");
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  ttlhrsElm.innerText = ttlHr;
  return ttlHr;
};
