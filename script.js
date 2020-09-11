const customerListElement = document.getElementById("customer-list");
const emailListElement = document.getElementById("email-list");
const url = "http://localhost:3000/customer";

getCustomerCollection();

async function getCustomerCollection() {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    printHTML(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

function printHTML(data) {
  let parseData = JSON.parse(data);
  for (let i = 0; i < parseData.length; i++) {
    let customer = document.createElement("p");
    let email = document.createElement("p");
    customer.innerText = parseData[i].name;
    email.innerText = parseData[i].email;
    customerListElement.appendChild(customer);
    emailListElement.appendChild(email);
  }
}

/*

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

getCustomerProfile()
  .then((data) => {
    printHTML(JSON.stringify(data));
  })
  .catch((error) => console.error(error));


async function getCustomerProfile() {
  try {
    // await response of fetch call
    let response = await fetch(url, {
      method: "GET",
    });
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
  } catch (error) {
    console.error(error);
  }
}

*/
