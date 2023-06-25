# Crypto tracker app

## Table of Contents

- [Design](#design)
- [Project](#project)
- [How to Use](#how-to-use)

---

## Design

As a starting point, I used this [Dribbble mockup](https://dribbble.com/shots/20200605-Crypting-Crypto-Tracking-Dashboard-Animation) to achieve basic styling. Please note that this is a pet project and can be further developed in the future.

To start the development process, I decided to use [Vite](https://vitejs.dev/), a lightweight build tool that offers TypeScript integration and can be easily configured through a single file.

For the UI library, I chose [Chakra UI](https://chakra-ui.com/). I haven't used it before, but it seems like a great fit for this project.

To manage global state, I opted for [Redux Toolkit](https://redux-toolkit.js.org/). It provides a simple and comprehensive way to manipulate state, trigger API calls with caching, and even listen to the LocalStorage using custom middleware. Additionally, it offers an easy way to extend the app's functionality by adding new slices.

To retrieve data, I utilized the [CoinGecko](https://apiguide.coingecko.com/getting-started/endpoint-overview) open API.

For routing, I decided to use the reliable [react-router-dom](https://reactrouter.com/en/main) package, which allows for easy redirection between different pages.

I also made use of the [react-toastify](https://fkhadra.github.io/react-toastify/introduction) library to manage notifications and [react-icons](https://react-icons.github.io/react-icons/) to incorporate various icons into the project.

---

## Project

The deployed static site is hosted on [Netlify](https://www.netlify.com/). You can access it [here](https://crypting-tracker.netlify.app/).

To run the project locally, follow these steps:

### Prerequisites

- Node ^18.16
- npm ^8.13.2

### Installation and Setup

1. Clone the repository to your local machine:

   - Via SSH:

     ```
     git clone git@github.com:Shemrock3267/crypto-tracker.git
     ```

   - Via HTTPS:
     ```
     git clone https://github.com/Shemrock3267/crypto-tracker.git
     ```

2. Install the project dependencies:

```
npm install
```

3. Run the development server:

```
npm run dev
```

4. Build the project:

```
npm run build
```

5. Run the production build:

```
npm run preview
```

---

## How to Use

**Note:** The project has been tested only in Google Chrome due to time constraints during development.

### Prerequisites

- [Metamask](https://metamask.io/) account with [Goerli Testnet](https://goerlifaucet.com/) connected to it.
- Log in to your Metamask account before accessing the
  `/wallet` page.

### Dashboard Page

- View up to 100 tokens and their respective information.
- Add tokens to favorites (saved to local storage) and view them even after closing the tab.

### Wallet Page

- Connect your Metamask wallet and view your wallet address and ETH balance on the Goerli Testnet.
- Send tokens to another wallet on the Goerli Testnet.

---

Feel free to reach out if you have any questions or need further assistance.
