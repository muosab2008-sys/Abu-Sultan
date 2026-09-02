'use client';
import { Crown, LogIn, LogOut, Wallet, ShoppingBag, Shield } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const { user, logout, loginAsCustomer, loginAsAdmin } = useAppStore();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0B0E]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-14 h-14 transition-transform group-hover:scale-105">
            <img src="/logo.png" alt="أبو سلطان" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#F5D061] bg-clip-text text-transparent">
              أبو سلطان
            </span>
            <span className="text-xs text-gray-400 font-medium tracking-widest">STORE</span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          {!user ? (
            <div className="flex items-center gap-3">
              {/* For Demo Purposes, quick login buttons */}
              <button onClick={loginAsCustomer} className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors">
                دخول (عميل)
              </button>
              <button onClick={loginAsAdmin} className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors">
                دخول (أدمن)
              </button>
              <Link href="/auth" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-[#0B0B0E] font-semibold transition-transform hover:scale-105">
                <LogIn size={18} />
                <span>تسجيل الدخول</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              {user.role === 'customer' && (
                <>
                  <Link href="/store" className={`text-sm hover:text-[#D4AF37] transition-colors ${pathname === '/store' ? 'text-[#D4AF37]' : 'text-gray-300'}`}>المتجر</Link>
                  <Link href="/wallet" className={`flex items-center gap-2 text-sm hover:text-[#D4AF37] transition-colors ${pathname === '/wallet' ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                    <Wallet size={16} />
                    <span>المحفظة</span>
                    <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-mono font-semibold">{user.balance} ﷼</span>
                  </Link>
                  <Link href="/purchases" className={`flex items-center gap-2 text-sm hover:text-[#D4AF37] transition-colors ${pathname === '/purchases' ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                    <ShoppingBag size={16} />
                    <span>مشترياتي</span>
                  </Link>
                </>
              )}
              
              {user.role === 'admin' && (
                <Link href="/admin" className={`flex items-center gap-2 text-sm hover:text-[#D4AF37] transition-colors ${pathname.startsWith('/admin') ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                  <Shield size={16} />
                  <span>لوحة التحكم</span>
                </Link>
              )}

              <div className="h-6 w-px bg-gray-800"></div>
              
              <button onClick={logout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors">
                <LogOut size={16} />
                <span>خروج</span>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
