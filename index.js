"use strict";
//// Test Midas
/// Q1 . Clock angle.
/// Input:string "HH:MM" ex. "09:00"
/// Output:number ex. 90
/// Idea : Calculate degree of each hand ,and then find the angle between 2 hands. 
/// (Consider that at 12 o'clock angle of clock hand are at 0 degree, and calculate the angle clockwise from there)
function getClockAngle(hh_mm) {
    const [hourStr, minuteStr] = hh_mm.split(":"); // Convert string to 2 numbers as hour and minutes.
    const minutes = parseInt(minuteStr);
    let hours = parseInt(hourStr);
    hours = hours % 12; // Convert hours that exceed 12 to be in 12 hours base.
    // Calculate degree of each hand ,and then find the angle between 2 hands.
    // Calculate degree per hour, per minute
    const degreePerHour = 360 / 12;
    const degreePerminute = 360 / 60;
    // Calculate fraction of an hour's degree.
    const hourFractionDegree = degreePerHour * (minutes / 60);
    // Calculate degree of hours hand and degree of minutes hand.
    const hoursHandDegree = hours * degreePerHour + (hourFractionDegree);
    const minutesHandDegree = minutes * degreePerminute;
    // Degree diff then mod by 180 to always get smaller angle.
    return (hoursHandDegree - minutesHandDegree) % 180;
}
const Q1_input = "09:30";
const Q1_result = getClockAngle(Q1_input);
console.log(`Q1. INPUT: ${Q1_input} Angle Diff `, Q1_result);
// Q2. Remote Associates Test.
// input: string[] ex. ["BATHROOM", "BATH SALTS", "BLOODBATH"]
// output: string[] ex.  ["ROOM", "SALTS", "BLOOD"]
// Idea : Find longest common substring and subtract it from each string in phrases:string[].
function getQuestionPart(phrases) {
    // Find shortest string from array.
    const shortestString = phrases.reduce((acc, newStr) => (newStr.length < acc.length ? newStr : acc), phrases[0]);
    // Define maxLength and longestSubsting to keep track of the longest string.
    let maxLength = 0;
    let longestSubstring = "";
    // Try every substring of shortest substring and keep track of maxLength, longestSubstring. 
    for (let start = 0; start < shortestString.length; start++) {
        for (let end = start + 1; end <= shortestString.length; end++) {
            const substring = shortestString.substring(start, end);
            if (phrases.every(str => str.indexOf(substring) !== -1)) {
                if (substring.length > maxLength) {
                    maxLength = substring.length;
                    longestSubstring = substring;
                }
            }
        }
    }
    const resultArr = phrases.map(str => str.replace(longestSubstring, ''));
    return resultArr;
}
const Q2_input = ["BATHROOM", "BATH SALTS", "BLOODBATH"];
const Q2_result = getQuestionPart(Q2_input);
console.log(`Q2. INPUT: ${Q2_input} OUTPUT: `, Q2_result);
// Q3. Snake ladder
// input: [number, number][] ex. [{
//     ladders: [[3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93]],
//     snakes: [[21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66]]
// }]
// output: string[] ex.  Output: [2, 5, 6, 6, 1]
// Idea : Choose the shortest path to the goal 1. Consider take ladder first 2. Avoid the snake 3. If no snake and ladder take highest roll
function quickestPath(board) {
    // Create map of ladders and snakes 
    const laddersMap = new Map(board.ladders);
    const snakesMap = new Map(board.snakes);
    let currentPosition = 1;
    const diceRolls = [];
    while (true) {
        let biggestLeapDestination = 6 + currentPosition;
        let rollToTake = 6;
        let isSafeSpot = false;
        if (biggestLeapDestination >= 100) {
            diceRolls.push(100 - currentPosition);
            currentPosition = 100;
        }
        if (currentPosition === 100) {
            return diceRolls;
        }
        for (let pos = currentPosition + 6; pos > currentPosition; pos--) {
            if (laddersMap.has(pos) && laddersMap.get(pos) > biggestLeapDestination) {
                biggestLeapDestination = laddersMap.get(pos);
                rollToTake = pos - currentPosition;
            }
            else if (snakesMap.has(pos) && !isSafeSpot) {
                biggestLeapDestination -= 1;
                rollToTake = pos - currentPosition - 1;
            }
            else {
                isSafeSpot = true;
            }
        }
        currentPosition = biggestLeapDestination;
        diceRolls.push(rollToTake);
    }
}
const Q3_input = {
    ladders: [[3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93]],
    snakes: [[21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66]]
};
const Q3_result = quickestPath(Q3_input);
console.log(`Q3. INPUT: ${JSON.stringify(Q3_input)} OUTPUT: `, Q3_result);
