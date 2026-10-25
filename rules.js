/* Ordered prototype rules. No affordability calculation or external verification. */
function decide(a) {
  const missing = a[0] !== 'Yes' || a[1] !== 'Yes';
  const essentials = a[2] !== 'No';
  const urgent = a[4] === 'Yes';
  const borrow = a[3] === 'Yes';
  const reasons = [];
  if (a[0] !== 'Yes') reasons.push('You have not confirmed the full cost, including fees and recurring charges.');
  if (a[1] !== 'Yes') reasons.push('You have not confirmed the seller’s claims and terms beyond the advertisement.');
  if (essentials) reasons.push(a[2] === 'Yes' ? 'You said this could leave you short on essentials.' : 'You are unsure whether essentials would still be covered.');
  if (borrow) reasons.push('Borrowing or carrying a balance needs a review of interest, fees, payment dates, and repayment capacity.');
  if (urgent) reasons.push('Waiting could affect work, school, health, or safety, so a practical way to meet the need matters.');
  if (a[5] === 'Yes') reasons.push('You already have something that adequately meets this need.');
  if (a[6] === 'Yes') reasons.push('A sale or limited availability is a main reason you are considering it.');
  if (a[7] === 'Yes') reasons.push('Feeling better is part of your motivation. That alone does not make a purchase bad.');
  reasons.push(`You rated desire ${a[8]}/10 and pressure ${a[9]}/10. Desire never overrides essentials or missing information.`);
  let title, next;
  if (essentials) {
    title = 'Plan or find alternatives';
    next = urgent ? 'Contact a relevant school, workplace, health, or community support service today to ask about a loaner, assistance, or a lower-cost way to meet this need while protecting essentials.' : 'Write down what you must reserve for essentials before comparing a lower-cost, borrowed, or delayed option.';
  } else if (missing) {
    title = 'Check first';
    next = a[0] !== 'Yes' ? 'Get the total payable cost in writing, including fees and recurring charges, before committing.' : 'Check one independent source for the seller’s claims and read the return, cancellation, and offer terms.';
    if (urgent) next += ' If the need cannot wait, ask a relevant support service about a temporary loaner or assistance while you check.';
  } else if (borrow) {
    title = 'Plan or find alternatives';
    next = 'Write a repayment plan with interest, fees, payment dates, and money left for essentials; compare it with one lower-cost option.';
    if (urgent) next += ' For the immediate need, ask about assistance or a temporary loaner.';
  } else if (urgent && a[5] === 'Yes') {
    title = 'Plan or find alternatives';
    next = 'Check whether the item you already own can meet the urgent need today; if it cannot, compare a repair, loaner, or replacement.';
  } else if (!urgent && (a[5] === 'Yes' || a[6] === 'Yes' || Number(a[9]) >= 7 || Number(a[8]) <= 3)) {
    title = 'Pause';
    next = 'Choose a time tomorrow to revisit this purchase without the advertisement in front of you.';
  } else {
    title = 'Consider buying';
    next = 'Before paying, check that the final checkout total matches the cost you reviewed and that essentials remain covered.';
  }
  return {title, next, reasons};
}
if (typeof module !== 'undefined') module.exports = {decide};
