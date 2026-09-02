'use client';
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Header } from '@/components/Header';
import { ShieldCheck, Zap, Clock, CreditCard, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const { user, fetchInitialData, products } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') router.push('/admin');
      else router.push('/store');
    }
  }, [user, router]);

  if (user) return null; // Wait for redirect

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative flex-1 flex flex-col items-center justify-center pt-24 pb-32 px-4 overflow-hidden bg-[#16161D]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#D4AF3733_0%,transparent_50%)]"></div>
          
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              متجر <span className="bg-gradient-to-r from-[#D4AF37] to-[#F5D061] bg-clip-text text-transparent">أبو سلطان</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              وجهتك الموثوقة لحسابات وأكواد الإنترنت المجاني الفورية. تسليم تلقائي، أمان تام، وأفضل الأسعار.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/auth" className="w-full sm:w-auto px-8 py-3 bg-white text-[#0B0B0E] font-bold rounded-full text-sm transition-transform hover:scale-105 flex items-center justify-center gap-2">
                <span>تصفح الباقات واشترِ الآن</span>
                <ChevronLeft size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-[#0B0B0E] py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<Zap size={32} />}
                title="تسليم فوري"
                description="استلم حسابك أو الكود الخاص بك فور إتمام عملية الدفع مباشرة بدون انتظار."
              />
              <FeatureCard 
                icon={<ShieldCheck size={32} />}
                title="شحن آمن"
                description="نظام محفظة إلكترونية آمن وسريع يضمن لك سهولة الشراء في أي وقت."
              />
              <FeatureCard 
                icon={<Clock size={32} />}
                title="دعم متواصل"
                description="فريق دعم فني متواجد لمساعدتك في حال واجهت أي مشكلة أو استفسار."
              />
              <FeatureCard 
                icon={<CreditCard size={32} />}
                title="أفضل الأسعار"
                description="نقدم لك أقوى العروض وأفضل الأسعار التنافسية في السوق."
              />
            </div>
          </div>
        </section>

        {/* Product Preview */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">باقاتنا المميزة</h2>
              <p className="text-gray-400">سجل الدخول الآن لشراء إحدى باقاتنا بأسعار حصرية</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.slice(0, 3).map((product) => (
                <div key={product.id} className="bg-[#16161D] rounded-3xl p-6 border border-white/5 hover:border-[#D4AF37]/40 transition-all group flex flex-col">
                  <div className="w-full aspect-[4/3] bg-[#0B0B0E] rounded-2xl mb-5 flex items-center justify-center overflow-hidden relative">
                     <Image src={product.image_url || 'https://picsum.photos/seed/store/400/300'} alt={product.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                    <p className="text-xs text-gray-500 mb-6 flex-1">{product.description}</p>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex flex-col">
                      {product.sale_price ? (
                        <>
                          <span className="text-[10px] text-gray-500 line-through">{product.price} SAR</span>
                          <span className="text-xl font-bold text-[#F5D061]">{product.sale_price} <small className="text-[10px]">SAR</small></span>
                        </>
                      ) : (
                        <>
                          <span className="text-[10px] opacity-0">0</span>
                          <span className="text-xl font-bold text-[#F5D061]">{product.price} <small className="text-[10px]">SAR</small></span>
                        </>
                      )}
                      </div>
                    </div>
                    <Link href="/auth" className="block w-full py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-center font-bold text-[#0B0B0E] shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:opacity-90 transition-opacity text-sm">
                      سجل الدخول للشراء
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-[#16161D] border border-white/5 hover:border-[#D4AF37]/40 transition-all">
      <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-6 shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
