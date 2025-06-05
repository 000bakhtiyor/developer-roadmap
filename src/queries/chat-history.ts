import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';
import type { RoadmapAIChatHistoryType } from '../components/RoadmapAIChat/RoadmapAIChat';
import { markdownToHtml } from '../lib/markdown';
import { aiChatRenderer } from '../components/AIChat/AIChat';
import { renderMessage } from '../lib/render-chat-message';

export type ChatHistoryMessage = {
  _id: string;
  role: 'user' | 'assistant';
  content: string;
};

export interface ChatHistoryDocument {
  _id: string;

  userId: string;
  title: string;
  messages: ChatHistoryMessage[];

  createdAt: Date;
  updatedAt: Date;
}

export function chatHistoryOptions(chatHistoryId: string) {
  return queryOptions({
    queryKey: ['chat-history', chatHistoryId],
    queryFn: async () => {
      const data = await httpGet<ChatHistoryDocument>(
        `/v1-chat-history/${chatHistoryId}`,
      );

      const messages: RoadmapAIChatHistoryType[] = [];
      for (const message of data.messages) {
        messages.push({
          role: message.role,
          content: message.content,
          ...(message.role === 'user' && {
            html: markdownToHtml(message.content),
          }),
          ...(message.role === 'assistant' && {
            jsx: await renderMessage(message.content, aiChatRenderer, {
              isLoading: false,
            }),
          }),
        });
      }

      return {
        ...data,
        messages,
      };
    },
    enabled: !!isLoggedIn(),
  });
}
