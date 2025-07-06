export const calcPlayerName = (name: string): string => {
  const [firstName, lastName] = name.split(" ");
  return lastName
    ? (firstName[0] + lastName[0]).toUpperCase()
    : firstName.slice(0, 2).toLocaleUpperCase();
};
