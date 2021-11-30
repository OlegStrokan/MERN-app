export const saveToLS = (key: any, value: any, keysValue: string) => {
  if (global.localStorage) {
    global.localStorage.setItem(
      keysValue,
      JSON.stringify({
        [key]: value,
      }),
    );
  }
};
