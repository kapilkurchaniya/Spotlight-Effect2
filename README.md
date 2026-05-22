# ✨ Spotlight Effect (HTML/CSS/JavaScript)

An interactive webpage featuring a dynamic **spotlight glow effect** that follows the mouse cursor over a fullscreen background video. The background video starts playing when the user clicks anywhere on the screen.

---

## 🚀 Live Demo

Add your deployed Vercel link here:

```bash
https://spotlight-effect2.vercel.app/
```

---

## 📸 Preview

Add screenshot or GIF here.

---

# 🎯 Features

- ✨ Mouse-follow spotlight effect
- 🎥 Fullscreen background video
- 🖱️ Click-to-play interaction
- ⚡ Smooth radial glow animation
- 💻 Built using pure HTML, CSS & JavaScript
- 🚫 No frameworks or build tools used

---

# 📁 Project Structure

```bash
project/
│
├── index.html
├── index.css
├── index.js
└── Beparwai (Official Video) - Jonita.mp4
```

---

# 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)

---

# ⚙️ How It Works

## Mouse Spotlight Effect

`index.js` tracks mouse movement:

```javascript
document.addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--x", e.clientX + "px");
  document.documentElement.style.setProperty("--y", e.clientY + "px");
});
```

The CSS uses these variables inside a `radial-gradient()` to create the spotlight glow effect.

---

## Click to Play Video

```javascript
document.addEventListener("click", () => {
  video.play();
});
```

Modern browsers block autoplay with sound, so the video starts only after user interaction.

---

# ▶️ How to Run Locally

## Option 1: Open Directly

Simply double-click:

```bash
index.html
```

---

## Option 2: Use Live Server (Recommended)

Using VS Code:

1. Install **Live Server** extension
2. Right-click `index.html`
3. Click **Open with Live Server**

---

# 🎨 Customization

## Change Background Video

1. Replace:

```bash
Beparwai (Official Video) - Jonita.mp4
```

2. Update video source inside `index.html`

```html
<video src="your-video.mp4"></video>
```

---

## Adjust Spotlight Effect

Edit the radial gradient inside `index.css`:

```css
background: radial-gradient(
  circle at var(--x) var(--y),
  transparent 100px,
  rgba(0, 0, 0, 0.95) 250px
);
```

---

# 🌐 Deployment

This project can be easily deployed using:

- Vercel
- Netlify
- GitHub Pages

---

# 📌 Notes

- Autoplay restrictions are handled using click interaction.
- Works best in modern browsers.
- Recommended for desktop view.

---

# 👨‍💻 Author

Kapil Kurchaniya

- GitHub: https://github.com/kapilkurchaniya
- LinkedIn: https://www.linkedin.com/in/kapil-kurchaniya-961589353

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub!
