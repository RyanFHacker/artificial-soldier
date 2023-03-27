var currentDateTime = new Date(2023,2,29)
var noon = new Date()
var midnight = new Date();
var isWednesday = false;

noon.setHours(12,0,0,0);
midnight.setHours(23,59,59,99)

if (currentDateTime.getDay() === 3 ) {
    console.log("Wed")
}

console.log(currentDateTime.getDay())
// if (currentDateTime.getTime )