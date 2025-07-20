document.addEventListener("DOMContentLoaded", () => {
  // at the top of your script, alongside your other queries:
  const slider        = document.getElementById("slider");
  const tooltip       = document.getElementById("tooltip");
  const leftPan       = document.querySelector(".pan.left");
  const rightPan      = document.querySelector(".pan.right");
  const notEqualSign  = document.querySelector(".not-equal-sign");
  const messageEl     = document.getElementById("message");

  const leftHand  = document.querySelector('.hand.left');
const rightHand = document.querySelector('.hand.right');

 const leftLabel  = document.querySelector('.left-label');
const rightLabel = document.querySelector('.right-label');

  const C = 5;    // the “+5” in x+5
  const T = 9;    // the fixed target

  function updateScale() {
    const x     = +slider.value;
    const total = x + C;


    // 1) Tooltip
    tooltip.textContent = x;
    const pct    = x / (+slider.max);
    const trackW = slider.offsetWidth;
    const thumb = 20; // match your CSS thumb width
    const posX  = pct * (trackW - thumb) + thumb/2;
    tooltip.style.left = posX + "px";

    // 2) Pan labels
    leftPan .textContent = total;
    rightPan.textContent = T;

    // 3) Move pans up/down instead of rotating beam
    //    Heavier pan -> translateY(+10px) down
    //    Lighter pan -> translateY(-10px) up
    const delta = total - T;  
    // pick a max tilt angle (e.g. 8°)
const MAX_ANGLE = 12;

// normalized tilt factor between -1 and 1:
const factor = delta / T;             
// clamp so you never exceed MAX_ANGLE
const angle  = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, factor * MAX_ANGLE));

// now rotate the triangle
const beam = document.querySelector('.triangle');
beam.style.transform = `rotate(${-angle}deg)`;

    const maxShift = 15;  // px
    // clamp shift
    const shift = Math.max(-maxShift, Math.min(maxShift, delta * 3));

    // Move the pans up/down based on the shift:
    leftPan .style.transform = `translateY(${ shift}px)`;
    rightPan.style.transform = `translateY(${ -shift}px)`;

// Move the support‑arms (hands) up/down in sync with the pans:
leftHand .style.transform = `translateY(${ shift}px)`;
rightHand.style.transform = `translateY(${-shift}px)`;

    leftLabel .style.transform = `translateY(${ shift }px)`;
    rightLabel.style.transform = `translateY(${-shift}px)`;

    // 4) Sign & message
    if (total === T) {
      notEqualSign.textContent = "=";
      notEqualSign.style.color = "green";
      messageEl.innerHTML = `The scale is <span style="color:green">balanced</span>. Value of x is ${x}.`;
      document.body.style.backgroundColor = "#e6ffe6";
    } else {
      notEqualSign.textContent = "≠";
      notEqualSign.style.color = "red";
      messageEl.innerHTML = `The scale is <span style="color:red">not balanced</span>.`;
      document.body.style.backgroundColor = "";
    }
  }

slider.addEventListener("input", updateScale);
  updateScale();
  slider.addEventListener("input", updateScale);
 

});