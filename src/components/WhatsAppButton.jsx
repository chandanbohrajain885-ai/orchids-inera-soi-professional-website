import { useAdmin } from '../context/AdminContext';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const { data } = useAdmin();
  const tickerActive = (data.newsTicker || []).some(n => n.active);
  return (
    <a
      href={data.socialLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 whatsapp-pulse ${tickerActive ? 'bottom-16' : 'bottom-6'}`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} className="text-white" fill="white" />
    </a>
  );
}
