
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import CourseEditor from './components/CourseEditor';
import SubscriptionModal from './components/SubscriptionModal';
import Login from './components/Login';
import { Course, CourseStatus, PricingType, ViewState, TutorSubscription, PlanInterval, Language, Theme, PAYMENT_METHODS, UserRole } from './types';
import { LayoutDashboard, BookOpen, Settings, LogOut, Bell, Crown, Sparkles, Moon, Sun, Globe, GraduationCap } from 'lucide-react';

// Mock Data
const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Master the art of reusable components and state management.',
    thumbnailUrl: 'https://picsum.photos/400/300?random=1',
    status: CourseStatus.PUBLISHED,
    modules: [
        { id: 'm1', title: 'Compound Components', lessons: [] },
        { id: 'm2', title: 'Render Props', lessons: [] }
    ],
    pricing: { type: PricingType.ONE_TIME, price: 49, currency: 'USD' },
    studentsCount: 1240,
    revenue: 60760, // Gross Revenue
    acceptedPaymentMethods: [PAYMENT_METHODS.CARD, PAYMENT_METHODS.INSTAPAY]
  },
  {
    id: '2',
    title: 'UI Design for Developers',
    description: 'Learn color theory, typography, and layout from a dev perspective.',
    thumbnailUrl: 'https://picsum.photos/400/300?random=2',
    status: CourseStatus.PUBLISHED,
    modules: [
         { id: 'm1', title: 'Typography Basics', lessons: [] }
    ],
    pricing: { type: PricingType.SUBSCRIPTION, price: 15, currency: 'USD', interval: 'month' },
    studentsCount: 850,
    revenue: 12750, // Gross Revenue
    acceptedPaymentMethods: [PAYMENT_METHODS.CARD, PAYMENT_METHODS.FAWRY]
  }
];

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('LANDING'); // Start at landing
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  
  // App Settings
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<Language>('en');

  // User State
  const [userRole, setUserRole] = useState<UserRole>('TUTOR');

  // Subscription State
  const [tutorSubscription, setTutorSubscription] = useState<TutorSubscription>({
    active: false,
    plan: null,
    expiryDate: null
  });
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Apply Theme & Lang to body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [theme, lang]);

  // Session Persistence (Cookies) Check
  useEffect(() => {
    const savedSession = localStorage.getItem('smooth_session');
    let sessionFound = false;

    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        if (sessionData && sessionData.role) {
          setUserRole(sessionData.role);
          setViewState('DASHBOARD');
          sessionFound = true;
        }
      } catch (e) {
        localStorage.removeItem('smooth_session');
      }
    }
    
    // Only show Splash sequence if no session found
    if (!sessionFound) {
        const timer = setTimeout(() => {
            setViewState('LOGIN'); 
        }, 2500); 
        return () => clearTimeout(timer);
    }
  }, []);

  const handleLogin = (role: UserRole) => {
    // Save "Cookie"
    localStorage.setItem('smooth_session', JSON.stringify({
      role,
      token: 'mock-token-' + Date.now(),
      loginTime: new Date().toISOString()
    }));
    
    setUserRole(role);
    setViewState('DASHBOARD');
  };

  const handleLogout = () => {
    localStorage.removeItem('smooth_session');
    setViewState('LOGIN');
  };

  const handleCreateCourse = () => {
    if (!tutorSubscription.active) {
      setShowSubscriptionModal(true);
      return;
    }
    setEditingCourseId(null);
    setViewState('COURSE_EDITOR');
  };

  const handleEditCourse = (id: string) => {
    if (!tutorSubscription.active) {
        setShowSubscriptionModal(true);
        return;
      }
    setEditingCourseId(id);
    setViewState('COURSE_EDITOR');
  };

  const handleSaveCourse = (updatedCourse: Course) => {
    setCourses(prev => {
      const exists = prev.find(c => c.id === updatedCourse.id);
      if (exists) {
        return prev.map(c => c.id === updatedCourse.id ? updatedCourse : c);
      } else {
        return [updatedCourse, ...prev];
      }
    });
    setViewState('DASHBOARD');
  };

  const handleSubscribe = (interval: PlanInterval) => {
    setTimeout(() => {
      setTutorSubscription({
        active: true,
        plan: interval,
        expiryDate: new Date(Date.now() + (interval === 'MONTHLY' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString()
      });
      setShowSubscriptionModal(false);
    }, 1000);
  };

  const toggleTheme = () => {
      setTheme(curr => curr === 'light' ? 'dark' : curr === 'dark' ? 'ocean' : 'light');
  };

  const toggleLang = () => {
      setLang(curr => curr === 'en' ? 'ar' : 'en');
  };

  // Splash Screen Component
  if (viewState === 'LANDING') {
      return (
          <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-indigo-900/40 z-0"></div>
             <div className="relative z-10 animate-fade-in flex flex-col items-center">
                 <div className="w-24 h-24 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/50 mb-6 animate-pulse">
                    <Sparkles size={48} className="text-white" />
                 </div>
                 <h1 className="text-5xl font-bold text-white tracking-tight mb-2 font-outfit">smooth</h1>
                 <p className="text-indigo-200 text-sm tracking-widest uppercase">Creator Platform</p>
             </div>
          </div>
      );
  }

  // Login Component
  if (viewState === 'LOGIN') {
      return (
          <Login 
            onLogin={handleLogin} 
            theme={theme} 
            toggleTheme={toggleTheme}
            lang={lang}
            toggleLang={toggleLang}
          />
      );
  }

  const isRTL = lang === 'ar';
  const isStudent = userRole === 'STUDENT';

  return (
    <div className={`min-h-screen flex font-sans text-[var(--text-primary)] transition-colors duration-500 ${isRTL ? 'font-cairo' : 'font-outfit'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      <SubscriptionModal 
        isOpen={showSubscriptionModal} 
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscribe}
        lang={lang}
      />

      {/* Sidebar */}
      <aside className="w-20 lg:w-72 p-4 flex flex-col flex-shrink-0 transition-all duration-300">
        <div className="glass-panel rounded-3xl h-full flex flex-col shadow-xl shadow-indigo-100/50 dark:shadow-none">
            <div className={`h-24 flex items-center justify-center lg:justify-start lg:px-8 border-b border-slate-100/10`}>
                <div className={`w-10 h-10 bg-gradient-to-tr rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30 ${isStudent ? 'from-fuchsia-600 to-violet-600' : 'from-violet-600 to-indigo-600'}`}>
                    <Sparkles size={20} fill="currentColor" />
                </div>
                <span className={`mx-3 font-bold text-2xl hidden lg:block tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>smooth</span>
            </div>

            <nav className="flex-1 p-4 space-y-3">
            <button 
                onClick={() => setViewState('DASHBOARD')}
                className={`w-full flex items-center justify-center lg:justify-start lg:px-6 py-4 rounded-2xl transition-all duration-300 ${viewState === 'DASHBOARD' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-slate-50/50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800'}`}
            >
                <LayoutDashboard size={22} strokeWidth={2} />
                <span className="mx-4 font-semibold hidden lg:block">{lang === 'en' ? 'Dashboard' : 'الرئيسية'}</span>
            </button>
            
            <button 
                onClick={!isStudent ? handleCreateCourse : () => {}} 
                className={`w-full flex items-center justify-center lg:justify-start lg:px-6 py-4 rounded-2xl transition-all duration-300 ${viewState === 'COURSE_EDITOR' && !editingCourseId ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-slate-50/50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800'}`}
            >
                <BookOpen size={22} strokeWidth={2} />
                <span className="mx-4 font-semibold hidden lg:block">{lang === 'en' ? (isStudent ? 'My Courses' : 'Courses') : (isStudent ? 'دوراتي' : 'الدورات')}</span>
            </button>
            
            <button 
                onClick={() => setViewState('SETTINGS')}
                className={`w-full flex items-center justify-center lg:justify-start lg:px-6 py-4 rounded-2xl transition-all duration-300 ${viewState === 'SETTINGS' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50/50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800'}`}
            >
                {tutorSubscription.active && !isStudent ? <Crown size={22} className="text-amber-400" fill="currentColor" /> : <Settings size={22} strokeWidth={2} />}
                <span className="mx-4 font-semibold hidden lg:block">{tutorSubscription.active && !isStudent ? (lang === 'en' ? 'Pro Settings' : 'إعدادات برو') : (lang === 'en' ? 'Settings' : 'الإعدادات')}</span>
            </button>
            </nav>

            <div className="p-4 border-t border-slate-100/10">
            {!tutorSubscription.active && !isStudent && (
                <div className="mb-6 bg-gradient-to-br from-violet-600 to-indigo-600 p-5 rounded-2xl shadow-lg shadow-indigo-500/20 hidden lg:block relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <div className="relative z-10">
                    <p className="text-white font-bold text-lg mb-1">{lang === 'en' ? 'Go Pro' : 'كن محترفاً'}</p>
                    <p className="text-indigo-100 text-sm mb-3 leading-relaxed">{lang === 'en' ? 'Unlock course creation and payments.' : 'افتح إنشاء الدورات والمدفوعات.'}</p>
                    <button 
                        onClick={() => setShowSubscriptionModal(true)}
                        className="w-full bg-white text-indigo-600 text-sm font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                    >
                        {lang === 'en' ? 'Upgrade Now' : 'رقي الآن'}
                    </button>
                </div>
                </div>
            )}
            <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center lg:justify-start lg:px-6 py-4 rounded-2xl hover:bg-red-50 text-red-400 hover:text-red-500 transition-all dark:hover:bg-red-900/20"
            >
                <LogOut size={22} strokeWidth={2} />
                <span className="mx-4 font-semibold hidden lg:block">{lang === 'en' ? 'Log Out' : 'تسجيل خروج'}</span>
            </button>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col h-screen overflow-hidden py-4 ${isRTL ? 'pl-4 pr-0' : 'pr-4 pl-0'}`}>
        <div className="glass-panel rounded-3xl h-full flex flex-col shadow-xl shadow-indigo-100/50 dark:shadow-none overflow-hidden relative">
            {/* Top Header */}
            <header className="h-24 flex items-center justify-between px-10 flex-shrink-0">
                <div>
                    <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                        {lang === 'en' ? (isStudent ? 'Hello, Alex 👋' : 'Hello, Jason 👋') : (isStudent ? 'مرحباً، أليكس 👋' : 'مرحباً، جيسون 👋')}
                    </h1>
                    <div className="text-sm text-slate-500 mt-1">
                    {new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
                <div className="flex items-center gap-6">
                {!isStudent && tutorSubscription.active && (
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 flex items-center gap-2 shadow-sm">
                        <Crown size={14} fill="currentColor" /> {lang === 'en' ? 'PRO MEMBER' : 'عضو محترف'}
                    </span>
                )}
                {isStudent && (
                    <span className="text-xs font-bold text-fuchsia-600 bg-fuchsia-50 px-4 py-2 rounded-full border border-fuchsia-100 flex items-center gap-2 shadow-sm">
                        <GraduationCap size={14} fill="currentColor" /> {lang === 'en' ? 'STUDENT' : 'طالب'}
                    </span>
                )}
                <button className="p-3 text-slate-400 hover:bg-slate-50 hover:text-indigo-600 rounded-full relative transition-colors dark:hover:bg-slate-800">
                    <Bell size={22} />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-base shadow-inner">
                    {isStudent ? 'AX' : 'JD'}
                </div>
                </div>
            </header>

            {/* View Router */}
            <div className="flex-1 overflow-auto">
            {viewState === 'DASHBOARD' && (
                <div className="p-10">
                <Dashboard 
                    courses={courses} 
                    onCreateCourse={handleCreateCourse} 
                    onEditCourse={handleEditCourse}
                    isSubscribed={tutorSubscription.active}
                    onSubscribeClick={() => setShowSubscriptionModal(true)}
                    lang={lang}
                    userRole={userRole}
                />
                </div>
            )}
            
            {viewState === 'COURSE_EDITOR' && (
                <div className="h-full">
                <CourseEditor 
                    initialData={courses.find(c => c.id === editingCourseId)}
                    onSave={handleSaveCourse}
                    onCancel={() => setViewState('DASHBOARD')}
                    lang={lang}
                />
                </div>
            )}

            {viewState === 'SETTINGS' && (
                <div className="p-10 max-w-2xl mx-auto animate-fade-in">
                    <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{lang === 'en' ? 'Appearance & Preferences' : 'المظهر والتفضيلات'}</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between dark:bg-slate-800/50 dark:border-slate-700">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm dark:bg-slate-700">
                                    {theme === 'light' ? <Sun className="text-amber-500" /> : <Moon className="text-indigo-400" />}
                                </div>
                                <div>
                                    <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{lang === 'en' ? 'Theme Mode' : 'وضع السمة'}</h3>
                                    <p className="text-sm text-slate-500">{lang === 'en' ? 'Switch between Light, Dark, and Ocean themes.' : 'التبديل بين الفاتح، الداكن، والمحيط.'}</p>
                                </div>
                            </div>
                            <button 
                                onClick={toggleTheme}
                                className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            >
                                {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </button>
                        </div>

                        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between dark:bg-slate-800/50 dark:border-slate-700">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm dark:bg-slate-700">
                                    <Globe className="text-blue-500" />
                                </div>
                                <div>
                                    <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{lang === 'en' ? 'Language' : 'اللغة'}</h3>
                                    <p className="text-sm text-slate-500">{lang === 'en' ? 'Change application language.' : 'تغيير لغة التطبيق.'}</p>
                                </div>
                            </div>
                            <button 
                                onClick={toggleLang}
                                className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            >
                                {lang === 'en' ? 'English' : 'العربية'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;
