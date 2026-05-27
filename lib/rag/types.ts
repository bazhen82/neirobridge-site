export type RagChunk = {
  id: string;
  source: string;
  text: string;
  embedding: number[];
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatResponse = {
  reply: string;
  foundInKnowledge: boolean;
  suggestLead: boolean;
  topScore?: number;
};
