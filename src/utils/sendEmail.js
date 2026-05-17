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
  return `
SOI STUDENT REGISTRATION — SCHOOL OF INTERNSHIPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERSONAL DETAILS
Name         : ${form.fullName || '—'}
DOB          : ${form.dob || '—'}
Gender       : ${form.gender || '—'}
Mobile       : ${form.mobile || '—'}
WhatsApp     : ${form.whatsapp || form.mobile || '—'}
Email        : ${form.email || '—'}

ACADEMIC DETAILS
College      : ${form.college || '—'}
Department   : ${form.department || '—'}
Semester     : ${form.semester || '—'}
Roll Number  : ${form.rollNumber || '—'}
Skills       : ${form.skills || '—'}

INTERNSHIP PREFERENCES
Track        : ${form.track || '—'}
Duration     : ${form.duration || '—'}
Timing       : ${form.timing || '—'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from INERA SOI Website — ${new Date().toLocaleString('en-IN')}
  `.trim();
}

export function buildSOICollegeBody(form) {
  return `
SOI INSTITUTIONAL REGISTRATION — SCHOOL OF INTERNSHIPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INSTITUTION INFO
College Name     : ${form.collegeName || '—'}
Type             : ${form.institutionType || '—'}
University       : ${form.university || '—'}
AICTE No.        : ${form.aicte || '—'}
NAAC Grade       : ${form.naac || '—'}
Website          : ${form.website || '—'}
Address          : ${form.address || '—'}, ${form.city || '—'}, ${form.state || '—'} - ${form.pin || '—'}
Official Email   : ${form.officialEmail || '—'}
Landline         : ${form.landline || '—'}

PRINCIPAL DETAILS
Name             : ${form.principalName || '—'}
Designation      : ${form.principalDesignation || '—'}
Mobile           : ${form.principalMobile || '—'}
Email            : ${form.principalEmail || '—'}

PLACEMENT OFFICER
Name             : ${form.placementName || '—'}
Designation      : ${form.placementDesignation || '—'}
WhatsApp         : ${form.placementWhatsapp || '—'}
Email            : ${form.placementEmail || '—'}

INTERNSHIP REQUIREMENTS
No. of Students  : ${form.numStudents || '—'}
Departments      : ${form.departments || '—'}
Duration         : ${form.duration || '—'}
Start Date       : ${form.startDate || '—'}
Requirements     : ${form.requirements || '—'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from INERA SOI Website — ${new Date().toLocaleString('en-IN')}
  `.trim();
}
