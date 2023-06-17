export function checkDate(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log('check', date, today, date > today);
    return date > today ? false : true;
}

export function isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}
