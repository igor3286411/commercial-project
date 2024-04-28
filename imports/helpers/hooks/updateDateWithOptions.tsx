const updateDateWithOptions = (date) => {
    const newDate = new Date(date)
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const currentDate = newDate.toLocaleDateString('ru-RU', options);
    return currentDate;
};

export default updateDateWithOptions;