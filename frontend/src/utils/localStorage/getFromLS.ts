export const getFromLS = (key: any, keysName: string) => {
  let ls = {};
  if (global.localStorage) {
    // @ts-ignore
    ls = JSON.parse(global.localStorage.getItem(keysName)) || {};
  }
  // @ts-ignore
  return ls[key];
};
