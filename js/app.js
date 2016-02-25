/* routes
var pages = [];
page('/', index);
page('/recipes/:id', partial);
page('/drinks/:id', partial);
page('/drinks/orange-juice', orange_juice);
page();
*/

function index() {
  template('index');
  list('drinks');
}

function orange_juice() {
  template('partial');
  partial('orange-juice');
}

function template(name) {
  var el = document.getElementById('content');
  reset(el);
  el.classList.add(name);
}

function list(type) {
  var el = document.getElementById('content');
  var ul = document.createElement('ul');
  ul.setAttribute('id', 'coollist');
  el.appendChild(ul);
  getJson('content.json').then(function(data) {
    for(var root in data) {
      if(data.hasOwnProperty(root)) {
        var tree = data[root];
        if(root == type) {
          for(var key in tree) {
            var node = tree[key];
            var li = document.createElement('li');
            li.setAttribute('class', 'item');
            var a = document.createElement('a');
            var linkText = document.createTextNode(node.title);
            a.appendChild(linkText);
            a.title = node.title;
            a.href = root + '/' + key;
            li.appendChild(a);
            ul.appendChild(li);
          }
        }
      }
    }
  });
}


function partial(ctx) {
  template('partial');
  var el = document.getElementById('content');
  getJson('content.json').then(function(data) {
    for(var root in data) {
      if(data.hasOwnProperty(root)) {
        var tree = data[root];
        for(var key in tree) {
          var node = tree[key];
          if(key == ctx) {
            el.innerHTML = node.body;
          }
        }
      }
    }
  });
}

function reset(el) {
  el.innerHTML = "";
  el.className = "";
}
