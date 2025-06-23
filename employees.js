console.log("employee file...")

// const getEmployeeData = ()=>{
//     console.log("get employee Data function called....")
// }

// const getEmployeeData = (a,b)=>{
//     console.log("get employee Data function called....",a,b)
// }

const getEmployeeData = (a,b)=>{
    console.log("get employee Data function called....",a,b)
    return a + b
}
const printEmployeeData =()=>{
    console.log("print employee data...")
}

//module.exports = getEmployeeData
module.exports = {
    getEmployeeData,
    printEmployeeData
}