{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const config = \{\
  type: Phaser.AUTO,\
  width: 1450,\
  height: 1750,\
  backgroundColor: '#f5f5f5',\
  scale: \{\
    mode: Phaser.Scale.FIT,\
    autoCenter: Phaser.Scale.CENTER_BOTH\
  \},\
  scene: \{\
    preload: preload,\
    create: create\
  \}\
\};\
\
const game = new Phaser.Game(config);\
\
// Indices to track selected options\
let hatIndex = 0;\
let eyeIndex = 0;\
let hookIndex = 0;\
let shoeIndex = 0;\
\
// Arrays to store image keys\
let hatKeys = [];\
let eyeKeys = [];\
let hookKeys = [];\
let shoeKeys = [];\
\
// Sprites\
let base, hat, eyes, hook, shoes;\
\
function preload() \{\
  this.load.image('character', 'assets/character.PNG\'92);\
  this.load.image('arrowleft', 'assets/arrowleft.png\'92);\
  this.load.image('arrowright', 'assets/arrowright.png');\
\
  // Load clothing assets\
  for (let i = 1; i <= 37; i++) \{\
    let key = `hat$\{i\}`;\
    hatKeys.push(key);\
    this.load.image(key, `assets/hat$\{I\}.PNG`);\
  \}\
\
  for (let i = 1; i <= 16; i++) \{\
    let key = `eye$\{i\}`;\
    eyeKeys.push(key);\
    this.load.image(key, `assets/eye$\{I\}.PNG`);\
  \}\
\
  for (let i = 1; i <= 7; i++) \{\
    let key = `hook$\{i\}`;\
    hookKeys.push(key);\
    this.load.image(key, `assets/hook$\{I\}.PNG`);\
  \}\
\
  for (let i = 1; i <= 12; i++) \{\
    let key = `shoe$\{i\}`;\
    shoeKeys.push(key);\
    this.load.image(key, `assets/shoe$\{I\}.PNG`);\
  \}\
\}\
\
function create() \{\
  const centerX = this.scale.width / 2;\
  const centerY = this.scale.height / 2;\
\
  base = this.add.image(centerX, centerY, 'character');\
\
  // Initial layer sprites (placed on top of base)\
  hat = this.add.image(centerX, centerY, hatKeys[hatIndex]);\
  eyes = this.add.image(centerX, centerY, eyeKeys[eyeIndex]);\
  hook = this.add.image(centerX, centerY, hookKeys[hookIndex]);\
  shoes = this.add.image(centerX, centerY, shoeKeys[shoeIndex]);\
\
  // Arrow controls for each item\
  createArrowControls(this, hatKeys, hat, 'hat', 300);\
  createArrowControls(this, eyeKeys, eyes, 'eye', 500);\
  createArrowControls(this, hookKeys, hook, 'hook', 700);\
  createArrowControls(this, shoeKeys, shoes, 'shoe', 900);\
\}\
\
function createArrowControls(scene, keysArray, spriteRef, category, yPosition) \{\
  const left = scene.add.image(100, yPosition, 'arrowleft').setInteractive();\
  const right = scene.add.image(1350, yPosition, 'arrowright').setInteractive();\
\
  left.setScale(0.5);\
  right.setScale(0.5);\
\
  left.on('pointerdown', () => \{\
    changeItem(category, -1);\
  \});\
  right.on('pointerdown', () => \{\
    changeItem(category, 1);\
  \});\
\}\
\
function changeItem(category, direction) \{\
  switch (category) \{\
    case 'hat':\
      hatIndex = wrapIndex(hatIndex + direction, hatKeys.length);\
      hat.setTexture(hatKeys[hatIndex]);\
      break;\
    case 'eye':\
      eyeIndex = wrapIndex(eyeIndex + direction, eyeKeys.length);\
      eyes.setTexture(eyeKeys[eyeIndex]);\
      break;\
    case 'hook':\
      hookIndex = wrapIndex(hookIndex + direction, hookKeys.length);\
      hook.setTexture(hookKeys[hookIndex]);\
      break;\
    case 'shoe':\
      shoeIndex = wrapIndex(shoeIndex + direction, shoeKeys.length);\
      shoes.setTexture(shoeKeys[shoeIndex]);\
      break;\
  \}\
\}\
\
function wrapIndex(index, max) \{\
  return (index + max) % max;\
\}\
}