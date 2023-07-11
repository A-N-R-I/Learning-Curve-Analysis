// The results are generated following the assumption of cumulative average unit


// returns a table with repeatedly doubled units by default
function cumulativeAverageUnit(batch, learningRate, length, double = true) {

    let costPerUnit = batch.completionCost / batch.units;

    // The object to store the result
    let table = {
        // Initializes the first row of the learning effect table
        cumulativeUnits: [batch.units],
        cumulativeAverage: [costPerUnit],
        cumulativeTotal: [batch.completionCost],
        incremental: [batch.completionCost],
        incrementalAverage: [0]
    }


    let units = batch.units;

    // Initialize the other rows of the table
    for (let i = 1; i < length; ++i) {

        // If the table is set to generate for double units/batches, then it adjusts the units accordingly
        units = double? units * 2 : units + 1;
        let avg = cumulativeAverageOf(units, batch.units, costPerUnit, learningRate);

        // Push the new details into a new row in the table
        table.cumulativeUnits.push(units);
        table.cumulativeAverage.push(avg);
        table.cumulativeTotal.push(avg * units);

        // The cost of the units now will always be highter than the last
        table.incremental.push(table.cumulativeTotal[i] - table.cumulativeTotal[i - 1]);
        table.incrementalAverage.push(table.incremental[i] / (table.cumulativeUnits[i] - table.cumulativeUnits[i - 1]));
    }

    return table;
}


// Returns the cummulative average
function cumulativeAverageOf(targetUnits, unitsPerBatch, costPerUnit, learningRate) {
    // Y = aX^(b).
    // Where Y = cumulative average time or cost
    //       a = cost or time for completing one unit
    //       X = number of units, or number of batches
    //          When the number of units in a batch is more than one, we can't use the units directly, but the number of batches
    //          which is gotten by dividing the target(required) units by the number of units in a batch
    //       b = index, defined as log(learning rate) / log(2)
    return costPerUnit * Math.pow(targetUnits/unitsPerBatch, Math.log2(learningRate));
}