// ===================================
// GSAP INITIALIZATION & SCROLL TRIGGER
// ===================================
const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// ===================================
// NAVIGATION MENU FUNCTIONALITY
// ===================================
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Header shrink on scroll
const header = document.getElementById("header")
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// ===================================
// PARTICLE BACKGROUND ANIMATION
// ===================================
const particlesCanvas = document.getElementById("particles")
const particlesCtx = particlesCanvas.getContext("2d")

particlesCanvas.width = window.innerWidth
particlesCanvas.height = window.innerHeight

const particles = []
const particleCount = 100

class Particle {
  constructor() {
    this.x = Math.random() * particlesCanvas.width
    this.y = Math.random() * particlesCanvas.height
    this.size = Math.random() * 2 + 1
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    this.opacity = Math.random() * 0.5 + 0.2
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > particlesCanvas.width) this.x = 0
    if (this.x < 0) this.x = particlesCanvas.width
    if (this.y > particlesCanvas.height) this.y = 0
    if (this.y < 0) this.y = particlesCanvas.height
  }

  draw() {
    particlesCtx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`
    particlesCtx.beginPath()
    particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    particlesCtx.fill()
  }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle())
}

// Animation loop for particles
function animateParticles() {
  particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height)

  particles.forEach((particle) => {
    particle.update()
    particle.draw()
  })

  requestAnimationFrame(animateParticles)
}

animateParticles()

// Resize handler for particles
window.addEventListener("resize", () => {
  particlesCanvas.width = window.innerWidth
  particlesCanvas.height = window.innerHeight
})

// ===================================
// THREE.JS HERO SECTION 3D SCENE
// ===================================
const THREE = window.THREE
const heroCanvas = document.getElementById("hero-canvas")
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, heroCanvas.offsetWidth / heroCanvas.offsetHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true })

renderer.setSize(heroCanvas.offsetWidth, heroCanvas.offsetHeight)
renderer.setPixelRatio(window.devicePixelRatio)

// Create main 3D cube with glowing edges
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
const cubeMaterial = new THREE.MeshPhongMaterial({
  color: 0x0066ff,
  emissive: 0x00f5ff,
  emissiveIntensity: 0.5,
  wireframe: false,
  transparent: true,
  opacity: 0.8,
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

// Add wireframe edges to the cube
const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry)
const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x00f5ff, linewidth: 2 })
const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial)
cube.add(edges)

// Create orbiting spheres
const orbitingSpheres = []
const sphereCount = 5

for (let i = 0; i < sphereCount; i++) {
  const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16)
  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x9d00ff,
    emissive: 0x9d00ff,
    emissiveIntensity: 0.5,
  })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

  // Position spheres in orbit
  const angle = (i / sphereCount) * Math.PI * 2
  sphere.userData = { angle, radius: 3, speed: 0.01 + i * 0.002 }

  orbitingSpheres.push(sphere)
  scene.add(sphere)
}

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0x00f5ff, 1, 100)
pointLight.position.set(5, 5, 5)
scene.add(pointLight)

camera.position.z = 6

// Mouse interaction for parallax effect
let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

document.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1
})

// Animation loop for hero 3D scene
function animateHero() {
  requestAnimationFrame(animateHero)

  // Smooth rotation of main cube
  cube.rotation.x += 0.005
  cube.rotation.y += 0.005

  // Mouse parallax effect
  targetX = mouseX * 0.5
  targetY = mouseY * 0.5

  cube.rotation.y += (targetX - cube.rotation.y) * 0.05
  cube.rotation.x += (targetY - cube.rotation.x) * 0.05

  // Animate orbiting spheres
  orbitingSpheres.forEach((sphere) => {
    sphere.userData.angle += sphere.userData.speed
    sphere.position.x = Math.cos(sphere.userData.angle) * sphere.userData.radius
    sphere.position.z = Math.sin(sphere.userData.angle) * sphere.userData.radius
    sphere.position.y = Math.sin(sphere.userData.angle * 2) * 0.5
  })

  renderer.render(scene, camera)
}

animateHero()

// Resize handler for Three.js
window.addEventListener("resize", () => {
  const width = heroCanvas.offsetWidth
  const height = heroCanvas.offsetHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
})

// ===================================
// THREE.JS CONTACT SECTION 3D SCENE
// ===================================
const contactCanvas = document.getElementById("contact-canvas")
const contactScene = new THREE.Scene()
const contactCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const contactRenderer = new THREE.WebGLRenderer({ canvas: contactCanvas, alpha: true, antialias: true })

contactRenderer.setSize(window.innerWidth, window.innerHeight)
contactRenderer.setPixelRatio(window.devicePixelRatio)

// Create glowing ring
const torusGeometry = new THREE.TorusGeometry(2, 0.3, 16, 100)
const torusMaterial = new THREE.MeshPhongMaterial({
  color: 0x9d00ff,
  emissive: 0x9d00ff,
  emissiveIntensity: 0.5,
  transparent: true,
  opacity: 0.6,
})
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
contactScene.add(torus)

// Lighting for contact scene
const contactAmbient = new THREE.AmbientLight(0xffffff, 0.3)
contactScene.add(contactAmbient)

const contactPoint = new THREE.PointLight(0x9d00ff, 1, 100)
contactPoint.position.set(0, 0, 5)
contactScene.add(contactPoint)

contactCamera.position.z = 8

// Animation loop for contact scene
function animateContact() {
  requestAnimationFrame(animateContact)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005

  contactRenderer.render(contactScene, contactCamera)
}

animateContact()

// ===================================
// GSAP ANIMATIONS
// ===================================

// Hero text animation on page load
gsap.from(".hero-heading .line", {
  duration: 1,
  y: 100,
  opacity: 0,
  stagger: 0.2,
  ease: "power4.out",
})

gsap.from(".hero-subheading, .hero-tagline", {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 0.5,
  stagger: 0.2,
  ease: "power3.out",
})

gsap.from(".hero-buttons .btn", {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 1,
  stagger: 0.2,
  ease: "power3.out",
})

// Scroll indicator animation
gsap.from(".scroll-indicator", {
  duration: 1,
  opacity: 0,
  delay: 1.5,
  ease: "power2.out",
})

// About section animations
gsap.from(".about-description", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.3,
  ease: "power3.out",
})

gsap.from(".timeline-item", {
  scrollTrigger: {
    trigger: ".timeline",
    start: "top 80%",
  },
  duration: 1,
  x: -50,
  opacity: 0,
  stagger: 0.2,
  ease: "power3.out",
})

// Skills section animations
gsap.from(".skill-card", {
  scrollTrigger: {
    trigger: ".skills",
    start: "top 80%",
  },
  duration: 0.8,
  scale: 0.8,
  opacity: 0,
  stagger: 0.1,
  ease: "back.out(1.7)",
})

// Projects section animations with alternating sides
const projectCards = document.querySelectorAll(".project-card")
projectCards.forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    },
    duration: 1,
    x: index % 2 === 0 ? -100 : 100,
    opacity: 0,
    ease: "power3.out",
  })
})

// Achievements section animations
gsap.from(".achievement-card", {
  scrollTrigger: {
    trigger: ".achievements",
    start: "top 80%",
  },
  duration: 1,
  y: 100,
  opacity: 0,
  stagger: 0.2,
  ease: "power3.out",
})

// Contact section animations
gsap.from(".contact-info", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top 80%",
  },
  duration: 1,
  x: -50,
  opacity: 0,
  ease: "power3.out",
})

gsap.from(".contact-form", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top 80%",
  },
  duration: 1,
  x: 50,
  opacity: 0,
  ease: "power3.out",
})

// Section title animations
gsap.utils.toArray(".section-title").forEach((title) => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: "top 90%",
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
  })
})

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      })
    }
  })
})

// Form submission handler (placeholder)
const contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()
  alert("Thank you for your message! This is a demo form.")
  contactForm.reset()
})

// ===================================
// SCROLL-TRIGGERED CUBE ANIMATION
// ===================================
// Scale down and move cube when scrolling past hero
gsap.to(cube.scale, {
  scrollTrigger: {
    trigger: ".about",
    start: "top bottom",
    end: "top center",
    scrub: true,
  },
  x: 0.5,
  y: 0.5,
  z: 0.5,
})

gsap.to(cube.position, {
  scrollTrigger: {
    trigger: ".about",
    start: "top bottom",
    end: "top center",
    scrub: true,
  },
  y: 2,
})

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Pause Three.js animations when tab is not visible
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    renderer.setAnimationLoop(null)
    contactRenderer.setAnimationLoop(null)
  } else {
    animateHero()
    animateContact()
  }
})
