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
    "Constitution -3":                  { "value": -3, "modifier": 7,},
    "Constitution -2":                  { "value": -2, "modifier": 8,},
    "Constitution -1":                  { "value": -1, "modifier": 9,},
    "Unarmored":                        { "value": 0, "modifier": 10,},
    "Padded/Leather":                   { "value": 1, "modifier": 11,},
    "Studded leather/Hide":             { "value": 2, "modifier": 12,},
    "Chain shirt":                      { "value": 3, "modifier": 13,},
    "Scale Mail/Breastplate/Ring Mail": { "value": 4, "modifier": 14,},
    "Half Plate":                       { "value": 5, "modifier": 15,},
    "Chain Mail":                       { "value": 6, "modifier": 16,},
    "Splint":                           { "value": 7, "modifier": 17,},
    "Plate":                            { "value": 8, "modifier": 18,},
    "Constitution +1":                  { "value": 9, "modifier": 19,},
    "Constitution +2":                  { "value": 10, "modifier": 20,},
    "Constitution +3":                  { "value": 11, "modifier": 21,},
    "Constitution +4":                  { "value": 12, "modifier": 22,},
    "Constitution +5":                  { "value": 13, "modifier": 23,},
};

var shieldTypes = 
{
    "Unshielded": false,
    "Shielded": true,
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

class army
{
    constructor(element)
    {
        this.element = element;

        var addCombo = function(obj, title, memberName, nameValueMap)
        {
            var titleElem = document.createTextNode(title);
            obj.element.appendChild(titleElem);

            var combo = document.createElement("SELECT");
            for (var name in nameValueMap)
            {
                var option = document.createElement("option");
                option.text = name;
                combo.add(option);
            }
            obj.element.appendChild(combo);
            obj[memberName] = combo;
        }

        addCombo(this, "Terrain: ", "terrainCombo", terrainTypes);
        addCombo(this, "Experience: ", "experienceCombo", experienceTypes);
        addCombo(this, "Race size: ", "raceSizeCombo", raceSizeTypes);
        addCombo(this, "Exhaustion: ", "exhaustionCombo", exhaustionTypes);
        addCombo(this, "Weapon: ", "weaponCombo", weaponTypes);
        addCombo(this, "Armor: ", "armorCombo", armorTypes);
        addCombo(this, "Shield: ", "shieldCombo", shieldTypes);
        addCombo(this, "Leadership experience: ", "leadershipExperienceCombo", experienceTypes);
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
}

function runBattle(army0, army1, weather, logElement)
{
    logElement.appendChild(document.createTextNode("Battle!"));
}
