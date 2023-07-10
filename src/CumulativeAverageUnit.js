// The results are generated following the assumption of cumulative average unit


// returns a table with only doubled units
function cumulativeAverageUnit(batch, learningRate, length, double = true) {

    var averageCost = batch.completionCost / batch.units;

    // The object to store the result
    var table = {
        // Initializes the first row of the learning effect
        cumulativeUnits: [batch.units],
        cumulativeAverage: [averageCost],
        cumulativeTotal: [batch.completionCost],
        incremental: [batch.completionCost],
        incrementalAverage: [0]
    }


    var units = batch.units;

    // Initialize the other rows in the table
    for (var i = 1; i < length; ++i) {

        // If the table is set to generate for double units/batches, then it adjusts the units respectively
        units = double? units * 2 : units + 1;
        var avg = cumulativeAverageOf(averageCost, batch.units, units, learningRate);

        // Push the new details into a new row in the table
        table.cumulativeUnits.push(units);
        table.cumulativeAverage.push(avg);
        table.cumulativeTotal.push(avg * units);

        // The cost of the units now will always be highter than the last
        table.incremental.push(table.cumulativeTotal[i] - table.cumulativeTotal[i - 1]);
        table.incrementalAverage.push(table.incremental[i] / (Math.abs(table.cumulativeUnits[i] - table.cumulativeUnits[i - 1])));
    }

    return table;
}


// Returns the cummulative average unit cost
function cumulativeAverageOf(firstBatchAverageCost, firstBatchUnits, targetUnits, learningRate) {
    // Determines the cumulative average using a restatement of the popular formula: Y = aX^(b).
    // It's basically the same formula but restated. I used this because it makes more sense to me
    //          Y = aR^(d),
    // where    Y = the cumulative average time per unit
    //          a = cost of one unit
    //          R = learning rate
    //          d = the number of times the initial units were doubled to obtain the target units
    //            = ( log (target units / number of units in first batch) ) / log2
    return firstBatchAverageCost * Math.pow(learningRate, Math.log2(targetUnits / firstBatchUnits));
}