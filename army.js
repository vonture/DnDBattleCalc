var experienceTypes = 
{
    "Rabble": -4,
    "Militia": -3,
    "Green": -2,
    "Rookie": -1,
    "Regulars": 0,
    "Disciplined": 1,
    "Veteran": 2,
    "Seasoned": 3,
    "Crack": 4,
    "Legendary": 5,
};

var raceSizeTypes = 
{
    "Fine" : 16,
    "Diminutive" : -4,
    "Tiny" : -2,
    "Small" : -1,
    "Medium" : 0,
    "Large" : 4,
    "Huge" : 24,
    "Gargantuan" : 128,
    "Colossal" : 256,
};

var exhaustionTypes = 
{
    "Exhausted": -12,
    "Fatigued": -8,
    "Tired": -4,
    "Winded": -2,
    "Warmed up": 0,
    "Fresh": 2,
};

var weaponTypes = 
{
    "1d4": -2,
    "1d6": -1,
    "1d8": 0,
    "1d10": 1,
    "1d12": 2,
    "<2d8": 4,
    "<3d8": 8,
    "<4d8": 16,
    "<5d8": 32,
};

var armorTypes = 
{
    "5": -5,
    "6": -4,
    "7": -3,
    "8": -2,
    "9": -1,
    "10": 0,
    "11": 1,
    "12": 2,
    "13": 3, 
    "14": 4,
    "15": 5,
    "16": 6,
    "17": 7,
    "18": 8,
    "19": 9,
    "20": 10,
    "21": 11,
    "22": 12,
    "23": 13,
};

var weatherTypes = 
{
    "Storm": -4,
    "Sleet/Snow": -3,
    "Rain": -2,
    "Wind": -1,
    "Clear": 0,
};

var terrainTypes = 
{
    "Vulnerable": -4,
    "Exposed": -3,
    "Low Ground": -2,
    "Downhill": -1,
    "Level": 0,
    "Uphill": 1,
    "High Ground": 2,
    "Protected": 3,
    "Fortified": 4,
};


function addCombo(obj, title, memberName, nameValueMap)
{
    var row = obj.element.insertRow();
    row.insertCell().appendChild(document.createTextNode(title));

    var combo = document.createElement("SELECT");
    for (var name in nameValueMap)
    {
        var option = document.createElement("option");
        option.text = name;
        combo.add(option);
    }
    row.insertCell().appendChild(combo);
    obj[memberName] = combo;
}

class army
{
    constructor(element)
    {
        this.element = element;

        this.element.style.border = "1px solid black";

        var addCombo = function(obj, title, memberName, nameValueMap)
        {
            var row = obj.element.insertRow();
            row.insertCell().appendChild(document.createTextNode(title));

            var combo = document.createElement("SELECT");
            for (var name in nameValueMap)
            {
                var option = document.createElement("option");
                option.text = name;
                combo.add(option);
            }
            row.insertCell().appendChild(combo);
            obj[memberName] = combo;
        }

        addCombo(this, "Terrain: ", "terrainCombo", terrainTypes);
        addCombo(this, "Experience: ", "experienceCombo", experienceTypes);
        addCombo(this, "Race size: ", "raceSizeCombo", raceSizeTypes);
        addCombo(this, "Exhaustion: ", "exhaustionCombo", exhaustionTypes);
        addCombo(this, "Weapon: ", "weaponCombo", weaponTypes);
        addCombo(this, "Armor: ", "armorCombo", armorTypes);
        addCombo(this, "Leadership experience: ", "leadershipExperienceCombo", experienceTypes);


        var unitSizeRow = this.element.insertRow();
        unitSizeRow.insertCell().appendChild(document.createTextNode("Unit size: "));
        this.unitSizeBox = document.createElement("INPUT");
        this.unitSizeBox.setAttribute("type", "number");
        unitSizeRow.insertCell().appendChild(this.unitSizeBox);
    }

    get terrain()
    {
        return terrainTypes[this.terrainCombo.value];
    }

    get experience()
    {
        return experienceTypes[this.experienceCombo.value];
    }

    get raceSize()
    {
        return raceSizeTypes[this.raceSizeCombo.value];
    }

    get exhaustion()
    {
        return exhaustionCombo[this.exhaustionCombo.value];
    }

    get weapon()
    {
        return weaponTypes[this.weaponCombo.value];
    }

    get armor()
    {
        return armorTypes[this.armorCombo.value];
    }

    get shield()
    {
        return shieldTypes[this.shieldCombo.value];
    }

    get leadershipExperience()
    {
        return experienceTypes[this.leadershipExperienceCombo.value];
    }

    get unitSize()
    {
        return this.unitSizeBox.value;
    }

    getAttackModifier(weather)
    {
        return weather.weather() + this.terrain + this.raceSize + this.exhaustion + this.weapon;
    }
}

class weather
{
    constructor(element)
    {
        this.element = element;
        this.element.style.border = "1px solid black";

        addCombo(this, "Weather: ", "weatherCombo", weatherTypes);
    }

    get weather()
    {
        return weatherTypes[this.weatherCombo.value];
    }
}

function runBattle(army0, army1, weather, logElement)
{
    logElement.appendChild(document.createTextNode("Battle!"));
}
