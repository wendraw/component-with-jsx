function createElement(Class, attributes, ...children) {
  let o;
  if (typeof Class === "string") {
    o = new Wrapper(Class);
  } else {
    o = new Class();
  }

  for (let name in attributes) {
    o.setAttribute(name, attributes[name]);
  }

  for (let child of children) {
    o.appendChild(child);
  }

  return o;
}

class Text {
  constructor(data) {
    this.root = document.createTextNode(data);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
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
    for (let child of this.children) {
      if (typeof child === "string") {
        child = new Text(child);
      }
      child.mountTo(this.root);
    }
    parent.appendChild(this.root);
  }
}

class MyComponent {
  constructor() {
    this.children = [];
    this.attributes = new Map();
  }

  setAttribute(name, value) {
    this.attributes.set(name, value);
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
        <h1>{this.attributes.get("title")}</h1>
        <header>I'm a header</header>
        {this.slot}
        <footer>I'm a footer</footer>
      </article>
    );
  }
}

let component = (
  <MyComponent title="I'm a title">
    <div>text text</div>
  </MyComponent>
);
component.mountTo(document.body);

//////////////////////////////////////////////
/* class Div {
  constructor(config) {
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
    for (let child of this.children) {
      if (typeof child === "string") {
        child = new Text(child);
      }
      child.mountTo(this.root);
    }
    parent.appendChild(this.root);
  }
}

let component = (
  <Div
    id="idx"
    class="cls"
    style="width:200px;height:200px;background-color:lightgreen"
  >
    text text text
    <div style="width:100px;height:100px;background-color:lightblue"></div>
    <div style="width:100px;height:100px;background-color:lightpink"></div>
  </Div>
);
component.mountTo(document.body); */
//////////////////////////////////////////////

//////////////////////////////////////////////
/* class Parent {
  // config
  constructor(config) {
    console.log("Parent::constructor", config);
  }

  // property
  set id(value) {
    console.log("Parent::id", value);
  }

  // attribute
  setAttribute(name, value) {
    console.log("Parent::setAttribute", name, value);
  }

  // children
  appendChild(child) {
    console.log("Parent::appendChild", child);
  }
}

class Child {} 

let component = (
  <Parent id="idx">
    <Child></Child>
    <Child></Child>
  </Parent>
);
console.log(component);
*/
//////////////////////////////////////////
