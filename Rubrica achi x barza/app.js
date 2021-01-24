//Contact constructor
function Contact(firstName, lastName, phoneNumber, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address = address;
}
//UI constructor
function UI() {}
//Add contact to the list
UI.prototype.addContactToList = function (contact) {
  const list = document.getElementById("contact-list");
  //Create the element
  const row = document.createElement("tr");
  //Insert columns
  row.innerHTML = `
        <td>${contact.firstName}</td>
        <td>${contact.lastName}</td>
        <td>${contact.phoneNumber}</td>
        <td>${contact.address}</td>
        <td><a href = '#' class = 'delete'>X<a></d>
    `;
  list.appendChild(row);
};
//Show alert
UI.prototype.showAlert = function (message, className) {
  //create a div
  const div = document.createElement("div");
  //add classes
  div.className = `alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));
  //Get parent element
  const container = document.querySelector(".container");
  const form = document.querySelector("#contact-form");
  //Insert alert
  container.insertBefore(div, form);
  //Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

//Delete contacts
UI.prototype.deleteConctact = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

//Clear fields
UI.prototype.clearFields = function () {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("address").value = "";
};
//Locale storage class
class Store {
  static getContacts() {
    let contacts;
    if (localStorage.getItem("contacts") === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    return contacts;
  }
  static displayContacts() {
    const contacts = Store.getContacts();
    contacts.forEach(function (contact) {
      const ui = new UI();
      //Add contacts to UI
      ui.addContactToList(contact);
    });
  }
  static addContacts(contact) {
    const contacts = Store.getContacts();
    contacts.push();
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
  static removeContact() {}
}
//DOM load event
document.addEventListener("DOMContentLoaded", Store.displayContacts);
//event listener to add contacts
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    //Get form values
    const firstName = document.getElementById("firstName").value,
      lastName = document.getElementById("lastName").value,
      phoneNumber = document.getElementById("phoneNumber").value,
      address = document.getElementById("address").value;
    //Instantiate contact
    const contact = new Contact(firstName, lastName, phoneNumber, address);
    //Instantiate UI
    const ui = new UI();
    //Validation
    if (
      firstName === "" &&
      lastName === "" &&
      phoneNumber === "" &&
      address === ""
    ) {
      ui.showAlert("Please fill at leats one field", "error");
    } else {
      //Add contact to list
      ui.addContactToList(contact);
      //Add to local storage
      Store.addContacts(contact);
      //Show success
      ui.showAlert("Contact added successfull!", "success");
      //Clear fields
      ui.clearFields();
    }
    e.preventDefault();
  });

//Event listener for contact
document.getElementById("contact-list").addEventListener("click", function (e) {
  const ui = new UI();
  //Delete contact
  if (e.target.getAttribute("class") == "delete") {
    ui.deleteConctact(e.target);
    ui.showAlert("Contact removed", "remove");
  }

  //Show alert
  e.preventDefault();
});
