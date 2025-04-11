import { BookOpen, Compass, Plus, Star, X } from 'lucide-react';
import { AITutorLogo } from '../ReactIcons/AITutorLogo';

type AITutorSidebarProps = {
  isFloating: boolean;
  activeTab: AITutorTab;
  onClose: () => void;
};

const sidebarItems = [
  {
    key: 'new',
    label: 'New Course',
    href: '/ai',
    icon: Plus,
  },
  {
    key: 'courses',
    label: 'My Courses',
    href: '/ai/courses',
    icon: BookOpen,
  },
  {
    key: 'staff-picks',
    label: 'Staff Picks',
    href: '/ai/staff-picks',
    icon: Star,
  },
  {
    key: 'community',
    label: 'Community',
    href: '/ai/community',
    icon: Compass,
  },
];

export type AITutorTab = (typeof sidebarItems)[number]['key'];

export function AITutorSidebar(props: AITutorSidebarProps) {
  const { activeTab, isFloating, onClose } = props;

  return (
    <>
      <aside
        className={`w-[255px] shrink-0 border-r border-slate-200 ${
          isFloating
            ? 'fixed top-0 bottom-0 left-0 z-50 block border-r-0 bg-white shadow-xl'
            : 'hidden lg:block'
        }`}
      >
        {isFloating && (
          <button className="absolute top-3 right-3" onClick={onClose}>
            <X
              strokeWidth={3}
              className="size-3.5 text-gray-400 hover:text-black"
            />
          </button>
        )}
        <div className="flex flex-col items-start justify-center px-6 py-5">
          <div className="flex flex-row items-center gap-1">
            <AITutorLogo className="size-11 text-gray-500" color="black" />
          </div>
          <div className="my-3 flex flex-col">
            <h2 className="-mb-px text-base font-semibold text-black">
              AI Tutor
            </h2>
            <span className="text-xs text-gray-500">
              by{' '}
              <a href="/" className="underline-offset-2 hover:underline">
                roadmap.sh
              </a>
            </span>
          </div>
          <p className="max-w-[150px] text-xs text-gray-500">
            Your personalized learning companion for any topic
          </p>
        </div>

        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                className={`font-regular flex w-full items-center border-r-2 px-5 py-2 text-sm transition-all ${
                  activeTab === item.key
                    ? 'border-r-black bg-gray-100 text-black'
                    : 'border-r-transparent text-gray-500 hover:border-r-gray-300'
                }`}
              >
                <span className="flex grow items-center">
                  <item.icon className="mr-2 size-4" />
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
      {isFloating && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      )}
    </>
  );
}
