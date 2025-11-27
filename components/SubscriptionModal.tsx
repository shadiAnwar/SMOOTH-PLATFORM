import React, { useState } from 'react';
import { PlanInterval, PAYMENT_METHODS, Language } from '../types';
import { Check, X, CreditCard, ArrowLeft, Lock, ChevronRight, Copy, Sparkles } from 'lucide-react';
import { InstapayIcon, FawryIcon, VodafoneCashIcon, OrangeCashIcon } from './Icons';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (interval: PlanInterval) => void;
  lang: Language;
}

type PaymentMethod = 'CARD' | 'INSTAPAY' | 'FAWRY' | 'VODAFONE_CASH' | 'ORANGE_CASH';
type Step = 'PLAN_SELECTION' | 'PAYMENT_DETAILS';

const translations = {
  en: {
    becomePro: "Become a Smooth Pro",
    secureCheckout: "Secure Checkout",
    unlockDesc: "Unlock unlimited course creation & payments.",
    completingPayment: "Completing payment for",
    monthly: "Monthly",
    yearly: "Yearly",
    save17: "SAVE 17%",
    perMo: "/mo",
    perYr: "/yr",
    feat1: "Create and publish unlimited courses",
    feat2: "Accept Instapay, Fawry, and Cards",
    feat3: "Advanced smart curriculum tools",
    selectMethod: "Select Payment Method",
    creditCard: "Credit Card",
    instapay: "Instapay",
    fawry: "Fawry Pay",
    vodafone: "Vodafone Cash",
    orange: "Orange Cash",
    continuePayment: "Continue to Payment",
    totalAmount: "Total Amount",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cardName: "Cardholder Name",
    scanSend: "Scan or send to:",
    sendExactly: "Send exactly",
    enterAddress: "Enter your Address / Phone",
    verifyNote: "We need this to verify your transaction.",
    fawryRef: "Fawry Reference Number",
    payAtStore: "Pay at any Fawry terminal within",
    hours24: "24 hours",
    instructions: "Instructions:",
    fawrySteps: [
      "Go to any store with a Fawry machine.",
      "Ask for 'Fawry Pay' service.",
      "Provide the reference code above.",
      "Pay the amount",
      "Keep your receipt."
    ],
    vodafoneTitle: "Vodafone Cash Transfer",
    orangeTitle: "Orange Cash Transfer",
    walletNumber: "Wallet Number",
    processing: "Processing Payment...",
    pay: "Pay",
    checkStatus: "I Have Paid / Check Status"
  },
  ar: {
    becomePro: "اشترك في سموث برو",
    secureCheckout: "دفع آمن",
    unlockDesc: "افتح إنشاء دورات غير محدود والمدفوعات.",
    completingPayment: "إكمال الدفع لـ",
    monthly: "شهري",
    yearly: "سنوي",
    save17: "وفر 17%",
    perMo: "/شهر",
    perYr: "/سنة",
    feat1: "إنشاء ونشر دورات غير محدودة",
    feat2: "قبول انستا باي، فوري، والبطاقات",
    feat3: "أدوات منهج ذكية متقدمة",
    selectMethod: "اختر طريقة الدفع",
    creditCard: "بطاقة ائتمان",
    instapay: "انستا باي",
    fawry: "فوري باي",
    vodafone: "فودافون كاش",
    orange: "أورنج كاش",
    continuePayment: "متابعة للدفع",
    totalAmount: "المبلغ الإجمالي",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cardName: "اسم حامل البطاقة",
    scanSend: "امسح أو أرسل إلى:",
    sendExactly: "أرسل بالضبط",
    enterAddress: "أدخل عنوانك / هاتفك",
    verifyNote: "نحتاج هذا للتحقق من معاملتك.",
    fawryRef: "رقم مرجع فوري",
    payAtStore: "ادفع في أي ماكينة فوري خلال",
    hours24: "24 ساعة",
    instructions: "التعليمات:",
    fawrySteps: [
      "اذهب لأي متجر لديه ماكينة فوري.",
      "اطلب خدمة 'فوري باي'.",
      "قدم الرقم المرجعي أعلاه.",
      "ادفع المبلغ",
      "احتفظ بالإيصال."
    ],
    vodafoneTitle: "تحويل فودافون كاش",
    orangeTitle: "تحويل أورنج كاش",
    walletNumber: "رقم المحفظة",
    processing: "جاري المعالجة...",
    pay: "ادفع",
    checkStatus: "تم الدفع / تحقق من الحالة"
  }
};

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onSubscribe, lang }) => {
  const t = translations[lang];
  const isRTL = lang === 'ar';

  const [step, setStep] = useState<Step>('PLAN_SELECTION');
  const [selectedInterval, setSelectedInterval] = useState<PlanInterval>('MONTHLY');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CARD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('PLAN_SELECTION');
    setIsProcessing(false);
    onClose();
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
        setIsProcessing(false);
        onSubscribe(selectedInterval);
        setStep('PLAN_SELECTION'); 
    }, 2000);
  };

  const amount = selectedInterval === 'MONTHLY' ? 100 : 1000;

  const PaymentOption = ({ method, icon: Icon, label, colorClass }: any) => (
    <label className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === method ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-100 hover:bg-slate-50'}`}>
        <input type="radio" name="pay" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="accent-indigo-600 w-4 h-4" />
        <div className={`bg-white p-2 rounded-lg border border-slate-100 shadow-sm ${colorClass}`}><Icon className="w-6 h-6" /></div>
        <span className="font-bold text-slate-700">{label}</span>
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div className={`bg-white rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] border border-white/50 animate-fade-in ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        
        {/* Header */}
        <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-8 text-white text-center relative shrink-0 overflow-hidden">
           <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

          <button onClick={handleClose} className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm`}>
            <X size={20} />
          </button>
          {step === 'PAYMENT_DETAILS' && (
             <button onClick={() => setStep('PLAN_SELECTION')} className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm`}>
                <ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} />
             </button>
          )}
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md shadow-inner border border-white/30">
                <Sparkles size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
                {step === 'PLAN_SELECTION' ? t.becomePro : t.secureCheckout}
            </h2>
            <p className="text-indigo-100 text-sm font-medium">
                {step === 'PLAN_SELECTION' ? t.unlockDesc : `${t.completingPayment} ${selectedInterval === 'MONTHLY' ? t.monthly : t.yearly}`}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
            {step === 'PLAN_SELECTION' ? (
                <div className="p-8">
                    {/* Plan Selection */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div 
                          onClick={() => setSelectedInterval('MONTHLY')}
                          className={`cursor-pointer p-5 rounded-2xl border-2 transition-all relative ${selectedInterval === 'MONTHLY' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-indigo-100'}`}
                        >
                          <div className="font-bold text-slate-800 mb-1">{t.monthly}</div>
                          <div className="text-3xl font-bold text-indigo-600 tracking-tight">$100<span className="text-sm text-slate-400 font-medium">{t.perMo}</span></div>
                        </div>
                        <div 
                          onClick={() => setSelectedInterval('YEARLY')}
                          className={`cursor-pointer p-5 rounded-2xl border-2 transition-all relative ${selectedInterval === 'YEARLY' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-indigo-100'}`}
                        >
                          <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full`}>{t.save17}</div>
                          <div className="font-bold text-slate-800 mb-1">{t.yearly}</div>
                          <div className="text-3xl font-bold text-indigo-600 tracking-tight">$1000<span className="text-sm text-slate-400 font-medium">{t.perYr}</span></div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        {[t.feat1, t.feat2, t.feat3].map((feat, i) => (
                             <div key={i} className="flex items-center gap-3 text-slate-700">
                                <div className="bg-indigo-100 text-indigo-600 p-1 rounded-full flex-shrink-0"><Check size={14} strokeWidth={3} /></div>
                                <span className="text-sm font-medium">{feat}</span>
                            </div>
                        ))}
                    </div>

                    {/* Method Selection */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-slate-900 mb-4">{t.selectMethod}</h3>
                        <div className="space-y-3">
                            <PaymentOption method={PAYMENT_METHODS.CARD} icon={CreditCard} label={t.creditCard} colorClass="text-indigo-600" />
                            <PaymentOption method={PAYMENT_METHODS.INSTAPAY} icon={InstapayIcon} label={t.instapay} colorClass="" />
                            <PaymentOption method={PAYMENT_METHODS.FAWRY} icon={FawryIcon} label={t.fawry} colorClass="" />
                            <PaymentOption method={PAYMENT_METHODS.VODAFONE_CASH} icon={VodafoneCashIcon} label={t.vodafone} colorClass="" />
                            <PaymentOption method={PAYMENT_METHODS.ORANGE_CASH} icon={OrangeCashIcon} label={t.orange} colorClass="" />
                        </div>
                    </div>

                    <button 
                        onClick={() => setStep('PAYMENT_DETAILS')}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
                    >
                        <span>{t.continuePayment}</span>
                        <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
                    </button>
                </div>
            ) : (
                <div className="p-8">
                    <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                         <div>
                             <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{t.totalAmount}</p>
                             <p className="text-3xl font-bold text-slate-900 tracking-tight">${amount} USD</p>
                         </div>
                    </div>

                    {/* CARD INTERFACE */}
                    {paymentMethod === 'CARD' && (
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">{t.cardNumber}</label>
                                <div className="relative">
                                    <CreditCard className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="0000 0000 0000 0000" 
                                        className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-slate-700`}
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">{t.expiryDate}</label>
                                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">CVC</label>
                                    <div className="relative">
                                        <Lock className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
                                        <input type="text" placeholder="123" className={`w-full ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent`} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">{t.cardName}</label>
                                <input type="text" placeholder="John Doe" className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                            </div>
                        </div>
                    )}

                    {/* INSTAPAY INTERFACE */}
                    {paymentMethod === 'INSTAPAY' && (
                        <div className="space-y-8 text-center">
                            <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100 flex flex-col items-center">
                                <div className="bg-white p-4 rounded-xl shadow-sm mb-5">
                                   <InstapayIcon className="w-20 h-20" />
                                </div>
                                <p className="text-sm text-purple-900 font-bold mb-2">{t.scanSend}</p>
                                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-purple-100 mb-3 shadow-sm">
                                    <span className="font-mono text-lg font-bold text-purple-700 tracking-wide">username@instapay</span>
                                    <button className="text-slate-300 hover:text-indigo-600 transition-colors"><Copy size={16} /></button>
                                </div>
                                <p className="text-xs font-medium text-purple-600 bg-purple-100/50 px-3 py-1 rounded-full">{t.sendExactly} ${amount} USD</p>
                            </div>

                            <div className="text-left space-y-3">
                                <label className="text-sm font-bold text-slate-700 ml-1">{t.enterAddress}</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. 010xxxxxxxx" 
                                    className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                                <p className="text-xs text-slate-500 ml-1">{t.verifyNote}</p>
                            </div>
                        </div>
                    )}

                    {/* FAWRY INTERFACE */}
                    {paymentMethod === 'FAWRY' && (
                        <div className="space-y-8 text-center">
                            <div className="bg-yellow-50 p-8 rounded-3xl border border-yellow-100 flex flex-col items-center">
                                <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-5 shadow-inner">
                                    <FawryIcon className="w-12 h-12" />
                                </div>
                                <h4 className="text-lg font-bold text-yellow-900 mb-3">{t.fawryRef}</h4>
                                <div className="bg-white px-8 py-4 rounded-xl border-2 border-dashed border-yellow-300 mb-4 shadow-sm">
                                    <span className="font-mono text-4xl font-bold text-slate-800 tracking-widest">012 1262 7052</span>
                                </div>
                                <p className="text-sm font-medium text-yellow-800">{t.payAtStore} <span className="font-bold">{t.hours24}</span>.</p>
                            </div>
                            
                            <div className={`text-left bg-slate-50 p-6 rounded-2xl border border-slate-100 ${isRTL ? 'text-right' : ''}`}>
                                <h5 className="font-bold text-slate-900 mb-3 text-sm">{t.instructions}</h5>
                                <ol className={`list-decimal list-inside text-sm text-slate-600 space-y-2 font-medium ${isRTL ? 'text-right' : ''}`}>
                                    {t.fawrySteps.map((step, i) => (
                                        <li key={i}>{step}{i === 3 ? <strong className="text-slate-900"> ${amount}</strong> : ''}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    )}

                     {/* WALLET INTERFACES (VF / ORANGE) */}
                     {(paymentMethod === 'VODAFONE_CASH' || paymentMethod === 'ORANGE_CASH') && (
                        <div className="space-y-8 text-center">
                            <div className={`${paymentMethod === 'VODAFONE_CASH' ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'} p-8 rounded-3xl border flex flex-col items-center`}>
                                <div className="bg-white p-4 rounded-xl shadow-sm mb-5">
                                   {paymentMethod === 'VODAFONE_CASH' ? <VodafoneCashIcon className="w-20 h-20" /> : <OrangeCashIcon className="w-20 h-20" />}
                                </div>
                                <p className={`text-sm font-bold mb-2 ${paymentMethod === 'VODAFONE_CASH' ? 'text-red-900' : 'text-orange-900'}`}>
                                    {paymentMethod === 'VODAFONE_CASH' ? t.vodafoneTitle : t.orangeTitle}
                                </p>
                                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-slate-100 mb-3 shadow-sm">
                                    <span className={`font-mono text-lg font-bold tracking-wide ${paymentMethod === 'VODAFONE_CASH' ? 'text-red-600' : 'text-orange-600'}`}>012 1262 7052</span>
                                    <button className="text-slate-300 hover:text-indigo-600 transition-colors"><Copy size={16} /></button>
                                </div>
                                <p className="text-xs font-medium text-slate-500 bg-white/50 px-3 py-1 rounded-full">{t.sendExactly} ${amount}</p>
                            </div>

                            <div className="text-left space-y-3">
                                <label className="text-sm font-bold text-slate-700 ml-1">{t.walletNumber}</label>
                                <input 
                                    type="text" 
                                    placeholder="010xxxxxxxx" 
                                    className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                                <p className="text-xs text-slate-500 ml-1">{t.verifyNote}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Footer Actions (Only for Payment Step) */}
        {step === 'PAYMENT_DETAILS' && (
             <div className="p-8 border-t border-slate-50 shrink-0 bg-white">
                <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-3 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isProcessing ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {t.processing}
                        </>
                    ) : (
                        <>
                            <Lock size={20} />
                            {(paymentMethod === 'FAWRY' || paymentMethod === 'INSTAPAY' || paymentMethod === 'VODAFONE_CASH' || paymentMethod === 'ORANGE_CASH') 
                                ? t.checkStatus 
                                : `${t.pay} $${amount}`}
                        </>
                    )}
                </button>
             </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionModal;