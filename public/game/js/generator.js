/**
 * Abyss Monarch - Random Hunter Generator
 */
class HunterGenerator {
    constructor() {
        this.names = {
            male: ['Jin', 'Min-Ho', 'Hwan', 'Dae', 'Sung', 'Joon'],
            female: ['Na-Ra', 'Seo-Yeon', 'Ji-Hye', 'Ji-Soo', 'Ha-Eun', 'Su-Bin'],
            surnames: ['Park', 'Kim', 'Lee', 'Choi', 'Jung', 'Kang']
        };
        this.ranks = ['E', 'D', 'C', 'B']; // Random hunters are generally not A/S rank freely
        this.classes = ['Warrior', 'Mage', 'Assassin', 'Ranger', 'Cleric'];
    }

    generate() {
        const gender = Math.random() > 0.5 ? 'male' : 'female';
        const name = `${this.names[gender][Math.floor(Math.random() * this.names[gender].length)]} ` +
                     `${this.names.surnames[Math.floor(Math.random() * this.names.surnames.length)]}`;
        const rank = this.ranks[Math.floor(Math.random() * this.ranks.length)];
        const baseClass = this.classes[Math.floor(Math.random() * this.classes.length)];
        const id = `hunter_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        return {
            id,
            name,
            rank,
            baseClass,
            currentClass: baseClass,
            level: 10 + Math.floor(Math.random() * 5),
            exp: 0,
            expNeeded: 1000,
            stats: { 
                str: 10 + Math.floor(Math.random() * 10),
                dex: 10 + Math.floor(Math.random() * 10),
                vit: 10 + Math.floor(Math.random() * 10),
                int: 10 + Math.floor(Math.random() * 10),
                wis: 10 + Math.floor(Math.random() * 10),
                luk: 10 + Math.floor(Math.random() * 10)
            },
            skills: [{ id: 'strike', level: 1, exp: 0, maxLevel: 10 }],
            equippedSkills: ['strike'],
            equippedGear: {
                head: null, chest: null, pants: null, boots: null,
                shoulder_l: null, shoulder_r: null, glove_l: null, glove_r: null,
                belt: null, cape: null,
                ring_l1: null, ring_l2: null, ring_l3: null, ring_l4: null, ring_l5: null,
                ring_r1: null, ring_r2: null, ring_r3: null, ring_r4: null, ring_r5: null,
                weapon_l: null, weapon_r: null
            },
            trust: 0,
            affection: 0,
            recruited: false
        };
    }
}

window.hunterGenerator = new HunterGenerator();
