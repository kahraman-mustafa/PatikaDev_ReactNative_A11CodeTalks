/* // Function to convert into camel Case
function camelCase(str) {
    // Using replace method with regEx
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
} */

export const toPascalCase = (str: string | undefined) => {
  // Using replace method with regEx
  return str?.replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) => {
    return index === 0 ? match.toUpperCase() : match.toUpperCase();
  });
};
