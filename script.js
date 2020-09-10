upconst customerListElement = document.getElementById("customer-list");
const emailListElement = document.getElementById("email-list");
const url = "http://localhost:3000/customer";

getCustomerCollection();

function getCustomerCollection() {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      printHTML(JSON.stringify(data));
    })
    .catch((error) => console.error(error));
}

function printHTML(data) {
  let parseData = JSON.parse(data);
  for (let i = 0; i < parseData.length; i++) {
    let customerP = document.createElement("p");
    let emailP = document.createElement("p");
    customerP.innerText = parseData[i].name;
    emailP.innerText = parseData[i].email;
    customerListElement.appendChild(customerP);
    emailListElement.appendChild(emailP);
  }
}
