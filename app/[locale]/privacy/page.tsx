'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="py-6 border-b border-border/40">
        <div className="container px-4 md:px-6 mx-auto">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-tight">
              Privacy Policy
            </h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Last updated: December 17, 2024
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Ourin ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">2. Data We Collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Since Ourin is an open-source boilerplate template, we do not collect any personal data from users who download or use our template. The template itself does not include any tracking, analytics, or data collection mechanisms.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  However, when you visit our GitHub repository or documentation website, third-party services (such as GitHub) may collect certain data in accordance with their own privacy policies.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">3. How We Use Your Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  As we do not collect personal data directly, we do not use your data for any purposes. If you choose to contribute to our project (e.g., via pull requests or issues), any public contributions will be visible on our repository.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">4. Open Source Nature</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ourin is distributed under the MIT License, which means you are free to use, modify, and distribute the software. When you use this template, you are responsible for implementing your own privacy practices for any application you build with it.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">5. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our template may include integrations with third-party services (e.g., analytics, authentication providers). If you choose to implement these features, you should review the privacy policies of those services and ensure compliance with applicable laws.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete your data. Since we do not collect personal data, these rights would apply to any third-party services you interact with.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">7. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us through our GitHub repository at{' '}
                  <a 
                    href="https://github.com/LuckyArch/ourin-nextjs-starter" 
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/LuckyArch/ourin-nextjs-starter
                  </a>.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">8. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ourin. Built by Fauzan Adyatma P.
          </p>
        </div>
      </footer>
    </div>
  );
}
