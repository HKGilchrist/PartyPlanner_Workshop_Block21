const COHORT = "2309-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const eventTable = document.getElementById("event-table");

let tableArr = [];

/* ---- Functions ---- */
async function loadData() {
  // Requesting API to go get data from /events.
  const result = await fetch(API_URL);
  //console.log(result);
  let tableData = await result.json();
  console.log(tableData.data);
  tableArr = tableData.data;
}

function populateTable() {
  let tableRows = eventTable.innerHTML;
  for (let i = 0; i < tableArr.length; i++) {
    eventTable.rows.push(`<td>${tableArr[i].name}</td>`);
  }
  console.log(eventTable.rows);
  eventTable.innerHTML = tableRows;
}

/* ---- Function Calls ---- */
loadData();
populateTable();
