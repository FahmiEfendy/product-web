export const stringFormatter = (text, maxLength = 255) => {
  if (!text) return;

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength)}...`;
};
