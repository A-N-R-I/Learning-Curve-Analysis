// For testing purposes
'use strict'

//import { cumulativeAverageUnit } from "./CumulativeAverageUnit.js";


let learningRate = 0.9;
// Describes the first unit or batch
let batch = {
    units: 1,
    completionCost: 1600,  // could be hours, days, seconds or even in monetary units like dollar
    measurement: 'hours'    // provides more information about the kind of data the cost of completion is. Could be hours, minutes, seconds or money symbols
}


let length = 7;
let table = cumulativeAverageUnit(batch, learningRate, length);
let htmlTable = document.getElementById('learning-effect-table');


// Append the data in the table object to the html table
for (let i = 0; i < table.cumulativeUnits.length; ++i) {
    htmlTable.innerHTML += `
        <tr>
            <td>${table.cumulativeUnits[i]}</td>
            <td>${table.cumulativeAverage[i].toFixed(4)}</td>
            <td>${table.cumulativeTotal[i].toFixed(4)}</td>
            <td>${table.incremental[i].toFixed(4)}</td>
            <td>${table.incrementalAverage[i].toFixed(4)}</td>
        </tr>
    `;
}