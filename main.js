function createElement(Class, attrs, ...children) {
  let o;

  if (typeof Class === "string") {
    o = new Wrapper(Class);
  } else {
    o = new Class({ timer: 1 });
  }

  for (let name in attrs) {
    o.setAttribute(name, attrs[name]);
  }

  for (let child of children) {
    o.appendChild(child);
  }

  return o;
}

class Wrapper {
  constructor(type) {
    this.root = document.createElement(type);
    this.children = [];
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);

    for (let child of this.children) {
      if (typeof child === "string") {
        child = new Text(child);
      }
      child.mountTo(this.root);
    }
  }
}

class Text {
  constructor(type) {
    this.root = document.createTextNode(type);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class MyComponent {
  constructor() {
    this.root = document.createElement("div");
    this.children = [];
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  mountTo(parent) {
    this.slot = <div></div>;
    for (let child of this.children) {
      this.slot.appendChild(child);
    }
    this.render().mountTo(parent);
  }

  render() {
    return (
      <article>
        <header>I'm a header</header>
        {this.slot}
        <footer>I'm a footer</footer>
      </article>
    );
  }
}

/* class Div {
  constructor() {
    this.root = document.createElement("div");
    this.children = [];
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);

    for (let child of this.children) {
      if (typeof child === "string") {
        child = new Text(child);
      }
      child.mountTo(this.root);
    }
  }
} */

/* class Parent {
  constructor(config) {
    this.root = document.createElement("div");
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    child.mountTo(this.root);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Child {
  constructor(config) {
    this.root = document.createElement("div");
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    child.mountTo(this.root);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
} */

/* let component = (
  <Div id="a" class="b" style="width:100px;height:100px;background-color:#f44">
    <Div></Div>
    <Div></Div>
    <Div></Div>
  </Div>
); */
// 上面的代码会翻译成下面这样
/* var component = createElement(
  Parent,
  {
    id: "a",
  },
  createElement(Child, null),
  createElement(Child, null),
  createElement(Child, null)
); */

/* let component = (
  <div style="width:100px;height:100px"><div>{new Wrapper("span")}</div></div>
); */

let component = (
  <MyComponent>
    <div>text text</div>
  </MyComponent>
);

component.mountTo(document.body);
console.log(component);
