
# EDA - EtherDelta Analysis
A **bookmarklet** that displays additional market information on EtherDelta.

## Why did I build this?

I was curious as to which tokens showed the most genuine interest based on the total ETH committed to the EtherDelta contract. I was also curious if the current market price accurately reflected the price when compared to a balanced market. It's possible this project will become a Chrome Extension if there is interest.

## Why a bookmarklet?
It's a simple and unobtrusive way to modify an existing page using JavaScript. [More information on bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet).

## How it looks
![Analysis](https://github.com/veerman/EtherDeltaAnalysis/blob/master/analysis.png)

Please see the examples folder for additional screenshots.

## Overview of information

**Sell Orders** - The total number of unique sell orders in the order book

**Buy Orders** - The total number of unique buy orders in the order book

**Cheapest Sell Price** (in ETH) - The cheapest available price you can buy a token from a seller

**Largest Buy Price** (in ETH) - The largest price (amount) that a buyer is willing to pay for a token

**Total Tokens Listed** (Sell) - The total amount of all tokens listed by sellers in the order book

**Total ETH Committed** (Buy) - The total amount of all ETH committed to buy tokens in the order book

**Average Tokens per 1 ETH** - Assuming a balanced market (ie. # of buyers = # of sellers), the **Total Tokens Listed** divided by the **Total ETH Committed**

**Average ETHs per 1 Token** - Assuming a balanced market (ie. # of buyers = # of sellers), the **Total ETH Committed** divided by the **Total Tokens Listed**

**Cheapest Sell Price vs Avg ETHs/Token**	- The Cheapest Sell Price divided by Average ETHs per 1 Token from above. The closer to 1.0x the closer the current price reflects the balanced market price. If the multiple is higher, it could signal that the mar

## Instructions
1. Visit and complete steps in [Add Bookmarklet](https://htmlpreview.github.io/?https://raw.githubusercontent.com/veerman/EtherDeltaAnalysis/master/add_bookmarklet.html)
3. Visit [EtherDelta](https://etherdelta.com/)
4. Click **EDA** bookmarklet in bookmarks bar to activate
5. Success (EDA refreshes automatically every 10 seconds)

## Author
[Steve Veerman](http://steve.veerman.ca/)

## Donate
Sending some ETH, ERC20 Tokens, etc will definitely motivate me to improve this project :)

Ethereum Address: 0xd39344cf2ED47d1b2a9C90C7e4b5cC30F0A5C8ff
