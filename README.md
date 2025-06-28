# 🗓️ Swift Calendar

A simple, accessible monthly calendar app built with **React**, **TypeScript**, and **vanilla CSS**. Users can click on dates to add short notes (max 100 characters), which are saved in `localStorage` for persistence.

---

## 📆 Features

* ✅ Monthly calendar grid for 3 months
* ✅ Highlight today's date
* ✅ Clickable dates with overlay note input
* ✅ Visual indicator for dates with notes
* ✅ Overlay positioned near the clicked date, with edge-awareness
* ✅ Notes persist across page refresh (via `localStorage`)
* ✅ Fully accessible (keyboard navigation, ARIA labels)

---

## ⚙️ Local Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/chibuzornworie85/Swift-Calendar
   cd swift-calendar
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the app locally**:

   ```bash
   npm start
   ```

4. Visit `http://localhost:3000` in your browser.

---

## 🧠 Approach & Design Decisions

### 🔄 State Management

* Used **React Context API** to store and update notes globally across the app.
* Notes are indexed by `yyyy-MM-dd` date strings for quick access.
* State changes are synced to `localStorage` using `useEffect`.

### 📍 Overlay Positioning

* Each date cell's position is calculated using `getBoundingClientRect()` on click.
* Overlay is dynamically placed to the **right** or **left** depending on available screen width.
* On small screens or edges, overlay placement avoids overflowing.
* Overlay remains visually attached to the clicked date with small padding for clarity.

---

## 🧪 Accessibility

* All date cells are keyboard-focusable (`tabIndex=0`)
* Date selection is also triggered by the `Enter` key
* ARIA roles (e.g., `dialog`, `aria-modal`) are added to the overlay

---
---

## 📝 Changelog

* Updated the app title to Swift Calendar.
* Revised the meta title and description for better clarity and identity.

---

## ⚖️ Trade-offs & Improvements

| Current Implementation                         | Possible Enhancements                                 |
| ---------------------------------------------- | ----------------------------------------------------- |
| Vanilla CSS for styling                        | Use Tailwind or CSS Modules for scaling               |
| Inline positioning via `getBoundingClientRect` | Use Popper.js or Floating UI for better edge handling |
| Simple overlay note UI                         | Add animations, emojis, markdown preview              |
| All notes are stored locally                   | Add backend sync or export/import options             |


---