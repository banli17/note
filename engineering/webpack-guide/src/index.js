import "./style.css";
import printMe from "./print.js";

import Icon from "./assets/icon.svg";
// import a from "./assets/a.json";
// import toml from "./assets/data.toml";
// import yaml from "./assets/data.yaml";
// import json from "./assets/data.json5";

// console.log(toml.title); // output `TOML Example`
// console.log(toml.owner.name); // output `Tom Preston-Werner`

// console.log(yaml.title); // output `YAML Example`
// console.log(yaml.owner.name); // output `Tom Preston-Werner`

// console.log(json.title); // output `JSON5 Example`
// console.log(json.owner.name); // output `Tom Preston-Werner`

// console.log(a.name);

// console.log(dataYaml);

async function getComponent() {
  const {default: _} = await import("lodash");
  const element = document.createElement("div");

  element.innerHTML = _.join(["Hello1", "webpack"], " ");

  element.classList.add("hello");

  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  const btn = document.createElement("button");
  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

getComponent().then((component) => {
  document.body.appendChild(component);
});

console.log("222");
