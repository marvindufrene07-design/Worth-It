const questions = [
 ['Do you know the full cost, including fees and recurring charges?', ['Yes','No','Not sure']],
 ['Have you checked the seller’s claims and offer terms beyond the advertisement?', ['Yes','No','Not sure']],
 ['Would buying this leave you short on essentials?', ['Yes','No','Not sure']],
 ['Would you need to borrow money or carry a credit-card balance?', ['Yes','No']],
 ['Would waiting cause a real problem with work, school, health, or safety?', ['Yes','No']],
 ['Do you already have something that adequately meets this need?', ['Yes','No']],
 ['Are you mainly considering it because of a sale or limited availability?', ['Yes','No']],
 ['Are you mainly buying it to feel better emotionally?', ['Yes','No']],
 ['How much do you want it?', null],
 ['How pressured do you feel to decide right now?', null]
];
let answers = Array(10).fill(null), step = 0;
const main = document.getElementById('main');
function display(html) { main.innerHTML = `<section class="card">${html}</section>`; main.focus(); }
function welcome() {
 display(`<div class="art" aria-hidden="true">
  <svg width="56" height="64" viewBox="0 0 32 36"
       fill="none" stroke="#113c65" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <!-- Three light rays -->
    <path d="M16 1v3 M3 5l3 3 M29 5l-3 3"/>

    <!-- Lightbulb and bottom dot -->
    <g transform="translate(4 9)">
      <path d="M9 18h6M9 21h6M9 15c0-2-4-3-4-7a7 7 0 0 1 14 0c0 4-4 5-4 7Z"/>
      <!--<circle cx="12" cy="24" r="1"
              fill="#2563eb" stroke="none"/>-->
    </g>
  </svg>
</div>
<span class="eyebrow">A thoughtful purchase starts here</span>
<h1>Wondering if it’s worth it?</h1>
<p class="intro">A few quick questions can help you understand the costs, urgency, and emotions behind a purchase—and find a next step that feels right for you.</p>
<div class="chips">
<span class="chip">10 quick questions</span>
<span class="chip">No judgment</span><span class="chip">Your pace</span></div>
<button class="primary" id="start">Let’s think it through →</button>
<p class="small">Your answers stay here during this session. Reloading clears them.</p>`);
 document.getElementById('start').onclick = () => {step=0; question();};
}
function question() {
 const [text, options] = questions[step];
 if (!options && answers[step] === null) answers[step] = 5;
 display(`<div class="progress-label"><span>YOUR PURCHASE CHECK-IN</span><span>Question ${step+1} of 10</span></div><fieldset><legend>${text}</legend>${options ? options.map((o,i)=>`<label class="option"><input type="radio" name="answer" value="${o}" ${answers[step]===o?'checked':''}>${o}</label>`).join('') : `<output for="scale" id="value">${answers[step]}</output><input id="scale" aria-label="${text}" type="range" min="1" max="10" step="1" value="${answers[step]}"><div class="range-labels"><span>1 · ${step===8?'Very little':'No pressure'}</span><span>10 · ${step===8?'Very much':'Extreme pressure'}</span></div>
<p class="small"></p>`}</fieldset>
<progress value="${step+1}" max="10" aria-label="Question ${step+1} of 10"></progress>
<div class="actions">
    <button id="back">← Back</button>
    <button id="next" class="primary" ${answers[step]===null?'disabled':''}>${step===9?'Continue':'Next'} →</button></div>`);
 main.querySelectorAll('input[type=radio]').forEach(el => el.onchange = () => {answers[step]=el.value; document.getElementById('next').disabled=false;});
 const scale=document.getElementById('scale');
 if(scale) scale.oninput=()=>{answers[step]=Number(scale.value);document.getElementById('value').value=scale.value;};
 document.getElementById('back').onclick=()=>{if(step===0) welcome();else{step--;question();}};
 document.getElementById('next').onclick=()=>{if(answers[step]===null)return;if(step===9)pause();else{step++;question();}};
}
function pause() {
 display(`<span class="eyebrow">An optional moment</span>
<div class="orb" aria-hidden="true"></div>
<h1>Take a moment.</h1>
<p class="intro">What would actually happen if you waited?</p>
<p>There’s no timer and no right answer. Take as much or as little time as you need.</p>
<div class="actions"><button id="back">← Back</button>
<button class="primary" id="result">See my next step →</button></div>
<button id="skip" style="margin-top:15px;width:100%">Skip</button>`);
 document.getElementById('back').onclick=question;
 document.getElementById('result').onclick=results;
 document.getElementById('skip').onclick=results;
}
function results() {
 const r=decide(answers);
 display(`<span class="eyebrow">A little more clarity</span>
<h1>${r.title}</h1>
<p>This is a starting point for your decision. You’re in charge of what happens next.</p>
<div class="note"><strong>One next step</strong>
<p>${r.next}</p></div>
<h2>What shaped this guidance</h2>
<ul class="reasons">${r.reasons.map(x=>`<li>${x}</li>`).join('')}</ul>
<p class="small">Prototype guidance, not a validated financial assessment. Results rely on your self-reported answers; we do not independently verify affordability or seller claims.</p><div class="actions">
<button id="revise" class="primary">Revise answers</button>
<button id="reset">Start over</button></div>`);
 document.getElementById('revise').onclick=()=>{step=0;question();};
 document.getElementById('reset').onclick=()=>{answers=Array(10).fill(null);step=0;welcome();};
}

welcome();
