import Vue from 'vue'
import Vuex from 'vuex'
import PersistedState from 'vuex-persistedstate'
import VuexLogger from 'vuex/dist/logger'

import GowBase from '@/assets/db/base.json'
import GowTrait from '@/assets/db/trait.json'
import GowKingdom from '@/assets/db/kingdom.json'
import GowClass from '@/assets/db/class.json'
import GowWeapon from '@/assets/db/weapon.json'
import GowTroop from '@/assets/db/troop.json'
import OTM from '@/assets/db/otm.json'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const persistOptions = {
  key: 'gow-coapp'
}

export default new Vuex.Store({
  state: {
    arcaneHardLimit: 16,
    arcaneSoftLimit: 21,
    troopForDelve: [
      'the scourge of honor',
      'child of summer',
      'leprechaun',
      'divine ishbaala',
      'qilin',
      'mercy',
      'moon rabbit',
      'charonas',
      'death',
      'queen beetrix',
      'moonsinger',
      'ketras the bull',
      'egg thief',
      'glaycion',
      'king bloodhammer',
      'gimlet stormbrew',
      'wrath',
      'yao guai',
      'queen titania',
      'king of thieves',
      'divinia',
      'tesla',
      'apothecary',
      'alchemist',
      'rowanne',
      'the wild queen',
      'shahbanu vespera'
    ],
    upgradesMilestones: {
      level: [1, 10, 15, 20],
      power: [1, 5, 10, 15, 20, 25, 30],
      renown: [100, 500, 1000, 1500, 1800, 1900, 2000, 2500],
      quality: [1, 5, 10],
      talent: [1, 3, 5, 6, 7]
    },
    inventory: {
      arcanes: {}
    },
    increasedDropKingdoms: ['', '', '', ''],
    upgrades: {
    }
  },
  getters: {
    oneTimeMessages: state => OTM,
    arcaneHardLimit: (state) => state.arcaneHardLimit,
    arcaneSoftLimit: (state) => state.arcaneSoftLimit,
    upgrades: (state) => state.upgrades,
    kingdomMaxLevel: (state) => state.upgradesMilestones.level.at(-1),
    kingdomMaxPower: (state) => state.upgradesMilestones.power.at(-1),
    delveMaxRenown: (state) => state.upgradesMilestones.renown.at(-1),
    delveMaxQuality: (state) => state.upgradesMilestones.quality.at(-1),
    classMaxTalent: (state) => state.upgradesMilestones.talent.at(-1),
    increasedDropKingdoms: (state) => state.increasedDropKingdoms,
    getArcane: (state, getters) => (arcaneName) => {
      if (!arcaneName || !GowBase.arcanes[arcaneName]) return null
      const arcane = JSON.parse(JSON.stringify(GowBase.arcanes[arcaneName]))
      arcane.name = arcaneName
      arcane.inventory = getters.getInventoryPiece('arcanes', arcaneName)
      return arcane
    },
    getTroopType: () => (troopTypeName) => {
      if (!troopTypeName || !GowBase.troop_types[troopTypeName]) return null
      const type = JSON.parse(JSON.stringify(GowBase.troop_types[troopTypeName]))
      type.name = troopTypeName
      return type
    },
    getTroopRole: () => (troopRoleName) => {
      if (!troopRoleName || !GowBase.troop_roles[troopRoleName]) return null
      const role = JSON.parse(JSON.stringify(GowBase.troop_roles[troopRoleName]))
      role.name = troopRoleName
      return role
    },
    getTrait: () => (traitName) => {
      if (!traitName || !GowTrait[traitName]) return null
      const trait = JSON.parse(JSON.stringify(GowTrait[traitName]))
      trait.name = traitName
      return trait
    },
    getKingdom: (state, getters) => (kingdomName) => {
      if (!kingdomName || !GowKingdom.kingdoms[kingdomName]) return null
      const kingdom = JSON.parse(JSON.stringify(GowKingdom.kingdoms[kingdomName]))
      kingdom.name = kingdomName
      kingdom.arcane = getters.getArcane(kingdom.arcane)
      kingdom.level = getters.getUpgrade(kingdomName, 'level')
      kingdom.power = getters.getUpgrade(kingdomName, 'power')
      return kingdom
    },
    getDelve: (state, getters) => (delveName) => {
      if (!delveName || !GowKingdom.delves[delveName]) return null
      const delve = JSON.parse(JSON.stringify(GowKingdom.delves[delveName]))
      delve.name = delveName
      delve.kingdom = getters.getKingdom(delve.kingdom)
      delve.renown = getters.getUpgrade(delveName, 'renown')
      delve.quality = getters.getUpgrade(delveName, 'quality')
      return delve
    },
    getClass: (state, getters) => (className) => {
      if (!className || !GowClass.classes[className]) return null
      const gowClass = JSON.parse(JSON.stringify(GowClass.classes[className]))
      gowClass.name = className
      gowClass.trees = [
        getters.getTree(gowClass.tree1), getters.getTree(gowClass.tree2), getters.getTree(gowClass.tree3)
      ]
      delete gowClass.tree1
      delete gowClass.tree2
      delete gowClass.tree3
      gowClass.traits = [
        getters.getTrait(gowClass.trait1), getters.getTrait(gowClass.trait2), getters.getTrait(gowClass.trait3)
      ]
      delete gowClass.trait1
      delete gowClass.trait2
      delete gowClass.trait3
      gowClass.troop = getters.getTroopType(gowClass.troop)
      gowClass.weapon = getters.getWeapon(gowClass.weapon)
      gowClass.kingdom = getters.getKingdom(gowClass.kingdom)
      gowClass.talent = getters.getUpgrade(className, 'talent')
      return gowClass
    },
    getTree: () => (treeName) => {
      if (!treeName || !GowClass.trees[treeName]) return null
      const tree = JSON.parse(JSON.stringify(GowClass.trees[treeName]))
      tree.name = treeName
      return tree
    },
    getWeapon: () => (weaponName) => {
      if (!weaponName || !GowWeapon[weaponName]) return null
      const weapon = JSON.parse(JSON.stringify(GowWeapon[weaponName]))
      weapon.name = weaponName
      return weapon
    },
    getTroop: (state, getters) => (troopName) => {
      if (!troopName || !GowTroop[troopName]) return null
      const troop = JSON.parse(JSON.stringify(GowTroop[troopName]))
      troop.name = troopName
      troop.kingdom = getters.getKingdom(troop.kingdom)
      troop.delve = getters.getDelve(troop.delve)
      troop.types = [
        getters.getTroopType(troop.type1), getters.getTroopType(troop.type2)
      ]
      delete troop.type1
      delete troop.type2
      troop.role = getters.getTroopRole(troop.role)
      return troop
    },
    getUpgrade: (state) => (targetName, upgradeName) => {
      if (!targetName || !state.upgrades[targetName] || !state.upgrades[targetName][upgradeName]) return 0
      return state.upgrades[targetName][upgradeName]
    },
    getColors: (state) => () => {
      const colors = []
      for (const colorName of GowBase.colors) {
        colors.push({ name: colorName })
      }
      return colors
    },
    getArcanes: (state, getters) => (filters) => {
      let i = 1
      const arcanes = []
      do {
        for (const [arcaneName, arcaneData] of Object.entries(GowBase.arcanes)) {
          if (i === arcaneData.inventoryOrder) {
            if (!filters || !filters.color || (filters.color === arcaneData.color1 || filters.color === arcaneData.color2)) {
              if (!filters || !filters.colorAnd || (filters.colorAnd === arcaneData.color1 || filters.colorAnd === arcaneData.color2)) {
                arcanes.push(getters.getArcane(arcaneName))
              }
            }
            break
          }
        }
        i++
      } while (i <= Object.keys(GowBase.arcanes).length)
      return arcanes
    },
    getTroopTypes: (state, getters) => () => {
      const types = []
      for (const troopTypeName of Object.keys(GowBase.troop_types)) {
        types.push(getters.getTroopType(troopTypeName))
      }
      return types
    },
    getTroopRoles: (state, getters) => () => {
      const roles = []
      for (const troopRoleName of Object.keys(GowBase.troop_roles)) {
        roles.push(getters.getTroopRole(troopRoleName))
      }
      return roles
    },
    getTraits: (state, getters) => () => {
      const traits = []
      for (const traitName of Object.keys(GowTrait)) {
        traits.push(getters.getTrait(traitName))
      }
      return traits
    },
    getKingdoms: (state, getters) => (filters) => {
      const kingdoms = []
      for (const [kingdomName, kingdomData] of Object.entries(GowKingdom.kingdoms)) {
        if (!filters || (filters.arcane === kingdomData.arcane) || (filters.mastery === kingdomData.mastery)) {
          kingdoms.push(getters.getKingdom(kingdomName))
        }
      }
      return kingdoms
    },
    getDelves: (state, getters) => (filters) => {
      const delves = []
      for (const [delveName, delveData] of Object.entries(GowKingdom.delves)) {
        if (!filters || !filters.color || (filters.color === delveData.color1 || filters.color === delveData.color2)) {
          if (!filters || !filters.colorAnd || (filters.colorAnd === delveData.color1 || filters.colorAnd === delveData.color2)) {
            delves.push(getters.getDelve(delveName))
          }
        }
      }
      return delves
    },
    getClasses: (state, getters) => (filters) => {
      const classes = []
      for (const [className, classData] of Object.entries(GowClass.classes)) {
        if (
          (!filters) ||
          (filters.tree && (filters.tree === classData.tree1 || filters.tree === classData.tree2 || filters.tree === classData.tree3)) ||
          (filters.trait && (filters.trait === classData.trait1 || filters.trait === classData.trait2 || filters.trait === classData.trait3)) ||
          (filters.troop && filters.troop === classData.troop) ||
          (filters.kingdom && filters.kingdom === classData.kingdom)
        ) {
          classes.push(getters.getClass(className))
        }
      }
      return classes
    },
    getTrees: (state, getters) => () => {
      const trees = []
      for (const treeName of Object.keys(GowClass.trees)) {
        trees.push(getters.getTree(treeName))
      }
      return trees
    },
    getWeapons: (state, getters) => () => {
      const weapons = []
      for (const weaponName of Object.keys(GowWeapon)) {
        weapons.push(getters.getWeapon(weaponName))
      }
      return weapons
    },
    getTroops: (state, getters) => (filters) => {
      const troops = []
      for (const [troopName, troopData] of Object.entries(GowTroop)) {
        if (
          (filters) ||
          (filters.color && (filters.color === troopData.color1 || filters.color === troopData.color2 || filters.color === troopData.color3)) ||
          (filters.colorOr && (filters.colorOr === troopData.color1 || filters.colorOr === troopData.color2 || filters.colorOr === troopData.color3)) ||
          (filters.kingdom && filters.kingdom === troopData.kingdom) ||
          (filters.type && (filters.type === troopData.type1 || filters.type === troopData.type2)) ||
          (filters.role && filters.role === troopData.role)
        ) {
          troops.push(getters.getTroop(troopName))
        }
      }
      return troops
    },
    getTroopsForDelve: (state, getters) => (delveName) => {
      const troops = []
      const delve = getters.getDelve(delveName)
      for (const troopName of state.troopForDelve) {
        const troop = getters.getTroop(troopName)
        troop.canDelve = delve ? getters.isTroopFromColor(troopName, delve.color1, delve.color2) : false
        troops.push(troop)
      }
      return troops
    },
    isTroopFromColor: (state, getters) => (troopName, color, colorOr) => {
      const troop = getters.getTroop(troopName)
      return (color && (color === troop.color1 || color === troop.color2 || color === troop.color3)) ||
        (colorOr && (colorOr === troop.color1 || colorOr === troop.color2 || colorOr === troop.color3))
    },
    getUpgradeStats: (state, getters) => (upgradeName) => {
      let maxStep = 0
      let targetList = []
      switch (upgradeName) {
        case 'level': maxStep = getters.kingdomMaxLevel; targetList = getters.getKingdoms(); break
        case 'power': maxStep = getters.kingdomMaxPower; targetList = getters.getKingdoms(); break
        case 'renown': maxStep = getters.delveMaxRenown; targetList = getters.getDelves(); break
        case 'quality': maxStep = getters.delveMaxQuality; targetList = getters.getDelves(); break
        case 'talent': maxStep = getters.classMaxTalent; targetList = getters.getClasses(); break
        default: return {}
      }
      let nextStep = maxStep
      const lowUpgrade = []
      const stats = { min: 9999, max: 0, minName: '', steps: {}, total: 0, average: 0 }
      for (const step of state.upgradesMilestones[upgradeName]) {
        stats.steps[step] = 0
        for (const targetItem of targetList) {
          if (targetItem[upgradeName] < step) {
            stats.steps[step]++
            if (step <= nextStep) {
              lowUpgrade.push(targetItem.name)
            }
          }
          if (step === maxStep) {
            // only at the end, compute min max total etc
            if (targetItem[upgradeName] < stats.min) {
              stats.min = targetItem[upgradeName]
              stats.minName = targetItem.name
            }
            if (targetItem[upgradeName] > stats.max) {
              stats.max = targetItem[upgradeName]
            }
            stats.total += targetItem[upgradeName]
          }
        }
        if (stats.steps[step] !== 0 && nextStep > step) {
          nextStep = step
        }
      }
      stats.nextStep = nextStep
      stats.lowUpgrade = lowUpgrade
      if (targetList.length > 0) {
        stats.average = stats.total / targetList.length
        if (!Number.isInteger(stats.average)) {
          stats.average = Math.floor(stats.average * 100) / 100
        }
      }
      return stats
    },
    getInventoryBag: (state) => (bagName) => {
      return state.inventory[bagName] ? state.inventory[bagName] : {}
    },
    getInventoryPiece: (state, getters) => (bagName, pieceName) => {
      const bag = getters.getInventoryBag(bagName)
      return bag[pieceName] ? bag[pieceName] : 0
    }
  },
  mutations: {
    setUpgrade (state, payload) {
      if (!state.upgrades[payload.targetName]) {
        Vue.set(state.upgrades, payload.targetName, {})
      }
      Vue.set(state.upgrades[payload.targetName], payload.upgradeName, payload.value)
    },
    setInventory (state, payload) {
      if (!state.inventory[payload.bag]) {
        Vue.set(state.inventory, payload.bag, {})
      }
      Vue.set(state.inventory[payload.bag], payload.piece, payload.value)
    },
    setIncreasedDropKingdom (state, payload) {
      Vue.set(state.increasedDropKingdoms, payload.index, payload.kingdomName)
    }
  },
  actions: {
    resetStorage () {
      localStorage.removeItem(persistOptions.key)
      // also remove one time message stored
      for (const otm in OTM) {
        localStorage.removeItem('gowotm:' + otm)
      }
      location.reload()
    },
    changeUpgrade ({ state, getters, commit }, payload) {
      if (!payload.targetName) return
      if (!GowKingdom.kingdoms[payload.targetName] && !GowKingdom.delves[payload.targetName] && !GowClass.classes[payload.targetName]) return
      if (!payload.upgradeName) return
      if (!payload.value) payload.value = 0
      if (payload.value < 0) payload.value = 0
      switch (payload.upgradeName) {
        case 'level': if (payload.value > getters.kingdomMaxLevel) payload.value = getters.kingdomMaxLevel; break
        case 'power': if (payload.value > getters.kingdomMaxPower) payload.value = getters.kingdomMaxPower; break
        case 'renown': if (payload.value > getters.delveMaxRenown) payload.value = getters.delveMaxRenown; break
        case 'quality': if (payload.value > getters.delveMaxQuality) payload.value = getters.delveMaxQuality; break
        case 'talent': if (payload.value > getters.classMaxTalent) payload.value = getters.classMaxTalent; break
        default: return
      }
      commit('setUpgrade', payload)
    },
    changeInventoryPiece ({ commit }, payload) {
      if (!payload.bag) return
      if (!payload.piece) return
      if (!payload.value) payload.value = 0
      if (payload.value < 0) payload.value = 0
      commit('setInventory', payload)
    },
    changeIncreasedDropKingdom ({ commit }, payload) {
      if (!GowKingdom.kingdoms[payload.kingdomName]) payload.kingdomName = ''
      if (!payload.index) payload.index = 0
      commit('setIncreasedDropKingdom', payload)
    }
  },
  modules: {
  },
  plugins: debug ? [VuexLogger(), PersistedState(persistOptions)] : [PersistedState(persistOptions)]
})
