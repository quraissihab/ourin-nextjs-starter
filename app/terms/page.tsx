'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
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
              Terms of Service
            </h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Last updated: December 17, 2024
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Ourin, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this software.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">2. MIT License</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ourin is released under the MIT License. This means you are free to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Use the software for any purpose, including commercial applications</li>
                  <li>Modify the source code to suit your needs</li>
                  <li>Distribute copies of the original or modified software</li>
                  <li>Sublicense the software</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  The only requirement is that the original copyright notice and license text must be included in all copies or substantial portions of the software.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">3. No Warranty</h2>
                <p className="text-muted-foreground leading-relaxed">
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">4. User Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed">
                  When using Ourin as a foundation for your own projects, you are responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Ensuring your application complies with all applicable laws and regulations</li>
                  <li>Implementing appropriate security measures</li>
                  <li>Creating your own privacy policy and terms of service for your users</li>
                  <li>Managing user data responsibly if your application collects personal information</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">5. Contributions</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you contribute to the Ourin project (e.g., via pull requests), you agree that your contributions will be licensed under the same MIT License that covers the project. You represent that you have the right to submit such contributions.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">6. Third-Party Dependencies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ourin includes various third-party dependencies, each with their own licenses. By using Ourin, you agree to comply with the licenses of all included dependencies. Key dependencies include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Next.js (MIT License)</li>
                  <li>React (MIT License)</li>
                  <li>Tailwind CSS (MIT License)</li>
                  <li>Framer Motion (MIT License)</li>
                  <li>Radix UI (MIT License)</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">7. Modifications to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the repository. Your continued use of the software after any changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display font-bold">8. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please open an issue on our GitHub repository at{' '}
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
