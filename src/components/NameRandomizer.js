/**
 * This call generates a random name to be used by the player.
 */

class NameRandomizer {
  constructor() {
    this.nouns = [
      'Alchemist',
      'Amulet',
      'Apprentice',
      'Beast',
      'Beauty',
      'Bersek',
      'Bogeyman',
      'Brew',
      'Castle',
      'Cauldron',
      'Cave',
      'Chalice',
      'Creature',
      'Crow',
      'Curse',
      'Demon',
      'Detective',
      'Dragon',
      'Dream',
      'Dwarf',
      'Elf',
      'Empire',
      'Fairy',
      'Ghost',
      'Giant',
      'Gifts',
      'Gnome',
      'Goblin',
      'Godmother',
      'Gowns',
      'Graveyard',
      'Hag',
      'Harbinger',
      'Herbs',
      'Horror',
      'Illusion',
      'Imp',
      'Incantation',
      'Joker',
      'Kettle',
      'King',
      'Kingdom',
      'Lands',
      'Legend',
      'Leprechauns',
      'Lore',
      'Magic',
      'Magician',
      'Majesty',
      'Mask',
      'Medium',
      'Miracle',
      'Monster',
      'Moon',
      'Muse',
      'Mystery',
      'Myth',
      'Nature',
      'Necromancer',
      'Necromancy',
      'Nemesis',
      'Newt',
      'Ogre',
      'Oracle',
      'Owl',
      'Pixie',
      'Potion',
      'Powder',
      'Power',
      'Prey',
      'Prince',
      'Princess',
      'Prophet',
      'Queen',
      'Quest',
      'Quiver',
      'Realm',
      'Reign',
      'Robe',
      'Rule',
      'Sandman',
      'Scroll',
      'Seer',
      'Shaman',
      'Soothsayer',
      'Sorcerer',
      'Sorcery',
      'Specter',
      'Spell',
      'Spider',
      'Spirit',
      'Star',
      'Story',
      'Superstition',
      'Talisman',
      'Theory',
      'Torch',
      'Trick',
      'Troll',
      'Unicorn',
      'Vampire',
      'Vanguard',
      'Victim',
      'Visionary',
      'Wand',
      'Ward',
      'Werewolf',
      'Whisper',
      'Wish',
      'Witch',
      'Youth',
    ];

    this.adjectives = [
      'Abnormal',
      'Awful',
      'Beautiful',
      'Bewitched',
      'Bizarre',
      'Captivated',
      'Charismatic',
      'Charming',
      'Cruel',
      'Dancing',
      'Delirious',
      'Dramatic',
      'Enchanting',
      'Evil',
      'Familiar',
      'Fantastic',
      'Fascinating',
      'Fierce',
      'Forged',
      'Glimmering',
      'Grateful',
      'Grim',
      'Grotesque',
      'Helpful',
      'Heroic',
      'Horrifying',
      'Imaginary',
      'Impressive',
      'Informative',
      'Ingenious',
      'Invisible',
      'Kidnapping',
      'Legendary',
      'Lucky',
      'Magical',
      'Malevolent',
      'Medieval',
      'Mischievous',
      'Mysterious',
      'Mystical',
      'Mythical',
      'Odd',
      'Otherworldly',
      'Overpowered',
      'Petrifying',
      'Poisonous',
      'Potent',
      'Powerful',
      'Raging',
      'Reasoning',
      'Scolded',
      'Seeking',
      'Supernatural',
      'Terrifying',
      'Thrilling',
      'Tragic',
      'Transformed',
      'Unbelievable',
      'Unexplained',
      'Unique',
      'Unusual',
      'Valiant',
      'Venomous',
      'Vice',
      'Vicious',
      'Visionary',
      'Vital',
      'Watchful',
      'Weird',
      'Western',
      'Whimsical',
      'Wicked',
      'Wise',
      'Wrinkled',
    ];

    this.getRandomName = this.getRandomName.bind(this);
  }

  /**
   * Returns a random name based on the list of possible words
   */
  getRandomName() {
    const noun = this.nouns[NameRandomizer.randomIntFromInterval(0, this.nouns.length - 1)];
    const adjective = this.adjectives[
      NameRandomizer.randomIntFromInterval(0, this.adjectives.length - 1)
    ];
    return adjective.concat(noun);
  }

  /**
   * Gives a random number between min and max,
   * credit to Francisc from Stackoverflow for this one
   */
  static randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default NameRandomizer;
