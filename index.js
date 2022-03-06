function createEmployeeRecord(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(arrayOfRecords) {
    return arrayOfRecords.map(record => createEmployeeRecord(record))
}

let findEmployeeByFirstName = function(arrayOfRecords, firstName) {
    return arrayOfRecords.find(record => record.firstName === firstName)
}

let createTimeInEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let hoursWorkedOnDate = function (dateWages) {
    let timeIn = this.timeInEvents.find(e => e.date === dateWages)
    let timeOut = this.timeOutEvents.find(e => e.date === dateWages)

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function (dateWages) {
    return hoursWorkedOnDate.call(this, dateWages) * this.payPerHour
}

let allWagesFor = function() {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let calculatePayroll = function(arrayOfRecords) {
    return arrayOfRecords.reduce((pv, cv) => pv + allWagesFor.call(cv), 0)
}

// function calculatePayroll(multipleEmployees) {
//     let allWages = multipleEmployees.map(employee => allWagesFor(employee))
//     return allWages.reduce((pV, cV) => pV + cV)
//   }

/* Your Code Here */
// let employee = {
//     firstName: '',
//     familyName: '',
//     title: '',
//     payPerHour: '',
//     timeInEvents: [],
//     timeOutEvents: [],
//     createEmployeeRecord(record) {
//         employee.firstName = record[0]
//         employee.familyName = record[1]
//         employee.title = record[2]
//         employee.payPerHour = record[3]
//         return employee
//     },
//     createTimeInEvent(dateStamp) {
//         let [date, hours] = dateStamp.split(' ')

//         this.timeInEvents.push({
//             type: "TimeIn",
//             hour: parseInt(hours),
//             date
//         })
//         return this
//     },
//     createTimeOutEvent(dateStamp) {
//         let [date, hours] = dateStamp.split(' ')
//         this.timeOutEvents.push({
//             type: "TimeOut",
//             hour: parseInt(hours),
//             date
//         })
//         return this
//     },
//     hoursWorkedOnDate(dateToFind) {
//         let timeIn = this.timeInEvents.find(e => e.date === dateToFind)
//         let timeOut = this.timeOutEvents.find(e => e.date === dateToFind)

//         return (timeOut - timeIn) / 100
//     },
//     wagesEarnedOnDate(dateWages) {
//         return this.hoursWorkedOnDate(dateWages) * this.payPerHour
//     },
//     allWagesFor() {
//         const eligibleDates = this.timeInEvents.map(function (e) {
//             return e.date
//         })

//         const payable = eligibleDates.reduce(function (memo, d) {
//             return memo + wagesEarnedOnDate.call(this, d)
//         }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//         return payable
//     }
// }


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


