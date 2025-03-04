import { ArrowRightIcon, BotIcon } from 'lucide-react';
import { useState } from 'react';
import {
  AICourseFollowUpPopover,
  type AIChatHistoryType,
} from './AICourseFollowUpPopover';

type AICourseFollowUpProps = {
  courseSlug: string;
  moduleTitle: string;
  lessonTitle: string;
};

export function AICourseFollowUp(props: AICourseFollowUpProps) {
  const { courseSlug, moduleTitle, lessonTitle } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [courseAIChatHistory, setCourseAIChatHistory] = useState<
    AIChatHistoryType[]
  >([]);

  return (
    <div className="relative">
      <button
        className="mt-4 flex w-full items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-100 p-2"
        onClick={() => setIsOpen(true)}
      >
        <BotIcon className="h-4 w-4" />
        <span>You still have confusion about the lesson? Ask me anything.</span>

        <ArrowRightIcon className="ml-auto h-4 w-4" />
      </button>

      {isOpen && (
        <AICourseFollowUpPopover
          courseSlug={courseSlug}
          moduleTitle={moduleTitle}
          lessonTitle={lessonTitle}
          courseAIChatHistory={courseAIChatHistory}
          setCourseAIChatHistory={setCourseAIChatHistory}
          onOutsideClick={() => {
            if (!isOpen) {
              return;
            }

            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
