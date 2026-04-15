import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Coffee, Calendar, Leaf, ArrowRight, Instagram, Clock, X, Plus } from 'lucide-react';
import React, { useState, useEffect, ReactNode } from 'react';

const CONTACT_NUMBER = "9106581476";
const MAPS_LINK = "https://maps.app.goo.gl/doMZ4xmVn2fDxVvv8";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
}

const MENU_DATA: Record<string, MenuItem[]> = {
  "Non-Milk Coffee": [
    { id: "nm1", name: "Cold Brew", price: "190/-", description: "Steeped for 18 hours for a smooth, bold flavor without the bitterness.", category: "Non-Milk Coffee" },
    { id: "nm2", name: "Cold Brew Tonic", price: "220/-", description: "Our signature cold brew topped with crisp tonic water. Refreshing and punchy.", category: "Non-Milk Coffee" },
    { id: "nm3", name: "Cold Brew Tonic Lime", price: "230/-", description: "Cold brew and tonic with a fresh squeeze of lime for that extra zing.", category: "Non-Milk Coffee" },
    { id: "nm4", name: "Iced Moka Pot", price: "180/-", description: "Traditional Italian Moka pot brew served over ice.", category: "Non-Milk Coffee" },
    { id: "nm5", name: "Iced Moka Pot Tonic", price: "210/-", description: "Moka pot brew mixed with tonic water over ice.", category: "Non-Milk Coffee" },
    { id: "nm6", name: "Americano", price: "160/-", description: "Rich espresso diluted with hot water. Classic and strong.", category: "Non-Milk Coffee" },
  ],
  "Milk Based Coffee (Hot)": [
    { id: "mb1", name: "Moka Pot", price: "200/-", description: "Strong, rich coffee brewed in a traditional Moka pot with steamed milk.", category: "Milk Based Coffee (Hot)" },
    { id: "mb2", name: "Chocolate Moka Pot", price: "210/-", description: "Our classic Moka pot coffee infused with rich, dark chocolate.", category: "Milk Based Coffee (Hot)" },
    { id: "mb3", name: "Cappuccino", price: "190/-", description: "Perfect balance of espresso, steamed milk, and thick foam.", category: "Milk Based Coffee (Hot)" },
    { id: "mb4", name: "Latte", price: "200/-", description: "Smooth espresso with plenty of steamed milk and a light layer of foam.", category: "Milk Based Coffee (Hot)" },
  ],
  "Frappe": [
    { id: "f1", name: "Chocolate Frappe", price: "210/-", description: "Blended ice beverage with rich chocolate syrup, milk, and topped with whipped cream.", category: "Frappe" },
    { id: "f2", name: "Nutella Frappe", price: "230/-", description: "A crowd favorite. Blended with real Nutella for a hazelnut chocolate dream.", category: "Frappe" },
    { id: "f3", name: "Biscoff Frappe", price: "250/-", description: "Lotus Biscoff spread blended into a creamy, caramelized frappe.", category: "Frappe" },
    { id: "f4", name: "Caramel Frappe", price: "220/-", description: "Sweet caramel blended with coffee and ice, topped with caramel drizzle.", category: "Frappe" },
  ],
  "Coolers": [
    { id: "c1", name: "Peach Ice Tea", price: "200/-", description: "Sweet and refreshing iced tea infused with peach flavor.", category: "Coolers" },
    { id: "c2", name: "Lemon Ice Tea", price: "200/-", description: "Classic iced tea with a bright, citrusy lemon twist.", category: "Coolers" },
    { id: "c3", name: "Lemonade", price: "180/-", description: "Freshly squeezed lemons, perfectly sweetened and served ice cold.", category: "Coolers" },
    { id: "c4", name: "Red Bull", price: "160/-", description: "The classic energy drink served chilled.", category: "Coolers" },
    { id: "c5", name: "Hell", price: "130/-", description: "Hell energy drink served chilled.", category: "Coolers" },
    { id: "c6", name: "Mint Mojito", price: "210/-", description: "Virgin mojito with fresh mint leaves, lime, and soda.", category: "Coolers" },
  ]
};

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light font-sans selection:bg-brand-green selection:text-brand-light">
      
      {/* STICKY HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-display font-bold text-xl tracking-widest uppercase">
            The Otherside
          </div>
          <a 
            href={`tel:${CONTACT_NUMBER}`}
            className="hidden md:flex items-center gap-2 bg-brand-light text-brand-dark px-5 py-2 rounded-full font-medium hover:bg-brand-accent transition-colors"
          >
            <Phone size={16} />
            <span>Call Now</span>
          </a>
        </div>
      </header>

      {/* FLOATING CALL BUTTON (MOBILE) */}
      <a 
        href={`tel:${CONTACT_NUMBER}`}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-brand-green text-brand-light p-4 rounded-full shadow-2xl shadow-brand-green/20 border border-white/10"
      >
        <Phone size={24} />
      </a>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            style={{ y: y1 }}
            src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=2070&auto=format&fit=crop" 
            alt="Moody Cafe Interior" 
            className="w-full h-[120%] object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
              Welcome to <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-muted">THE OTHERSIDE</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-brand-muted mb-10 max-w-2xl mx-auto font-light"
          >
            You’ve officially crossed over to the better side. Coffee that understands your mood better than people do.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href={MAPS_LINK} target="_blank" rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-light text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105"
            >
              <MapPin size={20} />
              <span>Get Directions</span>
            </a>
            <a 
              href={`tel:${CONTACT_NUMBER}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-brand-light/30 hover:border-brand-light text-brand-light px-8 py-4 rounded-full font-medium transition-all"
            >
              <Phone size={20} />
              <span>Call Now</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT / EXPERIENCE */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-brand-darker">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1975&auto=format&fit=crop" 
                alt="Coffee and Plants" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-white/10 rounded-2xl" />
            </div>
          </FadeIn>
          
          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Not just a cafe.<br/>An escape.</h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-xl text-brand-muted leading-relaxed">
                We built The Otherside because reality is exhausting. Surrounded by greenery, fueled by caffeine, and designed for those who appreciate a good vibe.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-xl text-brand-muted leading-relaxed">
                Come for the coffee, stay because you don't want to go back.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="pt-4 flex items-center gap-4 text-brand-accent">
                <Leaf size={24} />
                <span className="font-display tracking-widest uppercase text-sm font-bold">Clean & Green Environment</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. WHY PEOPLE LOVE US */}
      <section className="py-24 px-6 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-16">Why cross over?</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Coffee size={32} />, title: "Coffee worth crossing sides for", desc: "Expertly brewed to fix whatever mood you walked in with." },
              { icon: <Leaf size={32} />, title: "Ambience that hits different", desc: "A hidden gem aesthetic that makes your Instagram look 10x better." },
              { icon: <Calendar size={32} />, title: "Events that actually feel like events", desc: "Cozy gatherings, live music, and a community you'll actually want to talk to." }
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.2} className="bg-brand-darker p-8 rounded-2xl border border-white/5 hover:border-brand-green/50 transition-colors group">
                <div className="text-brand-green mb-6 group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-brand-muted">{feature.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE MENU */}
      <section className="py-24 px-6 bg-brand-darker relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <FadeIn>
              <h2 className="font-display text-4xl md:text-5xl font-bold">The Menu.</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-brand-muted max-w-sm">Crafted for the bold. Served on the other side.</p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Column 1 */}
            <div className="space-y-12">
              <FadeIn delay={0.1}>
                <h3 className="font-display text-2xl font-bold text-brand-green mb-6 border-b border-white/10 pb-4">Non-Milk Coffee</h3>
                <ul className="space-y-4">
                  {MENU_DATA["Non-Milk Coffee"].map((item) => (
                    <li 
                      key={item.id} 
                      onClick={() => setSelectedItem(item)}
                      className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-brand-green opacity-0 group-hover:opacity-100 transition-opacity"><Plus size={16} /></span>
                        <span className="text-lg font-medium group-hover:text-brand-accent transition-colors">{item.name}</span>
                      </div>
                      <span className="text-brand-muted">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h3 className="font-display text-2xl font-bold text-brand-green mb-6 border-b border-white/10 pb-4">Milk Based Coffee (Hot)</h3>
                <ul className="space-y-4">
                  {MENU_DATA["Milk Based Coffee (Hot)"].map((item) => (
                    <li 
                      key={item.id} 
                      onClick={() => setSelectedItem(item)}
                      className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-brand-green opacity-0 group-hover:opacity-100 transition-opacity"><Plus size={16} /></span>
                        <span className="text-lg font-medium group-hover:text-brand-accent transition-colors">{item.name}</span>
                      </div>
                      <span className="text-brand-muted">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            {/* Column 2 */}
            <div className="space-y-12">
              <FadeIn delay={0.3}>
                <h3 className="font-display text-2xl font-bold text-brand-green mb-6 border-b border-white/10 pb-4">Frappe</h3>
                <ul className="space-y-4">
                  {MENU_DATA["Frappe"].map((item) => (
                    <li 
                      key={item.id} 
                      onClick={() => setSelectedItem(item)}
                      className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-brand-green opacity-0 group-hover:opacity-100 transition-opacity"><Plus size={16} /></span>
                        <span className="text-lg font-medium group-hover:text-brand-accent transition-colors">{item.name}</span>
                      </div>
                      <span className="text-brand-muted">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={0.4}>
                <h3 className="font-display text-2xl font-bold text-brand-green mb-6 border-b border-white/10 pb-4">Coolers</h3>
                <ul className="space-y-4">
                  {MENU_DATA["Coolers"].map((item) => (
                    <li 
                      key={item.id} 
                      onClick={() => setSelectedItem(item)}
                      className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-brand-green opacity-0 group-hover:opacity-100 transition-opacity"><Plus size={16} /></span>
                        <span className="text-lg font-medium group-hover:text-brand-accent transition-colors">{item.name}</span>
                      </div>
                      <span className="text-brand-muted">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EVENTS / COMMUNITY (MARQUEE) */}
      <section className="py-32 bg-brand-green overflow-hidden relative flex items-center">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="w-full flex whitespace-nowrap">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex gap-16 items-center"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-16">
                <h2 className="font-display text-6xl md:text-8xl font-bold text-brand-light/90">SOMETHING'S ALWAYS HAPPENING ON THIS SIDE</h2>
                <span className="text-brand-accent"><Calendar size={64} /></span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. GALLERY */}
      <section className="py-24 px-2 md:px-6 bg-brand-dark">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Vibe Check</h2>
            <a href="#" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-light transition-colors">
              <Instagram size={20} />
              <span>@theothersidecafe</span>
            </a>
          </div>
        </FadeIn>
        
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {[
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2069&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=2069&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1987&auto=format&fit=crop"
          ].map((img, i) => (
            <FadeIn key={i} delay={i * 0.1} className={`relative overflow-hidden rounded-xl ${i === 0 || i === 3 ? 'aspect-square' : 'aspect-[4/5]'}`}>
              <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 px-6 bg-brand-darker">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-4xl font-bold text-center mb-16">Don't just take our word for it.</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "I came for a latte and accidentally stayed for 4 hours. Send help (and another croissant).",
              "The only place where my existential dread feels aesthetic.",
              "Finally, a cafe that understands I need good coffee and a plant to stare at while I ignore my emails."
            ].map((quote, i) => (
              <FadeIn key={i} delay={i * 0.2} className="bg-brand-dark p-8 rounded-2xl border border-white/5 relative">
                <div className="text-brand-green opacity-50 text-6xl font-display absolute top-4 left-4">"</div>
                <p className="text-lg text-brand-light relative z-10 mt-6 font-medium italic">
                  {quote}
                </p>
                <div className="mt-6 flex items-center gap-2 text-brand-accent">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA & MAP */}
      <section className="py-24 px-6 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto bg-brand-green rounded-3xl overflow-hidden flex flex-col md:flex-row">
          <div className="p-12 md:p-16 flex-1 flex flex-col justify-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Ready to cross over?</h2>
            <p className="text-brand-light/80 text-lg mb-10 max-w-md">
              We're waiting for you. Bring your friends, your laptop, or just your need for caffeine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`tel:${CONTACT_NUMBER}`}
                className="flex items-center justify-center gap-2 bg-brand-light text-brand-dark px-8 py-4 rounded-full font-medium transition-all hover:scale-105"
              >
                <Phone size={20} />
                <span>Call Now</span>
              </a>
              <a 
                href={MAPS_LINK} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-transparent border border-brand-light hover:bg-brand-light/10 text-brand-light px-8 py-4 rounded-full font-medium transition-all"
              >
                <MapPin size={20} />
                <span>Visit Us</span>
              </a>
            </div>
          </div>
          <div className="flex-1 min-h-[400px] relative">
            <iframe 
              src="https://maps.google.com/maps?q=THE+OTHERSIDE,+Vesu,+Surat&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 bg-brand-darker text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="font-display font-bold text-2xl tracking-widest uppercase mb-2">
              The Otherside
            </div>
            <p className="text-brand-muted">Not your usual cafe.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-brand-muted">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Clock size={18} className="text-brand-green" />
              <span>Open Daily: 8AM - 10PM</span>
            </div>
            <a href={`tel:${CONTACT_NUMBER}`} className="flex items-center justify-center md:justify-start gap-2 hover:text-brand-light transition-colors">
              <Phone size={18} className="text-brand-green" />
              <span>{CONTACT_NUMBER}</span>
            </a>
            <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="flex items-center justify-center md:justify-start gap-2 hover:text-brand-light transition-colors">
              <MapPin size={18} className="text-brand-green" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-brand-muted/50 text-sm">
          &copy; {new Date().getFullYear()} The Otherside Cafe. All rights reserved.
        </div>
      </footer>

      {/* MODAL DIALOG */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-darker border border-white/10 p-8 rounded-2xl max-w-md w-full relative shadow-2xl shadow-black/50"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-brand-muted hover:text-brand-light transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
              
              <div className="mb-2 text-brand-green font-display text-sm tracking-widest uppercase font-bold">
                {selectedItem.category}
              </div>
              <h3 className="font-display text-3xl font-bold mb-2 pr-8">{selectedItem.name}</h3>
              <div className="text-brand-accent text-xl font-medium mb-6">{selectedItem.price}</div>
              
              <p className="text-brand-muted leading-relaxed mb-8">
                {selectedItem.description}
              </p>
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="w-full py-3 bg-brand-green hover:bg-brand-green-light text-white rounded-xl font-medium transition-colors"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

