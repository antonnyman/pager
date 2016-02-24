/* routes */
page('/', index);
page('/breakfast', breakfast);
page('/cake', cake);
page();

function index() {
  template('index');
  list();
}

function breakfast() {
  template('red');
  partial('breakfast');
}

function cake() {
  template('green');
  partial('cake');
}


function template(name) {
  var el = document.getElementById('content');
  reset(el);
  el.classList.add(name);
}

function list() {
  var el = document.getElementById('content');
  reset(el);
  var ul = document.createElement('ul');
  ul.setAttribute('id', 'coollist');
  el.appendChild(ul);
  getJson('content.json').then(function(data) {
    for(var i = 0; i < data.recipes.length; i++) {
      var li = document.createElement('li');
      li.setAttribute('class', 'item');
      ul.appendChild(li);
      li.innerHTML = data.recipes[i].title;
    }

  });
}

function partial(url) {
  var el = document.getElementById('content');
  getJson('content.json').then(function(data) {
    for(var i = 0; i < data.recipes.length; i++) {
      if(url == data.recipes[i].url) {
        el.innerHTML = data.recipes[i].url;
      }
    }
  });
}

function reset(el) {
  el.innerHTML = "";
  el.className = "";
}
