import axios from "axios"

const Card = ({headline, authorPhoto, authorName}) => {
  const card = document.createElement('div');
  const theHeadline = document.createElement('div');
  const theAuthor = document.createElement('div');
  const imageContainer = document.createElement('div');
  const image = document.createElement('img');
  const name = document.createElement('span');

  card.classList.add('card');
  theHeadline.classList.add('headline');
  theHeadline.textContent = headline;
  theAuthor.classList.add('author');
  imageContainer.classList.add('img-container');
  image.src = authorPhoto;
  name.textContent = `By ${authorName}`;

  card.appendChild(theHeadline);
  card.appendChild(theAuthor);
  theAuthor.appendChild(imageContainer);
  theAuthor.appendChild(name);
  imageContainer.appendChild(image);

  card.addEventListener('click', function(event){
    console.log(headline);
  })
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  return card;
}

const cardAppender = (selector) => {
  const section = document.querySelector(selector);
  axios
  .get('https://lambda-times-api.herokuapp.com/articles')
  .then(function(res){
    // console.log('DATA', res.data.articles)
    const objectOfArrays = res.data.articles;
    const arrayOfArrays = Object.values(objectOfArrays);
    console.log(arrayOfArrays);
    arrayOfArrays.forEach(function(ary){
      ary.forEach(function(obj){
        const newCard = Card(obj);
        section.appendChild(newCard);
      })
    })
  })
  .catch(function(error){
    console.log(error);
  })
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
}

export { Card, cardAppender }
