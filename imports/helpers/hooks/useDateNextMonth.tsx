const useDateNextMonth = (date: any) => {

  const futureDate = new Date(date);
  futureDate.setMonth(futureDate.getMonth() + 1);

  return futureDate.toLocaleDateString()

}

export default useDateNextMonth