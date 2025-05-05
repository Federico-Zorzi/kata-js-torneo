console.time("time");

const fighters = [
  {
    name: "Freezer",
    power: 8000,
  },
  {
    name: "Vegeta",
    power: 8500,
  },
  {
    name: "Crilin",
    power: 500,
  },
  {
    name: "Mr Satan",
    power: 50,
  },
  {
    name: "Junior",
    power: 6000,
  },
  {
    name: "Goku",
    power: 9001,
  },
  {
    name: "Tensing",
    power: 450,
  },
  {
    name: "Videl",
    power: 300,
  },
  {
    name: "Bulma",
    power: 20,
  },
  {
    name: "C-18",
    power: 7800,
  },
  {
    name: "Gohan",
    power: 8900,
  },
  {
    name: "Trunks",
    power: 1250,
  },
];

const weapons = [
  {
    name: "Ventaglio della Musa",
    power: 15,
  },
  {
    name: "Scouter",
    power: 30,
  },
  {
    name: "Bastone Roshi",
    power: 60,
  },
  {
    name: "Fagioli Magici",
    power: 70,
  },
  {
    name: "Katana di Yajirobei",
    power: 85,
  },
  {
    name: "Spada del Dragone Azzurro",
    power: 115,
  },
  {
    name: "Armatura Saiyan",
    power: 145,
  },
  {
    name: "Cannone da braccio",
    power: 170,
  },
  {
    name: "Nuvola d'oro",
    power: 200,
  },
  {
    name: "Bastone Nyoi",
    power: 220,
  },
  {
    name: "Spada Z",
    power: 235,
  },
  {
    name: "Orecchini Potara",
    power: 250,
  },
];

const bot = { name: "BOT", power: 4000 };

/* 
console.log("fighters", fighters);
console.log("weapons", weapons);
*/

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

/* FASE SCELTA DELL'ARMA */
const phase1Fighters = [...fighters];
const phase1Weapons = [...weapons];

const chooseWeapons = () => {
  if (phase1Weapons.length <= 0) {
    console.log("Non sono presenti armi nell'armeria...");
    return phase1Fighters;
  }

  const weaponIndexes = [];
  return phase1Fighters.map((fighter) => {
    let weaponIndex = null;
    if (phase1Weapons.length !== weaponIndexes.length) {
      weaponIndex = randomNumber(phase1Weapons.length, 0);

      while (weaponIndexes.includes(weaponIndex)) {
        weaponIndex = randomNumber(phase1Weapons.length, 0);
      }
      weaponIndexes.push(weaponIndex);
    }

    return {
      ...fighter,
      weapon: weaponIndex !== null ? phase1Weapons[weaponIndex] : null,
    };
  });
};

const fightersWithWeapons = chooseWeapons();
// console.log("fightersWithWeapons", fightersWithWeapons);

/* FASE ALLENAMENTO */
const fightersAfterWorkout = fightersWithWeapons.map((fighter) => {
  const workoutValue =
    fighter.power * randomNumber(100, 1) + fighter.weapon.power;
  return {
    ...fighter,
    power: workoutValue,
  };
});
// console.log("fightersAfterWorkout", fightersAfterWorkout);

/* FASE QUALIFICAZIONI */
const fightersAfterQualifications = fightersAfterWorkout.filter(
  (fighter) => fighter.power > 2000
);
// console.log("fightersAfterQualifications", fightersAfterQualifications);

/* FASE COMBATTIMENTO */
const fightingPhase = (fightersArray) => {
  const fightersForNextRound = [];
  fightersArray.forEach((fighter, index) => {
    if (index % 2 == 0) {
      if (index !== fightersArray.length - 1) {
        const nextFighter = fightersArray[index + 1];

        console.table([
          fighter.name,
          fighter.power,
          nextFighter.name,
          nextFighter.power,
        ]);

        console.log(
          `
Il vincitore di questo round è: ${
            fighter.power > nextFighter.power ? fighter.name : nextFighter.name
          }`
        );

        fighter.power > nextFighter.power
          ? fightersForNextRound.push(fighter)
          : fightersForNextRound.push(nextFighter);
      } else {
        console.warn(
          `${fighter.name} vs ${bot.name}
Il vincitore di questo round è: ${
            fighter.power > bot.power ? fighter.name : bot.name
          }`
        );
        if (fighter.power > bot.power) fightersForNextRound.push(fighter);
      }
    }
  });

  return fightersForNextRound;
};

let phase = 1;
let fightersAfterEveryPhases = [...fightersAfterQualifications];

const runTournamentFights = () => {
  if (fightersAfterEveryPhases.length <= 1) {
    console.log(
      `🏆 Il vincitore del torneo è: ${fightersAfterEveryPhases[0].name}`
    );
    console.timeEnd("time");

    return;
  }

  console.log(`phase ${phase}`, fightersAfterEveryPhases);
  fightersAfterEveryPhases = fightingPhase(fightersAfterEveryPhases);
  phase++;

  setTimeout(runTournamentFights, 1000);
};

runTournamentFights();
