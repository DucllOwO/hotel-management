export const getMonth = (date) => {
  // let dateString = date.toString();
  // const tempArray = dateString.split("-");
  // console.log(tempArray);
  const newDate = new Date(date);
  const dateString = newDate.toISOString();
  const tempArray = dateString.split("-");
  // console.log(tempArray);
  return `${tempArray[0]}-${tempArray[1]}-1`;
  // console.log(month)
  // return month;
};
export const getYear = (date) => {
  // let dateString = date.toString();
  // const tempArray = dateString.split("-");
  // console.log(tempArray);
  const newDate = new Date(date);
  const dateString = newDate.toISOString();
  const tempArray = dateString.split("-");
  // console.log(tempArray);
  const year = new Date(tempArray[0]);
  // console.log(year)
  return year.toISOString();
};

export function isNumberKey(key) {
  var charCode = key.charCodeAt(0);
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
}

export function isAlphaOnly(key) {
  var keyCode = key.charCodeAt(0);
  if (keyCode > 31 && (keyCode < 48 || keyCode > 57)) return true;
  return false;
}

export function hasWhiteSpace(s) {
  return /\s/.test(s);
}
