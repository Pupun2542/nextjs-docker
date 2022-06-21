export function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *\n*$/) !== null;
  }