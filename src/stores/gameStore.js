// src/stores/gameStore.js
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    games: [
      { id: 'tft', name: 'Team Fight Tactics', image: 'https://cdnb.artstation.com/p/assets/covers/images/025/410/377/large/t-j-geisen-tft-iconv2-artstation-thumbnail.jpg?1585702150', description: 'Strategy game' },
      { id: 'lol', name: 'League of Legends', image: 'https://yt3.googleusercontent.com/duXIJFDYVRM07N6fELoAwKGk2LkoTPnHYGEI1qjJdGlzEZSjxDjfYhSDXtdSBovq4iVXmEaHEQ=s900-c-k-c0x00ffffff-no-rj', description: 'MOBA game' },
      { id: 'valorant', name: 'Valorant', image: 'https://seeklogo.com/images/V/valorant-logo-FAB2CA0E55-seeklogo.com.png', description: 'FPS game' },
    ],
    paymentMethods: [
      { id: 'credit_card', name: 'Credit Card' },
      { id: 'cash', name: 'Cash' },
    ],
    packages: [
      { id: 'tft_small', gameId: 'tft', name: 'Small Pack', price: 100 },
      { id: 'tft_medium', gameId: 'tft', name: 'Medium Pack', price: 200 },
      { id: 'tft_large', gameId: 'tft', name: 'Large Pack', price: 300 },
      { id: 'lol_small', gameId: 'lol', name: 'Small Pack', price: 100 },
      { id: 'lol_medium', gameId: 'lol', name: 'Medium Pack', price: 200 },
      { id: 'lol_large', gameId: 'lol', name: 'Large Pack', price: 300 },
      { id: 'valorant_small', gameId: 'valorant', name: 'Small Pack', price: 100 },
      { id: 'valorant_medium', gameId: 'valorant', name: 'Medium Pack', price: 200 },
      { id: 'valorant_large', gameId: 'valorant', name: 'Large Pack', price: 300 },
    ],
    selectedGame: null,
  }),
  actions: {
    selectGame(gameId) {
      this.selectedGame = this.games.find(game => game.id === gameId) || null;
    },
    resetSelection() {
      this.selectedGame = null;
    },
  },
  getters: {
    filteredPackages: (state) => {
      if (!state.selectedGame) return [];
      return state.packages.filter(pkg => pkg.gameId === state.selectedGame.id);
    },
  },
});
