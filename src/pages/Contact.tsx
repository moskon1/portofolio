import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Thank you for your message! I'll get back to you soon.");
  };

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
            Let's <span className="text-gradient">Connect</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Ready to build something together? Reach out for a technical consultation.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">Contact</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <Mail className="h-6 w-6 text-brand" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Email</p>
                      <p className="text-slate-400 text-sm">hello@moskon1.dev</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass p-8 lg:p-12 rounded-3xl">
                <div className="flex items-center space-x-3 mb-8">
                  <MessageSquare className="h-8 w-8 text-brand" />
                  <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">Full Name</label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        className="w-full bg-white/5 px-4 py-3 rounded-xl border border-white/10 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-white"
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">Email Address</label>
                      <input
                        {...register("email", { 
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                        })}
                        className="w-full bg-white/5 px-4 py-3 rounded-xl border border-white/10 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-white"
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">Subject</label>
                    <input
                      {...register("subject", { required: "Subject is required" })}
                      className="w-full bg-white/5 px-4 py-3 rounded-xl border border-white/10 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-white"
                      placeholder="Project Inquiry"
                    />
                    {errors.subject && <span className="text-xs text-red-500">{errors.subject.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">Message</label>
                    <textarea
                      {...register("message", { required: "Message is required" })}
                      rows={6}
                      className="w-full bg-white/5 px-4 py-3 rounded-xl border border-white/10 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-white resize-none"
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-dark transition-all shadow-lg shadow-brand/25 flex items-center justify-center space-x-2 group"
                  >
                    <span>Send Message</span>
                    <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
