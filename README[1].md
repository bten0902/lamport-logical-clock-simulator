# Lamport Logical Clock Simulator

An interactive front-end demonstration of **Lamport logical clocks** for multiple distributed processes.

## Features

- Multiple processes (P1, P2, P3 by default)
- Add additional processes
- Local events
- Message send/receive events
- Automatic Lamport clock updates
- Global event ordering
- Responsive UI
- No backend or dependencies

## Run locally

Open `index.html` in a browser.

## Lamport algorithm used

For a local or send event:

`C = C + 1`

For a receive event carrying timestamp `T`:

`C = max(C, T) + 1`

Lamport clocks guarantee that if event A happens-before event B, then:

`L(A) < L(B)`

They do not represent physical time.

## GitHub Pages

1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, and `script.js`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save.
7. GitHub will provide your public Pages URL after deployment.

## Suggested repository description

> Interactive simulator demonstrating Lamport logical clocks, multiple distributed processes, message passing, and event ordering.
