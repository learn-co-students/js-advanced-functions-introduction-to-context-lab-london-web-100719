// Your code here
const createEmployeeRecord = (employee) => {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (employees) => {
  return employees.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = (employee, time) => {
  let [date, hour] = time.split(" ")
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  })
  return employee
}

const createTimeOutEvent = (employee, time) => {
  let [date, hour] = time.split(" ")
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  })
  return employee
}

const hoursWorkedOnDate = (employee, date) => {
  let timeIn = employee.timeInEvents.find(e => e.date === date)
  let timeOut = employee.timeOutEvents.find(e => e.date === date)
  let hoursWorked = (timeOut.hour - timeIn.hour) / 100
  return hoursWorked
}

const wagesEarnedOnDate = (employee, date) => {
  return employee.payPerHour * hoursWorkedOnDate(employee, date)
}

const allWagesFor = employee => {
  let dates = employee.timeInEvents.map(event => event.date)
  let payable = dates.reduce((sum, date) => sum + wagesEarnedOnDate(employee, date), 0)
  return payable
}

const findEmployeeByFirstName = (employees, firstName) => {
  return employees.find(employee => employee.firstName === firstName)
}

const calculatePayroll = (employees) => {
  return employees.reduce((payroll, employee) => payroll + allWagesFor(employee), 0)
}