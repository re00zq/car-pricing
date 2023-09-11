export default (object: object, ...filtered: string[]): object => {
  const filteredObject = {};

  Object.keys(object).forEach((key) => {
    if (filtered.includes(key)) filteredObject[key] = object[key];
  });

  return filteredObject;
};
