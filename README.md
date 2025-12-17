# Fortune Grid: Pirate Paper Game Randomizer

![Pirate Theme](https://img.shields.io/badge/Theme-Cyberpunk%20Pirate-020617?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern, high-tech companion app for the classic **Pirate Paper Game** (also known as the 7x7 Grid Game or Treasure Hunt).

This application replaces the need for a human moderator to call out grid coordinates (e.g., "A1", "F7"), ensuring a **fair, cryptographically secure, and visual experience** for all players.

## 🏴‍☠️ What is this?

In the *Pirate Paper Game*, players fill a 7x7 grid with:
- **Treasures** (Coins with points)
- **Hazards** (Bombs, Skulls)
- **Actions** (Shields, Mirrors, Swaps)

Normally, someone has to pick random coordinates to reveal what's on everyone's map. This app automates that process with style.

## ✨ Features

- **Fair & Secure Randomness**: Uses `crypto.getRandomValues()` ensures true randomness, preventing any bias in coordinate selection.
- **Interactive Grid**: 
    - **Auto-mode**: "Initiate Jump" picks a random cell for you with a cool scanning animation.
    - **Manual-mode**: Tap any cell to manually "fire" at that location (great for strategy variations).
- **Responsive "Cockpit" Design**: Optimized layout that works perfectly on desktop dashboards and mobile devices.
- **Visual Tracking**:
    - Automatically tracks occupied cells (marked with skulls).
    - Shows remaining available sectors.
    - Prevents duplicate calls.
- **Cyberpunk Pirate Aesthetic**: A unique "Nana Banana Pro" design blending deep ocean vibes with futuristic HUD elements.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/petrochen/pirate-paper-randomizer.git
   ```
2. Enter the directory:
   ```bash
   cd pirate-paper-randomizer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

## 🎮 How to Play

1. **Setup**: Each player draws a 7x7 grid on paper and secretly fills it with their loot and hazards.
2. **Play**: 
   - Click **"INITIATE JUMP"** to randomly select a target coordinate.
   - Or click a specific cell if a player uses a "Choose Next Square" ability.
3. **Reveal**: All players check their paper grids at the called coordinate (e.g., "C4") and resolve the action (get coins, explode, etc.).
4. **Repeat**: Continue until the grid is empty or everyone is eliminated!

## 🛠 Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Cinzel (Display), Outfit (UI)

---
*Built with React & 💀 by Nana Banana Pro Designs.*
