
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
}
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
}