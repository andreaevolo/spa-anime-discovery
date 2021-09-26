const localStorage = window.localStorage;

const addList = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const addObject = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  if (typeof key !== "string") {
    throw new TypeError("Invalid key type");
  }
  const value = localStorage.getItem(key);
  if (!value) {
    return null;
  }
  if(Array.isArray(value) || Object.keys(value).length) {
    return JSON.parse(value);
  }
};

export const addItem = (key, value) => {
  if (typeof value === "undefined") {
    throw new TypeError("Error: value is undefined");
  }
  if (typeof key !== "string") {
    throw new TypeError("Invalid key type");
  }

  if (typeof value !== "string") {
    if (typeof value === "number") {
      localStorage.setItem(key, value.toString());
      return;
    }

    if (Array.isArray(value)) {
      addList(key, value);
      return;
    }

    if (Object.isObject(value)) {
      addObject(key, value);
      return;
    }
  }

  localStorage.setItem(key, value);
};

export const removeItem = (key) => {
  if (typeof key !== "string") {
    throw new TypeError("Invalid key type");
  }

  localStorage.removeItem(key);
};
