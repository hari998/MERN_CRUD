import 'regenerator-runtime/runtime';
// import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// ............  GET from server

const getDetails = async () => {
  try {
    event.preventDefault()
    const response = await axios.get(`${BASE_URL}/api/goals`);
    const responsedata = await response.data

    const resData = responsedata.map(function (element) {

      const list = document.createDocumentFragment()
      const ul = document.getElementById('records_ul');
      let li = document.createElement('li');
      let name = document.createElement('h5');
      let email = document.createElement('span');

      name.innerHTML = `${element.name}`;
      email.innerHTML = `${element.email}`;

      li.appendChild(name);
      li.appendChild(email);
      list.appendChild(li);
      ul.appendChild(list);

      return `${element.name} ${element.email}`
    })

  } catch (errors) {
    console.error(errors);
  }
};
// to load directly on page, uncomment the below
// getDetails()

document.getElementById('getbutton').addEventListener('click', getDetails)

// ------------- POST to server and update on screen

const postDetails = async () => {
  try {
    event.preventDefault()
    const namevalue = document.getElementById("new_name").value
    const emailvalue = document.getElementById("new_email").value
    const payload = {
      name: `${namevalue}`,
      email: `${emailvalue}`
    }
    const response = await axios.post(`${BASE_URL}/api/goals`, payload);
    const responsedata = await response.data
    const object = responsedata
    for (let keys = 1; keys < 2; keys++) {
      const list = document.createDocumentFragment()
      const ul = document.getElementById('records_ul')
      let li = document.createElement('li');
      let name = document.createElement('h5');
      let email = document.createElement('span');

      name.innerHTML = `${object.name}`;
      email.innerHTML = `${object.email}`;

      li.appendChild(name);
      li.appendChild(email);
      list.appendChild(li);
      ul.appendChild(list);
    }
  } catch (error) {
    console.log(error)
  }
}
document.getElementById('postbutton').addEventListener('click', postDetails)

// -------------------- PUT update to server

