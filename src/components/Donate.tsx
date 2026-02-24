import { useState } from 'react';
import { Heart, ShieldCheck, CheckCircle2, ArrowRight, Info } from 'lucide-react';

export default function Donate() {
  
  // Form State
  const [citizenship, setCitizenship] = useState('indian');
  const [frequency, setFrequency] = useState('once');
  const [selectedCause, setSelectedCause] = useState('General Donation');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState('');

  const donationCauses = [
    {
      title: "Cultural Preservation",
      description: "Supporting traditional Tamil arts, literature, and cultural competitions.",
      icon: <Heart className="text-orange-600" size={24} />
    },
    {
      title: "Social Welfare",
      description: "Providing essential support to underprivileged communities and families.",
      icon: <ShieldCheck className="text-blue-600" size={24} />
    },
    {
      title: "Education Support",
      description: "Funding scholarships and educational resources for talented students.",
      icon: <CheckCircle2 className="text-green-600" size={24} />
    }
  ];

  const presetAmounts = [5000, 10000, 20000, 40000];

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  return (
    <div className="pt-20 lg:pt-24 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full -ml-20 -mb-20 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
            Support Our Mission
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto font-medium">
            Your generosity helps us preserve Tamil culture and empower communities.
            Every contribution makes a meaningful difference.
          </p>
        </div>
      </section>

      {/* Main Content: Form & Info */}
      <section className="py-10 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
          

            {/* Aligned to the right, Form narrowed for better focus (6 cols) */}
            <div className="hidden lg:block lg:col-span-6"></div>
            
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 sm:p-4">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center sm:text-left">Donate & Create Impact</h2>
                  
                  <div className="space-y-4">
                    {/* Citizenship Selector */}
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-gray-500 flex items-center gap-1">
                        Citizenship <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-1 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="citizenship" 
                            className="w-2 h-2 text-orange-600 border-gray-300 focus:ring-orange-500 cursor-pointer"
                            checked={citizenship === 'indian'}
                            onChange={() => setCitizenship('indian')}
                          />
                          <span className={`text-lg font-medium ${citizenship === 'indian' ? 'text-gray-900' : 'text-gray-500'}`}>Indian Citizen</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="citizenship" 
                            className="w-5 h-5 text-orange-600 border-gray-300 focus:ring-orange-500 cursor-pointer"
                            checked={citizenship === 'nri'}
                            onChange={() => setCitizenship('nri')}
                          />
                          <span className={`text-lg font-medium ${citizenship === 'nri' ? 'text-gray-900' : 'text-gray-500'}`}>Foreign/NRI</span>
                        </label>
                      </div>
                    </div>

                    {/* Give Once / Give Monthly Toggle */}
                    <div className="p-1 bg-gray-100 rounded-full flex max-w-md mx-auto sm:mx-0">
                      <button 
                        onClick={() => setFrequency('once')}
                        className={`flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 ${
                          frequency === 'once' 
                            ? 'bg-orange-500 text-white shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        GIVE ONCE
                      </button>
                      <button 
                        onClick={() => setFrequency('monthly')}
                        className={`flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 ${
                          frequency === 'monthly' 
                            ? 'bg-orange-500 text-white shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        GIVE MONTHLY
                      </button>
                    </div>

                    {/* Cause Selection */}
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-gray-700">Select a Cause</label>
                      <div className="relative">
                        <select 
                          value={selectedCause}
                          onChange={(e) => setSelectedCause(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-800 font-medium focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none shadow-sm cursor-pointer"
                        >
                          <option>General Donation</option>
                          <option>Cultural Preservation Fund</option>
                          <option>Social Welfare Initiative</option>
                          <option>Education Support Project</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <ArrowRight size={18} className="transform rotate-90" />
                        </div>
                      </div>
                    </div>

                    {/* Amount Selection */}
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-gray-700">Choose an amount to donate (₹)</label>
                      <div className="grid grid-cols-2 gap-4">
                        {presetAmounts.map((amount) => (
                          <button
                            key={amount}
                            onClick={() => handleAmountClick(amount)}
                            className={`py-4 px-6 rounded-xl font-bold text-xl border-2 transition-all duration-200 flex items-center justify-center gap-1 ${
                              selectedAmount === amount 
                                ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md transform scale-[1.02]' 
                                : 'border-gray-100 bg-white text-gray-600 hover:border-orange-200 hover:bg-gray-50'
                            }`}
                          >
                            ₹{amount.toLocaleString('en-IN')}
                          </button>
                        ))}
                      </div>
                      
                      {/* Other Amount Input */}
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 font-bold text-lg group-focus-within:text-orange-600 transition-colors">₹</div>
                        <input 
                          type="number" 
                          placeholder="Enter Other Amount"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="w-full pl-10 pr-4 py-4 bg-white border-2 border-gray-100 rounded-xl text-lg font-bold text-gray-800 placeholder:text-gray-400 focus:border-orange-600 outline-none transition-all shadow-sm focus:shadow-md"
                        />
                      </div>
                    </div>

                    {/* Information Box */}
                    <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 flex items-start gap-3">
                      <Info className="text-orange-600 shrink-0 mt-0.5" size={20} />
                      <p className="text-sm text-orange-800 leading-relaxed font-medium">
                        Your one-time donation of <strong>₹{(selectedAmount || Number(customAmount) || 0).toLocaleString('en-IN')}</strong> will directly fund our {selectedCause.toLowerCase()}.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transform transition hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3">
                      <Heart className="fill-white" size={24} />
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Impact Areas</h2>
            <div className="w-20 h-1.5 bg-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {donationCauses.map((cause, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-300">
                <div className="bg-white shadow-sm group-hover:shadow-md w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-all">
                  {cause.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{cause.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{cause.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
