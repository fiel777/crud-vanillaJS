const input_txt_area = document.querySelector("#input-text");
const submit = document.querySelector("#submit");
const result_tasks = document.querySelector("#result-holder");
const textvalidation = document.querySelector("#inputValidation");
const asdasdas = document.querySelector("result-con");

let data = [];
const d = new Date();
const datenow = d.toLocaleString();

const handleData = () => {
  data.push({
    text: input_txt_area.value,
    date: datenow,
  });
  setLocalStorage();
};

const createTask = () => {
  result_tasks.innerHTML = "";
  data.map((item, key) => {
    return (result_tasks.innerHTML += `<div id=${key} class="result-con"">
    <div class = "list">
    <p>${item.text}</p>
    <h1 class = "time">${item.date}</h1>
    </div>
        <div class="controls">
          <span class="edit" onClick = "editItems(this)" >Edit</span>
          <span class="delete" onClick = "deleteItems(this)">Delete</span>
        </div>
      </div>`);
  });
  input_txt_area.value = " ";
};

const deleteItems = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  setLocalStorage();
  location.reload();
};
const editItems = (e) => {
  const selecteditem = e.parentElement.parentElement;
  input_txt_area.value = selecteditem.querySelector("p").innerHTML;
  submit.innerHTML = "Edit";
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
};

const formOnInput = () => {
  if (input_txt_area.value.length >= 3) {
    textvalidation.style.display = "none";
  }
};

const inputsValidation = () => {
  if (input_txt_area.value == 0) {
    textvalidation.style.display = "flex";
    formOnInput();
  } else {
    handleData();
    createTask();
    submit.innerHTML = "Submit";
  }
};

submit.onclick = () => {
  inputsValidation();
};

const setLocalStorage = () => {
  localStorage.setItem("data", JSON.stringify(data));
};

window.onload = () => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTask();
};
