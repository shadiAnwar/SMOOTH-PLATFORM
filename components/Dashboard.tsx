
import React from 'react';
import { Course, CourseStatus, Language, UserRole } from '../types';
import { 
  Plus, 
  Users, 
  DollarSign, 
  BookOpen, 
  Search,
  TrendingUp,
  ArrowUpRight,
  PieChart,
  Crown,
  GraduationCap,
  Clock,
  Award,
  PlayCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DashboardProps {
  courses: Course[];
  onCreateCourse: () => void;
  onEditCourse: (courseId: string) => void;
  isSubscribed: boolean;
  onSubscribeClick: () => void;
  lang: Language;
  userRole: UserRole;
}

const translations = {
  en: {
    heroTitleTutor: "Create your next masterpiece.",
    heroSubtitleTutor: "Use our smart tools to build engaging courses in minutes.",
    heroTitleStudent: "Continue your learning journey.",
    heroSubtitleStudent: "Explore thousands of courses and master new skills today.",
    unlockPro: "Unlock Pro Features",
    newCourse: "New Course",
    browseCourses: "Browse Courses",
    netEarnings: "Net Earnings (After 10% Fee)",
    gross: "Gross",
    fee: "Fee",
    totalStudents: "Total Students",
    activeLearners: "Active learners across all courses",
    activeCourses: "Active Courses",
    draftsWaiting: "drafts waiting to publish",
    yourCourses: "Your Courses",
    myLearning: "My Learning",
    searchPlaceholder: "Search...",
    noCoursesTutor: "No courses yet.",
    noCoursesStudent: "You haven't enrolled in any courses yet.",
    thName: "Course Name",
    thStatus: "Status",
    thPrice: "Price",
    thEarnings: "Earnings (Net)",
    thProgress: "Progress",
    statusPublished: "Published",
    statusDraft: "Draft",
    revenueTrend: "Revenue Trend",
    netEarningsPerCourse: "Net Earnings per Course",
    platformFeeNotice: "10% Platform Fee is deducted automatically from every transaction.",
    coursesEnrolled: "Courses Enrolled",
    hoursLearned: "Hours Learned",
    certificates: "Certificates",
    startLearning: "Start Learning"
  },
  ar: {
    heroTitleTutor: "أبدع في دورتك القادمة.",
    heroSubtitleTutor: "استخدم أدواتنا الذكية لبناء دورات تفاعلية في دقائق.",
    heroTitleStudent: "واصل رحلتك التعليمية.",
    heroSubtitleStudent: "استكشف آلاف الدورات وأتقن مهارات جديدة اليوم.",
    unlockPro: "تفعيل الميزات الاحترافية",
    newCourse: "دورة جديدة",
    browseCourses: "تصفح الدورات",
    netEarnings: "صافي الأرباح (بعد خصم 10%)",
    gross: "الإجمالي",
    fee: "الرسوم",
    totalStudents: "إجمالي الطلاب",
    activeLearners: "طلاب نشطين في جميع الدورات",
    activeCourses: "الدورات النشطة",
    draftsWaiting: "مسودات بانتظار النشر",
    yourCourses: "دوراتك التدريبية",
    myLearning: "تعلمي",
    searchPlaceholder: "بحث...",
    noCoursesTutor: "لا توجد دورات بعد.",
    noCoursesStudent: "لم تقم بالتسجيل في أي دورات بعد.",
    thName: "اسم الدورة",
    thStatus: "الحالة",
    thPrice: "السعر",
    thEarnings: "الأرباح (الصافي)",
    thProgress: "التقدم",
    statusPublished: "منشور",
    statusDraft: "مسودة",
    revenueTrend: "مؤشر الإيرادات",
    netEarningsPerCourse: "صافي الربح لكل دورة",
    platformFeeNotice: "يتم خصم 10% رسوم المنصة تلقائياً من كل عملية بيع.",
    coursesEnrolled: "الدورات المسجلة",
    hoursLearned: "ساعات التعلم",
    certificates: "الشهادات",
    startLearning: "ابدأ التعلم"
  }
};

const Dashboard: React.FC<DashboardProps> = ({ courses, onCreateCourse, onEditCourse, isSubscribed, onSubscribeClick, lang, userRole }) => {
  const t = translations[lang];
  const isRTL = lang === 'ar';
  const isStudent = userRole === 'STUDENT';
  
  const totalStudents = courses.reduce((acc, c) => acc + c.studentsCount, 0);
  const totalGrossRevenue = courses.reduce((acc, c) => acc + c.revenue, 0);
  
  // Platform Fee Calculation (10%)
  const platformFee = totalGrossRevenue * 0.10;
  const netEarnings = totalGrossRevenue - platformFee;

  const activeCourses = courses.filter(c => c.status === CourseStatus.PUBLISHED).length;

  const chartData = courses.map(c => ({
    name: c.title.substring(0, 15) + '...',
    netRevenue: c.revenue * 0.9,
  }));

  // Student Mock Stats
  const studentCoursesCount = 4;
  const hoursLearned = 12;
  const certificatesEarned = 1;

  return (
    <div className="space-y-10 animate-fade-in max-w-7xl mx-auto">
      
      {/* Hero / Action */}
      <div className={`bg-gradient-to-r rounded-3xl p-8 text-white shadow-xl relative overflow-hidden ${isStudent ? 'from-violet-600 to-fuchsia-600 shadow-fuchsia-200/50' : 'from-violet-600 to-indigo-600 shadow-indigo-200/50'}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <h2 className="text-3xl font-bold mb-2">{isStudent ? t.heroTitleStudent : t.heroTitleTutor}</h2>
                <p className="text-indigo-100 max-w-lg text-lg">{isStudent ? t.heroSubtitleStudent : t.heroSubtitleTutor}</p>
            </div>
            <div className="flex items-center gap-4">
                 {!isStudent && !isSubscribed && (
                    <button
                    onClick={onSubscribeClick}
                    className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-white/30 transition-all flex items-center gap-2"
                    >
                    <Crown size={18} />
                    {t.unlockPro}
                    </button>
                )}
                <button
                onClick={!isStudent ? onCreateCourse : () => {}}
                className={`bg-white px-6 py-3.5 rounded-2xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-black/10 flex items-center gap-2 ${isStudent ? 'text-fuchsia-600 hover:bg-fuchsia-50' : 'text-indigo-600 hover:bg-indigo-50'}`}
                >
                {isStudent ? <BookOpen size={20} /> : <Plus size={20} />}
                {isStudent ? t.browseCourses : t.newCourse}
                </button>
            </div>
        </div>
      </div>

      {/* Stats Cards - Conditional Render */}
      {!isStudent ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
                    <DollarSign size={26} />
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{isRTL ? '%12+' : '+12%'}</span>
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">{t.netEarnings}</p>
            <h3 className={`text-4xl font-bold text-slate-800 ${isRTL ? 'font-ar' : ''}`}>${netEarnings.toLocaleString()}</h3>
            <p className="text-xs text-slate-400 mt-2 flex gap-2">
                <span>{t.gross}: ${totalGrossRevenue.toLocaleString()}</span>
                <span>•</span>
                <span>{t.fee}: -${platformFee.toLocaleString()}</span>
            </p>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl group-hover:scale-110 transition-transform">
                    <Users size={26} />
                </div>
                <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded-full">{isRTL ? '%5+' : '+5%'}</span>
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">{t.totalStudents}</p>
            <h3 className={`text-4xl font-bold text-slate-800 ${isRTL ? 'font-ar' : ''}`}>{totalStudents.toLocaleString()}</h3>
            <p className="text-xs text-slate-400 mt-2">{t.activeLearners}</p>
            </div>

            <div className="glass-panel p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                    <BookOpen size={26} />
                </div>
                <div className="flex -space-x-2">
                    {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>)}
                </div>
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">{t.activeCourses}</p>
            <h3 className={`text-4xl font-bold text-slate-800 ${isRTL ? 'font-ar' : ''}`}>{activeCourses}</h3>
            <p className="text-xs text-slate-400 mt-2">{courses.length - activeCourses} {t.draftsWaiting}</p>
            </div>
        </div>
      ) : (
        /* Student Stats */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-fuchsia-50 text-fuchsia-600 rounded-2xl group-hover:scale-110 transition-transform">
                        <BookOpen size={26} />
                    </div>
                </div>
                <p className="text-sm font-semibold text-slate-500 mb-1">{t.coursesEnrolled}</p>
                <h3 className={`text-4xl font-bold text-slate-800 ${isRTL ? 'font-ar' : ''}`}>{studentCoursesCount}</h3>
            </div>
            <div className="glass-panel p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:scale-110 transition-transform">
                        <Clock size={26} />
                    </div>
                </div>
                <p className="text-sm font-semibold text-slate-500 mb-1">{t.hoursLearned}</p>
                <h3 className={`text-4xl font-bold text-slate-800 ${isRTL ? 'font-ar' : ''}`}>{hoursLearned}h</h3>
            </div>
            <div className="glass-panel p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-yellow-50 text-yellow-600 rounded-2xl group-hover:scale-110 transition-transform">
                        <Award size={26} />
                    </div>
                </div>
                <p className="text-sm font-semibold text-slate-500 mb-1">{t.certificates}</p>
                <h3 className={`text-4xl font-bold text-slate-800 ${isRTL ? 'font-ar' : ''}`}>{certificatesEarned}</h3>
            </div>
        </div>
      )}

      {/* Analytics & List Grid */}
      <div className={`grid grid-cols-1 ${!isStudent ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-8`}>
        
        {/* Course List */}
        <div className={`${!isStudent ? 'lg:col-span-2' : ''} glass-panel rounded-3xl shadow-lg flex flex-col overflow-hidden`}>
          <div className="p-8 border-b border-slate-100/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">{isStudent ? t.myLearning : t.yourCourses}</h2>
            <div className="relative group w-full sm:w-auto">
              <Search className={`absolute top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors ${isRTL ? 'left-4' : 'left-4'}`} size={18} />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder} 
                className="pl-11 pr-5 py-2.5 bg-slate-50/50 border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 transition-all w-full sm:w-64"
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {courses.length === 0 ? (
              <div className="p-16 text-center text-slate-500">
                <p>{isStudent ? t.noCoursesStudent : t.noCoursesTutor}</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/30 text-slate-500 text-xs uppercase tracking-wider">
                    <th className={`px-8 py-5 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>{t.thName}</th>
                    {!isStudent && <th className={`px-8 py-5 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>{t.thStatus}</th>}
                    {!isStudent && <th className={`px-8 py-5 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>{t.thPrice}</th>}
                    {isStudent ? (
                        <th className={`px-8 py-5 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>{t.thProgress}</th>
                    ) : (
                        <th className={`px-8 py-5 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>{t.thEarnings}</th>
                    )}
                    <th className="px-8 py-5 font-bold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => !isStudent && onEditCourse(course.id)}>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src={course.thumbnailUrl} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm bg-slate-200" />
                          <div>
                            <p className="font-bold text-slate-800 text-base">{course.title}</p>
                            <p className="text-xs text-slate-500 font-medium">{course.modules.length} modules</p>
                          </div>
                        </div>
                      </td>
                      {!isStudent && (
                        <>
                            <td className="px-8 py-5">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold
                                ${course.status === CourseStatus.PUBLISHED ? 'bg-emerald-100 text-emerald-700' : 
                                    course.status === CourseStatus.DRAFT ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                                {course.status === CourseStatus.PUBLISHED ? t.statusPublished : t.statusDraft}
                                </span>
                            </td>
                            <td className="px-8 py-5 text-slate-600 font-medium text-sm">
                                {course.pricing.type === 'FREE' ? 'Free' : `$${course.pricing.price}`}
                            </td>
                            <td className="px-8 py-5 text-slate-800 font-bold text-sm">
                                ${(course.revenue * 0.9).toLocaleString()}
                            </td>
                        </>
                      )}
                      {isStudent && (
                          <td className="px-8 py-5">
                              <div className="w-full bg-slate-100 rounded-full h-2 max-w-[100px]">
                                  <div className="bg-fuchsia-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1 font-bold">45%</p>
                          </td>
                      )}
                      <td className={`px-8 py-5 ${isRTL ? 'text-left' : 'text-right'}`}>
                         {isStudent ? (
                             <button className="p-2 rounded-full bg-fuchsia-50 text-fuchsia-600 hover:bg-fuchsia-100 transition-colors">
                                 <PlayCircle size={20} />
                             </button>
                         ) : (
                             <div className="p-2 rounded-full hover:bg-white hover:shadow-sm text-slate-400 hover:text-indigo-600 inline-block transition-all">
                                <ArrowUpRight size={18} className={isRTL ? 'rotate-180' : ''} />
                             </div>
                         )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Mini Analytics (Hidden for Students) */}
        {!isStudent && (
            <div className="glass-panel rounded-3xl shadow-lg p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">{t.revenueTrend}</h2>
                    <p className="text-xs text-slate-400 font-medium">{t.netEarningsPerCourse}</p>
                </div>
                <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
                    <TrendingUp size={20} />
                </div>
            </div>
            <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                        cursor={{ fill: '#F8FAFC' }} 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="netRevenue" fill="url(#colorGradient)" radius={[6, 6, 6, 6]} />
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-6 flex items-center gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                <PieChart size={20} className="text-slate-400 shrink-0" />
                <p className="text-xs text-slate-500">
                    {t.platformFeeNotice.split('10%').map((part, i) => (
                        <React.Fragment key={i}>
                            {i === 1 ? <span className="font-bold text-slate-700">10%</span> : null}
                            {part}
                        </React.Fragment>
                    ))}
                </p>
            </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
