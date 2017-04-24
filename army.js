var experienceTypes = 
{
    "Rabble": { "unit": -4, "leadership": 0.8 },
    "Militia": { "unit": -3, "leadership": 0.85 },
    "Green": { "unit": -2, "leadership": 0.9 },
    "Rookie": { "unit": -1, "leadership": 0.95 },
    "Regulars": { "unit": 0, "leadership": 1 },
    "Disciplined": { "unit": 1, "leadership": 1.5 },
    "Veteran": { "unit": 2, "leadership": 1.1 },
    "Seasoned": { "unit": 3, "leadership": 1.15 },
    "Crack": { "unit": 4, "leadership": 1.2 },
    "Legendary": { "unit": 5, "leadership": 1.25 },
};

var raceSizeTypes = 
{
    "Fine" : { "hp": 0.17, "attack": 24, "defaultSize": 120, },
    "Tiny" : { "hp": 0.25, "attack": 16, "defaultSize": 80 },
    "Small" : { "hp": 0.67, "attack": 6, "defaultSize": 30 },
    "Medium" : { "hp": 1, "attack": 4, "defaultSize": 20 },
    "Large" : { "hp": 32, "attack": 0.5, "defaultSize": 5 },
    "Huge" : { "hp": 64, "attack": 0.125, "defaultSize": 1 },
    "Gargantuan" : { "hp": 128, "attack": 0.0625, "defaultSize": 1 },
    "Colossal" : { "hp": 256, "attack": 0.03125, "defaultSize": 1 },
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
    "=<2d8": 4,
    "=<3d8": 8,
    "=<4d8": 12,
    "=<5d8": 16,
    "=<6d8": 20,
    "=<7d8": 24,
    "=<8d8": 28,
    "=<9d8": 32,
    "=<10d8": 36,
};

var armorTypes = 
{
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "11": 11,
    "12": 12,
    "13": 13, 
    "14": 14,
    "15": 15,
    "16": 16,
    "17": 17,
    "18": 18,
    "19": 19,
    "20": 20,
    "21": 21,
    "22": 22,
    "23": 23,
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


function addCombo(obj, title, memberName, nameValueMap, defaultValue)
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
    combo.value = defaultValue;
    row.insertCell().appendChild(combo);
    obj[memberName] = combo;
}

function addNumber(obj, title, memberName, defaultValue)
{
    var row = obj.element.insertRow();
    row.insertCell().appendChild(document.createTextNode(title));

    var input = document.createElement("INPUT");
    input.setAttribute("type", "number");
    input.value = defaultValue;
    row.insertCell().appendChild(input);

    obj[memberName] = input;
}

class army
{
    constructor(element)
    {
        this.element = element;

        this.element.style.border = "1px solid black";

        addCombo(this, "Terrain: ", "terrainCombo", terrainTypes, "Level");
        addCombo(this, "Experience: ", "experienceCombo", experienceTypes, "Regulars");
        addCombo(this, "Race size: ", "raceSizeCombo", raceSizeTypes, "Medium");
        addCombo(this, "Exhaustion: ", "exhaustionCombo", exhaustionTypes, "Fresh");
        addCombo(this, "Weapon: ", "weaponCombo", weaponTypes, "1d8");
        addCombo(this, "Armor: ", "armorCombo", armorTypes, "16");
        addCombo(this, "Leadership experience: ", "leadershipExperienceCombo", experienceTypes, "Regulars");

        addNumber(this, "Current units: ", "currentUnitsBox", 20);
        addNumber(this, "Max units: ", "maxUnitsBox", 20);

        addNumber(this, "Current HP: ", "currentHPBox", 20);

        var initializeButton = document.createElement("button");
        initializeButton.appendChild(document.createTextNode("Initialize Units and HP"));
        initializeButton.army = this;
        initializeButton.onclick = function()
        {
            this.army.maxUnitsBox.value = this.army.raceSize.defaultSize;
            this.army.currentUnitsBox.value = this.army.maxUnitsBox.value;
            this.army.currentHPBox.value = this.army.getMaxHP();
        };
        var initializeRow = this.element.insertRow();
        initializeRow.insertCell().appendChild(initializeButton);

        this.inputOutputBox = document.createElement("INPUT");
        this.inputOutputBox.setAttribute("type", "text");
        this.inputOutputBox.onfocus = function()
        {
            this.select();
        };
        var inputOutputRow = this.element.insertRow();

        var loadButton = document.createElement("button");
        loadButton.appendChild(document.createTextNode("Load"));
        loadButton.army = this;
        loadButton.onclick = function()
        {
            this.army.fromJson(this.army.inputOutputBox.value);
        };

        var saveButton = document.createElement("button");
        saveButton.appendChild(document.createTextNode("Save"));
        saveButton.army = this;
        saveButton.onclick = function()
        {
            this.army.inputOutputBox.value = this.army.toJson();
        };

        var loadSaveCell = inputOutputRow.insertCell();
        loadSaveCell.appendChild(loadButton);
        loadSaveCell.appendChild(saveButton);

        inputOutputRow.insertCell().appendChild(this.inputOutputBox);
    }

    get terrain()
    {
        return terrainTypes[this.terrainCombo.value];
    }

    get experience()
    {
        return experienceTypes[this.experienceCombo.value].unit;
    }

    get raceSize()
    {
        return raceSizeTypes[this.raceSizeCombo.value];
    }

    get exhaustion()
    {
        return exhaustionTypes[this.exhaustionCombo.value];
    }

    get weapon()
    {
        return weaponTypes[this.weaponCombo.value];
    }

    get armor()
    {
        return armorTypes[this.armorCombo.value];
    }

    get leadershipExperience()
    {
        return experienceTypes[this.leadershipExperienceCombo.value].leadership;
    }

    get currentUnits()
    {
        return this.currentUnitsBox.value;
    }

    get maxUnits()
    {
        return this.maxUnitsBox.value;
    }

    get currentHP()
    {
        return this.currentHPBox.value;
    }

    getAttackModifier(weather)
    {
        return weather.weather + this.experience + this.terrain + this.exhaustion + this.weapon;
    }

    getDefenseModifier()
    {
        return this.terrain + this.experience + this.exhaustion + this.armor;
    }

    getMaxHP()
    {
        return this.experience + this.exhaustion + this.weapon + this.armor + (this.raceSize.hp * this.maxUnits);
    }

    getAttackDivisor()
    {
        return this.raceSize.attack;
    }

    updateJson()
    {
        this.inputOutputBox.value = this.toJson();
    }

    toJson()
    {
        var obj =
        {
            "terrain": this.terrainCombo.value,
            "experience": this.experienceCombo.value,
            "raceSize": this.raceSizeCombo.value,
            "exhaustion": this.exhaustionCombo.value,
            "weapon": this.weaponCombo.value,
            "armor": this.armorCombo.value,
            "leadershipExperience": this.leadershipExperienceCombo.value,
            "currentUnits":  this.currentUnitsBox.value,
            "maxUnits": this.maxUnitsBox.value,
            "currentHP": this.currentHPBox.value,
        };

        return JSON.stringify(obj);
    }

    fromJson(json)
    {
        var obj = JSON.parse(json);

        this.terrainCombo.value = obj.terrain;
        this.experienceCombo.value = obj.experience;
        this.raceSizeCombo.value = obj.raceSize;
        this.exhaustionCombo.value = obj.exhaustion;
        this.weaponCombo.value = obj.weapon;
        this.armorCombo.value = obj.armor;
        this.leadershipExperienceCombo.value = obj.leadershipExperience;
        this.currentUnitsBox.value = obj.currentUnits;
        this.maxUnitsBox.value = obj.maxUnits;
        this.currentHPBox.value = obj.currentHP;
    }
}

class weather
{
    constructor(element)
    {
        this.element = element;
        this.element.style.border = "1px solid black";

        addCombo(this, "Weather: ", "weatherCombo", weatherTypes, "Clear");
    }

    get weather()
    {
        return weatherTypes[this.weatherCombo.value];
    }
}

function runBattle(army0, army1, weather, logElement)
{
    logElement.innerHTML = "";
    function appendLine(logElement, line)
    {
        logElement.appendChild(document.createTextNode(line));
        logElement.appendChild(document.createElement("BR"));
    }

    appendLine(logElement, "Attack info:");
    appendLine(logElement, "currentUnits: " + army0.currentUnits);
    appendLine(logElement, "maxUnits: " + army0.maxUnits);

    appendLine(logElement, "attack divisor: " + army0.getAttackDivisor());

    var rollCount = army0.currentUnits / army0.getAttackDivisor();
    appendLine(logElement, "roll count: " + rollCount);

    var rolls = roll(rollCount, 20);
    appendLine(logElement, "rolls: [ " + rolls + " ]");

    var attackModifier = army0.getAttackModifier(weather);
    appendLine(logElement, "attack modifier: " + attackModifier);

    var attackModifiedRolls = rolls.slice();
    for (var i = 0; i < attackModifiedRolls.length; i++)
    {
        attackModifiedRolls[i] += attackModifier;
    }
    appendLine(logElement, "rolls with attack modifier: [ " + attackModifiedRolls + " ]");

    appendLine(logElement, "");

    appendLine(logElement, "Defense info:");
    appendLine(logElement, "defense modifier: " + army1.getDefenseModifier());

    var hits = [];
    var hitsCount = 0;
    for (var i = 0; i < attackModifiedRolls.length; i++)
    {
        var hit = (attackModifiedRolls[i] - army1.getDefenseModifier()) >= 0;
        hits.push(hit);
        if (hit)
        {
            hitsCount++;
        }
    }
    appendLine(logElement, "hits: [ " + hits + " ]");
    appendLine(logElement, "hits count: " + hitsCount);

    var resultHP = army1.currentHP - hitsCount;
    appendLine(logElement, "result HP: " + resultHP);

    var hpLossPerc = hitsCount / army1.currentHP;
    appendLine(logElement, "percent HP loss: " + (hpLossPerc * 100));

    var resultUnits = army1.currentUnits - (army1.currentUnits * hpLossPerc);
    appendLine(logElement, "result units: " + resultUnits);

    army1.currentHPBox.value = resultHP;
    army1.currentUnitsBox.value = resultUnits;

    army1.updateJson();
}
