function roll(rollCount, dieSize)
{
    var result = [];
    for (var i = 0; i < rollCount; i++)
    {
        result.push(Math.floor((Math.random() * dieSize) + 1));
    }
    return result;
}

function sumRolls(rolls)
{
    var result = 0;
    for (var i = 0; i < rolls.len; i++)
    {
        result += rolls[i];
    }
    return result;
}
