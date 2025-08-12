import { isObject } from "@vue/share";
console.log(isObject(null)); // false
console.log(isObject(undefined)); // false
console.log(isObject(1)); // false