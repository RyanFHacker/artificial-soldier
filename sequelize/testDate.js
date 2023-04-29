const now = new Date()
const isWednesday = false;

let noon = new Date()
let midnight = new Date();

noon.setHours(12,0,0,0);
midnight.setDate((midnight.getDate() + 1))
midnight.setHours(23,59,59,99)

if (currentDateTime.getDay() === 3 && currentDateTime >= noon && currentDateTime <= midnight) {
    console.log("Tues")
}