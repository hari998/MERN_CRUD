
import 'regenerator-runtime/runtime';
// import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// ............  GET from server

const getQuote = async () => {
  try {
    event.preventDefault()
    const response = await axios.get(`${BASE_URL}/api/quotes`);
    const responsedata = await response.data

    const resData = responsedata.map(function (element) {

      const list = document.createDocumentFragment()
      const ul = document.getElementById('quote_ul');
      let li = document.createElement('li');
      let name = document.createElement('h5');
      let quote = document.createElement('span');

      name.innerHTML = `${element.name}`;
      quote.innerHTML = `${element.quote}`;

      li.appendChild(name);
      li.appendChild(quote);
      list.appendChild(li);
      ul.appendChild(list);

      return `${element.name} ${element.quote}`
    })

  } catch (errors) {
    console.error(errors);
  }
};
// to load directly on page, uncomment the below
// getQuote()

document.getElementById('getbutton').addEventListener('click', getQuote)

// ------------- POST to server and update on screen

const postQuote = async () => {
  try {
    event.preventDefault()
    const namevalue = document.getElementById("new_name").value
    const quotevalue = document.getElementById("new_quote").value
    const payload = {
      name: `${namevalue}`,
      quote: `${quotevalue}`
    }
    const response = await axios.post(`${BASE_URL}/api/quotes`, payload);
    const responsedata = await response.data
    const object = responsedata
    for (let keys = 1; keys < 2; keys++) {
      const list = document.createDocumentFragment()
      const ul = document.getElementById('quote_ul')
      let li = document.createElement('li');
      let name = document.createElement('h5');
      let quote = document.createElement('span');

      name.innerHTML = `${object.name}`;
      quote.innerHTML = `${object.quote}`;

      li.appendChild(name);
      li.appendChild(quote);
      list.appendChild(li);
      ul.appendChild(list);
    }
  } catch (error) {
    console.log(error)
  }
}
document.getElementById('postbutton').addEventListener('click', postQuote)

// -------------------- PUT update to server

