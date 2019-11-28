// Your code here
const createEmployeeRecord = (array) => {
    return {
        firstName: array[0], 
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (recordArray) => {
    return recordArray.map(record => createEmployeeRecord(record));
}

const createTimeInEvent = (record, datestamp) => {
    const [date, time] = datestamp.split(" ");
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time),
        date, 
    });
    return record;
}

const createTimeOutEvent = (record, datestamp) => {
    const [date, time] = datestamp.split(" ");

    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time),
        date, 
    });
    return record;
}

const hoursWorkedOnDate = (record, datestamp) => {
    const [date, time] = datestamp.split(" ");
    const timeIn = record.timeInEvents.find(recordDate => recordDate.date === date).hour;
    const timeOut = record.timeOutEvents.find(recordDate => recordDate.date === date).hour;
    
    return (timeOut - timeIn) / 100;
}

const wagesEarnedOnDate = (record, datestamp) => {
    return record.payPerHour * hoursWorkedOnDate(record, datestamp);
}

const allWagesFor = (record) => {
    const dates = record.timeInEvents.map(event => event.date);
    return dates.reduce((wageTotal, date) => wageTotal + wagesEarnedOnDate(record, date), 0);
}

const findEmployeeByFirstName = (recordArray, firstName) => {
    return recordArray.find(record => record.firstName == firstName);
}

const calculatePayroll = recordArray => {
    return recordArray.reduce((sum, record) => allWagesFor(record) + sum, 0 );
}