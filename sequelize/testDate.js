var now = new Date(2023,2,29,0,0,0,0)
var noon = new Date()
var midnight = new Date();
var isWednesday = false;
var now = new Date()

noon.setHours(12,0,0,0);
midnight.setDate((midnight.getDate() + 1))
midnight.setHours(23,59,59,99)

if (currentDateTime.getDay() === 3 && currentDateTime >= noon && currentDateTime <= midnight) {
    console.log("Tues")
}

// console.log(currentDateTime)
console.log(now.getHours())
console.log(noon.getHours())
console.log(midnight.getHours())
// if (currentDateTime.getTime )