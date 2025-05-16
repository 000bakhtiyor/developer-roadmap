import { useQuery } from '@tanstack/react-query';
import { roadmapJSONOptions } from '../../queries/roadmap';
import { queryClient } from '../../stores/query-client';
import { useEffect, useRef, useState } from 'react';
import { Spinner } from '../ReactIcons/Spinner';
import { BotIcon, SendIcon } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '../../lib/classname';

type RoadmapAIChatProps = {
  roadmapId: string;
};

export function RoadmapAIChat(props: RoadmapAIChatProps) {
  const { roadmapId } = props;

  const [isLoading, setIsLoading] = useState(true);
  const { data } = useQuery(roadmapJSONOptions(roadmapId), queryClient);
  const roadmapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !roadmapContainerRef.current) {
      return;
    }

    setIsLoading(false);
    roadmapContainerRef.current.replaceChildren(data.svg);
  }, [data]);

  return (
    <div className="grid grow grid-cols-2">
      <div className="h-full overflow-y-auto">
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner
              className="h-6 w-6 animate-spin sm:h-12 sm:w-12"
              isDualRing={false}
            />
          </div>
        )}
        <div ref={roadmapContainerRef} />
      </div>

      <div className="flex h-full flex-col">
        <div className="flex min-h-[46px] items-center justify-between gap-2 border-gray-200 px-3 py-2 text-sm">
          <span className="flex items-center gap-2 text-sm">
            <BotIcon className="size-4 shrink-0 text-black" />
            <span>AI Chat</span>
          </span>
        </div>

        <div className="relative grow overflow-y-auto">
          <div className="absolute inset-0 flex flex-col">
            <div className="h-[1000px] w-full bg-red-100" />
          </div>
        </div>

        <form
          className="relative flex items-start border-t border-gray-200 text-sm"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextareaAutosize
            className="h-full min-h-[41px] grow resize-none bg-transparent px-4 py-2 focus:outline-hidden"
            placeholder="Ask AI anything about the roadmap..."
            autoFocus={true}
          />
          <button
            type="submit"
            className="flex aspect-square size-[41px] items-center justify-center text-zinc-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendIcon className="size-4 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
}
