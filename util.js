function roll(rollCount, dieSize)
{
    var result = 0;
    for (var i = 0; i < rollCount; i++)
    {
        result += Math.floor((Math.random() * dieSize) + 1);
    }
    return result;
}
