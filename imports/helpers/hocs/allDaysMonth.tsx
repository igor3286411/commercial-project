const allDaysMonth = (
    datesState?: (arg: Date[]) => void,
    hoursState?: (arg: number[]) => void,
    date?: number | (() => number | undefined) | undefined,
) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    let today: number | undefined;

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

    if (typeof date === 'function') {
        today = date();
    } else {
        today = typeof date === 'number' ? date : currentDate.getDate();
    }

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // const daysToAdd = 30;
    const datesArray: Date[] = [];

    for (let i = 0; i < daysInMonth; i++) {
        const targetDate = new Date(currentYear, currentMonth, /* today ? today + i :  */firstDayOfMonth.getDate() + i);
        datesArray.push(targetDate);
    }

    const hoursArray: string[] = [];

    for (let hour = 0; hour < 2; hour++) {
        hoursArray.push(`${hour < 10 ? '0' : ''}${hour}:00`);
        hoursArray.push(`${hour < 10 ? '0' : ''}${hour}:30`);
    }

    for (let hour = 7; hour < 24; hour++) {
        hoursArray.push(`${hour < 10 ? '0' : ''}${hour}:00`);
        hoursArray.push(`${hour < 10 ? '0' : ''}${hour}:30`);
    }

    datesState ? datesState(datesArray) : undefined;
    //@ts-ignore
    hoursState ? hoursState(hoursArray) : undefined;
}

export default allDaysMonth;