export const loadInitialState = (bucket: string, defaultValue = []) => {
  try {
    const savedData = sessionStorage.getItem(bucket);
    return savedData ? JSON.parse(savedData) : defaultValue;
  } catch {
    return defaultValue;
  }
};
