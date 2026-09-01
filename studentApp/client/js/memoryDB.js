import {ROLE_ADMIN, ROLE_AUTH, ROLE_GUEST}                                                               from "./Constants.js";
import {

    USER, STUDENT, MODULE, STUDENT_MODULE
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
const module_entity = [
    {id: "0", displayedAs: "WexC",  pictureUrl:"./img/WexC.png"},
    {id: "1", displayedAs: "WebPr", pictureUrl:"./img/WebPr.png"},
    {id: "2", displayedAs: "WebCl", pictureUrl:"./img/WebCl.png"},
];
const student_module_relation = [
    {id: "0", studentId: "0", moduleId: "0"},
    {id: "1", studentId: "0", moduleId: "1"},
    {id: "2", studentId: "1", moduleId: "0"},
    {id: "3", studentId: "1", moduleId: "1"},
];

const memoryDB = {

    [USER]:    user_entity,
    [MODULE]:  module_entity,
    [STUDENT]: student_entity,

    [STUDENT_MODULE]: student_module_relation,

};
