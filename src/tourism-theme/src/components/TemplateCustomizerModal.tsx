import React, { useState } from 'react';
import { X, Settings, Check, Phone, Globe, DollarSign, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';
import { TemplateSettings, Currency, Language } from '../types';
import { openDirectWhatsAppChat } from '../utils/whatsapp';

interface TemplateCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: TemplateSettings;
  onSave: (newSettings: TemplateSettings) => void;
}

export const TemplateCustomizerModal: React.FC<TemplateCustomizerModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  if (!isOpen) return null;

  const isRO = settings.language === 'ro';

  const [propertyName, setPropertyName] = useState(settings.propertyName);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [displayPhone, setDisplayPhone] = useState(settings.displayPhone);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [address, setAddress] = useState(settings.address);
  const [currency, setCurrency] = useState<Currency>(settings.currency);
  const [language, setLanguage] = useState<Language>(settings.language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...settings,
      propertyName,
      whatsappNumber,
      displayPhone,
      contactEmail,
      address,
      currency,
      language,
    });
    onClose();
  };

  const handleTestWhatsApp = () => {
    openDirectWhatsAppChat(
      whatsappNumber,
      isRO
        ? `Salut! Testez șablonul demonstrativ de rezervări WhatsApp pentru ${propertyName}.`
        : `Hello! Testing the WhatsApp booking template demonstration for ${propertyName}.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white text-[#1A1A1A] rounded-2xl border border-[#EAE2D8] shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#FBF9F6] p-5 border-b border-[#EAE2D8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-800 border border-[#EAE2D8]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                {isRO ? 'Configurare Șablon Demo WhatsApp' : 'Demo Template Settings'}
              </h3>
              <p className="text-xs text-slate-500">
                {isRO ? 'Personalizează datele pentru a testa cu propriul tău număr de WhatsApp' : 'Configure hotel details & test with your own WhatsApp phone number'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-black rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Property Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              {isRO ? 'Nume Hotel / Vilă' : 'Property Brand Name'}
            </label>
            <input
              type="text"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              required
              className="w-full bg-slate-50 text-[#1A1A1A] text-xs font-medium rounded-xl p-3 border border-[#EAE2D8] focus:outline-none focus:border-[#1A1A1A]"
            />
          </div>

          {/* WhatsApp Phone Number */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block flex items-center justify-between">
              <span>{isRO ? 'Număr WhatsApp pentru Rezervări' : 'WhatsApp Target Number'}</span>
              <span className="text-[10px] text-slate-500 font-normal">e.g. +40722123456</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
                className="flex-1 bg-slate-50 text-[#1A1A1A] text-xs font-medium rounded-xl p-3 border border-[#EAE2D8] focus:outline-none focus:border-[#1A1A1A] font-mono"
              />
              <button
                type="button"
                onClick={handleTestWhatsApp}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 shrink-0 shadow-sm"
                title="Send test message to this phone number"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>{isRO ? 'Testează' : 'Test WA'}</span>
              </button>
            </div>
          </div>

          {/* Display Phone & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">
                {isRO ? 'Telefon Afișat' : 'Display Phone'}
              </label>
              <input
                type="text"
                value={displayPhone}
                onChange={(e) => setDisplayPhone(e.target.value)}
                className="w-full bg-slate-50 text-[#1A1A1A] text-xs font-medium rounded-xl p-2.5 border border-[#EAE2D8] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">
                Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-slate-50 text-[#1A1A1A] text-xs font-medium rounded-xl p-2.5 border border-[#EAE2D8] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 block">
              {isRO ? 'Adresă & Locație' : 'Address'}
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50 text-[#1A1A1A] text-xs font-medium rounded-xl p-2.5 border border-[#EAE2D8] focus:outline-none focus:border-[#1A1A1A]"
            />
          </div>

          {/* Language & Currency */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">
                {isRO ? 'Limbă Interfață' : 'Template Language'}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full bg-slate-50 text-[#1A1A1A] text-xs font-medium rounded-xl p-2.5 border border-[#EAE2D8] focus:outline-none focus:border-[#1A1A1A]"
              >
                <option value="ro">Română (RO)</option>
                <option value="en">English (EN)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">
                {isRO ? 'Monedă Implicită' : 'Currency'}
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="w-full bg-slate-50 text-[#1A1A1A] text-xs font-medium rounded-xl p-2.5 border border-[#EAE2D8] focus:outline-none focus:border-[#1A1A1A]"
              >
                <option value="EUR">EUR (€)</option>
                <option value="RON">RON (Lei)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-[#EAE2D8] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 hover:text-black text-xs font-medium"
            >
              {isRO ? 'Anulează' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-slate-800 text-white font-semibold text-xs shadow-md"
            >
              {isRO ? 'Salvează Schimbările' : 'Save & Apply'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
