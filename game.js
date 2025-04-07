
const config = {
  type: Phaser.AUTO,
  width: 1450,
  height: 1750,
  backgroundColor: '#f5f5f5',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

let hatIndex = 0, eyeIndex = 0, hookIndex = 0, shoeIndex = 0;
let hatKeys = ['hat1', 'hat2'], eyeKeys = ['eye1', 'eye2'], hookKeys = ['hook1', 'hook2'], shoeKeys = ['shoe1', 'shoe2'];
let base, hat, eyes, hook, shoes;

function preload() {
  this.load.image('character', 'assets/character.png');
  this.load.image('arrowleft', 'assets/arrowleft.png');
  this.load.image('arrowright', 'assets/arrowright.png');

  hatKeys.forEach(key => this.load.image(key, 'assets/' + key + '.png'));
  eyeKeys.forEach(key => this.load.image(key, 'assets/' + key + '.png'));
  hookKeys.forEach(key => this.load.image(key, 'assets/' + key + '.png'));
  shoeKeys.forEach(key => this.load.image(key, 'assets/' + key + '.png'));
}

function create() {
  const centerX = this.scale.width / 2;
  const centerY = this.scale.height / 2;

  base = this.add.image(centerX, centerY, 'character');
  hat = this.add.image(centerX, centerY, hatKeys[hatIndex]);
  eyes = this.add.image(centerX, centerY, eyeKeys[eyeIndex]);
  hook = this.add.image(centerX, centerY, hookKeys[hookIndex]);
  shoes = this.add.image(centerX, centerY, shoeKeys[shoeIndex]);

  createArrowControls(this, hatKeys, hat, 'hat', 300);
  createArrowControls(this, eyeKeys, eyes, 'eye', 500);
  createArrowControls(this, hookKeys, hook, 'hook', 700);
  createArrowControls(this, shoeKeys, shoes, 'shoe', 900);
}

function createArrowControls(scene, keysArray, spriteRef, category, yPosition) {
  const left = scene.add.image(100, yPosition, 'arrowleft').setInteractive();
  const right = scene.add.image(1350, yPosition, 'arrowright').setInteractive();

  left.setScale(0.5);
  right.setScale(0.5);

  left.on('pointerdown', () => changeItem(category, -1));
  right.on('pointerdown', () => changeItem(category, 1));
}

function changeItem(category, direction) {
  switch (category) {
    case 'hat':
      hatIndex = (hatIndex + direction + hatKeys.length) % hatKeys.length;
      hat.setTexture(hatKeys[hatIndex]);
      break;
    case 'eye':
      eyeIndex = (eyeIndex + direction + eyeKeys.length) % eyeKeys.length;
      eyes.setTexture(eyeKeys[eyeIndex]);
      break;
    case 'hook':
      hookIndex = (hookIndex + direction + hookKeys.length) % hookKeys.length;
      hook.setTexture(hookKeys[hookIndex]);
      break;
    case 'shoe':
      shoeIndex = (shoeIndex + direction + shoeKeys.length) % shoeKeys.length;
      shoes.setTexture(shoeKeys[shoeIndex]);
      break;
  }
}
