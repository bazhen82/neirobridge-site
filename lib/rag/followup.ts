import type { ChatMessage } from "./types";

const FOLLOW_UP =
  /^(а |и |ну |так |ещё|еще|подробнее|а сколько|а как|а какие|а что|а сроки|а цена|сколько стоит|какие|это |а это)/i;

/**
 * Follow-ups like «а сколько стоит?» need the previous user question
 * so retrieval does not search a pronoun-only query.
 */
export function buildSearchQuery(message: string, history: ChatMessage[]): string {
  const previousUsers = history.filter(
    (item) => item.role === "user" && item.content.trim() !== message.trim()
  );
  const previous = previousUsers[previousUsers.length - 1];
  const wordCount = message.trim().split(/\s+/).length;
  const isFollowUp = FOLLOW_UP.test(message.trim()) || wordCount <= 5;

  if (isFollowUp && previous?.content) {
    return `${previous.content}\n${message}`;
  }

  return message;
}
