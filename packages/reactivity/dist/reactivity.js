// packages/share/src/index.ts
function isObject(val) {
  return typeof val === "object" && val !== null;
}

// packages/reactivity/src/index.ts
console.log(isObject(null));
console.log(isObject(void 0));
console.log(isObject(1));
//# sourceMappingURL=reactivity.js.map
