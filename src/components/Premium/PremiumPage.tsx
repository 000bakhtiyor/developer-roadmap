import {
    Brain,
    Bot,
    Book,
    Star,
    Users,
    Rocket,
    CheckCircle2,
    Zap,
    Clock,
    Crown,
    Users2,
    Wand2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

function FeatureCard({ title, description, Icon }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-8 transition-colors hover:border-blue-400">
      <Icon className="mb-4 h-6 w-6 text-blue-400" strokeWidth={1.5} />
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
      ))}
    </div>
  );
}

function Testimonial({
  name,
  role,
  content,
}: {
  name: string;
  role: string;
  content: string;
}) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
      <StarRating />
      <p className="mt-4 leading-relaxed text-slate-400">{content}</p>
      <div className="mt-4">
        <div className="font-medium text-white">{name}</div>
        <div className="text-sm text-slate-500">{role}</div>
      </div>
    </div>
  );
}

export function PremiumPage() {
  const handleUpgrade = () => {
    alert('Upgrade functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black">
      <div className="mx-auto max-w-4xl px-4 py-20">
        {/* Hero Section */}
        <div className="mx-auto mb-20 max-w-4xl">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-slate-800/50 px-4 py-2 text-blue-400">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">
                Unlock All Premium Features
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Learn Faster with AI Tutor
            </h1>
            <p className="mb-8 text-lg text-balance text-slate-400 md:text-xl">
              Get personalized roadmaps, instant answers, and expert guidance to
              accelerate your learning journey.
            </p>
            <button
              onClick={handleUpgrade}
              className="rounded-lg rounded-xl bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
            >
              Upgrade to Premium
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          <div className="flex items-center gap-3">
            <Users2 className="h-6 w-6 text-purple-500" strokeWidth={1.5} />
            <span className="text-gray-300">+100K Learners</span>
          </div>
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-purple-500" strokeWidth={1.5} />
            <span className="text-gray-300">+135K Roadmaps</span>
          </div>
          <div className="flex items-center gap-3">
            <Book className="h-6 w-6 text-purple-500" strokeWidth={1.5} />
            <span className="text-gray-300">+90K Courses</span>
          </div>
          <div className="flex items-center gap-3">
            <Wand2 className="h-6 w-6 text-purple-500" strokeWidth={1.5} />
            <span className="text-gray-300">+1M AI Chats</span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            What others are saying
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Testimonial
              name="Gourav Khunger"
              role="Full Stack Developer"
              content="The AI tutor is absolutely brilliant! It's like having a senior developer available 24/7 to answer my questions."
            />
            <Testimonial
              name="Meabed"
              role="Tech Lead"
              content="The personalized learning paths and premium resources have helped my entire team stay up-to-date with the latest tech."
            />
            <Testimonial
              name="Mohsin Aheer"
              role="Software Engineer"
              content="The interactive exercises and real-world scenarios have significantly improved my problem-solving skills."
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Everything You Need to Succeed
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              Icon={Brain}
              title="AI Learning Assistant"
              description="Get instant answers and personalized guidance from our advanced AI tutor, available 24/7."
            />
            <FeatureCard
              Icon={Bot}
              title="Custom Learning Paths"
              description="Follow AI-generated roadmaps tailored to your career goals and current skill level."
            />
            <FeatureCard
              Icon={Crown}
              title="Premium Resources"
              description="Access exclusive learning materials, guides, and best practices curated by experts."
            />
            <FeatureCard
              Icon={Clock}
              title="Time-Saving Tools"
              description="Save hours with AI-generated summaries and quick reference guides."
            />
            <FeatureCard
              Icon={Book}
              title="Interactive Exercises"
              description="Practice with real-world scenarios and get instant feedback on your solutions."
            />
            <FeatureCard
              Icon={Rocket}
              title="Career Acceleration"
              description="Get guidance on industry best practices and trending technologies."
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Choose Your Plan
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8">
              <h3 className="mb-4 text-2xl font-bold text-white">Monthly</h3>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$10</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <p className="mt-2 text-slate-400">
                  Perfect for continuous learning
                </p>
              </div>
              <button
                onClick={handleUpgrade}
                className="mb-8 w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Start Monthly Plan
              </button>
              <ul className="space-y-4 text-slate-300">
                {[
                  'AI Learning Assistant',
                  'Personalized Learning Paths',
                  'Interactive Exercises',
                  'Premium Resources',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2
                      className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-blue-400"
                      strokeWidth={2}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-xl border-2 border-blue-400 bg-slate-800/50 p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white">
                  Most Popular
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Yearly</h3>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$100</span>
                  <span className="text-slate-400">/year</span>
                </div>
                <p className="mt-2 font-medium text-blue-400">
                  Save $20 (2 months free)
                </p>
              </div>
              <button
                onClick={handleUpgrade}
                className="mb-8 w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Start Yearly Plan
              </button>
              <ul className="space-y-4 text-slate-300">
                {[
                  'Everything in Monthly',
                  'Priority Support',
                  'Early Access Features',
                  'Team Collaboration Tools',
                  'Advanced Analytics',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2
                      className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-blue-400"
                      strokeWidth={2}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Ready to Take Your Skills to the Next Level?
          </h2>
          <p className="mb-8 text-slate-400">
            Join the community of developers who are accelerating their careers
            with our premium features.
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-400">
            <Users className="h-5 w-5" />
            <span>50,000+ developers already enrolled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
