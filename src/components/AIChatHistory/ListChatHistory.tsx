import { useInfiniteQuery } from '@tanstack/react-query';
import {
  listChatHistoryOptions,
  type ChatHistoryWithoutMessages,
} from '../../queries/chat-history';
import { queryClient } from '../../stores/query-client';
import { ChatHistoryItem } from './ChatHistoryItem';
import {
  AlertCircleIcon,
  Loader2Icon,
  PanelLeftCloseIcon,
  PanelLeftIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-react';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';
import { useDebounceValue } from '../../hooks/use-debounce';
import { ListChatHistorySkeleton } from './ListChatHistorySkeleton';
import { ChatHistoryError } from './ChatHistoryError';
import { cn } from '../../lib/classname';

type ListChatHistoryProps = {
  activeChatHistoryId?: string;
  onChatHistoryClick: (chatHistoryId: string | null) => void;
  onDelete?: (chatHistoryId: string) => void;
};

export function ListChatHistory(props: ListChatHistoryProps) {
  const { activeChatHistoryId, onChatHistoryClick, onDelete } = props;

  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState('');
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery(listChatHistoryOptions({ query }), queryClient);

  const groupedChatHistory = useMemo(() => {
    const today = DateTime.now().startOf('day');
    const allHistories = data?.pages?.flatMap((page) => page.data);

    return allHistories?.reduce(
      (acc, chatHistory) => {
        const updatedAt = DateTime.fromJSDate(
          new Date(chatHistory.updatedAt),
        ).startOf('day');
        const diffInDays = Math.abs(updatedAt.diff(today, 'days').days);

        if (diffInDays === 0) {
          acc.today.histories.push(chatHistory);
        } else if (diffInDays <= 7) {
          acc.last7Days.histories.push(chatHistory);
        } else {
          acc.older.histories.push(chatHistory);
        }

        return acc;
      },
      {
        today: {
          title: 'Today',
          histories: [],
        },
        last7Days: {
          title: 'Last 7 Days',
          histories: [],
        },
        older: {
          title: 'Older',
          histories: [],
        },
      } as Record<
        string,
        { title: string; histories: ChatHistoryWithoutMessages[] }
      >,
    );
  }, [data?.pages]);

  if (!isOpen) {
    return (
      <div className="absolute top-1 left-1 z-20">
        <button
          className="flex size-8 items-center justify-center rounded-lg p-1 hover:bg-gray-200"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <PanelLeftIcon className="h-4.5 w-4.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex w-[255px] shrink-0 flex-col justify-start border-r border-gray-200 bg-white p-2',
        !isOpen && 'hidden',
      )}
    >
      {isLoading && <ListChatHistorySkeleton />}
      {!isLoading && isError && <ChatHistoryError error={error} />}

      {!isLoading && !isError && (
        <>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h1 className="font-medium text-gray-900">Chat History</h1>
              <button
                className="flex size-8 items-center justify-center rounded-lg p-1 hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <PanelLeftCloseIcon className="h-4.5 w-4.5" />
              </button>
            </div>

            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-black p-2 text-sm text-white"
              onClick={() => {
                onChatHistoryClick(null);
              }}
            >
              <PlusIcon className="h-4 w-4" />
              <span className="text-sm">New Chat</span>
            </button>

            <SearchInput onSearch={setQuery} isLoading={isLoading} />
          </div>

          <div className="scrollbar-track-transparent scrollbar-thin scrollbar-thumb-gray-300 -mx-2 mt-6 grow space-y-4 overflow-y-auto px-2">
            {Object.entries(groupedChatHistory ?? {}).map(([key, value]) => {
              if (value.histories.length === 0) {
                return null;
              }

              return (
                <div key={key}>
                  <h2 className="ml-2 text-xs text-gray-500">{value.title}</h2>

                  <ul className="mt-1 space-y-0.5">
                    {value.histories.map((chatHistory) => {
                      return (
                        <ChatHistoryItem
                          key={chatHistory._id}
                          chatHistory={chatHistory}
                          isActive={activeChatHistoryId === chatHistory._id}
                          onChatHistoryClick={onChatHistoryClick}
                          onDelete={() => {
                            onDelete?.(chatHistory._id);
                          }}
                        />
                      );
                    })}
                  </ul>
                </div>
              );
            })}

            {hasNextPage && (
              <div className="mt-4">
                <button
                  className="flex w-full items-center justify-center gap-2 text-sm text-gray-500 hover:text-black"
                  onClick={() => {
                    fetchNextPage();
                  }}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage && (
                    <>
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                      Loading more...
                    </>
                  )}
                  {!isFetchingNextPage && 'Load More'}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

type SearchInputProps = {
  onSearch: (search: string) => void;
  isLoading?: boolean;
};

function SearchInput(props: SearchInputProps) {
  const { onSearch, isLoading } = props;

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounceValue(search, 300);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <form
      className="relative mt-2 flex max-w-sm flex-1 grow items-center"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(search);
      }}
    >
      <input
        type="text"
        placeholder="Search folder by name"
        className="block h-9 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 pl-8 text-sm outline-none placeholder:text-zinc-500 focus:border-zinc-500"
        required
        minLength={3}
        maxLength={255}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="absolute top-1/2 left-2.5 -translate-y-1/2">
        {isLoading ? (
          <Loader2Icon className="size-4 animate-spin text-gray-500" />
        ) : (
          <SearchIcon className="size-4 text-gray-500" />
        )}
      </div>
    </form>
  );
}
