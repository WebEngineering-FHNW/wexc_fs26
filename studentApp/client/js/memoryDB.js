import {ROLE_ADMIN, ROLE_AUTH, ROLE_GUEST}                                                               from "./Constants.js";
import {

    USER,  STUDENT
} from "./appTypes.js";

export { memoryDB };



const user_entity = [
    {id: "0", displayedAs: "Freddy Mercury"},
    {id: "1", displayedAs: "Udo Lindenberg"},
    {id: "2", displayedAs: "Alexander Frege"},
];
const student_entity = [
    {id: "0", displayedAs: "Luca", firstname:"Luca", lastname:"Gaiffi", pictureUrl:"./img/Luca.png"},
    {id: "1", displayedAs: "Jan", firstname:"Jan", lastname:"Schöni", pictureUrl:"./img/Jan.png"},
    {id: "2", displayedAs: "Nikolas", firstname:"Nikolas", lastname:"Hofer", pictureUrl:"./img/Nikolas.png"},
    {id: "3", displayedAs: "Oleksandra", firstname:"Oleksandra", lastname:"Vaskivska", pictureUrl:"./img/Oleksandra.png"},
    {id: "4", displayedAs: "Salvi", firstname:"Salvatore", lastname:"Cuppuleri", pictureUrl:"./img/Salvi.png"},
    {id: "5", displayedAs: "Samira", firstname:"Samira", lastname:"Kaufmann", pictureUrl:"./img/Samira.png"},
    {id: "6", displayedAs: "Tim", firstname:"Tim", lastname:"Buser", pictureUrl:"./img/Tim.png"},
];

const memoryDB = {

    [USER]:               user_entity,
    [STUDENT]:               student_entity,

};
