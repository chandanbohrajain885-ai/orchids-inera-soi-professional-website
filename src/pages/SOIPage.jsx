import { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { sendToEmail, buildSOIStudentBody, buildSOICollegeBody, SOI_EMAIL } from '../utils/sendEmail';
import {
  GraduationCap, Target, Zap, Brain, Users2, Award, CheckCircle2,
  ArrowRight, Building2, User, Upload,
  Rocket, Lightbulb, Star, Download, ExternalLink, Shield, FileText, Lock, CreditCard, IndianRupee
} from 'lucide-react';

const whySOI = [
  { icon: Rocket, title: 'Execution-Focused Learning', desc: 'Students learn through practical implementation, not just theory.', color: 'blue' },
  { icon: Brain, title: 'AI-First Environment', desc: 'Exposure to AI systems, automation tools, and intelligent workflows.', color: 'purple' },
  { icon: Building2, title: 'Professional Exposure', desc: 'Understand real execution systems, modern workflows, and digital collaboration.', color: 'cyan' },
  { icon: Lightbulb, title: 'Innovation Ecosystem', desc: 'Encourages creativity, experimentation, and problem-solving.', color: 'green' },
  { icon: Users2, title: 'Practical Activities', desc: 'Students participate in real workflow systems and execution tasks.', color: 'orange' },
  { icon: Star, title: 'Future-Ready Environment', desc: 'Built around modern industry ecosystems and AI-first tools.', color: 'pink' },
];

const colorMap = {
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
  green: 'bg-green-500/15 text-green-400 border-green-500/20',
  orange: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  pink: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
};

const programSteps = [
  { step: 1, title: 'Orientation', desc: 'Understanding AI-first environments, workflow systems, and execution ecosystems.' },
  { step: 2, title: 'Technology Exposure', desc: 'Students explore AI tools, automation systems, digital platforms, and workflow technologies.' },
  { step: 3, title: 'Practical Activities', desc: 'Students participate in projects, execution tasks, and collaborative workflows.' },
  { step: 4, title: 'Real Implementation', desc: 'Students work on automation activities, AI-based workflows, and execution systems.' },
  { step: 5, title: 'Certification & Growth', desc: 'Students receive internship certificate, professional exposure, and recommendation opportunities.' },
];

const studentBenefits = [
  'Practical exposure to real technology systems',
  'AI understanding and automation skills',
  'Execution-focused learning approach',
  'Teamwork and collaboration experience',
  'Digital confidence and industry readiness',
  'Professional networking opportunities',
  'Internship certification on completion',
  'Recommendation letter opportunities',
];

const institutionBenefits = [
  'Structured internship ecosystem for students',
  'AI & technology awareness programs',
  'Practical exposure beyond classroom',
  'Professional industry interaction',
  'Measurable student development',
  'Industry-academia collaboration framework',
];

// ── Agreement Texts ──────────────────────────────────────────────────────────

const TERMS_TEXT = `INERA SOFTWARE PRIVATE LIMITED — SCHOOL OF INTERNSHIPS (SOI)

TERMS AND CONDITIONS FOR INTERNSHIP PROGRAM

1. PROGRAM OVERVIEW
The School of Internships (SOI) is an initiative of INERA SOFTWARE PRIVATE LIMITED designed to provide practical, execution-focused learning experiences to students and working professionals.

2. ELIGIBILITY
Applicants must be at least 18 years of age and currently enrolled in a recognized educational institution (for student track) or employed (for working professional track).

3. FEES AND PAYMENT
The internship program fee is non-refundable once paid. Payment must be made in full before the commencement of the program. All payments are processed through Razorpay, a secure payment gateway.

4. PROGRAM DURATION
The internship duration shall be as selected by the applicant during registration — either 3 months or 4 months. The duration begins from the official start date communicated by the SOI team.

5. ATTENDANCE AND PARTICIPATION
Interns are expected to maintain a minimum of 75% attendance and active participation in all assigned tasks, projects, and sessions throughout the program duration.

6. CODE OF CONDUCT
All interns must maintain professional conduct, respect intellectual property, and adhere to the guidelines provided by the SOI team. Any violation may result in immediate termination from the program without refund.

7. CERTIFICATION
Internship certificates will be awarded upon successful completion of the program, subject to meeting attendance requirements and satisfactory performance in assigned tasks.

8. INTELLECTUAL PROPERTY
Any work, code, designs, or materials created during the internship shall remain the intellectual property of INERA SOFTWARE PRIVATE LIMITED, unless otherwise agreed in writing.

9. LIMITATION OF LIABILITY
INERA SOFTWARE PRIVATE LIMITED shall not be liable for any indirect, incidental, or consequential damages arising from participation in the internship program.

10. MODIFICATION
INERA SOFTWARE PRIVATE LIMITED reserves the right to modify these terms and conditions at any time. Participants will be notified of any material changes.`;

const NDA_TEXT = `INERA SOFTWARE PRIVATE LIMITED — SCHOOL OF INTERNSHIPS (SOI)

NON-DISCLOSURE AND CONFIDENTIALITY AGREEMENT

This Non-Disclosure and Confidentiality Agreement ("Agreement") is entered into between the participant ("Intern") and INERA SOFTWARE PRIVATE LIMITED ("Company").

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" shall include all information or materials disclosed by the Company to the Intern, whether orally, in writing, or in any other form, including but not limited to: business strategies, technical data, software code, algorithms, project plans, client information, financial data, trade secrets, proprietary systems, workflows, automation processes, AI models, training data, and any other information that reasonably should be understood to be confidential.

2. OBLIGATIONS OF THE INTERN
The Intern agrees to:
a) Hold all Confidential Information in strict confidence
b) Not disclose, reveal, publish, or distribute any Confidential Information to any third party
c) Use Confidential Information solely for the purpose of performing internship duties
d) Not copy, reproduce, or reverse engineer any Confidential Information
e) Return or destroy all Confidential Information upon request or upon termination of the internship

3. EXCLUSIONS
Confidential Information does not include information that:
a) Is or becomes publicly available through no fault of the Intern
b) Was rightfully in the Intern's possession prior to disclosure
c) Is independently developed by the Intern without use of Confidential Information
d) Is required to be disclosed by law or court order

4. TERM
This Agreement shall remain in effect during the internship period and for a period of three (3) years after the termination of the internship.

5. BREACH
Any breach of this Agreement may result in immediate termination of the internship, legal action, and claims for damages.

6. JURISDICTION
This Agreement shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Belagavi, Karnataka.`;

const PRIVACY_TEXT = `INERA SOFTWARE PRIVATE LIMITED — PRIVACY POLICY

Last Updated: June 2025

1. INFORMATION WE COLLECT
We collect the following personal information when you register for the SOI program:
a) Personal identification information (name, date of birth, gender)
b) Contact information (email address, mobile number, WhatsApp number)
c) Educational or professional details (college name, department, semester, or job role and experience)
d) Government-issued identification documents (college ID, company ID)
e) Photographs and resumes
f) Payment information (processed securely through Razorpay — we do not store credit/debit card details)

2. HOW WE USE YOUR INFORMATION
We use the collected information for:
a) Processing your internship registration
b) Communicating with you regarding the program
c) Verifying your identity and eligibility
d) Issuing internship certificates
e) Improving our programs and services
f) Complying with legal and regulatory requirements

3. DATA STORAGE AND SECURITY
Your data is stored securely using industry-standard encryption and security measures. We use Supabase for database storage and Razorpay for secure payment processing.

4. DATA SHARING
We do not sell, trade, or rent your personal information to third parties. We may share information with:
a) Payment processors (Razorpay) for transaction processing
b) Legal authorities if required by law
c) Educational institutions for verification purposes

5. DATA RETENTION
We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, or as required by law.

6. YOUR RIGHTS
You have the right to:
a) Access your personal data
b) Request correction of inaccurate data
c) Request deletion of your data (subject to legal obligations)
d) Withdraw consent at any time

7. CONTACT US
For any privacy-related concerns, please contact us at:
Email: inerasoftware@gmail.com
Address: Belagavi, Karnataka, India`;

// ── Coupon Code ─────────────────────────────────────────────────────────────

const COUPON_CODE = 'Chandan100%';
const COUPON_AMOUNT = 1; // Fee becomes ₹1 when coupon applied

// ── Fee Constants ────────────────────────────────────────────────────────────

const STUDENT_FEES = {
  '3 Months': 3500,
  '4 Months': 4500,
};

const COLLEGE_FEE_PER_STUDENT = {
  '3 Months': 3500,
  '4 Months': 4500,
};

// ── Razorpay helper ──────────────────────────────────────────────────────────

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

async function createRazorpayOrder(amount, receipt) {
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency: 'INR', receipt }),
    });
    const text = await response.text();
    if (!text) throw new Error('Empty response from server');
    const data = JSON.parse(text);
    if (response.ok && data.ok && data.order) {
      return data.order;
    }
    const errMsg = data?.error || data?.details?.error?.description || `HTTP ${response.status}`;
    throw new Error(errMsg + ' (raw: ' + text.slice(0, 100) + ')');
  } catch (e) {
    console.error('Order creation failed:', e);
    throw e; // let caller handle the message
  }
}

function generateStudentReceipt(form, paymentInfo) {
  const isStudent = form.userType === 'college_student';
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const receiptNo = `SOI-${paymentInfo.paymentId?.slice(-8)?.toUpperCase() || Date.now().toString(36).toUpperCase()}`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>SOI Payment Receipt</title>
<style>
  body{font-family:'Segoe UI',Arial,sans-serif;margin:0;padding:20px;background:#f5f5f5}
  .receipt{max-width:700px;margin:0 auto;background:#fff;padding:40px;border-radius:12px;box-shadow:0 2px 20px rgba(0,0,0,.1)}
  .header{text-align:center;border-bottom:2px solid #1a1a2e;padding-bottom:20px;margin-bottom:20px}
  .header img{width:60px;height:60px;border-radius:12px;margin-bottom:10px}
  .header h1{font-size:22px;color:#1a1a2e;margin:5px 0}
  .header p{color:#666;font-size:13px;margin:2px 0}
  .receipt-no{font-size:14px;color:#d4a017;font-weight:bold;margin:5px 0}
  .coupon-row{color:#059669 !important;font-weight:600 !important}
  .section{margin-bottom:20px}
  .section h3{font-size:14px;color:#1a1a2e;border-bottom:1px solid #eee;padding-bottom:5px;margin-bottom:10px}
  .row{display:flex;justify-content:space-between;padding:4px 0;font-size:13px;color:#333}
  .row .label{color:#888}
  .total{background:#f0f4ff;padding:12px;border-radius:8px;display:flex;justify-content:space-between;font-weight:bold;font-size:16px}
  .footer{text-align:center;margin-top:20px;padding-top:15px;border-top:1px solid #eee;font-size:11px;color:#999}
  .paid{display:inline-block;background:#10b981;color:#fff;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold}
  @media print{body{background:#fff}.receipt{box-shadow:none;padding:20px}}
</style></head>
<body>
<div class="receipt">
  <div class="header">
    <img src="/inera-logo.jpg" alt="INERA">
    <h1>Payment Receipt</h1>
    <p>INERA SOFTWARE PRIVATE LIMITED</p>
    <p class="receipt-no">Receipt #: ${receiptNo}</p>
    <p>Date: ${date}</p>
    <p><span class="paid">✓ PAID</span></p>
  </div>
  <div class="section">
    <h3>Student Details</h3>
    <div class="row"><span class="label">Name</span><span>${form.fullName}</span></div>
    <div class="row"><span class="label">Email</span><span>${form.email}</span></div>
    <div class="row"><span class="label">Mobile</span><span>${form.mobile}</span></div>
    <div class="row"><span class="label">Type</span><span>${isStudent ? 'College Student' : 'Working Professional'}</span></div>
    ${isStudent ? `<div class="row"><span class="label">College</span><span>${form.college}</span></div>` : `<div class="row"><span class="label">Job Role</span><span>${form.jobRole}</span></div>`}
  </div>
  <div class="section">
    <h3>Program Details</h3>
    <div class="row"><span class="label">Program</span><span>SOI — School of Internships</span></div>
    <div class="row"><span class="label">Duration</span><span>${form.duration}</span></div>
  </div>
  <div class="section">
    <h3>Payment Information</h3>
    <div class="row"><span class="label">Payment ID</span><span>${paymentInfo.paymentId || '—'}</span></div>
    <div class="row"><span class="label">Order ID</span><span>${paymentInfo.orderId || '—'}</span></div>
    <div class="row"><span class="label">Payment Method</span><span>Razorpay (Online)</span></div>
    ${form.couponApplied ? `<div class="row coupon-row"><span class="label">Coupon Applied</span><span>${form.couponCode} — 100% OFF</span></div>` : ''}
  </div>
  <div class="total">
    <span>Total Amount Paid</span>
    <span>₹${paymentInfo.amount?.toLocaleString('en-IN')}</span>
  </div>
  <div class="footer">
    <p>INERA SOFTWARE PRIVATE LIMITED | Belagavi, Karnataka, India</p>
    <p>Email: inerasoftware@gmail.com | SOI: ineraschoolofinternships@gmail.com</p>
    <p>This is a computer-generated receipt and does not require a physical signature.</p>
  </div>
</div>
<script>window.print();</script>
</body>
</html>`;
}

function generateCollegeReceipt(form, paymentInfo) {
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const receiptNo = `SOI-INST-${paymentInfo.paymentId?.slice(-8)?.toUpperCase() || Date.now().toString(36).toUpperCase()}`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>SOI Institutional Payment Receipt</title>
<style>
  body{font-family:'Segoe UI',Arial,sans-serif;margin:0;padding:20px;background:#f5f5f5}
  .receipt{max-width:700px;margin:0 auto;background:#fff;padding:40px;border-radius:12px;box-shadow:0 2px 20px rgba(0,0,0,.1)}
  .header{text-align:center;border-bottom:2px solid #1a1a2e;padding-bottom:20px;margin-bottom:20px}
  .header img{width:60px;height:60px;border-radius:12px;margin-bottom:10px}
  .header h1{font-size:22px;color:#1a1a2e;margin:5px 0}
  .header p{color:#666;font-size:13px;margin:2px 0}
  .receipt-no{font-size:14px;color:#2563eb;font-weight:bold;margin:5px 0}
  .section{margin-bottom:20px}
  .section h3{font-size:14px;color:#1a1a2e;border-bottom:1px solid #eee;padding-bottom:5px;margin-bottom:10px}
  .row{display:flex;justify-content:space-between;padding:4px 0;font-size:13px;color:#333}
  .row .label{color:#888}
  .total{background:#f0f4ff;padding:12px;border-radius:8px;display:flex;justify-content:space-between;font-weight:bold;font-size:16px}
  .footer{text-align:center;margin-top:20px;padding-top:15px;border-top:1px solid #eee;font-size:11px;color:#999}
  .paid{display:inline-block;background:#10b981;color:#fff;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold}
  @media print{body{background:#fff}.receipt{box-shadow:none;padding:20px}}
</style></head>
<body>
<div class="receipt">
  <div class="header">
    <img src="/inera-logo.jpg" alt="INERA">
    <h1>Institutional Payment Receipt</h1>
    <p>INERA SOFTWARE PRIVATE LIMITED</p>
    <p class="receipt-no">Receipt #: ${receiptNo}</p>
    <p>Date: ${date}</p>
    <p><span class="paid">✓ PAID</span></p>
  </div>
  <div class="section">
    <h3>Institution Details</h3>
    <div class="row"><span class="label">College Name</span><span>${form.collegeName}</span></div>
    <div class="row"><span class="label">Official Email</span><span>${form.officialEmail}</span></div>
    <div class="row"><span class="label">Contact Person</span><span>${form.personName}</span></div>
  </div>
  <div class="section">
    <h3>Program Details</h3>
    <div class="row"><span class="label">Program</span><span>SOI — School of Internships (Institutional)</span></div>
    <div class="row"><span class="label">Duration</span><span>${form.duration}</span></div>
    <div class="row"><span class="label">Number of Students</span><span>${form.numStudents}</span></div>
    <div class="row"><span class="label">Fee per Student</span><span>₹${(parseInt(form.numStudents) > 0 ? (paymentInfo.amount / parseInt(form.numStudents)) : 0)?.toLocaleString('en-IN')}</span></div>
  </div>
  <div class="section">
    <h3>Payment Information</h3>
    <div class="row"><span class="label">Payment ID</span><span>${paymentInfo.paymentId || '—'}</span></div>
    <div class="row"><span class="label">Order ID</span><span>${paymentInfo.orderId || '—'}</span></div>
    <div class="row"><span class="label">Payment Method</span><span>Razorpay (Online)</span></div>
    ${form.couponApplied ? `<div class="row coupon-row"><span class="label">Coupon Applied</span><span>${form.couponCode} — 100% OFF</span></div>` : ''}
  </div>
  <div class="total">
    <span>Total Amount Paid</span>
    <span>₹${paymentInfo.amount?.toLocaleString('en-IN')}</span>
  </div>
  <div class="footer">
    <p>INERA SOFTWARE PRIVATE LIMITED | Belagavi, Karnataka, India</p>
    <p>Email: inerasoftware@gmail.com | SOI: ineraschoolofinternships@gmail.com</p>
    <p>This is a computer-generated receipt and does not require a physical signature.</p>
  </div>
</div>
<script>window.print();</script>
</body>
</html>`;
}

// ── Google Sheet helper ──────────────────────────────────────────────────────

async function postToGoogleSheet(data) {
  try {
    const response = await fetch('/api/soi-registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch {
    return false;
  }
}

// ── File to base64 helper ────────────────────────────────────────────────────

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject('Failed to read file');
    reader.readAsDataURL(file);
  });
}

// ── Component ────────────────────────────────────────────────────────────────

export default function SOIPage() {
  const { data } = useAdmin();
  const [activeTab, setActiveTab] = useState('student');
  const [step, setStep] = useState('form'); // 'form' | 'payment' | 'success' | 'error'

  // Student Form State
  const [studentForm, setStudentForm] = useState({
    fullName: '', dob: '', gender: '', mobile: '', whatsapp: '', email: '',
    userType: '', // 'college_student' | 'working_professional'
    college: '', department: '', semester: '', rollNumber: '',
    jobRole: '', yearsOfExperience: '',
    duration: '',
    collegeIdFile: null, companyIdFile: null, passportPhoto: null, resume: null,
    termsAccepted: false, ndaAccepted: false, privacyAccepted: false,
  });
  const [agreementsRead, setAgreementsRead] = useState({ terms: false, nda: false, privacy: false });
  const [agreementModal, setAgreementModal] = useState(null); // 'terms' | 'nda' | 'privacy'
  const [fileNames, setFileNames] = useState({});

  // College Form State
  const [collegeForm, setCollegeForm] = useState({
    collegeName: '', institutionType: '', otherType: '', university: '', aicte: '', website: '',
    address: '', city: '', state: '', pin: '', officialEmail: '', landline: '',
    personName: '', personDesignation: '', personMobile: '', personEmail: '',
    numStudents: '', departments: '', duration: '', requirements: '',
    authorized: false,
  });

  const [submitted, setSubmitted] = useState({ student: false, college: false });
  const [errors, setErrors] = useState({});
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const inputClass = (err) => `w-full bg-white/5 border ${err ? 'border-red-500/60' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-electric-blue/60 focus:bg-white/8 transition-all`;
  const labelClass = 'block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wide';
  const selectClass = (err) => `w-full bg-[#0d1117] border ${err ? 'border-red-500/60' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-electric-blue/60 transition-all appearance-none`;

  // ── Student Form Validation ─────────────────────────────────────────────────

  const validateStudentForm = () => {
    const errs = {};
    if (!studentForm.fullName?.trim()) errs.fullName = 'Required';
    if (!studentForm.email?.trim()) errs.email = 'Required';
    if (!studentForm.mobile?.trim()) errs.mobile = 'Required';
    if (!studentForm.userType) errs.userType = 'Select your type';

    if (studentForm.userType === 'college_student') {
      if (!studentForm.college?.trim()) errs.college = 'Required';
    } else if (studentForm.userType === 'working_professional') {
      if (!studentForm.jobRole?.trim()) errs.jobRole = 'Required';
      if (!studentForm.yearsOfExperience?.trim()) errs.yearsOfExperience = 'Required';
    }

    if (!studentForm.duration) errs.duration = 'Select duration';

    // File uploads check
    const idFile = studentForm.userType === 'college_student' ? studentForm.collegeIdFile : studentForm.companyIdFile;
    if (!idFile) errs.idFile = 'Required';
    if (!studentForm.passportPhoto) errs.passportPhoto = 'Required';
    if (!studentForm.resume) errs.resume = 'Required';

    // Agreement checkboxes
    if (!agreementsRead.terms) errs.terms = 'Please read Terms & Conditions first';
    else if (!studentForm.termsAccepted) errs.terms = 'Please accept Terms & Conditions';

    if (!agreementsRead.nda) errs.nda = 'Please read the NDA first';
    else if (!studentForm.ndaAccepted) errs.nda = 'Please accept the NDA';

    if (!agreementsRead.privacy) errs.privacy = 'Please read the Privacy Policy first';
    else if (!studentForm.privacyAccepted) errs.privacy = 'Please accept the Privacy Policy';

    return errs;
  };

  // ── College Form Validation ─────────────────────────────────────────────────

  const validateCollegeForm = () => {
    const errs = {};
    if (!collegeForm.collegeName?.trim()) errs.collegeName = 'Required';
    if (!collegeForm.institutionType) errs.institutionType = 'Select type';
    if (collegeForm.institutionType === 'Other' && !collegeForm.otherType?.trim()) errs.otherType = 'Specify type';
    if (!collegeForm.officialEmail?.trim()) errs.officialEmail = 'Required';
    if (!collegeForm.personName?.trim()) errs.personName = 'Required';
    if (!collegeForm.personDesignation?.trim()) errs.personDesignation = 'Required';
    if (!collegeForm.personMobile?.trim()) errs.personMobile = 'Required';
    if (!collegeForm.personEmail?.trim()) errs.personEmail = 'Required';
    if (!collegeForm.numStudents || parseInt(collegeForm.numStudents) < 1) errs.numStudents = 'Enter valid number';
    if (!collegeForm.duration) errs.duration = 'Select duration';
    if (!collegeForm.authorized) errs.authorized = 'Please confirm authorization';
    return errs;
  };

  // ── Student Payment Flow ────────────────────────────────────────────────────

  const computeStudentAmount = () => couponApplied ? COUPON_AMOUNT : (STUDENT_FEES[studentForm.duration] || 0);

  const handleProceedToPayment = async () => {
    const errs = validateStudentForm();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStep('payment');
  };

  const handleStudentPayment = async () => {
    setProcessing(true);
    setPaymentError('');

    const amount = computeStudentAmount();
    if (!amount) { setPaymentError('Invalid amount'); setProcessing(false); return; }

    const razorpayReady = await loadRazorpayScript();
    if (!razorpayReady) { setPaymentError('Payment gateway failed to load. Please try again.'); setProcessing(false); return; }

    // Create order
    const receipt = `std_${Date.now()}`;
    let order;
    try {
      order = await createRazorpayOrder(amount, receipt);
    } catch (e) {
      setPaymentError('Payment failed: ' + e.message);
      setProcessing(false);
      return;
    }
    if (!order) { setPaymentError('Failed to create payment order. Please try again.'); setProcessing(false); return; }

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_T0FdwnC16Luy4y';

    const options = {
      key: keyId,
      amount: order.amount,
      currency: order.currency || 'INR',
      name: 'INERA SOFTWARE PVT. LTD.',
      description: `SOI Internship — ${studentForm.duration}`,
      image: '/inera-logo.jpg',
      order_id: order.id,
      handler: async function (response) {
        const pi = {
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          amount,
          type: 'student',
        };
        setPaymentInfo(pi);

        // Read files as base64
        let idFileData = '', photoData = '', resumeData = '';
        try {
          const idFile = studentForm.userType === 'college_student' ? studentForm.collegeIdFile : studentForm.companyIdFile;
          if (idFile) idFileData = await fileToBase64(idFile);
          if (studentForm.passportPhoto) photoData = await fileToBase64(studentForm.passportPhoto);
          if (studentForm.resume) resumeData = await fileToBase64(studentForm.resume);
        } catch {}

        // Build registration data
        const regData = {
          type: 'student',
          userType: studentForm.userType,
          fullName: studentForm.fullName,
          dob: studentForm.dob,
          gender: studentForm.gender,
          mobile: studentForm.mobile,
          whatsapp: studentForm.whatsapp || studentForm.mobile,
          email: studentForm.email,
          college: studentForm.userType === 'college_student' ? studentForm.college : '',
          department: studentForm.userType === 'college_student' ? studentForm.department : '',
          semester: studentForm.userType === 'college_student' ? studentForm.semester : '',
          rollNumber: studentForm.userType === 'college_student' ? studentForm.rollNumber : '',
          jobRole: studentForm.userType === 'working_professional' ? studentForm.jobRole : '',
          yearsOfExperience: studentForm.userType === 'working_professional' ? studentForm.yearsOfExperience : '',
          duration: studentForm.duration,
          amount,
          paymentId: pi.paymentId,
          orderId: pi.orderId,
          termsAccepted: true,
          ndaAccepted: true,
          privacyAccepted: true,
          idFileData,
          photoData,
          resumeData,
          couponApplied: couponApplied || false,
          couponCode: couponApplied ? COUPON_CODE : '',
        };

        // Post to server
        await postToGoogleSheet(regData);
        setStep('success');
        setProcessing(false);

        // Generate receipt
        const receiptHtml = generateStudentReceipt({ ...studentForm, couponApplied, couponCode: couponApplied ? COUPON_CODE : '' }, pi);
        const receiptWindow = window.open('', '_blank');
        receiptWindow.document.write(receiptHtml);
        receiptWindow.document.close();
      },
      modal: {
        ondismiss: () => { setPaymentError('Payment cancelled. You can try again.'); setProcessing(false); },
      },
      prefill: {
        name: studentForm.fullName,
        email: studentForm.email,
        contact: studentForm.mobile,
      },
      theme: { color: '#2563eb' },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      setPaymentError(`Payment failed: ${response.error?.description || 'Unknown error'}`);
      setProcessing(false);
    });
    rzp.open();
  };

  // ── College Payment Flow ────────────────────────────────────────────────────

  const computeCollegeAmount = () => {
    if (couponApplied) return COUPON_AMOUNT;
    const fee = COLLEGE_FEE_PER_STUDENT[collegeForm.duration] || 0;
    const count = parseInt(collegeForm.numStudents) || 0;
    return fee * count;
  };

  const handleProceedToCollegePayment = async () => {
    const errs = validateCollegeForm();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStep('payment');
  };

  const handleCollegePayment = async () => {
    setProcessing(true);
    setPaymentError('');

    const amount = computeCollegeAmount();
    if (!amount) { setPaymentError('Invalid amount'); setProcessing(false); return; }

    const razorpayReady = await loadRazorpayScript();
    if (!razorpayReady) { setPaymentError('Payment gateway failed to load. Please try again.'); setProcessing(false); return; }

    const receipt = `inst_${Date.now()}`;
    let order;
    try {
      order = await createRazorpayOrder(amount, receipt);
    } catch (e) {
      setPaymentError('Payment failed: ' + e.message);
      setProcessing(false);
      return;
    }
    if (!order) { setPaymentError('Failed to create payment order. Please try again.'); setProcessing(false); return; }

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_T0FdwnC16Luy4y';

    const options = {
      key: keyId,
      amount: order.amount,
      currency: order.currency || 'INR',
      name: 'INERA SOFTWARE PVT. LTD.',
      description: `SOI Institutional — ${collegeForm.duration}`,
      image: '/inera-logo.jpg',
      order_id: order.id,
      handler: async function (response) {
        const pi = {
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          amount,
          type: 'college',
        };
        setPaymentInfo(pi);

        const institutionType = collegeForm.institutionType === 'Other' ? collegeForm.otherType : collegeForm.institutionType;
        const regData = {
          type: 'college',
          collegeName: collegeForm.collegeName,
          institutionType,
          university: collegeForm.university,
          aicte: collegeForm.aicte,
          website: collegeForm.website,
          address: collegeForm.address,
          city: collegeForm.city,
          state: collegeForm.state,
          pin: collegeForm.pin,
          officialEmail: collegeForm.officialEmail,
          landline: collegeForm.landline,
          personName: collegeForm.personName,
          personDesignation: collegeForm.personDesignation,
          personMobile: collegeForm.personMobile,
          personEmail: collegeForm.personEmail,
          numStudents: collegeForm.numStudents,
          departments: collegeForm.departments,
          duration: collegeForm.duration,
          feePerStudent: COLLEGE_FEE_PER_STUDENT[collegeForm.duration],
          totalAmount: amount,
          requirements: collegeForm.requirements,
          paymentId: pi.paymentId,
          orderId: pi.orderId,
          couponApplied: couponApplied || false,
          couponCode: couponApplied ? COUPON_CODE : '',
        };

        await postToGoogleSheet(regData);
        setStep('success');
        setProcessing(false);

        const receiptHtml = generateCollegeReceipt({ ...collegeForm, couponApplied, couponCode: couponApplied ? COUPON_CODE : '' }, pi);
        const receiptWindow = window.open('', '_blank');
        receiptWindow.document.write(receiptHtml);
        receiptWindow.document.close();
      },
      modal: {
        ondismiss: () => { setPaymentError('Payment cancelled. You can try again.'); setProcessing(false); },
      },
      prefill: {
        name: collegeForm.personName,
        email: collegeForm.officialEmail,
        contact: collegeForm.personMobile,
      },
      theme: { color: '#2563eb' },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      setPaymentError(`Payment failed: ${response.error?.description || 'Unknown error'}`);
      setProcessing(false);
    });
    rzp.open();
  };

  // ── File handlers ──────────────────────────────────────────────────────────

  const handleFileSelect = (field, file) => {
    if (!file) return;
    setStudentForm(p => ({ ...p, [field]: file }));
    setFileNames(p => ({ ...p, [field]: file.name }));
    // Clear error on file select
    if (field === 'collegeIdFile' || field === 'companyIdFile') setErrors(p => ({ ...p, idFile: undefined }));
    if (field === 'passportPhoto') setErrors(p => ({ ...p, passportPhoto: undefined }));
    if (field === 'resume') setErrors(p => ({ ...p, resume: undefined }));
  };

  // ── Coupon Handler ─────────────────────────────────────────────────────────

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) { setCouponError('Enter a coupon code'); return; }
    if (couponCode.trim().toLowerCase() === COUPON_CODE.toLowerCase()) {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError('Invalid coupon code');
    }
  };

  // ── Agreement Modal ─────────────────────────────────────────────────────────

  const agreementContent = {
    terms: { title: 'Terms & Conditions', text: TERMS_TEXT },
    nda: { title: 'Non-Disclosure & Confidentiality Agreement', text: NDA_TEXT },
    privacy: { title: 'Privacy Policy', text: PRIVACY_TEXT },
  };

  const handleReadAgreement = (key) => {
    setAgreementModal(key);
  };

  const handleCloseAgreementModal = () => {
    if (agreementModal) {
      setAgreementsRead(p => ({ ...p, [agreementModal]: true }));
    }
    setAgreementModal(null);
  };

  // ── Reset ───────────────────────────────────────────────────────────────────

  const resetForm = () => {
    setStep('form');
    setSubmitted(p => ({ ...p, student: false, college: false }));
    setErrors({});
    setPaymentInfo(null);
    setPaymentError('');
    setProcessing(false);
    setCouponCode('');
    setCouponApplied(false);
    setCouponError('');
    setAgreementsRead({ terms: false, nda: false, privacy: false });
    setFileNames({});
    setStudentForm({
      fullName: '', dob: '', gender: '', mobile: '', whatsapp: '', email: '',
      userType: '', college: '', department: '', semester: '', rollNumber: '',
      jobRole: '', yearsOfExperience: '', duration: '',
      collegeIdFile: null, companyIdFile: null, passportPhoto: null, resume: null,
      termsAccepted: false, ndaAccepted: false, privacyAccepted: false,
    });
    setCollegeForm({
      collegeName: '', institutionType: '', otherType: '', university: '', aicte: '', website: '',
      address: '', city: '', state: '', pin: '', officialEmail: '', landline: '',
      personName: '', personDesignation: '', personMobile: '', personEmail: '',
      numStudents: '', departments: '', duration: '', requirements: '',
      authorized: false,
    });
  };

  const isStudentFee = activeTab === 'student';
  const currentAmount = isStudentFee ? computeStudentAmount() : computeCollegeAmount();

  // ── Agreement Modal Render ──────────────────────────────────────────────────

  const renderAgreementModal = () => {
    if (!agreementModal) return null;
    const content = agreementContent[agreementModal];
    if (!content) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => handleCloseAgreementModal()}>
        <div className="bg-[#0d1117] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-sora font-bold text-white text-lg">{content.title}</h3>
            <button onClick={handleCloseAgreementModal} className="text-white/40 hover:text-white transition-colors text-sm px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10">Close & Confirm</button>
          </div>
          <div className="p-6 overflow-y-auto">
            <pre className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap font-sans">{content.text}</pre>
          </div>
          <div className="p-4 border-t border-white/10 flex justify-end">
            <button onClick={handleCloseAgreementModal} className="btn-gold text-sm px-6 py-2.5 rounded-lg font-semibold">
              I have read and understood
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 overflow-hidden">
      {/* Agreement Modal */}
      {renderAgreementModal()}

      {/* Hero */}
      <section className="relative py-20 px-4 md:px-8 grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-blue/15 to-deep-black" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-yellow-600/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-28 h-28 rounded-2xl overflow-hidden ring-2 ring-yellow-600/40 shadow-xl shadow-yellow-900/20 animate-float">
              <img src="/soi-logo.jpg" alt="SOI" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-yellow-600/20">
            <span className="text-yellow-400 text-xs font-medium uppercase tracking-widest">A Program of INERA Software Pvt. Ltd.</span>
          </div>
          <h1 className="font-sora text-4xl md:text-6xl font-bold text-white mb-3">SOI — School of Internships</h1>
          <p className="text-yellow-400 text-xl md:text-2xl font-sora font-semibold mb-4">"Learn. Build. Deploy."</p>
          <p className="text-white/50 text-sm italic mb-8">"Driven by Ambition, Defined by Execution"</p>
          <h2 className="font-sora text-2xl md:text-3xl font-bold text-white mb-4">Build Real Skills Through Real Execution</h2>
          <p className="text-white/60 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            SOI helps ambitious students move beyond theory and step into the future of AI, automation, and intelligent digital systems through execution-focused internship experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => { setActiveTab('student'); setStep('form'); document.getElementById('register').scrollIntoView({ behavior: 'smooth' }); }} className="btn-gold inline-flex items-center gap-2 justify-center">
              <User size={16} /> Register as Student
            </button>
            <button onClick={() => { setActiveTab('college'); setStep('form'); document.getElementById('register').scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary inline-flex items-center gap-2 justify-center">
              <Building2 size={16} /> Register Your College
            </button>
            <a href="mailto:ineraschoolofinternships@gmail.com" className="btn-primary inline-flex items-center gap-2 justify-center">
              Contact SOI Team
            </a>
          </div>
        </div>
      </section>

      {/* What is SOI */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-yellow-400/80 text-xs uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-yellow-600" /> About SOI
            </div>
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-6">What is SOI?</h2>
            <div className="space-y-4 text-white/60 text-sm leading-relaxed">
              <p>SOI (School of Internships) is the professional internship ecosystem powered by INERA SOFTWARE PRIVATE LIMITED.</p>
              <p>SOI bridges the gap between academic learning and real industry execution through practical exposure, modern technology environments, and execution-focused learning.</p>
              <p className="font-semibold text-white/80">SOI is not a traditional classroom-style internship. It is a Learn + Work ecosystem where students:</p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {['Learn modern technologies', 'Work on practical systems', 'Understand AI-first environments', 'Gain professional exposure', 'Improve collaboration & communication', 'Develop future-ready skills'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-yellow-400 flex-shrink-0" />
                  <span className="text-white/60 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass-dark rounded-2xl p-6 border border-yellow-600/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-600/20 flex items-center justify-center">
                  <GraduationCap size={18} className="text-yellow-400" />
                </div>
                <div>
                  <div className="font-sora font-semibold text-white">Internship Mode</div>
                  <div className="text-yellow-400 text-sm font-bold">{data.soi.mode}</div>
                </div>
              </div>
            </div>
            <div className="glass-dark rounded-2xl p-6 border border-electric-blue/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-electric-blue/20 flex items-center justify-center">
                  <Users2 size={18} className="text-electric-blue" />
                </div>
                <div>
                  <div className="font-sora font-semibold text-white">Institutional Fee</div>
                  <div className="text-electric-blue text-sm font-bold">{data.soi.feePerStudent} per student</div>
                </div>
              </div>
            </div>
            <div className="glass-dark rounded-2xl p-6 border border-neon-cyan/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
                  <Target size={18} className="text-neon-cyan" />
                </div>
                <div>
                  <div className="font-sora font-semibold text-white">Minimum Requirement</div>
                  <div className="text-neon-cyan text-sm font-bold">Minimum {data.soi.minStudents} students per institution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SOI */}
      <section className="section-padding bg-gradient-to-b from-navy-blue/10 to-deep-black border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">Why SOI?</h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">Six pillars that make SOI a transformative experience.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whySOI.map(({ icon: Icon, title, desc, color }, i) => (
              <div key={i} className={`glass rounded-2xl p-6 border card-hover group ${colorMap[color]}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${colorMap[color]}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-sora font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">Program Structure</h2>
          <p className="text-white/50 text-sm">5 stages from orientation to certification</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-8 bottom-8 w-px bg-gradient-to-b from-electric-blue/50 via-neon-cyan/50 to-electric-blue/10" />
          <div className="space-y-6">
            {programSteps.map((step, i) => (
              <div key={i} className={`flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1 md:flex-[0.45]">
                  <div className={`glass rounded-2xl p-6 border border-white/8 card-hover ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="text-neon-cyan font-sora font-bold text-sm mb-1">Step {step.step}</div>
                    <h3 className="font-sora font-semibold text-white text-lg mb-2">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-electric-blue/20 border-2 border-electric-blue items-center justify-center z-10">
                  <span className="font-sora font-bold text-electric-blue">{step.step}</span>
                </div>
                <div className="hidden md:block flex-[0.45]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Students / For Colleges */}
      <section className="section-padding bg-gradient-to-b from-navy-blue/10 to-deep-black border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-8 border border-yellow-600/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-yellow-600/20 flex items-center justify-center">
                <User size={22} className="text-yellow-400" />
              </div>
              <h3 className="font-sora text-2xl font-bold text-white">For Students</h3>
            </div>
            <div className="space-y-3">
              {studentBenefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-yellow-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-yellow-600/10 rounded-xl border border-yellow-600/20">
              <div className="text-xs text-white/50 uppercase tracking-wide mb-1">Program Fee</div>
              <div className="text-sm text-white/80">
                <span className="text-yellow-400 font-bold">3 Months — ₹3,500</span>
                <span className="text-white/30 mx-2">|</span>
                <span className="text-yellow-400 font-bold">4 Months — ₹4,500</span>
              </div>
            </div>
            <button onClick={() => { setActiveTab('student'); setStep('form'); document.getElementById('register').scrollIntoView({ behavior: 'smooth' }); }} className="mt-6 btn-gold inline-flex items-center gap-2">
              Register Now <ArrowRight size={16} />
            </button>
          </div>
          <div className="glass rounded-2xl p-8 border border-electric-blue/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-electric-blue/20 flex items-center justify-center">
                <Building2 size={22} className="text-electric-blue" />
              </div>
              <h3 className="font-sora text-2xl font-bold text-white">For Institutions & Colleges</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              SOI collaborates with educational institutions to provide students with practical industry exposure, execution-focused learning environments, and technology-oriented experiences.
            </p>
            <div className="space-y-3">
              {institutionBenefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-electric-blue flex-shrink-0" />
                  <span className="text-white/70 text-sm">{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-electric-blue/10 rounded-xl border border-electric-blue/20">
              <div className="text-xs text-white/50 uppercase tracking-wide mb-1">Fee Details</div>
              <div className="text-sm text-white/80">
                <span className="text-electric-blue font-bold">3 Months — ₹3,500/student</span>
                <span className="text-white/30 mx-2">|</span>
                <span className="text-electric-blue font-bold">4 Months — ₹4,500/student</span>
              </div>
              <div className="text-xs text-white/50 mt-1">Mode: {data.soi.mode} · Min: {data.soi.minStudents} students</div>
            </div>
            <button onClick={() => { setActiveTab('college'); setStep('form'); document.getElementById('register').scrollIntoView({ behavior: 'smooth' }); }} className="mt-6 btn-primary inline-flex items-center gap-2">
              Register Your College <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Registration Forms */}
      <section id="register" className="section-padding max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">Register for SOI</h2>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => { setActiveTab('student'); setStep('form'); }}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'student' ? 'bg-yellow-600 text-black' : 'glass border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <User size={15} /> Student Registration
            </button>
            <button
              onClick={() => { setActiveTab('college'); setStep('form'); }}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'college' ? 'bg-electric-blue text-white' : 'glass border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <Building2 size={15} /> Institutional Registration
            </button>
          </div>
        </div>

        {/* ──────────────── STUDENT FORM ──────────────── */}
        {activeTab === 'student' && (
          step === 'success' ? (
            <div className="glass-dark rounded-3xl p-12 border border-yellow-600/30 text-center">
              <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-400" />
              </div>
              <h3 className="font-sora text-2xl font-bold text-white mb-3">Payment Successful!</h3>
              <p className="text-white/60 text-sm max-w-md mx-auto mb-2">
                Your SOI internship registration is complete. A receipt has been opened for you to download/print.
              </p>
              <p className="text-white/40 text-xs max-w-md mx-auto mb-6">
                The SOI team will contact you at <span className="text-yellow-400">{studentForm.email}</span> with further instructions.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={resetForm} className="btn-gold flex items-center gap-2">
                  Register Another Student
                </button>
                {paymentInfo && (
                  <button onClick={() => {
                    const html = generateStudentReceipt({ ...studentForm, couponApplied, couponCode: couponApplied ? COUPON_CODE : '' }, paymentInfo);
                    const w = window.open('', '_blank');
                    w.document.write(html);
                    w.document.close();
                  }} className="btn-secondary flex items-center gap-2">
                    <Download size={15} /> Download Receipt
                  </button>
                )}
              </div>
            </div>
          ) : step === 'payment' ? (
            /* Payment Summary */
            <div className="glass-dark rounded-3xl p-8 border border-yellow-600/20">
              <h3 className="font-sora text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-yellow-400" /> Payment Summary
              </h3>
              <div className="space-y-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white/50 text-xs uppercase tracking-wide mb-3">Registration Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-white/50">Name</span><span className="text-white">{studentForm.fullName}</span></div>
                    <div className="flex justify-between"><span className="text-white/50">Email</span><span className="text-white">{studentForm.email}</span></div>
                    <div className="flex justify-between"><span className="text-white/50">Type</span><span className="text-white">{studentForm.userType === 'college_student' ? 'College Student' : 'Working Professional'}</span></div>
                    <div className="flex justify-between"><span className="text-white/50">Duration</span><span className="text-white">{studentForm.duration}</span></div>
                  </div>
                </div>
                {/* Coupon Code */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white/50 text-xs uppercase tracking-wide mb-3">Have a Coupon Code?</h4>
                  <div className="flex gap-2">
                    <input className="flex-1 bg-[#0d1117] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-yellow-600/60 transition-all" value={couponCode} onChange={e => { setCouponCode(e.target.value); setCouponApplied(false); }} placeholder="Enter coupon code" disabled={couponApplied} />
                    {couponApplied ? (
                      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600/20 text-green-400 border border-green-600/30 rounded-lg text-xs font-semibold whitespace-nowrap">✓ Applied</div>
                    ) : (
                      <button onClick={handleApplyCoupon} className="px-5 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-black text-sm font-semibold rounded-lg transition-all whitespace-nowrap">Apply</button>
                    )}
                  </div>
                  {couponError && <p className="text-red-400 text-xs mt-1.5">{couponError}</p>}
                  {couponApplied && <p className="text-green-400/70 text-xs mt-1.5">Coupon applied! Fee reduced to ₹1</p>}
                </div>
                <div className="bg-electric-blue/10 rounded-xl p-5 border border-electric-blue/30">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 font-medium">Total Fee</span>
                    <span className="font-sora font-bold text-2xl text-electric-blue">₹{currentAmount?.toLocaleString('en-IN')}</span>
                  </div>
                  {couponApplied && <p className="text-green-400/60 text-xs mt-1">Original: ₹{(STUDENT_FEES[studentForm.duration] || 0).toLocaleString('en-IN')} → Discounted: ₹1</p>}
                  <p className="text-white/40 text-xs mt-2">Pay securely via Razorpay (Credit/Debit Card, UPI, Net Banking, Wallet)</p>
                </div>
                {paymentError && (
                  <div className="bg-red-500/15 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">{paymentError}</div>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('form')} className="btn-secondary flex-1">Back</button>
                <button onClick={handleStudentPayment} disabled={processing} className="btn-gold flex-[2] flex items-center justify-center gap-2 disabled:opacity-60">
                  {processing ? (
                    <>Processing...</>
                  ) : (
                    <><Lock size={16} /> Pay ₹{currentAmount?.toLocaleString('en-IN')} with Razorpay</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Student Registration Form */
            <form onSubmit={e => { e.preventDefault(); handleProceedToPayment(); }} className="glass rounded-3xl p-8 border border-yellow-600/20">
              <h3 className="font-sora text-xl font-bold text-white mb-6 flex items-center gap-2">
                <User size={20} className="text-yellow-400" /> Student Registration
              </h3>

              {/* User Type Selection */}
              <div className="mb-6">
                <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">I am a</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { value: 'college_student', label: '🎓 College Student', desc: 'Currently enrolled in a college/university' },
                    { value: 'working_professional', label: '💼 Working Professional', desc: 'Currently employed in an organization' },
                  ].map(opt => (
                    <div key={opt.value}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        studentForm.userType === opt.value
                          ? 'border-yellow-600 bg-yellow-600/10'
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                      onClick={() => setStudentForm(p => ({ ...p, userType: opt.value }))}>
                      <div className="font-semibold text-white text-sm">{opt.label}</div>
                      <div className="text-white/40 text-xs mt-1">{opt.desc}</div>
                    </div>
                  ))}
                </div>
                {errors.userType && <span className="text-red-400 text-xs mt-1 block">{errors.userType}</span>}
              </div>

              {/* Personal Details */}
              <div className="mb-6">
                <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Personal Details</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Full Name *</label><input className={inputClass(errors.fullName)} value={studentForm.fullName} onChange={e => setStudentForm(p => ({ ...p, fullName: e.target.value }))} placeholder="Your Full Name" />{errors.fullName && <span className="text-red-400 text-xs mt-1 block">{errors.fullName}</span>}</div>
                  <div><label className={labelClass}>Date of Birth</label><input type="date" className={inputClass()} value={studentForm.dob} onChange={e => setStudentForm(p => ({ ...p, dob: e.target.value }))} /></div>
                  <div><label className={labelClass}>Gender</label>
                    <select className={selectClass()} value={studentForm.gender} onChange={e => setStudentForm(p => ({ ...p, gender: e.target.value }))}>
                      <option value="">Select Gender</option>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Mobile Number *</label><input className={inputClass(errors.mobile)} value={studentForm.mobile} onChange={e => setStudentForm(p => ({ ...p, mobile: e.target.value }))} placeholder="+91 XXXXX XXXXX" />{errors.mobile && <span className="text-red-400 text-xs mt-1 block">{errors.mobile}</span>}</div>
                  <div><label className={labelClass}>WhatsApp Number</label><input className={inputClass()} value={studentForm.whatsapp} onChange={e => setStudentForm(p => ({ ...p, whatsapp: e.target.value }))} placeholder="+91 XXXXX XXXXX" /></div>
                  <div><label className={labelClass}>Email Address *</label><input type="email" className={inputClass(errors.email)} value={studentForm.email} onChange={e => setStudentForm(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" />{errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email}</span>}</div>
                </div>
              </div>

              {/* Conditional Fields */}
              {studentForm.userType === 'college_student' && (
                <div className="mb-6">
                  <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">College Details</div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>College Name *</label><input className={inputClass(errors.college)} value={studentForm.college} onChange={e => setStudentForm(p => ({ ...p, college: e.target.value }))} placeholder="Your College/University" />{errors.college && <span className="text-red-400 text-xs mt-1 block">{errors.college}</span>}</div>
                    <div><label className={labelClass}>Department</label><input className={inputClass()} value={studentForm.department} onChange={e => setStudentForm(p => ({ ...p, department: e.target.value }))} placeholder="CSE, IT, ECE, etc." /></div>
                    <div><label className={labelClass}>Semester</label>
                      <select className={selectClass()} value={studentForm.semester} onChange={e => setStudentForm(p => ({ ...p, semester: e.target.value }))}>
                        <option value="">Select Semester</option>
                        {[1,2,3,4,5,6,7,8].map(s => <option key={s}>{s}th Semester</option>)}
                      </select>
                    </div>
                    <div><label className={labelClass}>Roll Number</label><input className={inputClass()} value={studentForm.rollNumber} onChange={e => setStudentForm(p => ({ ...p, rollNumber: e.target.value }))} placeholder="Your Roll Number" /></div>
                  </div>
                </div>
              )}

              {studentForm.userType === 'working_professional' && (
                <div className="mb-6">
                  <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Professional Details</div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>Current Job Role *</label><input className={inputClass(errors.jobRole)} value={studentForm.jobRole} onChange={e => setStudentForm(p => ({ ...p, jobRole: e.target.value }))} placeholder="e.g. Software Engineer" />{errors.jobRole && <span className="text-red-400 text-xs mt-1 block">{errors.jobRole}</span>}</div>
                    <div><label className={labelClass}>Years of Experience *</label>
                      <select className={selectClass(errors.yearsOfExperience)} value={studentForm.yearsOfExperience} onChange={e => setStudentForm(p => ({ ...p, yearsOfExperience: e.target.value }))}>
                        <option value="">Select Experience</option>
                        <option>0-1 Years</option><option>1-2 Years</option><option>2-3 Years</option><option>3-5 Years</option><option>5+ Years</option>
                      </select>
                      {errors.yearsOfExperience && <span className="text-red-400 text-xs mt-1 block">{errors.yearsOfExperience}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* Duration Selection */}
              <div className="mb-6">
                <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Select Program Duration *</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { value: '3 Months', fee: 3500 },
                    { value: '4 Months', fee: 4500 },
                  ].map(opt => (
                    <div key={opt.value}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all text-center ${
                        studentForm.duration === opt.value
                          ? 'border-yellow-600 bg-yellow-600/10'
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                      onClick={() => setStudentForm(p => ({ ...p, duration: opt.value }))}>
                      <div className="font-sora font-bold text-white text-lg">{opt.value}</div>
                      <div className="text-yellow-400 font-bold text-xl mt-1">₹{opt.fee.toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                </div>
                {errors.duration && <span className="text-red-400 text-xs mt-1 block">{errors.duration}</span>}
              </div>

              {/* Mandatory File Uploads */}
              <div className="mb-6">
                <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Upload Documents (All Mandatory)</div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* ID Card (conditional label) */}
                  <div>
                    <label className={labelClass}>{studentForm.userType === 'working_professional' ? 'Company ID Card *' : 'College ID Card *'}</label>
                    {(studentForm.userType === 'college_student' || studentForm.userType === 'working_professional') ? (
                      <>
                        <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all group ${errors.idFile ? 'border-red-500/50' : 'border-white/15 hover:border-yellow-600/40'}`}>
                          {fileNames.collegeIdFile || fileNames.companyIdFile ? (
                            <div className="flex flex-col items-center gap-1">
                              <CheckCircle2 size={18} className="text-green-400" />
                              <span className="text-green-400/70 text-xs text-center px-2 truncate max-w-full">{fileNames.collegeIdFile || fileNames.companyIdFile}</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-1">
                              <Upload size={18} className="text-white/30 group-hover:text-yellow-400 transition-colors" />
                              <span className="text-white/30 text-xs group-hover:text-white/60 transition-colors">Click to upload</span>
                            </div>
                          )}
                          <input type="file" className="hidden" onChange={e => e.target.files?.[0] && handleFileSelect(studentForm.userType === 'working_professional' ? 'companyIdFile' : 'collegeIdFile', e.target.files[0])} />
                        </label>
                        {errors.idFile && <span className="text-red-400 text-xs mt-1 block">{errors.idFile}</span>}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/10 rounded-xl bg-white/3">
                        <span className="text-white/20 text-xs">Select your type above first</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Passport Photo *</label>
                    <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all group ${errors.passportPhoto ? 'border-red-500/50' : 'border-white/15 hover:border-yellow-600/40'}`}>
                      {fileNames.passportPhoto ? (
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle2 size={18} className="text-green-400" />
                          <span className="text-green-400/70 text-xs text-center px-2 truncate max-w-full">{fileNames.passportPhoto}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <Upload size={18} className="text-white/30 group-hover:text-yellow-400 transition-colors" />
                          <span className="text-white/30 text-xs group-hover:text-white/60 transition-colors">Click to upload</span>
                        </div>
                      )}
                      <input type="file" className="hidden" onChange={e => e.target.files?.[0] && handleFileSelect('passportPhoto', e.target.files[0])} />
                    </label>
                    {errors.passportPhoto && <span className="text-red-400 text-xs mt-1 block">{errors.passportPhoto}</span>}
                  </div>
                  <div>
                    <label className={labelClass}>Resume / CV *</label>
                    <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all group ${errors.resume ? 'border-red-500/50' : 'border-white/15 hover:border-yellow-600/40'}`}>
                      {fileNames.resume ? (
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle2 size={18} className="text-green-400" />
                          <span className="text-green-400/70 text-xs text-center px-2 truncate max-w-full">{fileNames.resume}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <Upload size={18} className="text-white/30 group-hover:text-yellow-400 transition-colors" />
                          <span className="text-white/30 text-xs group-hover:text-white/60 transition-colors">Click to upload</span>
                        </div>
                      )}
                      <input type="file" className="hidden" onChange={e => e.target.files?.[0] && handleFileSelect('resume', e.target.files[0])} />
                    </label>
                    {errors.resume && <span className="text-red-400 text-xs mt-1 block">{errors.resume}</span>}
                  </div>
                </div>
              </div>

              {/* 3-Step Agreement Flow */}
              <div className="mb-6 space-y-3">
                <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-3 pb-2 border-b border-white/5">Agreements (Please read each before accepting)</div>
                {[
                  { key: 'terms', label: 'Terms & Conditions', errKey: 'terms' },
                  { key: 'nda', label: 'Non-Disclosure & Confidentiality Agreement', errKey: 'nda' },
                  { key: 'privacy', label: 'Privacy Policy', errKey: 'privacy' },
                ].map(({ key, label, errKey }) => {
                  const isRead = agreementsRead[key];
                  const isAccepted = studentForm[`${key}Accepted`];
                  const canCheck = isRead;
                  return (
                    <div key={key} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/5">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${isAccepted ? 'bg-yellow-600 border-yellow-600' : canCheck ? 'border-white/20 cursor-pointer group-hover:border-yellow-600/50' : 'border-white/10 cursor-not-allowed'}`}
                        onClick={() => {
                          if (canCheck) setStudentForm(p => ({ ...p, [`${key}Accepted`]: !p[`${key}Accepted`] }));
                        }}>
                        {isAccepted && <CheckCircle2 size={12} className="text-black" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-xs ${isAccepted ? 'text-white/80' : isRead ? 'text-white/60' : 'text-white/30'}`}>{label}</span>
                      </div>
                      <button type="button" onClick={() => handleReadAgreement(key)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                          isRead ? 'bg-green-600/20 text-green-400 border border-green-600/30' : 'bg-electric-blue/20 text-electric-blue border border-electric-blue/20 hover:bg-electric-blue/30'
                        }`}>
                        <ExternalLink size={11} />
                        {isRead ? 'Read ✓' : 'Read'}
                      </button>
                      {errors[errKey] && <span className="text-red-400 text-xs flex-shrink-0">{errors[errKey]}</span>}
                    </div>
                  );
                })}
              </div>

              <button type="submit" className="w-full btn-gold py-4 font-sora font-bold text-base flex items-center justify-center gap-2">
                Continue to Payment <IndianRupee size={18} />
              </button>
            </form>
          )
        )}

        {/* ──────────────── COLLEGE FORM ──────────────── */}
        {activeTab === 'college' && (
          step === 'success' ? (
            <div className="glass-dark rounded-3xl p-12 border border-electric-blue/30 text-center">
              <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-400" />
              </div>
              <h3 className="font-sora text-2xl font-bold text-white mb-3">Registration & Payment Successful!</h3>
              <p className="text-white/60 text-sm max-w-md mx-auto mb-2">
                Your institutional registration is complete. A receipt has been opened for you to download/print.
              </p>
              <p className="text-white/40 text-xs max-w-md mx-auto mb-6">
                The SOI team will contact your institution at <span className="text-electric-blue">{collegeForm.officialEmail}</span> with further details.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={resetForm} className="btn-primary flex items-center gap-2">
                  Register Another Institution
                </button>
                {paymentInfo && (
                  <button onClick={() => {
                    const html = generateCollegeReceipt({ ...collegeForm, couponApplied, couponCode: couponApplied ? COUPON_CODE : '' }, paymentInfo);
                    const w = window.open('', '_blank');
                    w.document.write(html);
                    w.document.close();
                  }} className="btn-secondary flex items-center gap-2">
                    <Download size={15} /> Download Receipt
                  </button>
                )}
              </div>
            </div>
          ) : step === 'payment' ? (
            /* College Payment Summary */
            <div className="glass-dark rounded-3xl p-8 border border-electric-blue/20">
              <h3 className="font-sora text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-electric-blue" /> Payment Summary
              </h3>
              <div className="space-y-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white/50 text-xs uppercase tracking-wide mb-3">Registration Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-white/50">Institution</span><span className="text-white">{collegeForm.collegeName}</span></div>
                    <div className="flex justify-between"><span className="text-white/50">Contact Person</span><span className="text-white">{collegeForm.personName}</span></div>
                    <div className="flex justify-between"><span className="text-white/50">Duration</span><span className="text-white">{collegeForm.duration}</span></div>
                    <div className="flex justify-between"><span className="text-white/50">Number of Students</span><span className="text-white">{collegeForm.numStudents}</span></div>
                  </div>
                </div>
                <div className="bg-electric-blue/10 rounded-xl p-5 border border-electric-blue/30">
                  {(() => {
                    const fee = COLLEGE_FEE_PER_STUDENT[collegeForm.duration] || 0;
                    const count = parseInt(collegeForm.numStudents) || 0;
                    return (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-white/50">Fee per student ({collegeForm.duration})</span><span className="text-white">₹{fee.toLocaleString('en-IN')}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-white/50">Number of students</span><span className="text-white">{count}</span></div>
                        <div className="border-t border-electric-blue/20 pt-2 flex justify-between items-center">
                          <span className="text-white/70 font-medium">Total Fee</span>
                          <span className="font-sora font-bold text-2xl text-electric-blue">₹{(fee * count).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    );
                  })()}
                  {couponApplied && <p className="text-green-400/60 text-xs mt-1">Coupon applied! Fee reduced to ₹1</p>}
                  <p className="text-white/40 text-xs mt-2">Pay securely via Razorpay (Credit/Debit Card, UPI, Net Banking, Wallet)</p>
                </div>
                {/* Coupon Code */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white/50 text-xs uppercase tracking-wide mb-3">Have a Coupon Code?</h4>
                  <div className="flex gap-2">
                    <input className="flex-1 bg-[#0d1117] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-electric-blue/60 transition-all" value={couponCode} onChange={e => { setCouponCode(e.target.value); setCouponApplied(false); }} placeholder="Enter coupon code" disabled={couponApplied} />
                    {couponApplied ? (
                      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600/20 text-green-400 border border-green-600/30 rounded-lg text-xs font-semibold whitespace-nowrap">✓ Applied</div>
                    ) : (
                      <button onClick={handleApplyCoupon} className="px-5 py-2.5 bg-electric-blue hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-all whitespace-nowrap">Apply</button>
                    )}
                  </div>
                  {couponError && <p className="text-red-400 text-xs mt-1.5">{couponError}</p>}
                  {couponApplied && <p className="text-green-400/70 text-xs mt-1.5">Coupon applied! Total fee reduced to ₹1</p>}
                </div>
                {paymentError && (
                  <div className="bg-red-500/15 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">{paymentError}</div>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('form')} className="btn-secondary flex-1">Back</button>
                <button onClick={handleCollegePayment} disabled={processing} className="btn-primary flex-[2] flex items-center justify-center gap-2 disabled:opacity-60">
                  {processing ? (
                    <>Processing...</>
                  ) : (
                    <><Lock size={16} /> Pay ₹{currentAmount?.toLocaleString('en-IN')} with Razorpay</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* College Registration Form */
            <form onSubmit={e => { e.preventDefault(); handleProceedToCollegePayment(); }} className="glass rounded-3xl p-8 border border-electric-blue/20">
              <h3 className="font-sora text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Building2 size={20} className="text-electric-blue" /> Institutional Registration
              </h3>

              {/* Institution Info */}
              <div className="mb-6">
                <div className="text-electric-blue text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Institution Information</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>College / Institution Name *</label><input className={inputClass(errors.collegeName)} value={collegeForm.collegeName} onChange={e => setCollegeForm(p => ({ ...p, collegeName: e.target.value }))} placeholder="Institution Name" />{errors.collegeName && <span className="text-red-400 text-xs mt-1 block">{errors.collegeName}</span>}</div>
                  <div><label className={labelClass}>Institution Type *</label>
                    <select className={selectClass(errors.institutionType)} value={collegeForm.institutionType} onChange={e => setCollegeForm(p => ({ ...p, institutionType: e.target.value }))}>
                      <option value="">Select Type</option>
                      <option>Engineering College</option><option>Arts & Science College</option><option>Management Institute</option><option>Polytechnic</option><option>University</option><option>Other</option>
                    </select>
                    {errors.institutionType && <span className="text-red-400 text-xs mt-1 block">{errors.institutionType}</span>}
                  </div>
                  {collegeForm.institutionType === 'Other' && (
                    <div><label className={labelClass}>Specify Institution Type *</label><input className={inputClass(errors.otherType)} value={collegeForm.otherType} onChange={e => setCollegeForm(p => ({ ...p, otherType: e.target.value }))} placeholder="e.g. Training Institute" />{errors.otherType && <span className="text-red-400 text-xs mt-1 block">{errors.otherType}</span>}</div>
                  )}
                  <div><label className={labelClass}>Affiliated University</label><input className={inputClass()} value={collegeForm.university} onChange={e => setCollegeForm(p => ({ ...p, university: e.target.value }))} placeholder="Affiliated University" /></div>
                  <div><label className={labelClass}>AICTE Approval No.</label><input className={inputClass()} value={collegeForm.aicte} onChange={e => setCollegeForm(p => ({ ...p, aicte: e.target.value }))} placeholder="AICTE Number" /></div>
                  <div><label className={labelClass}>Official Website</label><input className={inputClass()} value={collegeForm.website} onChange={e => setCollegeForm(p => ({ ...p, website: e.target.value }))} placeholder="https://college.edu.in" /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Address</label><input className={inputClass()} value={collegeForm.address} onChange={e => setCollegeForm(p => ({ ...p, address: e.target.value }))} placeholder="Full Address" /></div>
                  <div><label className={labelClass}>City</label><input className={inputClass()} value={collegeForm.city} onChange={e => setCollegeForm(p => ({ ...p, city: e.target.value }))} placeholder="City" /></div>
                  <div><label className={labelClass}>State</label><input className={inputClass()} value={collegeForm.state} onChange={e => setCollegeForm(p => ({ ...p, state: e.target.value }))} placeholder="State" /></div>
                  <div><label className={labelClass}>PIN Code</label><input className={inputClass()} value={collegeForm.pin} onChange={e => setCollegeForm(p => ({ ...p, pin: e.target.value }))} placeholder="PIN Code" /></div>
                  <div><label className={labelClass}>Official Email *</label><input type="email" className={inputClass(errors.officialEmail)} value={collegeForm.officialEmail} onChange={e => setCollegeForm(p => ({ ...p, officialEmail: e.target.value }))} placeholder="college@edu.in" />{errors.officialEmail && <span className="text-red-400 text-xs mt-1 block">{errors.officialEmail}</span>}</div>
                  <div><label className={labelClass}>Landline Number</label><input className={inputClass()} value={collegeForm.landline} onChange={e => setCollegeForm(p => ({ ...p, landline: e.target.value }))} placeholder="STD-XXXXXXXX" /></div>
                </div>
              </div>

              {/* Person Filling the Form (replaces Principal Details) */}
              <div className="mb-6">
                <div className="text-electric-blue text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Person Filling This Form *</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Full Name *</label><input className={inputClass(errors.personName)} value={collegeForm.personName} onChange={e => setCollegeForm(p => ({ ...p, personName: e.target.value }))} placeholder="Your Full Name" />{errors.personName && <span className="text-red-400 text-xs mt-1 block">{errors.personName}</span>}</div>
                  <div><label className={labelClass}>Designation *</label><input className={inputClass(errors.personDesignation)} value={collegeForm.personDesignation} onChange={e => setCollegeForm(p => ({ ...p, personDesignation: e.target.value }))} placeholder="e.g. HOD, Dean, Coordinator" />{errors.personDesignation && <span className="text-red-400 text-xs mt-1 block">{errors.personDesignation}</span>}</div>
                  <div><label className={labelClass}>Mobile Number *</label><input className={inputClass(errors.personMobile)} value={collegeForm.personMobile} onChange={e => setCollegeForm(p => ({ ...p, personMobile: e.target.value }))} placeholder="+91 XXXXX XXXXX" />{errors.personMobile && <span className="text-red-400 text-xs mt-1 block">{errors.personMobile}</span>}</div>
                  <div><label className={labelClass}>Email Address *</label><input type="email" className={inputClass(errors.personEmail)} value={collegeForm.personEmail} onChange={e => setCollegeForm(p => ({ ...p, personEmail: e.target.value }))} placeholder="you@college.edu" />{errors.personEmail && <span className="text-red-400 text-xs mt-1 block">{errors.personEmail}</span>}</div>
                </div>
              </div>

              {/* Internship Requirements (Updated) */}
              <div className="mb-6">
                <div className="text-electric-blue text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Internship Requirements</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Number of Students *</label><input type="number" min="1" className={inputClass(errors.numStudents)} value={collegeForm.numStudents} onChange={e => setCollegeForm(p => ({ ...p, numStudents: e.target.value }))} placeholder="Number of students" />{errors.numStudents && <span className="text-red-400 text-xs mt-1 block">{errors.numStudents}</span>}</div>
                  <div><label className={labelClass}>Departments</label><input className={inputClass()} value={collegeForm.departments} onChange={e => setCollegeForm(p => ({ ...p, departments: e.target.value }))} placeholder="CSE, IT, ECE, etc." /></div>
                  <div><label className={labelClass}>Program Duration *</label>
                    <select className={selectClass(errors.duration)} value={collegeForm.duration} onChange={e => setCollegeForm(p => ({ ...p, duration: e.target.value }))}>
                      <option value="">Select Duration</option>
                      <option value="3 Months">3 Months (₹3,500/student)</option>
                      <option value="4 Months">4 Months (₹4,500/student)</option>
                    </select>
                    {errors.duration && <span className="text-red-400 text-xs mt-1 block">{errors.duration}</span>}
                  </div>
                  <div className="sm:col-span-2"><label className={labelClass}>Special Requirements</label><textarea rows={3} className={inputClass()} value={collegeForm.requirements} onChange={e => setCollegeForm(p => ({ ...p, requirements: e.target.value }))} placeholder="Any specific requirements or notes..." /></div>
                  {/* Payment preview */}
                  {collegeForm.duration && collegeForm.numStudents && parseInt(collegeForm.numStudents) > 0 && (
                    <div className="sm:col-span-2 bg-electric-blue/10 rounded-xl p-4 border border-electric-blue/20">
                      <div className="text-xs text-white/50 uppercase tracking-wide mb-2">Estimated Fee</div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70 text-sm">{collegeForm.duration} × {collegeForm.numStudents} students</span>
                        <span className="font-sora font-bold text-xl text-electric-blue">
                          ₹{((COLLEGE_FEE_PER_STUDENT[collegeForm.duration] || 0) * (parseInt(collegeForm.numStudents) || 0)).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-white/40 text-xs mt-1">₹{COLLEGE_FEE_PER_STUDENT[collegeForm.duration]?.toLocaleString('en-IN')} per student</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Authorization */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${collegeForm.authorized ? 'bg-electric-blue border-electric-blue' : 'border-white/20 group-hover:border-electric-blue/50'}`}
                    onClick={() => setCollegeForm(p => ({ ...p, authorized: !p.authorized }))}>
                    {collegeForm.authorized && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  <span className="text-white/60 text-sm leading-relaxed">"I confirm that all information provided is officially authorized and accurate."</span>
                </label>
                {errors.authorized && <span className="text-red-400 text-xs mt-1 block ml-8">{errors.authorized}</span>}
              </div>

              <button type="submit" className="w-full btn-primary py-4 font-sora font-bold text-base flex items-center justify-center gap-2">
                Continue to Payment <IndianRupee size={18} />
              </button>
            </form>
          )
        )}
      </section>
    </div>
  );
}