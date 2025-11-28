
import React, { useState } from 'react';
import { UserRole, Theme, Language } from '../types';
import { Sun, Moon, Globe, Mail, Facebook, Instagram, User, GraduationCap, ArrowRight, Sparkles, Smartphone, Loader2, Phone, MessageSquare, PhoneCall, ArrowLeft, Key, AtSign, UserCircle } from 'lucide-react';

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
    loginMethod: "Select Login Method",
    gmail: "Gmail",
    facebook: "Facebook",
    instagram: "Instagram",
    phone: "Phone Number",
    enterPhone: "Enter your mobile number",
    sendCode: "Send Verification Code",
    verify: "Verify & Login",
    enterCode: "Enter the 4-digit code sent to",
    resend: "Resend Code",
    terms: "By continuing, you agree to our Terms of Service and Privacy Policy.",
    tutorDesc: "Create courses, manage students, and earn revenue.",
    studentDesc: "Discover new skills and learn from experts.",
    connecting: "Connecting...",
    verifying: "Verifying Credentials...",
    invalidPhone: "Please enter a valid phone number (e.g. 010xxxxxxxx)",
    or: "Or continue with social media",
    chooseMethod: "How should we send the code?",
    smsOption: "SMS Message",
    callOption: "Phone Call",
    sendingCode: "Sending Code...",
    callingYou: "Calling You...",
    email: "Email Address",
    password: "Password",
    login: "Log In",
    back: "Back",
    username: "Username, phone, or email",
    forgotPass: "Forgot password?",
    fillFields: "Please fill in all fields."
  },
  ar: {
    welcome: "مرحباً بك في سموث",
    subtitle: "المنصة للمبدعين والمتعلمين.",
    iamTutor: "أنا معلم",
    iamStudent: "أنا طالب",
    loginMethod: "اختر طريقة الدخول",
    gmail: "جيميل",
    facebook: "فيسبوك",
    instagram: "انستجرام",
    phone: "رقم الهاتف",
    enterPhone: "أدخل رقم هاتفك المحمول",
    sendCode: "أرسل كود التحقق",
    verify: "تحقق ودخول",
    enterCode: "أدخل الكود المكون من 4 أرقام المرسل إلى",
    resend: "إعادة إرسال",
    terms: "بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية.",
    tutorDesc: "أنشئ دورات، أدر الطلاب، وحقق أرباحاً.",
    studentDesc: "اكتشف مهارات جديدة وتعلم من الخبراء.",
    connecting: "جاري الاتصال...",
    verifying: "جاري التحقق من البيانات...",
    invalidPhone: "يرجى إدخال رقم هاتف صحيح (مثال 010xxxxxxxx)",
    or: "أو تابع عبر التواصل الاجتماعي",
    chooseMethod: "كيف تريد استلام الكود؟",
    smsOption: "رسالة نصية",
    callOption: "مكالمة هاتفية",
    sendingCode: "جاري الإرسال...",
    callingYou: "جاري الاتصال...",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    login: "تسجيل دخول",
    back: "رجوع",
    username: "اسم المستخدم، الهاتف، أو البريد",
    forgotPass: "نسيت كلمة المرور؟",
    fillFields: "يرجى ملء جميع الحقول."
  }
};

type LoginView = 'MENU' | 'PHONE_INPUT' | 'PHONE_OTP' | 'GMAIL_FORM' | 'FB_FORM' | 'INSTA_FORM';
type VerificationMethod = 'SMS' | 'CALL';

const Login: React.FC<LoginProps> = ({ onLogin, theme, toggleTheme, lang, toggleLang }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('TUTOR');
  const [currentView, setCurrentView] = useState<LoginView>('MENU');
  
  // Phone Auth State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>('SMS');
  const [otp, setOtp] = useState('');
  
  // Standard Auth State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const t = translations[lang];
  const isRTL = lang === 'ar';

  const validatePhone = (num: string) => {
    const phoneRegex = /^01[0125][0-9]{8}$/;
    return phoneRegex.test(num);
  };

  const resetForms = () => {
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setOtp('');
      setError('');
  };

  const handleBack = () => {
    setCurrentView('MENU');
    resetForms();
  };

  const handleLoginSubmit = () => {
      setError('');
      
      // Validation
      if (currentView === 'GMAIL_FORM' && (!email || !password)) {
          setError(t.fillFields);
          return;
      }
      if ((currentView === 'FB_FORM' || currentView === 'INSTA_FORM') && (!email || !password)) {
          setError(t.fillFields);
          return;
      }

      setIsProcessing(true);
      
      // Simulate API verification
      setTimeout(() => {
          setIsProcessing(false);
          onLogin(selectedRole);
      }, 2000);
  };

  const handleSendCode = () => {
    setError('');
    if (!validatePhone(phoneNumber)) {
        setError(t.invalidPhone);
        return;
    }
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentView('PHONE_OTP');
    }, 800);
  };

  const handleVerifyOtp = () => {
      setError('');
      if (otp.length !== 4) {
          setError('Invalid Code');
          return;
      }
      setIsProcessing(true);
      setTimeout(() => {
          onLogin(selectedRole);
      }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[var(--bg-primary)] transition-colors duration-500" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Background FX */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Settings */}
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

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 p-4">
        
        {/* Role Selection */}
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

        {/* Login Forms */}
        <div className="flex flex-col justify-center p-8 lg:p-12 animate-fade-in relative" style={{ animationDelay: '0.2s' }}>
          
          {/* Main Menu View */}
          {currentView === 'MENU' && (
             <div className="space-y-6">
                 <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.loginMethod}</h2>
                 
                 <div className="space-y-3">
                    <button onClick={() => setCurrentView('PHONE_INPUT')} className="w-full flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:shadow-md transition-all group">
                        <div className="p-2 bg-indigo-50 dark:bg-slate-700 rounded-lg text-indigo-600"><Smartphone size={20} /></div>
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-sm flex-1 text-left">{t.phone}</span>
                        <ArrowRight size={16} className={`text-slate-300 group-hover:text-indigo-500 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>

                    <button onClick={() => setCurrentView('GMAIL_FORM')} className="w-full flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-500 hover:shadow-md transition-all group">
                        <div className="p-2 bg-red-50 dark:bg-slate-700 rounded-lg text-red-500"><Mail size={20} /></div>
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-sm flex-1 text-left">{t.gmail}</span>
                        <ArrowRight size={16} className={`text-slate-300 group-hover:text-red-500 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>

                    <button onClick={() => setCurrentView('FB_FORM')} className="w-full flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-600 hover:shadow-md transition-all group">
                        <div className="p-2 bg-blue-50 dark:bg-slate-700 rounded-lg text-blue-600"><Facebook size={20} /></div>
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-sm flex-1 text-left">{t.facebook}</span>
                        <ArrowRight size={16} className={`text-slate-300 group-hover:text-blue-600 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>

                    <button onClick={() => setCurrentView('INSTA_FORM')} className="w-full flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-pink-500 hover:shadow-md transition-all group">
                        <div className="p-2 bg-pink-50 dark:bg-slate-700 rounded-lg text-pink-500"><Instagram size={20} /></div>
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-sm flex-1 text-left">{t.instagram}</span>
                        <ArrowRight size={16} className={`text-slate-300 group-hover:text-pink-500 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                 </div>
                 
                 <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500 max-w-xs mx-auto leading-relaxed">
                    {t.terms}
                </div>
             </div>
          )}

          {/* Phone Form View */}
          {currentView === 'PHONE_INPUT' && (
              <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-4 mb-2">
                      <button onClick={handleBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} /></button>
                      <h2 className="text-xl font-bold text-[var(--text-primary)]">{t.phone}</h2>
                  </div>

                  <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t.enterPhone}</label>
                            <div className="relative">
                                <Phone className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={20} />
                                <input 
                                    type="tel" 
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="01xxxxxxxxx"
                                    className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-mono text-lg`}
                                />
                            </div>
                            {error && <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">{t.chooseMethod}</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={() => setVerificationMethod('SMS')}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all font-bold text-sm ${verificationMethod === 'SMS' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400'}`}
                                >
                                    <MessageSquare size={18} />
                                    {t.smsOption}
                                </button>
                                <button 
                                    onClick={() => setVerificationMethod('CALL')}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all font-bold text-sm ${verificationMethod === 'CALL' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400'}`}
                                >
                                    <PhoneCall size={18} />
                                    {t.callOption}
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={handleSendCode}
                            disabled={isProcessing}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-xl font-bold shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-80 mt-4"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    {verificationMethod === 'SMS' ? t.sendingCode : t.callingYou}
                                </>
                            ) : (
                                <>
                                    {t.sendCode} <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
                                </>
                            )}
                        </button>
                    </div>
              </div>
          )}

          {/* OTP View */}
          {currentView === 'PHONE_OTP' && (
              <div className="space-y-6 animate-fade-in">
                 <div className="flex items-center gap-4 mb-2">
                      <button onClick={() => setCurrentView('PHONE_INPUT')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} /></button>
                      <h2 className="text-xl font-bold text-[var(--text-primary)]">{t.verify}</h2>
                  </div>
                 
                 <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-100 dark:border-indigo-800">
                    <p className="text-sm text-center text-indigo-900 dark:text-indigo-200">
                        {t.enterCode} <strong>{phoneNumber}</strong>
                        <br />
                        <span className="text-xs opacity-70 mt-1 block">
                            ({verificationMethod === 'SMS' ? 'Sent via SMS' : 'Sent via Call'})
                        </span>
                    </p>
                </div>

                <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4].map((_, i) => (
                        <input 
                            key={i}
                            type="text" 
                            maxLength={1}
                            className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all dark:bg-slate-800 dark:border-slate-700"
                            value={otp[i] || ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val.match(/[0-9]/)) {
                                    setOtp(prev => {
                                        const next = prev.split('');
                                        next[i] = val;
                                        return next.join('');
                                    });
                                    if (i < 3) {
                                        const nextInput = document.querySelectorAll('input')[i + 2] as HTMLInputElement;
                                        if (nextInput) nextInput.focus();
                                    }
                                } else if (val === '') {
                                    setOtp(prev => {
                                        const next = prev.split('');
                                        next[i] = '';
                                        return next.join('');
                                    });
                                }
                            }}
                        />
                    ))}
                </div>
                {error && <p className="text-red-500 text-center text-xs font-bold">{error}</p>}
                
                <button 
                    onClick={handleVerifyOtp}
                    disabled={isProcessing}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                >
                    {isProcessing ? <Loader2 size={20} className="animate-spin" /> : t.verify}
                </button>
              </div>
          )}

          {/* GMAIL Form */}
          {currentView === 'GMAIL_FORM' && (
              <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-4 mb-4">
                      <button onClick={handleBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} /></button>
                      <h2 className="text-xl font-bold text-red-500 flex items-center gap-2"><Mail size={24} /> {t.gmail}</h2>
                  </div>

                  <div className="space-y-4">
                      <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t.email}</label>
                          <div className="relative">
                            <AtSign className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
                            <input 
                                type="email" 
                                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 outline-none`}
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t.password}</label>
                          <div className="relative">
                            <Key className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
                            <input 
                                type="password" 
                                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 outline-none`}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                      </div>

                      {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                      <button 
                          onClick={handleLoginSubmit}
                          disabled={isProcessing}
                          className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2 mt-4"
                      >
                          {isProcessing ? <><Loader2 size={20} className="animate-spin" /> {t.verifying}</> : t.login}
                      </button>
                  </div>
              </div>
          )}

          {/* Facebook Form */}
          {currentView === 'FB_FORM' && (
              <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-4 mb-4">
                      <button onClick={handleBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} /></button>
                      <h2 className="text-xl font-bold text-[#1877F2] flex items-center gap-2"><Facebook size={24} /> {t.facebook}</h2>
                  </div>

                  <div className="space-y-4">
                      <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t.email} / {t.phone}</label>
                          <div className="relative">
                            <UserCircle className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
                            <input 
                                type="text" 
                                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#1877F2] outline-none`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t.password}</label>
                          <div className="relative">
                            <Key className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
                            <input 
                                type="password" 
                                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#1877F2] outline-none`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                      </div>

                      {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                      <button 
                          onClick={handleLoginSubmit}
                          disabled={isProcessing}
                          className="w-full bg-[#1877F2] hover:bg-blue-700 text-white p-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-4"
                      >
                          {isProcessing ? <><Loader2 size={20} className="animate-spin" /> {t.verifying}</> : t.login}
                      </button>
                  </div>
              </div>
          )}

          {/* Instagram Form */}
          {currentView === 'INSTA_FORM' && (
              <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-4 mb-4">
                      <button onClick={handleBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} /></button>
                      <h2 className="text-xl font-bold text-pink-600 flex items-center gap-2"><Instagram size={24} /> {t.instagram}</h2>
                  </div>

                  <div className="space-y-4">
                      <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t.username}</label>
                          <div className="relative">
                            <User className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
                            <input 
                                type="text" 
                                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t.password}</label>
                          <div className="relative">
                            <Key className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
                            <input 
                                type="password" 
                                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                      </div>

                      {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                      <button 
                          onClick={handleLoginSubmit}
                          disabled={isProcessing}
                          className="w-full bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] text-white p-4 rounded-xl font-bold shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2 mt-4 hover:opacity-90"
                      >
                          {isProcessing ? <><Loader2 size={20} className="animate-spin" /> {t.verifying}</> : t.login}
                      </button>
                      <p className="text-center text-xs text-blue-900 dark:text-blue-300 font-bold cursor-pointer hover:underline">{t.forgotPass}</p>
                  </div>
              </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Login;
