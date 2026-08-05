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
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10"
          >
            {t('Scrie-ne direct pe WhatsApp sau Telegram și povestește-ne despre proiectul tău.', 'Message us directly on WhatsApp or Telegram and tell us about your project.', 'Schreiben Sie uns direkt über WhatsApp oder Telegram und erzählen Sie uns von Ihrem Projekt.', 'Send oss en melding på WhatsApp eller Telegram og fortell om prosjektet ditt.')}
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.2}} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-w-64 items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-4 rounded-xl font-bold transition shadow-lg shadow-emerald-600/15"><MessageCircle className="h-5 w-5"/><span className="text-left"><span className="block leading-none">WhatsApp</span><small className="font-normal text-emerald-100">{whatsappLabel}</small></span></a>
            <a href={`https://t.me/${telegramUsername}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-w-64 items-center justify-center gap-3 bg-sky-600 hover:bg-sky-500 text-white px-7 py-4 rounded-xl font-bold transition shadow-lg shadow-sky-600/15"><Send className="h-5 w-5"/><span className="text-left"><span className="block leading-none">Telegram</span><small className="font-normal text-sky-100">@{telegramUsername}</small></span></a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
