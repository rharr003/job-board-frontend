function useLocalStorage(data = {}) {
  function setLocaleStorage(data) {
    Object.keys(data).forEach((val) => {
      localStorage.setItem(val, data[val]);
    });
  }

  function getLocaleStorage() {
    return { ...localStorage };
  }

  return [setLocaleStorage, getLocaleStorage];
}

export default useLocalStorage;
