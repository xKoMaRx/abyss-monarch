/**
 * Abyss Monarch - 1,000 Monsters Database (Bestiary Database)
 * Provides a highly integrated collection of exactly 1000 deterministic, lore-accurate monsters
 * with scaling stats, custom drops, and interactive descriptions.
 */

class MonstersDatabase {
    constructor() {
        this.monsters = [];
        this.initializeDatabase();
    }

    initializeDatabase() {
        const prefixes = [
            'Zmutowany', 'Przeklęty', 'Lodowy', 'Ognisty', 'Runiczny', 'Cienisty', 'Skażony', 
            'Elektryczny', 'Mroczny', 'Trujący', 'Krystaliczny', 'Pradawny', 'Eteryczny', 
            'Gnijący', 'Wściekły', 'Srebrny', 'Żelazny', 'Smoczy', 'Złoty', 'Pancerny', 
            'Wampiryczny', 'Błotny', 'Królewski', 'Podziemny', 'Zagubiony', 'Oszalały',
            'Piekielny', 'Niebieski', 'Głębinowy', 'Spopielony', 'Upiorny', 'Kamienny'
        ];

        const baseTypes = [
            'Goblin', 'Ork', 'Zombie', 'Szkielet', 'Szkielet Łucznik', 'Szkielet Mag', 'Golem', 
            'Wilk Otchłani', 'Pająk Jaskiniowy', 'Nekromanta', 'Jaszczuroczłek', 'Ścierwojad', 
            'Gargulec', 'Mroźny Elf', 'Ogar Pustki', 'Bies Magmowy', 'Strażnik Grobowca', 
            'Wąż Jadowity', 'Wywerna', 'Demon Wojownik', 'Czarnoksiężnik', 'Duch Cienia',
            'Slayer', 'Harpi', 'Troll Skalny', 'Pożeracz Ciał', 'Pasożyt', 'Abisator'
        ];

        const suffixes = [
            'Otchłani', 'Cienia', 'Magmy', 'Mrozu', 'Plagi', 'Śmierci', 'Monarchy', 'Pustki', 
            'Burzy', 'Wiecznego Snu', 'Krwi', 'Kamienia', 'Ognia Piekielnego', 'Podziemi',
            'Przekleństwa', 'Labiryntu', 'Zarazy', 'Mgły', 'Ruin', 'Zapomnianej Świątyni'
        ];

        const dropsPool = {
            'E': ['Zwykły Kryształ Many', 'Kieł Goblina', 'Gnijąca Skóra', 'Zardzewiały Sztylet', 'Kość Szkieletu'],
            'D': ['Wzmocniony Kryształ Many', 'Oko Pająka', 'Żelazny Grot', 'Krew Wilka', 'Zwoje Terminujące'],
            'C': ['Czysty Kryształ Many', 'Runiczny Pył', 'Eteryczny Odłamek', 'Srebrna Łuska', 'Mikstura Siły'],
            'B': ['Skondensowany Kryształ Many', 'Smocza Łuska', 'Instrukcja Bojowa', 'Esencja Cienia', 'Wampirza Kły'],
            'A': ['Doskonały Kryształ Many', 'Serce Monarchy', 'Runa Prędkości', 'Tytanowy Rdzeń', 'Złoty Sygnet'],
            'S': ['Boski Kryształ Many', 'Odłamek Boskości', 'Aura Cienia', 'Łza Monarchów', 'Ekstrakt z Otchłani']
        };

        const descriptions = [
            'Agresywna istota, która uległa magii szczeliny i bezlitośnie poluje na łowców.',
            'Stwór zrodzony z cienia lochu, niezwykle wrażliwy na światło, lecz śmiercionośny w półmroku.',
            'Ciało tego potwora zostało skażone skondensowaną magią many, co daje mu nieludzką odporność.',
            'Pilnuje skarbów ukrytych głęboko w komnatach lochu. Niewzruszony strażnik o kamiennej skórze.',
            'Legendy głoszą, że wyczuwa strach łowców i rośnie w siłę z każdą uronioną przez nich kroplą krwi.',
            'Istota, której serce pulsuje zakazanym magicznym ogniem, paląc wszystko w promieniu kilku metrów.'
        ];

        // Generate exactly 1000 monsters
        for (let i = 1; i <= 1000; i++) {
            // Determine Rank and Level range mathematically
            let rank = 'E';
            let minLvl = 1;
            let maxLvl = 15;
            
            if (i <= 200) {
                rank = 'E';
                minLvl = 1;
                maxLvl = 15;
            } else if (i <= 400) {
                rank = 'D';
                minLvl = 16;
                maxLvl = 30;
            } else if (i <= 600) {
                rank = 'C';
                minLvl = 31;
                maxLvl = 50;
            } else if (i <= 750) {
                rank = 'B';
                minLvl = 51;
                maxLvl = 70;
            } else if (i <= 900) {
                rank = 'A';
                minLvl = 71;
                maxLvl = 85;
            } else {
                rank = 'S';
                minLvl = 86;
                maxLvl = 100;
            }

            // Deterministic distribution of levels based on index
            const levelFraction = (i - 1) % 20; // values 0-19
            const level = minLvl + Math.floor((levelFraction / 19) * (maxLvl - minLvl));

            // Generate deterministic name using index as seeds (simple modulos)
            const prefix = prefixes[(i * 3 + 7) % prefixes.length];
            const baseType = baseTypes[(i * 5 + 13) % baseTypes.length];
            const suffix = suffixes[(i * 7 + 29) % suffixes.length];
            const name = `${prefix} ${baseType} ${suffix}`;

            // Calculate scaling stats based on level and Rank multiplier
            const rankMult = rank === 'E' ? 1.0 : (rank === 'D' ? 2.5 : (rank === 'C' ? 6.0 : (rank === 'B' ? 14.0 : (rank === 'A' ? 32.0 : 80.0))));
            
            const hp = Math.floor((100 + level * 25) * rankMult);
            const patk = Math.floor((12 + level * 3.5) * rankMult);
            const def = Math.floor((2 + level * 0.9) * rankMult);
            const speed = Math.floor(10 + (i % 8) + (level * 0.1));

            // Determine drops
            const rankDrops = dropsPool[rank];
            const dropA = rankDrops[(i * 2) % rankDrops.length];
            const dropB = rankDrops[(i * 3 + 1) % rankDrops.length];
            const drops = [...new Set([dropA, dropB])];

            const description = descriptions[i % descriptions.length];

            this.monsters.push({
                index: i,
                id: `monster_db_${i}`,
                name: name,
                rank: rank,
                level: level,
                hp: hp,
                patk: patk,
                def: def,
                speed: speed,
                drops: drops,
                description: description
            });
        }
    }

    /**
     * Finds monsters by criteria
     */
    search(query, rankFilter = 'ALL', limit = 50, offset = 0) {
        let results = this.monsters;

        if (rankFilter && rankFilter !== 'ALL') {
            results = results.filter(m => m.rank === rankFilter);
        }

        if (query) {
            const q = query.toLowerCase();
            results = results.filter(m => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
        }

        return {
            total: results.length,
            monsters: results.slice(offset, offset + limit)
        };
    }
}

// Bind to window sandbox
window.monstersDB = new MonstersDatabase();
