/**
 * Sends form data to a company email using mailto: protocol.
 * This opens the user's default email client pre-filled with the message.
 * For production you'd replace this with an API/EmailJS call.
 */

export const COMPANY_EMAIL = 'inerasoftware@gmail.com';
export const SOI_EMAIL = 'ineraschoolofinternships@gmail.com';

export function sendToEmail(to, subject, body) {
  const encoded = encodeURIComponent(body);
  const encodedSubject = encodeURIComponent(subject);
  window.open(`mailto:${to}?subject=${encodedSubject}&body=${encoded}`, '_blank');
}

export function buildContactBody(form) {
  return `
INERA SOFTWARE — New Inquiry
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name        : ${form.name || '—'}
Company     : ${form.company || '—'}
Email       : ${form.email || '—'}
Phone       : ${form.phone || '—'}
Service     : ${form.service || '—'}

Message:
${form.message || '—'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from INERA Website — ${new Date().toLocaleString('en-IN')}
  `.trim();
}

export function buildConsultationBody(form) {
  return `
BOOK CONSULTATION REQUEST — INERA SOFTWARE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name        : ${form.name || '—'}
Company     : ${form.company || '—'}
Email       : ${form.email || '—'}
Phone       : ${form.phone || '—'}
Service     : ${form.service || '—'}
Preferred Time: ${form.preferredTime || '—'}

Message:
${form.message || '—'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from INERA Website — ${new Date().toLocaleString('en-IN')}
  `.trim();
}

export function buildCareerBody(form, jobTitle) {
  return `
JOB APPLICATION — INERA SOFTWARE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Position Applied : ${jobTitle || 'Unsolicited Application'}
Name             : ${form.name || '—'}
Email            : ${form.email || '—'}
Phone            : ${form.phone || '—'}

Cover Message:
${form.message || '—'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from INERA Website — ${new Date().toLocaleString('en-IN')}
  `.trim();
}

export function buildSOIStudentBody(form) {
  const isStudent = form.userType === 'college_student';
  const userTypeLabel = isStudent ? 'College Student' : 'Working Professional';
  const durationLabel = form.duration || '—';
  const amount = form.duration === '4 Months' ? 4500 : form.duration === '3 Months' ? 3500 : 0;
  return `
SOI STUDENT REGISTRATION — SCHOOL OF INTELLIGENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

USER TYPE: ${userTypeLabel}

PERSONAL DETAILS
Name         : ${form.fullName || '—'}
DOB          : ${form.dob || '—'}
Gender       : ${form.gender || '—'}
Mobile       : ${form.mobile || '—'}
WhatsApp     : ${form.whatsapp || form.mobile || '—'}
Email        : ${form.email || '—'}

${isStudent ? `ACADEMIC DETAILS
College      : ${form.college || '—'}
Department   : ${form.department || '—'}
Semester     : ${form.semester || '—'}
Roll Number  : ${form.rollNumber || '—'}` : `PROFESSIONAL DETAILS
Job Role     : ${form.jobRole || '—'}
Experience   : ${form.yearsOfExperience || '—'}`}

INTERNSHIP DETAILS
Duration     : ${durationLabel}
Fee Amount   : ₹${amount}

PAYMENT INFO
Payment ID   : ${form.paymentId || '—'}
Receipt URL  : ${form.receiptUrl || '—'}
Order ID     : ${form.orderId || '—'}

AGREEMENTS ACCEPTED
Terms & Conditions     : ${form.termsAccepted ? '✓ Yes' : '✗ No'}
NDA                    : ${form.ndaAccepted ? '✓ Yes' : '✗ No'}
Privacy Policy         : ${form.privacyAccepted ? '✓ Yes' : '✗ No'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from INERA SOI Website — ${new Date().toLocaleString('en-IN')}
  `.trim();
}

export function buildSOICollegeBody(form) {
  const institutionType = form.institutionType === 'Other' ? form.otherType : form.institutionType;
  const feePerStudent = form.duration === '4 Months' ? 3500 : form.duration === '3 Months' ? 2500 : 0;
  const totalAmount = (parseInt(form.numStudents) || 0) * feePerStudent;
  return `
SOI INSTITUTIONAL REGISTRATION — SCHOOL OF INTELLIGENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INSTITUTION INFO
College Name     : ${form.collegeName || '—'}
Type             : ${institutionType || '—'}
University       : ${form.university || '—'}
AICTE No.        : ${form.aicte || '—'}
Website          : ${form.website || '—'}
Address          : ${form.address || '—'}, ${form.city || '—'}, ${form.state || '—'} - ${form.pin || '—'}
Official Email   : ${form.officialEmail || '—'}
Landline         : ${form.landline || '—'}

PERSON FILLING THE FORM
Name             : ${form.personName || '—'}
Designation      : ${form.personDesignation || '—'}
Mobile           : ${form.personMobile || '—'}
Email            : ${form.personEmail || '—'}

INTERNSHIP REQUIREMENTS
No. of Students  : ${form.numStudents || '—'}
Departments      : ${form.departments || '—'}
Duration         : ${form.duration || '—'}
Fee per Student  : ₹${feePerStudent}
Total Fee        : ₹${totalAmount}
Requirements     : ${form.requirements || '—'}

PAYMENT INFO
Payment ID       : ${form.paymentId || '—'}
Receipt URL      : ${form.receiptUrl || '—'}
Order ID         : ${form.orderId || '—'}

AUTHORIZED        : ${form.authorized ? '✓ Yes' : '✗ No'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from INERA SOI Website — ${new Date().toLocaleString('en-IN')}
  `.trim();
}
