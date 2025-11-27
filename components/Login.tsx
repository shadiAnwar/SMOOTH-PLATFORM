
import React, { useState } from 'react';
import { UserRole, Theme, Language } from '../types';
import { Sun, Moon, Globe, Mail, Facebook, Instagram, User, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  theme: Theme;
  toggleTheme: () => void;
  lang: Language;
  toggleLang: () => void;
}

const translations = {
  en: {
    welcome: "Welcome to Smooth",
    subtitle: "The platform for creators and learners.",
    iamTutor: "I am a Tutor",
    iamStudent: "I am a Student",
    continueWith: "Continue with",
    gmail: "Gmail",
    facebook: "Facebook",
    instagram: "Instagram",
    terms: "By continuing, you agree to our Terms of Service and Privacy Policy.",
    tutorDesc: "Create courses, manage students, and earn revenue.",
    studentDesc: "Discover new skills and learn from experts."
  },
  ar: {
    welcome: "مرحباً بك في سموث",
    subtitle: "المنصة للمبدعين والمتعلمين.",
    iamTutor: "أنا معلم",
    iamStudent: "أنا طالب",
    continueWith: "المتابعة باستخدام",
    gmail: "جيميل",
    facebook: "فيسبوك",
    instagram: "انستجرام",
    terms: "بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية.",
    tutorDesc: "أنشئ دورات، أدر الطلاب، وحقق أرباحاً.",
    studentDesc: "اكتشف مهارات جديدة وتعلم من الخبراء."
  }
};

const Login: React.FC<LoginProps> = ({ onLogin, theme, toggleTheme, lang, toggleLang }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('TUTOR');
  const t = translations[lang];
  const isRTL = lang === 'ar';

  const handleSocialLogin = () => {
    // Simulate login delay
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[var(--bg-primary)] transition-colors duration-500" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Top Right Controls */}
      <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} flex items-center gap-3 z-20`}>
        <button 
          onClick={toggleTheme}
          className="p-3 bg-white/50 backdrop-blur-md border border-white/40 rounded-full hover:bg-white/80 transition-all shadow-sm text-slate-700 dark:text-white dark:bg-slate-800/50 dark:border-slate-700"
        >
          {theme === 'light' ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-indigo-400" />}
        </button>
        <button 
          onClick={toggleLang}
          className="p-3 bg-white/50 backdrop-blur-md border border-white/40 rounded-full hover:bg-white/80 transition-all shadow-sm text-slate-700 dark:text-white dark:bg-slate-800/50 dark:border-slate-700"
        >
          <Globe size={20} className="text-blue-500" />
        </button>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 p-4">
        
        {/* Left Side: Branding & Role Selection */}
        <div className="glass-panel rounded-[2.5rem] p-8 lg:p-12 flex flex-col justify-between shadow-2xl shadow-indigo-200/50 dark:shadow-none min-h-[500px] lg:min-h-[600px] animate-fade-in">
          <div>
            <div className="w-14 h-14 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30 mb-6">
              <Sparkles size={24} fill="currentColor" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight font-outfit">{t.welcome}</h1>
            <p className="text-lg text-slate-500 font-medium">{t.subtitle}</p>
          </div>

          <div className="mt-10 lg:mt-0 space-y-4">
            <label 
              onClick={() => setSelectedRole('TUTOR')}
              className={`cursor-pointer group flex items-center gap-5 p-5 rounded-2xl border-2 transition-all duration-300 ${selectedRole === 'TUTOR' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-slate-200 bg-white/50 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-800/50'}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedRole === 'TUTOR' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-100 text-slate-400 dark:bg-slate-700'}`}>
                <User size={24} />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${selectedRole === 'TUTOR' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'}`}>{t.iamTutor}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{t.tutorDesc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedRole === 'TUTOR' ? 'border-indigo-600' : 'border-slate-300'}`}>
                {selectedRole === 'TUTOR' && <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>}
              </div>
            </label>

            <label 
              onClick={() => setSelectedRole('STUDENT')}
              className={`cursor-pointer group flex items-center gap-5 p-5 rounded-2xl border-2 transition-all duration-300 ${selectedRole === 'STUDENT' ? 'border-violet-600 bg-violet-50/50 dark:bg-violet-900/20' : 'border-slate-200 bg-white/50 hover:border-violet-300 dark:border-slate-700 dark:bg-slate-800/50'}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedRole === 'STUDENT' ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30' : 'bg-slate-100 text-slate-400 dark:bg-slate-700'}`}>
                <GraduationCap size={24} />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${selectedRole === 'STUDENT' ? 'text-violet-700 dark:text-violet-400' : 'text-slate-600 dark:text-slate-300'}`}>{t.iamStudent}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{t.studentDesc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedRole === 'STUDENT' ? 'border-violet-600' : 'border-slate-300'}`}>
                {selectedRole === 'STUDENT' && <div className="w-3 h-3 bg-violet-600 rounded-full"></div>}
              </div>
            </label>
          </div>
        </div>

        {/* Right Side: Login Actions */}
        <div className="flex flex-col justify-center p-8 lg:p-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-4">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.continueWith}</h2>
            </div>

            <button onClick={handleSocialLogin} className="w-full flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all group shadow-sm hover:shadow-md">
              <Mail className="text-red-500 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-700 dark:text-slate-200">{t.gmail}</span>
              <ArrowRight className={`ml-auto text-slate-300 group-hover:text-slate-500 transition-colors ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            <button onClick={handleSocialLogin} className="w-full flex items-center gap-4 bg-[#1877F2] text-white p-4 rounded-xl hover:bg-[#1864F2] transition-all group shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30">
              <Facebook className="group-hover:scale-110 transition-transform" />
              <span className="font-bold">{t.facebook}</span>
              <ArrowRight className={`ml-auto text-white/50 group-hover:text-white transition-colors ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            <button onClick={handleSocialLogin} className="w-full flex items-center gap-4 bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] text-white p-4 rounded-xl hover:opacity-90 transition-all group shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30">
              <Instagram className="group-hover:scale-110 transition-transform" />
              <span className="font-bold">{t.instagram}</span>
              <ArrowRight className={`ml-auto text-white/50 group-hover:text-white transition-colors ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="mt-12 text-center text-xs text-slate-400 dark:text-slate-500 max-w-xs mx-auto leading-relaxed">
            {t.terms}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
