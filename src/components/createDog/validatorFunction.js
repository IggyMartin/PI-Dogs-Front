export default function validator(input) {
    console.log(input)
    if(!input.name) return "Name is required"
    if(!input.weightMin) return "Add a minimum weight"
    if(!input.weightMax) return "Add a maximum weight"
    if(parseInt(input.weightMin) >= parseInt(input.weightMax)) return "Make sure Minimum Weight is lower than Maximum Weight"
    if(!input.heightMin) return "Add a minimum height"
    if(!input.heightMax) return "Add a maximum height"
    if(parseInt(input.heightMin) >= parseInt(input.heightMax)) return "Make sure Minimum Height is lower than Maximum Height"
    if(input.life_span <=  0 || input.weightMin <= 0 || input.heightMin <= 0) return "Value must be higher than 0"
}