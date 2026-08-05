import { motion } from 'motion/react';
import { MessageCircle, Send } from 'lucide-react';
import { localize, useLocale } from '@/src/lib/i18n';

export default function Contact() {
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '40700000000';
  const whatsappLabel = import.meta.env.VITE_WHATSAPP_NUMBER ? `+${whatsappNumber}` : '+40 700 000 000';
  const telegramUsername = 'nodestackpro';

  return (
    <div className="pt-20 bg-slate-950">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-brand/5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-bold text-white mb-6"
          >
            {t('Hai să', "Let's", 'Lassen Sie uns', 'La oss')} <span className="text-gradient">{t('Discutăm', 'Talk', 'sprechen', 'snakke sammen')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            {t('Scrie-ne direct pe WhatsApp sau Telegram și povestește-ne despre proiectul tău.', 'Message us directly on WhatsApp or Telegram and tell us about your project.', 'Schreiben Sie uns direkt über WhatsApp oder Telegram und erzählen Sie uns von Ihrem Projekt.', 'Send oss en melding på WhatsApp eller Telegram og fortell om prosjektet ditt.')}
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-8 sm:p-12 rounded-3xl border border-white/10">
            {/* Contact Info */}
            <div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">{t('Contact', 'Contact', 'Kontakt', 'Kontakt')}</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <MessageCircle className="h-6 w-6 text-brand" />
                    </div>
                    <div>
                      <p className="font-bold text-white">WhatsApp</p>
                      <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm hover:text-brand transition-colors">{whatsappLabel}</a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <Send className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Telegram</p>
                      <a href={`https://t.me/${telegramUsername}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm hover:text-accent transition-colors">@{telegramUsername}</a>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-xl font-bold transition-colors">
                    <MessageCircle className="h-5 w-5" /> WhatsApp
                  </a>
                  <a href={`https://t.me/${telegramUsername}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-3 rounded-xl font-bold transition-colors">
                    <Send className="h-5 w-5" /> Telegram
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
