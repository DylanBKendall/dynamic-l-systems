// Left click to cycle to the next fractal, right click to cycle to the previous
// Use the slider to modify the stage
// Use ',' to decrease the fractal angle, use '.' to increase it
// Be sure to rotate all of these. You won't regret it!

let t;
const DEFAULT_ANGLES = [45, 0, 90, 120, 90, 25, 90, 90];
let angle = [...DEFAULT_ANGLES];
let functions = [];
let maxStage = [10, 6, 5, 7, 15, 6, 7, 7];
let currFunction = -1;
let currLSystem;
let stage;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.elt.oncontextmenu = () => false;
  background(0);
  stroke(255);
  fill(255);
  textSize(32);
  functions.push(
    example2,
    example3,
    example4,
    example5,
    example6,
    example7,
    hilbert,
    myFractal
  );

  t = new Turtle();
  stage = createSlider(0, 0, 0, 1);

  stage.input(() => {
    if (currFunction != -1) {
      functions[currFunction](stage.value());
      if (currLSystem) currLSystem.printDetails();
    }
  });

  text("Left click for next fractal", 20, 50);
  text("Right click for previous fractal", 20, 100);
  text("Move slider to change stage", 20, 150);
  text("Hold ',' to decrease angle", 20, 200);
  text("Hold '.' to increase angle", 20, 250);
}

function draw() {
  if (keyIsDown(188)) angle[currFunction] -= 0.3;
  else if (keyIsDown(190)) angle[currFunction] += 0.3;

  if (frameCount % 3 === 0 && currFunction != -1) {
    background(0);
    functions[currFunction](stage.value());
    strokeWeight(1);
    text("Stage: " + stage.value(), 20, 50);
    text("Angle: " + angle[currFunction].toFixed(1), 20, 100);
    text(currFunction + 1, 760, 50);
  }
}

function mousePressed() {
  if (!isMouseInsideCanvas()) return;
  if (mouseButton === RIGHT && currFunction != -1) {
    currFunction = (currFunction - 1 + functions.length) % functions.length;
  } else if (mouseButton === LEFT) {
    currFunction = (currFunction + 1) % functions.length;
  }
  if (currFunction != -1) {
    stage.attribute("max", maxStage[currFunction]);
    stage.value(0);
    angle[currFunction] = DEFAULT_ANGLES[currFunction];
    functions[currFunction](stage.value());
    currLSystem.printDetails();
  }
}

function isMouseInsideCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

function example2(stage) {
  resetMatrix();
  strokeWeight(0.4);

  let binaryTree = new LSystem("0", angle[currFunction]);
  currLSystem = binaryTree;

  binaryTree.addRule("1", "11");
  binaryTree.addRule("0", "1[0]0");

  binaryTree.distance = 600 / 2 ** stage;
  binaryTree.addForwardChar("1", binaryTree.distance);
  binaryTree.addForwardChar("0", binaryTree.distance / 2);

  binaryTree.pushChar.push("[");
  binaryTree.popChar.push("]");

  binaryTree.leftChar.push("[");
  binaryTree.rightChar.push("]");

  for (let i = 0; i < stage; i++) binaryTree.applyRules();
  fitAndDraw(binaryTree);
}

function example3(stage) {
  resetMatrix();
  strokeWeight(2);

  let cantorsDust = new LSystem("A", angle[currFunction]);
  currLSystem = cantorsDust;

  cantorsDust.addRule("A", "ABA");
  cantorsDust.addRule("B", "BBB");

  cantorsDust.distance = (width * 3) / 3 ** stage;
  cantorsDust.addForwardChar("A", cantorsDust.distance);
  cantorsDust.addForwardChar("B", cantorsDust.distance);
  cantorsDust.liftChar.push("B");

  for (let i = 0; i < stage; i++) cantorsDust.applyRules();
  fitAndDraw(cantorsDust, 90);
}

function example4(stage) {
  resetMatrix();
  strokeWeight(0.4);

  // If you modify the angle to 120, you get a really interesting version of Sierpinski's Triangle
  let kochsCurve = new LSystem("F", angle[currFunction]);
  currLSystem = kochsCurve;

  kochsCurve.addRule("F", "F+F-F-F+F");

  kochsCurve.distance = 200 / 3 ** stage;
  kochsCurve.addForwardChar("F", kochsCurve.distance);
  kochsCurve.leftChar.push("+");
  kochsCurve.rightChar.push("-");

  for (let i = 0; i < stage; i++) kochsCurve.applyRules();
  fitAndDraw(kochsCurve, 90);
}

function example5(stage) {
  resetMatrix();
  strokeWeight(1);

  let sierpinskisTriangle = new LSystem("F-G-G", angle[currFunction]);
  currLSystem = sierpinskisTriangle;

  sierpinskisTriangle.addRule("F", "F-G+F+G-F");
  sierpinskisTriangle.addRule("G", "GG");

  sierpinskisTriangle.distance = 650 / 2 ** stage;

  sierpinskisTriangle.addForwardChar("F", sierpinskisTriangle.distance);
  sierpinskisTriangle.addForwardChar("G", sierpinskisTriangle.distance);
  sierpinskisTriangle.leftChar.push("+");
  sierpinskisTriangle.rightChar.push("-");

  for (let i = 0; i < stage; i++) sierpinskisTriangle.applyRules();
  fitAndDraw(sierpinskisTriangle, -90);
}

function example6(stage) {
  resetMatrix();
  strokeWeight(1);

  let dragon = new LSystem("F", angle[currFunction]);
  currLSystem = dragon;

  dragon.addRule("F", "F+G");
  dragon.addRule("G", "F-G");

  dragon.distance = 500 / pow(sqrt(2), stage);

  dragon.addForwardChar("F", dragon.distance);
  dragon.addForwardChar("G", dragon.distance);
  dragon.leftChar.push("-");
  dragon.rightChar.push("+");

  for (let i = 0; i < stage; i++) dragon.applyRules();
  fitAndDraw(dragon, 90 - 45 * (stage % 8));
}

function example7(stage) {
  resetMatrix();
  strokeWeight(0.2);

  let plant = new LSystem("-X", angle[currFunction]);
  currLSystem = plant;

  plant.addRule("X", "F+[[X]-X]-F[-FX]+X");
  plant.addRule("F", "FF");

  plant.distance = 250 / 2 ** stage;
  plant.addForwardChar("X", plant.distance);
  plant.addForwardChar("F", plant.distance);

  plant.leftChar.push("+");
  plant.rightChar.push("-");

  plant.pushChar.push("[");
  plant.popChar.push("]");

  for (let i = 0; i < stage; i++) plant.applyRules();
  fitAndDraw(plant);
}

function hilbert(stage) {
  resetMatrix();
  strokeWeight(1);

  let hilbertsCurve = new LSystem("A", angle[currFunction]);
  currLSystem = hilbertsCurve;

  hilbertsCurve.addRule("A", "+BF-AFA-FB+");
  hilbertsCurve.addRule("B", "-AF+BFB+FA-");

  hilbertsCurve.distance = 580 / (2 ** stage - 1);
  hilbertsCurve.addForwardChar("F", hilbertsCurve.distance);
  hilbertsCurve.leftChar.push("+");
  hilbertsCurve.rightChar.push("-");

  for (let i = 0; i < stage; i++) hilbertsCurve.applyRules();
  fitAndDraw(hilbertsCurve, -90);
}

// Make sure to rotate this one in both directions, it's really cool!!
function myFractal(stage) {
  resetMatrix();
  strokeWeight(0.4);

  let myFractal = new LSystem("F", angle[currFunction]);
  currLSystem = myFractal;

  // I created this myself
  myFractal.addRule("F", "F[+G][-G]");
  myFractal.addRule("G", "FG[+F][-F]F");
  //myFractal.addRule("G", "FGGF");
  //myFractal.addRule("G", "FG[F]F");

  myFractal.distance = 800 / 2 ** stage;
  myFractal.addForwardChar("F", myFractal.distance);
  myFractal.addForwardChar("G", myFractal.distance / 4);
  myFractal.leftChar.push("+");
  myFractal.rightChar.push("-");
  myFractal.pushChar.push("[");
  myFractal.popChar.push("]");

  for (let i = 0; i < stage; i++) myFractal.applyRules();
  fitAndDraw(myFractal);
}

class LSystem {
  constructor(axiom, angle) {
    this.axiom = axiom;
    this.originalAxiom = axiom;
    this.angle = angle;
    this.rules = {};
    this.forwardChar = {};
    this.liftChar = [];
    this.leftChar = [];
    this.rightChar = [];
    this.pushChar = [];
    this.popChar = [];
  }

  addRule(character, replacement) {
    this.rules[character] = replacement;
  }

  addForwardChar(character, distance) {
    this.forwardChar[character] = distance;
  }

  applyRules() {
    let result = "";
    for (let character of this.axiom) {
      if (Object.hasOwn(this.rules, character)) {
        result += this.rules[character];
      } else {
        result += character;
      }
    }
    this.axiom = result;
  }

  printDetails() {
    print("Axiom: " + this.originalAxiom);
    print("Angle: " + this.angle);

    for (const character in this.forwardChar) print("Forward: " + character);
    for (const character of this.leftChar) print("Left: " + character);
    for (const character of this.rightChar) print("Right: " + character);
    for (const character of this.pushChar) print("Push: " + character);
    for (const character of this.popChar) print("Pop: " + character);
    for (const character in this.rules)
      print(character + " --> " + this.rules[character]);

    if (this.axiom.length < 10000) print("Current string:\n" + this.axiom);
    else print("Current string length: " + this.axiom.length);
  }
}

// our turtle is always at (0, 0), and facing
// the -y axis.
class Turtle {
  constructor() {
    this.penDown = true;
  }

  pu() {
    this.penDown = false;
  }

  pd() {
    this.penDown = true;
  }

  fd(d) {
    if (this.penDown) {
      line(0, 0, 0, -d);
    }
    translate(0, -d);
  }

  bk(d) {
    this.fd(-d);
  }

  rt(a) {
    rotate(radians(a));
  }

  lt(a) {
    this.rt(-a);
  }

  process(lSystem) {
    for (let character of lSystem.axiom) {
      if (Object.hasOwn(lSystem.forwardChar, character)) {
        if (lSystem.liftChar.includes(character)) t.pu();
        this.fd(lSystem.forwardChar[character]);
        t.pd();
      }

      if (lSystem.pushChar.includes(character)) push();
      if (lSystem.popChar.includes(character)) pop();

      if (lSystem.leftChar.includes(character)) this.lt(lSystem.angle);
      if (lSystem.rightChar.includes(character)) this.rt(lSystem.angle);
    }
  }
}

function boundsFor(lSystem) {
  let x = 0,
    y = 0,
    heading = -90;
  let stack = [];

  let minX = 0,
    maxX = 0,
    minY = 0,
    maxY = 0;

  for (const character of lSystem.axiom) {
    if (lSystem.forwardChar[character] !== undefined) {
      const d = lSystem.forwardChar[character];
      x += cos(radians(heading)) * d;
      y += sin(radians(heading)) * d;
      minX = min(minX, x);
      maxX = max(maxX, x);
      minY = min(minY, y);
      maxY = max(maxY, y);
    }
    if (lSystem.pushChar.includes(character)) stack.push([x, y, heading]);
    if (lSystem.popChar.includes(character)) [x, y, heading] = stack.pop();
    if (lSystem.leftChar.includes(character)) heading -= lSystem.angle;
    if (lSystem.rightChar.includes(character)) heading += lSystem.angle;
  }
  return { minX, maxX, minY, maxY };
}

function fitAndDraw(lSystem, orientDeg = 0, margin = 0.05) {
  const b = boundsFor(lSystem);
  const w = b.maxX - b.minX,
    h = b.maxY - b.minY;
  const s = (1 - margin * 2) * min(width / w, height / h);

  push();
  translate(width / 2, height / 2);
  rotate(radians(orientDeg));
  scale(s);
  translate(-(b.minX + w / 2), -(b.minY + h / 2));
  t.process(lSystem);
  pop();
}
