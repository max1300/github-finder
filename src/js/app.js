import {getUsers} from './services/github.services'
import('../styles/index.css');


if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(function () {
      console.log('Service Worker Registered');
    });
}

const app = {
  init() {
    const research = document.getElementById('research');
    research.addEventListener('keyup', (e) => {
    event.preventDefault();
    app.userContainer().remove();
      getUsers(e.target.value)
        .then((users) => {
            
          if (users.length != 0) {
              const userList = users.map(function(user)  {
              return app.userItem(user);
              });
      
              const container = app.userContainer();
              userList.forEach(function(li) {
              container.appendChild(li);
              });
          }

          

        })
        .catch(err => {
          console.log(err)
          const errorLabel = document.createElement('p');
          errorLabel.innerHTML = err.message;
          document.body.appendChild(errorLabel);
        })
    });
  },
  
  userContainer: function () {
    
    const ulId = 'user-container';
    let ul = document.getElementById(ulId);
    
    if (!ul) {
      ul = document.createElement('ul');
      ul.setAttribute('id', ulId)
      ul.setAttribute('class', 'ulAffichage');
      document.body.appendChild(ul);
    }

    return ul;

  },
  userItem: function (user) {
    const li = document.createElement('li');
    li.setAttribute('class', 'liAffichage');

    const paragrapheImage = document.createElement('p');
    const image = document.createElement('img');
    image.setAttribute('src', user.avatar);
    paragrapheImage.appendChild(image);
    li.appendChild(paragrapheImage);

    const paragrapheLogin = document.createElement('p');
    paragrapheLogin.innerHTML = 'Login: ' + user.login;
    li.appendChild(paragrapheLogin);

    const paragrapheType = document.createElement('p');
    paragrapheType.innerHTML = 'Type: ' + user.type;
    li.appendChild(paragrapheType);

    const paragrapheRepo = document.createElement('p');
    paragrapheRepo.innerHTML = 'Nombre de repositories: ' + user.repo;
    li.appendChild(paragrapheRepo);

    return li;

  },
  

}


app.init();