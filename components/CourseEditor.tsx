import React, { useState } from 'react';
import { Course, CourseStatus, PricingType, Module, Lesson, PAYMENT_METHODS, Language } from '../types';
import { generateCourseDescription, generateCourseSyllabus } from '../services/geminiService';
import { InstapayIcon, FawryIcon, VodafoneCashIcon, OrangeCashIcon } from './Icons';
import { 
  ArrowLeft, 
  Save, 
  Wand2, 
  Plus, 
  Trash2, 
  GripVertical, 
  CheckCircle2, 
  Layers, 
  CreditCard,
  FileText,
  Smartphone,
  Info,
  Sparkles
} from 'lucide-react';

interface CourseEditorProps {
  initialData?: Course;
  onSave: (course: Course) => void;
  onCancel: () => void;
  lang: Language;
}

const emptyCourse: Course = {
  id: '',
  title: '',
  description: '',
  thumbnailUrl: `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`,
  status: CourseStatus.DRAFT,
  modules: [],
  pricing: {
    type: PricingType.FREE,
    price: 0,
    currency: 'USD'
  },
  studentsCount: 0,
  revenue: 0,
  acceptedPaymentMethods: [PAYMENT_METHODS.CARD]
};

const translations = {
  en: {
    editCourse: "Edit Course",
    createNew: "Create New Course",
    draftMode: "Draft Mode",
    publishedLive: "Published Live",
    revertToDraft: "Revert to Draft",
    publishCourse: "Publish Course",
    saveChanges: "Save Changes",
    courseDetails: "Course Details",
    curriculumAi: "Curriculum & Smart Tools",
    monetization: "Monetization",
    magicPower: "Magic Assist",
    magicDesc: "Generate descriptions and syllabi automatically.",
    courseTitle: "Course Title",
    courseTitlePlaceholder: "e.g. Advanced React Patterns",
    description: "Description",
    autoGenerate: "Auto-Generate",
    generating: "Thinking...",
    descPlaceholder: "Describe what students will learn...",
    thumbnailPreview: "Thumbnail Preview",
    changeImage: "Change Image",
    smartSyllabus: "Smart Syllabus Builder",
    smartSyllabusDesc: "Enter target audience or keywords to generate a structure.",
    keywordsPlaceholder: "e.g. Beginners, Math, Experts",
    generate: "Generate",
    courseModules: "Course Modules",
    addModule: "Add Module",
    noContent: "No content yet.",
    startScratch: "Start from scratch",
    or: "or",
    generateAi: "Generate with Magic",
    module: "MODULE",
    newLesson: "New Lesson",
    addLesson: "Add Lesson",
    pricingStrategy: "Pricing Strategy",
    free: "Free",
    freeDesc: "Best for lead generation and community building.",
    oneTime: "One-time",
    oneTimeDesc: "Standard for single courses. Students pay once.",
    subscription: "Subscription",
    subDesc: "Recurring revenue. Good for ongoing content.",
    platformFee: "Platform Transaction Fee",
    feeNotice: "smooth takes a 10% commission on every successful sale.",
    priceAmount: "Price Amount",
    youEarn: "You earn:",
    currency: "Currency",
    billingInterval: "Billing Interval",
    monthly: "Monthly",
    yearly: "Yearly",
    paymentMethods: "Accepted Payment Methods",
    paymentDesc: "Select the payment methods you want to accept from your students.",
    creditCard: "Credit Card (Visa / Mastercard)",
    instapay: "Instapay",
    fawry: "Fawry Pay",
    vodafone: "Vodafone Cash",
    orange: "Orange Cash"
  },
  ar: {
    editCourse: "تعديل الدورة",
    createNew: "إنشاء دورة جديدة",
    draftMode: "وضع المسودة",
    publishedLive: "منشورة",
    revertToDraft: "عودة للمسودة",
    publishCourse: "نشر الدورة",
    saveChanges: "حفظ التغييرات",
    courseDetails: "تفاصيل الدورة",
    curriculumAi: "المنهج والأدوات الذكية",
    monetization: "الربح",
    magicPower: "المساعد السحري",
    magicDesc: "إنشاء الوصف والمناهج تلقائياً.",
    courseTitle: "عنوان الدورة",
    courseTitlePlaceholder: "مثال: أساسيات التصميم",
    description: "الوصف",
    autoGenerate: "إنشاء تلقائي",
    generating: "جاري التفكير...",
    descPlaceholder: "اشرح ما سيتعلمه الطلاب...",
    thumbnailPreview: "معاينة الصورة المصغرة",
    changeImage: "تغيير الصورة",
    smartSyllabus: "باني المناهج الذكي",
    smartSyllabusDesc: "أدخل الجمهور المستهدف لإنشاء الهيكل.",
    keywordsPlaceholder: "مثال: مبتدئين، رياضيات",
    generate: "إنشاء",
    courseModules: "وحدات الدورة",
    addModule: "إضافة وحدة",
    noContent: "لا يوجد محتوى بعد.",
    startScratch: "ابدأ من الصفر",
    or: "أو",
    generateAi: "إنشاء سحري",
    module: "وحدة",
    newLesson: "درس جديد",
    addLesson: "إضافة درس",
    pricingStrategy: "استراتيجية التسعير",
    free: "مجاني",
    freeDesc: "الأفضل لبناء المجتمع وجذب العملاء.",
    oneTime: "مرة واحدة",
    oneTimeDesc: "شراء مرة واحدة. الطلاب يدفعون مرة واحدة.",
    subscription: "اشتراك",
    subDesc: "دخل متكرر. جيد للمحتوى المستمر.",
    platformFee: "رسوم المنصة",
    feeNotice: "تأخذ smooth عمولة 10% على كل عملية بيع ناجحة.",
    priceAmount: "السعر",
    youEarn: "أنت تكسب:",
    currency: "العملة",
    billingInterval: "فترة الفوترة",
    monthly: "شهري",
    yearly: "سنوي",
    paymentMethods: "طرق الدفع المقبولة",
    paymentDesc: "اختر طرق الدفع التي تريد قبولها من طلابك.",
    creditCard: "بطاقة ائتمان (فيزا / ماستركارد)",
    instapay: "انستا باي",
    fawry: "فوري",
    vodafone: "فودافون كاش",
    orange: "أورنج كاش"
  }
};

const CourseEditor: React.FC<CourseEditorProps> = ({ initialData, onSave, onCancel, lang }) => {
  const t = translations[lang];
  const isRTL = lang === 'ar';
  
  const [activeTab, setActiveTab] = useState<'details' | 'curriculum' | 'monetization'>('details');
  const [course, setCourse] = useState<Course>(initialData || { ...emptyCourse, id: Date.now().toString() });
  
  // AI State
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingSyllabus, setIsGeneratingSyllabus] = useState(false);
  const [aiKeywords, setAiKeywords] = useState('');

  const handleAiDescription = async () => {
    if (!course.title) {
      alert("Please enter a course title first.");
      return;
    }
    setIsGeneratingDesc(true);
    const desc = await generateCourseDescription(course.title, aiKeywords || 'general overview');
    setCourse(prev => ({ ...prev, description: desc }));
    setIsGeneratingDesc(false);
  };

  const handleAiSyllabus = async () => {
    if (!course.title) {
      alert("Please enter a course title first.");
      return;
    }
    setIsGeneratingSyllabus(true);
    const syllabus = await generateCourseSyllabus(course.title, aiKeywords || 'beginners');
    
    if (syllabus && syllabus.length > 0) {
      const newModules: Module[] = syllabus.map((item, idx) => ({
        id: Date.now().toString() + idx,
        title: item.moduleTitle,
        lessons: [
          {
            id: Date.now().toString() + idx + 'L1',
            title: `Introduction to ${item.moduleTitle}`,
            content: item.description,
            isFreePreview: idx === 0
          }
        ]
      }));
      setCourse(prev => ({ ...prev, modules: [...prev.modules, ...newModules] }));
    } else {
      alert("Could not generate syllabus. Please try different keywords.");
    }
    setIsGeneratingSyllabus(false);
  };

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: 'New Module',
      lessons: []
    };
    setCourse(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: 'New Lesson',
      content: '',
      isFreePreview: false
    };
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(m => 
        m.id === moduleId ? { ...m, lessons: [...m.lessons, newLesson] } : m
      )
    }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Top Bar */}
      <div className="glass-panel border-b border-slate-200/50 px-8 py-5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <button onClick={onCancel} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{initialData ? t.editCourse : t.createNew}</h1>
            <p className="text-xs font-medium text-slate-400 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${course.status === CourseStatus.PUBLISHED ? 'bg-green-500' : 'bg-amber-400'}`}></span>
                {course.status === CourseStatus.DRAFT ? t.draftMode : t.publishedLive}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setCourse(prev => ({...prev, status: prev.status === CourseStatus.PUBLISHED ? CourseStatus.DRAFT : CourseStatus.PUBLISHED}))}
             className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${course.status === CourseStatus.PUBLISHED ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
           >
             {course.status === CourseStatus.PUBLISHED ? t.revertToDraft : t.publishCourse}
           </button>
          <button 
            onClick={() => onSave(course)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-slate-900/20"
          >
            <Save size={18} />
            {t.saveChanges}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-72 glass-panel border-r border-slate-200 flex-shrink-0 flex flex-col backdrop-blur-sm z-10">
          <nav className="p-6 space-y-2">
            <button
              onClick={() => setActiveTab('details')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'details' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-500'}`}
            >
              <FileText size={20} />
              {t.courseDetails}
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'curriculum' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-500'}`}
            >
              <Layers size={20} />
              {t.curriculumAi}
            </button>
            <button
              onClick={() => setActiveTab('monetization')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'monetization' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-500'}`}
            >
              <CreditCard size={20} />
              {t.monetization}
            </button>
          </nav>
          
          <div className="mt-auto p-6">
             <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-5 text-white shadow-lg">
                <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Sparkles size={16} className="text-white"/>
                    </div>
                    <div>
                        <p className="text-sm font-bold mb-1">{t.magicPower}</p>
                        <p className="text-[11px] text-indigo-200 leading-snug">{t.magicDesc}</p>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/30">
          
          {/* TAB: DETAILS */}
          {activeTab === 'details' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700 ml-1">{t.courseTitle}</label>
                <input 
                  type="text" 
                  value={course.title}
                  onChange={e => setCourse(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={t.courseTitlePlaceholder}
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-lg font-medium shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-sm font-bold text-slate-700">{t.description}</label>
                  <button 
                    onClick={handleAiDescription}
                    disabled={isGeneratingDesc}
                    className="text-xs flex items-center gap-2 text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full font-bold transition-colors disabled:opacity-50"
                  >
                    <Wand2 size={12} />
                    {isGeneratingDesc ? t.generating : t.autoGenerate}
                  </button>
                </div>
                <textarea 
                  value={course.description}
                  onChange={e => setCourse(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  placeholder={t.descPlaceholder}
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700 ml-1">{t.thumbnailPreview}</label>
                <div className="relative group overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 aspect-video max-w-sm shadow-sm hover:shadow-md transition-all">
                  <img src={course.thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <button className="bg-white text-slate-900 px-6 py-3 rounded-xl text-sm font-bold shadow-lg">{t.changeImage}</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
              
              <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 p-8 rounded-3xl shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex-1">
                    <h3 className="text-indigo-900 font-bold text-lg flex items-center gap-2 mb-1">
                        <Sparkles size={20} className="text-indigo-500"/> {t.smartSyllabus}
                    </h3>
                    <p className="text-indigo-700/80 text-sm">{t.smartSyllabusDesc}</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto p-1 bg-white rounded-xl shadow-sm border border-indigo-100">
                    <input 
                        type="text" 
                        placeholder={t.keywordsPlaceholder}
                        className="px-4 py-2 rounded-lg text-sm focus:outline-none flex-1 min-w-[200px]"
                        value={aiKeywords}
                        onChange={(e) => setAiKeywords(e.target.value)}
                    />
                    <button 
                        onClick={handleAiSyllabus}
                        disabled={isGeneratingSyllabus}
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 disabled:opacity-70 whitespace-nowrap transition-colors"
                    >
                        {isGeneratingSyllabus ? t.generating : t.generate}
                    </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">{t.courseModules}</h2>
                    <button onClick={addModule} className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-slate-200">
                        <Plus size={16} /> {t.addModule}
                    </button>
                </div>

                {course.modules.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Layers size={30} />
                        </div>
                        <p className="text-slate-500 font-medium mb-4">{t.noContent}</p>
                        <div className="flex justify-center gap-4 text-sm">
                            <button onClick={addModule} className="text-indigo-600 font-bold hover:underline">{t.startScratch}</button>
                            <span className="text-slate-300">{t.or}</span>
                            <button onClick={() => { setAiKeywords(''); handleAiSyllabus(); }} className="text-indigo-600 font-bold hover:underline">{t.generateAi}</button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {course.modules.map((module, mIdx) => (
                            <div key={module.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center gap-4">
                                    <GripVertical size={20} className="text-slate-300 cursor-move hover:text-slate-500" />
                                    <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md tracking-wide">{t.module} {mIdx + 1}</span>
                                    <input 
                                        type="text" 
                                        value={module.title}
                                        onChange={(e) => {
                                            const newModules = [...course.modules];
                                            newModules[mIdx].title = e.target.value;
                                            setCourse(prev => ({...prev, modules: newModules}));
                                        }}
                                        className="bg-transparent font-bold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded px-3 py-1 flex-1 text-lg"
                                    />
                                    <button 
                                        onClick={() => {
                                            const newModules = course.modules.filter(m => m.id !== module.id);
                                            setCourse(prev => ({...prev, modules: newModules}));
                                        }}
                                        className="text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    {module.lessons.map((lesson, lIdx) => (
                                        <div key={lesson.id} className="flex items-center gap-4 pl-4 group">
                                            <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors"></div>
                                            <input 
                                                type="text" 
                                                value={lesson.title}
                                                onChange={(e) => {
                                                    const newModules = [...course.modules];
                                                    newModules[mIdx].lessons[lIdx].title = e.target.value;
                                                    setCourse(prev => ({...prev, modules: newModules}));
                                                }}
                                                className="flex-1 text-sm font-medium text-slate-600 border border-transparent hover:border-slate-200 focus:border-indigo-500 rounded px-3 py-2 focus:outline-none transition-all"
                                            />
                                            <button 
                                              onClick={() => {
                                                  const newModules = [...course.modules];
                                                  newModules[mIdx].lessons = newModules[mIdx].lessons.filter(l => l.id !== lesson.id);
                                                  setCourse(prev => ({...prev, modules: newModules}));
                                              }}
                                              className="text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button 
                                        onClick={() => addLesson(module.id)}
                                        className={`ml-8 mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors w-fit`}
                                    >
                                        <Plus size={14} /> {t.addLesson}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: MONETIZATION */}
          {activeTab === 'monetization' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
              
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                <h2 className="text-xl font-bold text-slate-800 mb-8">{t.pricingStrategy}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Free Option */}
                    <div 
                        onClick={() => setCourse(prev => ({...prev, pricing: { ...prev.pricing, type: PricingType.FREE, price: 0 }}))}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${course.pricing.type === PricingType.FREE ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 bg-slate-50/50 hover:border-indigo-200 hover:shadow-md'}`}
                    >
                        <div className="flex justify-between items-start mb-3 relative z-10">
                            <span className="font-bold text-slate-900 text-lg">{t.free}</span>
                            {course.pricing.type === PricingType.FREE && <CheckCircle2 size={22} className="text-indigo-600" />}
                        </div>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed relative z-10">{t.freeDesc}</p>
                    </div>

                    {/* One Time */}
                    <div 
                        onClick={() => setCourse(prev => ({...prev, pricing: { ...prev.pricing, type: PricingType.ONE_TIME }}))}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${course.pricing.type === PricingType.ONE_TIME ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 bg-slate-50/50 hover:border-indigo-200 hover:shadow-md'}`}
                    >
                         <div className="flex justify-between items-start mb-3 relative z-10">
                            <span className="font-bold text-slate-900 text-lg">{t.oneTime}</span>
                            {course.pricing.type === PricingType.ONE_TIME && <CheckCircle2 size={22} className="text-indigo-600" />}
                        </div>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed relative z-10">{t.oneTimeDesc}</p>
                    </div>

                    {/* Subscription */}
                    <div 
                        onClick={() => setCourse(prev => ({...prev, pricing: { ...prev.pricing, type: PricingType.SUBSCRIPTION, interval: 'month' }}))}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${course.pricing.type === PricingType.SUBSCRIPTION ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 bg-slate-50/50 hover:border-indigo-200 hover:shadow-md'}`}
                    >
                         <div className="flex justify-between items-start mb-3 relative z-10">
                            <span className="font-bold text-slate-900 text-lg">{t.subscription}</span>
                            {course.pricing.type === PricingType.SUBSCRIPTION && <CheckCircle2 size={22} className="text-indigo-600" />}
                        </div>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed relative z-10">{t.subDesc}</p>
                    </div>
                </div>

                {course.pricing.type !== PricingType.FREE && (
                    <div className="space-y-8 pt-8 border-t border-slate-100">
                        {/* ALERT FOR 10% FEE */}
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
                            <Info className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                            <div>
                                <p className="text-blue-900 font-bold text-sm">{t.platformFee}</p>
                                <p className="text-blue-700/80 text-xs mt-1 leading-relaxed">
                                    {t.feeNotice}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3">{t.priceAmount}</label>
                                <div className="relative">
                                    <span className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 font-bold`}>$</span>
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={course.pricing.price}
                                        onChange={(e) => setCourse(prev => ({...prev, pricing: { ...prev.pricing, price: parseFloat(e.target.value) }}))}
                                        className={`w-full ${isRTL ? 'pr-10 pl-6' : 'pl-10 pr-6'} py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-bold text-slate-800`}
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-2 text-right">{t.youEarn} <span className="font-bold text-emerald-600">${(course.pricing.price * 0.9).toFixed(2)}</span></p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3">{t.currency}</label>
                                <select 
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium text-slate-700 bg-white"
                                    value={course.pricing.currency}
                                    onChange={(e) => setCourse(prev => ({...prev, pricing: { ...prev.pricing, currency: e.target.value }}))}
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                        </div>

                        {course.pricing.type === PricingType.SUBSCRIPTION && (
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3">{t.billingInterval}</label>
                                <div className="flex gap-6 p-1">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${course.pricing.interval === 'month' ? 'border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'}`}>
                                            {course.pricing.interval === 'month' && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>}
                                        </div>
                                        <input 
                                            type="radio" 
                                            name="interval" 
                                            className="hidden"
                                            checked={course.pricing.interval === 'month'}
                                            onChange={() => setCourse(prev => ({...prev, pricing: { ...prev.pricing, interval: 'month' }}))}
                                        />
                                        <span className="text-sm font-bold text-slate-700">{t.monthly}</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${course.pricing.interval === 'year' ? 'border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'}`}>
                                            {course.pricing.interval === 'year' && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>}
                                        </div>
                                        <input 
                                            type="radio" 
                                            name="interval" 
                                            className="hidden"
                                            checked={course.pricing.interval === 'year'}
                                            onChange={() => setCourse(prev => ({...prev, pricing: { ...prev.pricing, interval: 'year' }}))}
                                        />
                                        <span className="text-sm font-bold text-slate-700">{t.yearly}</span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                )}
              </div>

              {/* Payment Methods Section */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                <h2 className="text-xl font-bold text-slate-800 mb-2">{t.paymentMethods}</h2>
                <p className="text-sm text-slate-500 mb-6 font-medium">{t.paymentDesc}</p>
                
                <div className="space-y-4">
                    {/* Card */}
                    <label className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${course.acceptedPaymentMethods.includes('CARD') ? 'border-indigo-200 bg-indigo-50/50' : 'border-slate-100 hover:bg-slate-50'}`}>
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${course.acceptedPaymentMethods.includes('CARD') ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                             {course.acceptedPaymentMethods.includes('CARD') && <CheckCircle2 size={16} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden"
                            checked={course.acceptedPaymentMethods.includes('CARD')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCourse(prev => ({...prev, acceptedPaymentMethods: [...prev.acceptedPaymentMethods, 'CARD']}));
                                } else {
                                    setCourse(prev => ({...prev, acceptedPaymentMethods: prev.acceptedPaymentMethods.filter(m => m !== 'CARD')}));
                                }
                            }}
                        />
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100"><CreditCard className="text-slate-600" size={22} /></div>
                        <span className="font-bold text-slate-800">{t.creditCard}</span>
                    </label>

                    {/* Instapay */}
                    <label className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${course.acceptedPaymentMethods.includes('INSTAPAY') ? 'border-purple-200 bg-purple-50/50' : 'border-slate-100 hover:bg-slate-50'}`}>
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${course.acceptedPaymentMethods.includes('INSTAPAY') ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                             {course.acceptedPaymentMethods.includes('INSTAPAY') && <CheckCircle2 size={16} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden"
                            checked={course.acceptedPaymentMethods.includes('INSTAPAY')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCourse(prev => ({...prev, acceptedPaymentMethods: [...prev.acceptedPaymentMethods, 'INSTAPAY']}));
                                } else {
                                    setCourse(prev => ({...prev, acceptedPaymentMethods: prev.acceptedPaymentMethods.filter(m => m !== 'INSTAPAY')}));
                                }
                            }}
                        />
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100"><InstapayIcon className="w-6 h-6" /></div>
                        <span className="font-bold text-slate-800">{t.instapay}</span>
                    </label>

                    {/* Fawry */}
                    <label className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${course.acceptedPaymentMethods.includes('FAWRY') ? 'border-yellow-200 bg-yellow-50/50' : 'border-slate-100 hover:bg-slate-50'}`}>
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${course.acceptedPaymentMethods.includes('FAWRY') ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                             {course.acceptedPaymentMethods.includes('FAWRY') && <CheckCircle2 size={16} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden"
                            checked={course.acceptedPaymentMethods.includes('FAWRY')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCourse(prev => ({...prev, acceptedPaymentMethods: [...prev.acceptedPaymentMethods, 'FAWRY']}));
                                } else {
                                    setCourse(prev => ({...prev, acceptedPaymentMethods: prev.acceptedPaymentMethods.filter(m => m !== 'FAWRY')}));
                                }
                            }}
                        />
                         <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100"><FawryIcon className="w-6 h-6" /></div>
                        <span className="font-bold text-slate-800">{t.fawry}</span>
                    </label>

                     {/* Vodafone Cash */}
                     <label className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${course.acceptedPaymentMethods.includes(PAYMENT_METHODS.VODAFONE_CASH) ? 'border-red-200 bg-red-50/50' : 'border-slate-100 hover:bg-slate-50'}`}>
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${course.acceptedPaymentMethods.includes(PAYMENT_METHODS.VODAFONE_CASH) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                             {course.acceptedPaymentMethods.includes(PAYMENT_METHODS.VODAFONE_CASH) && <CheckCircle2 size={16} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden"
                            checked={course.acceptedPaymentMethods.includes(PAYMENT_METHODS.VODAFONE_CASH)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCourse(prev => ({...prev, acceptedPaymentMethods: [...prev.acceptedPaymentMethods, PAYMENT_METHODS.VODAFONE_CASH]}));
                                } else {
                                    setCourse(prev => ({...prev, acceptedPaymentMethods: prev.acceptedPaymentMethods.filter(m => m !== PAYMENT_METHODS.VODAFONE_CASH)}));
                                }
                            }}
                        />
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100"><VodafoneCashIcon className="w-6 h-6" /></div>
                        <span className="font-bold text-slate-800">{t.vodafone}</span>
                    </label>

                    {/* Orange Cash */}
                    <label className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${course.acceptedPaymentMethods.includes(PAYMENT_METHODS.ORANGE_CASH) ? 'border-orange-200 bg-orange-50/50' : 'border-slate-100 hover:bg-slate-50'}`}>
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${course.acceptedPaymentMethods.includes(PAYMENT_METHODS.ORANGE_CASH) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                             {course.acceptedPaymentMethods.includes(PAYMENT_METHODS.ORANGE_CASH) && <CheckCircle2 size={16} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden"
                            checked={course.acceptedPaymentMethods.includes(PAYMENT_METHODS.ORANGE_CASH)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCourse(prev => ({...prev, acceptedPaymentMethods: [...prev.acceptedPaymentMethods, PAYMENT_METHODS.ORANGE_CASH]}));
                                } else {
                                    setCourse(prev => ({...prev, acceptedPaymentMethods: prev.acceptedPaymentMethods.filter(m => m !== PAYMENT_METHODS.ORANGE_CASH)}));
                                }
                            }}
                        />
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100"><OrangeCashIcon className="w-6 h-6" /></div>
                        <span className="font-bold text-slate-800">{t.orange}</span>
                    </label>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CourseEditor;