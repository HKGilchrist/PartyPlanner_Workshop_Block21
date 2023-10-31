const COHORT = "2309-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;
//
//
const state = {
  events: [],
};
const partyList = document.getElementById("party-list");
const partyForm = document.getElementById("party-form");

async function createEvent(event) {
  event.preventDefault();
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        date: `${document.getElementById("date").value}:00.00Z`,
        location: document.getElementById("location").value,
        // These keys have to match API documentation.
      }),
    });
    getEvents();
  } catch (err) {
    console.error(err);
  }
}

partyForm.addEventListener("submit", createEvent);
//
//
// Function to fetch API data.
async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.events = json.data;
    render(); // Function call to render the event data.
  } catch (err) {
    console.log(err);
  }
}
// Function to create list data.
function render() {
  const events = state.events.map((event) => {
    const article = document.createElement("article");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener("click", async () => {
      try {
        const response = await fetch(API_URL + `/${event.id}`, {
          method: "DELETE",
        });
        getEvents();
      } catch (err) {
        console.log(err);
      }
      // DELETE is an await request, so function has to be async.
    });
    article.innerHTML = `
      <h3>${event.name}</h3>
      <address>${event.location}</address>
    `;
    article.append(deleteBtn);

    return article;
  });
  partyList.replaceChildren(...events);
}

getEvents();
