const useDaysDifference = (date: any) => {

  const futureDate = new Date(date);
  futureDate.setMonth(futureDate.getMonth() + 1);

  const timeDifference = futureDate.getTime() - new Date().getTime();
  const daysDifference = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));

  return daysDifference

}
export default useDaysDifference
