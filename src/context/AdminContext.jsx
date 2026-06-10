import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseReady } from '../lib/supabase';

const AdminContext = createContext();

// ── Default site data ──────────────────────────────────────────────────────────
const defaultData = {
  socialLinks: {
    linkedin: 'https://linkedin.com/company/inera-software',
    instagram: 'https://instagram.com/inerasoftware',
    youtube: 'https://youtube.com/@inerasoftware',
    twitter: 'https://twitter.com/inerasoftware',
    facebook: 'https://facebook.com/inerasoftware',
    whatsapp: 'https://wa.me/917022866045',
  },
  contact: {
    email: 'inerasoftware@gmail.com',
    phone: '+91 7022866045',
    headquarters: 'Belagavi, Karnataka, India',
    branches: ['Belagavi', 'Pune', 'Bangalore'],
  },
  announcements: [
    { id: 1, text: 'SOI Batch 2026 – Registrations Now Open! Apply Today.', active: true },
    { id: 2, text: 'INERA Software – Now Serving Enterprise Clients Pan-India', active: true },
    { id: 3, text: 'Institutional Partnerships Available – Min. 100 Students', active: true },
  ],
  highlights: [
    { id: 1, title: 'SOI Batch Launch', description: 'New batch of School of Internships launched with 200+ students.', tag: 'Achievement', active: true },
    { id: 2, title: 'Enterprise Partnership', description: 'Strategic technology partnership signed with leading institutions.', tag: 'News', active: true },
    { id: 3, title: 'AI Development Sprint', description: 'Team completed 3 AI automation projects in record time.', tag: 'Milestone', active: true },
    { id: 4, title: 'New Office – Bangalore', description: 'INERA Software expands to Bangalore with new tech hub.', tag: 'Expansion', active: true },
  ],
  careers: [
    { id: 1, title: 'Full Stack Developer', department: 'Engineering', type: 'Full-time', location: 'Remote / Bangalore', description: 'Build scalable web applications and enterprise software solutions.', active: true },
    { id: 2, title: 'AI Engineer', department: 'AI & Automation', type: 'Full-time', location: 'Remote / Bangalore', description: 'Design and develop intelligent automation workflows and AI systems.', active: true },
    { id: 3, title: 'Business Development Executive', department: 'Sales', type: 'Full-time', location: 'Pan-India', description: 'Drive business growth and enterprise client acquisition.', active: true },
    { id: 4, title: 'SOI Program Coordinator', department: 'SOI', type: 'Full-time', location: 'Remote', description: 'Manage and coordinate the School of Internships program.', active: true },
    { id: 5, title: 'UI/UX Designer', department: 'Design', type: 'Full-time', location: 'Remote', description: 'Create stunning enterprise-grade UI designs and user experiences.', active: false },
  ],
  soi: {
    tagline: 'Learn. Build. Deploy.',
    headline: 'Build Real Skills Through Real Execution',
    feePerStudent: '₹2,500',
    minStudents: 100,
    mode: 'Online Only',
    openForRegistration: true,
  },
  pillars: [
    { id: 1, name: 'Chandan Bohra Jain', designation: 'Founder & CEO', image: '/pillar-chandan.jpg', quote: "Innovation begins when vision meets fearless execution. At InEra, we don't just adapt to the future — we engineer it.", contactEmail: 'chandan.inera@gmail.com', linkedin: 'https://linkedin.com/in/chandan-bohra-jain', colorScheme: 'blue', whiteBg: false },
    { id: 2, name: 'Yallappa Belavanaki', designation: 'Co-Founder', image: '/pillar-yallappa.jpg', quote: 'Strong systems are built through trust, discipline, and purpose. Every challenge is an opportunity to create something extraordinary.', contactEmail: '', linkedin: 'https://linkedin.com/in/yallappa-belavanaki', colorScheme: 'purple', whiteBg: false },
    { id: 3, name: 'Shivani Satish Navadgi', designation: 'Chief Marketing Officer', image: '/pillar-shivani.png', quote: 'Brands grow when people truly connect with a vision. Marketing is not promotion — it is building meaningful impact.', contactEmail: 'shivani.inera@gmail.com', linkedin: 'https://linkedin.com/in/shivani-navadgi', colorScheme: 'pink', whiteBg: true },
    { id: 4, name: 'Kumar Abhinav', designation: 'Lead Head of SOI Department', image: '/pillar-kumar.jpg', quote: 'Learning becomes powerful when ideas turn into real execution. SOI is built to shape thinkers into future-ready innovators.', contactEmail: 'kumar.soi@gmail.com', linkedin: 'https://linkedin.com/in/kumar-abhinav', colorScheme: 'yellow', whiteBg: false },
  ],
  clientReviews: [
    { id: 1, name: 'Rajesh Malhotra', role: 'CTO, FinBridge Technologies', location: 'Bangalore', avatar: 'RM', color: 'from-blue-600 to-blue-800', rating: 5, text: 'INERA Software delivered our enterprise platform in record time. Their AI automation module reduced our operational overhead by 40%. The team is genuinely brilliant — they understood our business needs before we could even fully articulate them. Truly a technology partner, not just a vendor.', active: true },
    { id: 2, name: 'Priya Venkataraman', role: 'Director of Operations, EduPulse India', location: 'Pune', avatar: 'PV', color: 'from-purple-600 to-purple-800', rating: 5, text: "We hired INERA for a custom student management platform. What impressed us most was their attention to detail and the quality of the final product. It's professional, fast, and our staff adopted it immediately. Communication throughout the project was transparent and responsive.", active: true },
    { id: 3, name: 'Arjun Shetty', role: 'Founder, WorkflowX SaaS', location: 'Mumbai', avatar: 'AS', color: 'from-cyan-600 to-blue-700', rating: 5, text: 'I was skeptical about a relatively new firm, but INERA proved me completely wrong. They built our entire SaaS backend with microservices architecture, proper CI/CD pipelines, and excellent documentation. The codebase is clean and scalable. I would recommend them without hesitation.', active: true },
    { id: 4, name: 'Kavitha Reddy', role: 'HR Head, InnoTech Solutions', location: 'Hyderabad', avatar: 'KR', color: 'from-orange-600 to-red-700', rating: 5, text: 'INERA built us a smart HR management platform that automated 70% of our recruitment process. The AI-driven shortlisting tool saves us hours every week. The team was professional, met every deadline, and even provided post-delivery support beyond the contract scope.', active: true },
  ],
  studentReviews: [
    { id: 1, name: 'Ananya Kulkarni', role: 'SOI Intern — Web Development Track', college: 'KLE Technological University, Belagavi', avatar: 'AK', color: 'from-yellow-600 to-yellow-800', rating: 5, text: "The SOI program completely changed how I think about technology. It's not just theory — we actually worked on real systems and learned how professional teams execute. Chandan sir and the entire INERA team are incredibly supportive. Best internship experience I could have asked for.", active: true },
    { id: 2, name: 'Mohammed Imran', role: 'SOI Intern — AI & Automation Track', college: 'VTU, Karnataka', avatar: 'MI', color: 'from-green-600 to-teal-700', rating: 5, text: "I joined SOI with basic Python knowledge and left with a deep understanding of AI workflows and automation tools. Kumar sir's guidance in the SOI department was exceptional. The program gave me real confidence before my final year placements. 100% worth every effort.", active: true },
    { id: 3, name: 'Sneha Patil', role: 'SOI Intern — Business Intelligence Track', college: 'Symbiosis International University, Pune', avatar: 'SP', color: 'from-pink-600 to-purple-700', rating: 5, text: "SOI is different from every other internship program out there. You're not making tea or just observing — you're actually doing things that matter. The execution-first culture taught me discipline and professionalism. Shivani ma'am's marketing insights were genuinely eye-opening.", active: true },
    { id: 4, name: 'Vikram Nair', role: 'SOI Intern — Software Engineering Track', college: 'PESIT, Bangalore', avatar: 'VN', color: 'from-indigo-600 to-blue-800', rating: 5, text: 'The SOI program is structured around real industry systems. Within weeks, I understood how enterprise software actually gets built and deployed. The INERA team mentored us like colleagues, not students. I walked away with a certificate and a genuine edge over my batchmates.', active: true },
  ],
  galleryCategories: ['Company Activities', 'Technology Events', 'Workshops', 'Team Collaborations', 'Office Environment'],
  stats: [
    { id: 1, value: '50+', label: 'Projects Delivered', active: true },
    { id: 2, value: '12+', label: 'Enterprise Solutions', active: true },
    { id: 3, value: '8+', label: 'Tech Domains', active: true },
    { id: 4, value: '200+', label: 'SOI Students', active: true },
    { id: 5, value: '99%', label: 'Client Satisfaction', active: true },
  ],
  certificates: [],
  isAdminLoggedIn: false,
};

// ── LocalStorage helpers (fallback when Supabase not connected) ────────────────
export const saveGalleryToStorage = (items) => {
  try {
    const meta = items.map(({ image, ...rest }) => rest);
    const imgs = {};
    items.forEach(i => { if (i.image) imgs[i.id] = i.image; });
    localStorage.setItem('inera_gallery_meta', JSON.stringify(meta));
    localStorage.setItem('inera_gallery_images', JSON.stringify(imgs));
    return true;
  } catch (e) {
    console.warn('Gallery storage failed:', e);
    return false;
  }
};

const loadGalleryFromStorage = () => {
  try {
    const meta = JSON.parse(localStorage.getItem('inera_gallery_meta') || '[]');
    const imgs = JSON.parse(localStorage.getItem('inera_gallery_images') || '{}');
    return meta.map(item => ({ ...item, image: imgs[item.id] ?? '' }));
  } catch { return []; }
};

const safeLoadMainData = () => {
  try {
    const raw = localStorage.getItem('inera_admin_data');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.galleryItems) {
      const existingMeta = localStorage.getItem('inera_gallery_meta');
      if (!existingMeta && parsed.galleryItems.length > 0) {
        saveGalleryToStorage(parsed.galleryItems);
      }
      delete parsed.galleryItems;
      try { localStorage.setItem('inera_admin_data', JSON.stringify(parsed)); } catch (_) {}
    }
    return { ...defaultData, ...parsed, isAdminLoggedIn: false };
  } catch (e) {
    try { localStorage.removeItem('inera_admin_data'); } catch (_) {}
    return null;
  }
};

const saveMainToStorage = (data) => {
  try {
    const toStore = { ...data };
    delete toStore.isAdminLoggedIn;
    delete toStore.galleryItems;
    localStorage.setItem('inera_admin_data', JSON.stringify(toStore));
  } catch (e) {
    console.warn('localStorage write failed:', e);
  }
};

// ── Supabase helpers ──────────────────────────────────────────────────────────
const loadFromSupabase = async () => {
  if (!isSupabaseReady()) return null;
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('data')
      .eq('id', 1)
      .single();
    if (error || !data?.data || Object.keys(data.data).length === 0) return null;
    return { ...defaultData, ...data.data, isAdminLoggedIn: false };
  } catch (e) {
    console.warn('Supabase load failed:', e);
    return null;
  }
};

const saveToSupabase = async (data) => {
  if (!isSupabaseReady()) return false;
  try {
    const toStore = { ...data };
    delete toStore.isAdminLoggedIn;
    delete toStore.galleryItems;
    const { error } = await supabase
      .from('site_config')
      .upsert({ id: 1, data: toStore }, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.warn('Supabase save failed:', e);
    return false;
  }
};

const loadGalleryFromSupabase = async () => {
  if (!isSupabaseReady()) return null;
  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) return null;
    return (data || []).map(row => ({
      id: row.id,
      title: row.title,
      category: row.category,
      image: row.public_url || row.storage_path || '',
      active: true,
    }));
  } catch (e) {
    console.warn('Supabase gallery load failed:', e);
    return null;
  }
};

const saveGalleryItemToSupabase = async (item) => {
  if (!isSupabaseReady()) return false;
  try {
    let storageUrl = item.image || '';
    // If it's a base64 image, upload to Supabase Storage
    if (item.image && item.image.startsWith('data:')) {
      const blob = await (await fetch(item.image)).blob();
      const ext = blob.type.includes('png') ? 'png' : 'jpg';
      const path = `gallery/${item.id}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('gallery-images')
        .upload(path, blob, { upsert: true, contentType: blob.type });
      if (!upErr) {
        const { data: urlData } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(path);
        storageUrl = urlData?.publicUrl || storageUrl;
      }
    }
    const { error } = await supabase.from('gallery_items').upsert({
      id: String(item.id),
      title: item.title || '',
      category: item.category || 'Company Activities',
      storage_path: storageUrl,
      public_url: storageUrl,
    }, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.warn('Supabase gallery save failed:', e);
    return false;
  }
};

const deleteGalleryItemFromSupabase = async (id) => {
  if (!isSupabaseReady()) return;
  try {
    await supabase.from('gallery_items').delete().eq('id', String(id));
    // Try to remove from storage too
    await supabase.storage.from('gallery-images').remove([`gallery/${id}.jpg`, `gallery/${id}.png`]);
  } catch (e) {
    console.warn('Supabase gallery delete failed:', e);
  }
};

// ── Provider ──────────────────────────────────────────────────────────────────
export function AdminProvider({ children }) {
  const [data, setData] = useState(() => safeLoadMainData() ?? defaultData);
  const [galleryItems, setGalleryItems] = useState([]); // lazy-loaded on demand
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [supabaseLoaded, setSupabaseLoaded] = useState(false);

  const loadGallery = useCallback(() => {
    if (galleryLoaded) return;
    const items = loadGalleryFromStorage();
    setGalleryItems(items);
    setGalleryLoaded(true);
  }, [galleryLoaded]);

  // Load from Supabase on mount (non-blocking — shows localStorage data instantly)
  useEffect(() => {
    if (!isSupabaseReady() || supabaseLoaded) return;
    (async () => {
      const [sbData, sbGallery] = await Promise.all([
        loadFromSupabase(),
        loadGalleryFromSupabase(),
      ]);
      if (sbData) {
        setData(prev => ({ ...sbData, isAdminLoggedIn: prev.isAdminLoggedIn }));
      }
      if (sbGallery !== null) {
        setGalleryItems(sbGallery);
        setGalleryLoaded(true);
      }
      setSupabaseLoaded(true);
    })();
  }, []);

  // Save data to both Supabase + localStorage
  const persistData = useCallback((updatedData) => {
    saveMainToStorage(updatedData);
    saveToSupabase(updatedData); // fire-and-forget
  }, []);

  const updateData = (key, value) => {
    setData(prev => {
      const updated = { ...prev, [key]: value };
      persistData(updated);
      return updated;
    });
  };

  const updateNested = (key, subKey, value) => {
    setData(prev => {
      const updated = { ...prev, [key]: { ...prev[key], [subKey]: value } };
      persistData(updated);
      return updated;
    });
  };

  // Gallery — in-memory update only (for live preview while editing)
  const updateGallery = (items) => setGalleryItems(items);

  // Gallery — persist to storage + Supabase
  const persistGallery = async (items) => {
    setGalleryItems(items);
    // Always save to localStorage as fallback
    saveGalleryToStorage(items);
    // If Supabase is ready, also sync to Supabase
    if (isSupabaseReady()) {
      try {
        await Promise.all(items.map(item => saveGalleryItemToSupabase(item)));
        // Reload from Supabase to get proper public URLs
        const sbGallery = await loadGalleryFromSupabase();
        if (sbGallery && sbGallery.length > 0) {
          setGalleryItems(sbGallery);
          saveGalleryToStorage(sbGallery);
        }
      } catch (e) {
        console.warn('Supabase gallery sync failed, using localStorage:', e);
      }
    }
    return true;
  };

  // Delete a gallery item from both storages
  const deleteGalleryItem = async (id) => {
    setGalleryItems(prev => {
      const updated = prev.filter(x => x.id !== id && String(x.id) !== String(id));
      saveGalleryToStorage(updated);
      return updated;
    });
    if (isSupabaseReady()) {
      await deleteGalleryItemFromSupabase(id);
    }
  };

  const login = (password) => {
    if (password === 'Mahaveernirmalachandan') {
      setData(prev => ({ ...prev, isAdminLoggedIn: true }));
      return true;
    }
    return false;
  };

  const logout = () => setData(prev => ({ ...prev, isAdminLoggedIn: false }));

  const combinedData = { ...data, galleryItems };

  return (
    <AdminContext.Provider value={{
      data: combinedData,
      updateData,
      updateNested,
      updateGallery,
      persistGallery,
      deleteGalleryItem,
      login,
      logout,
      loadGallery,
      isSupabaseConnected: isSupabaseReady(),
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
