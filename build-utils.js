const { parse } = require("svg-parser");
const visit = require("unist-util-visit");

function createModuleName(fileName) {
  return fileName
    .replace(/\.svg/, "")
    .split("_")
    .map((_) => {
      if (_.slice(0, 1).match(/[0-9]/)) {
        _ = `_${_}`;
      }

      return _.slice(0, 1).toUpperCase() + _.slice(1);
    })
    .join("");
}

function mapProps(properties) {
  return Object.keys(properties).map(
    (property) => `${property}="${properties[property]}"`
  );
}

function toSvelte(svg) {
  const hast = parse(svg);
  const svg_props = [
    "{...$$restProps}",
    "on:click",
    "on:mouseover",
    "on:mouseenter",
    "on:mouseleave",
    "on:keydown",
  ];
  const svg_children = [];

  visit(hast, (node) => {
    if (node.type === "element") {
      if (node.tagName === "svg") {
        svg_props.push(mapProps(node.properties).join(" "));
      } else {
        svg_children.push(
          ["<", node.tagName, " ", mapProps(node.properties), " />"]
            .flat()
            .join("")
        );
      }
    }
  });

  return `
  <svg ${svg_props.join(" ")}>
    ${svg_children.flat().join("\n")}
  </svg>
`;
}

module.exports = { createModuleName, mapProps, toSvelte };
