export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
};

/** Human-readable titles for portfolio cards (repo slug stays technical). */
export const repoDisplayNames: Record<string, string> = {
  RivalScope: "RivalScope — анализ конкурентов",
  MarketVision: "MarketVision — карточки товаров",
  "tasktreker-vk-n8n": "VK Task Tracker на n8n",
  "neirobridge-site": "Сайт NeiroBridge",
  anonspost: "AnonsPost — email-рассылки",
  presentBot: "PresentBot — автоматизация",
  "deskmate-bot": "DeskMate — Telegram-ассистент",
  "beanbonus-bot": "BeanBonus — бот лояльности"
};

const HIDDEN_REPOS = new Set(["NeiroBridge", "bazhen82"]);

const GITHUB_USER = "NeiroBridge";

const fallbackRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "RivalScope",
    description:
      "AI-powered competitor intelligence dashboard for analyzing websites, texts, images and market positioning.",
    html_url: `https://github.com/${GITHUB_USER}/RivalScope`,
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    topics: ["AI", "Competitor Analysis", "Dashboard"],
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "MarketVision",
    description:
      "AI-ассистент карточек товаров для Ozon/Wildberries: фото, Vision, GigaChat и генерация визуала.",
    html_url: `https://github.com/${GITHUB_USER}/MarketVision`,
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    topics: ["AI", "Ecommerce", "GigaChat"],
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "deskmate-bot",
    description: "Мультимодальный Telegram-ассистент NeiroBridge: GPT-4o, RAG, Whisper, Vision.",
    html_url: `https://github.com/${GITHUB_USER}/deskmate-bot`,
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    topics: ["Telegram", "RAG", "AI"],
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    name: "tasktreker-vk-n8n",
    description:
      "VK task tracker bot on n8n with GigaChat deadlines, Data Tables, Kaiten sync and reminders.",
    html_url: `https://github.com/${GITHUB_USER}/tasktreker-vk-n8n`,
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: "n8n",
    topics: ["n8n", "GigaChat", "VK", "Kaiten"],
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    name: "neirobridge-site",
    description: "Portfolio website NeiroBridge: Next.js, Tailwind, Docker, Caddy.",
    html_url: `https://github.com/${GITHUB_USER}/neirobridge-site`,
    homepage: "https://neirobridge.ru",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    topics: ["Next.js", "Portfolio", "Docker"],
    updated_at: new Date().toISOString()
  },
  {
    id: 6,
    name: "beanbonus-bot",
    description: "Telegram-бот лояльности для кофеен: бонусы и режим продавца.",
    html_url: `https://github.com/${GITHUB_USER}/beanbonus-bot`,
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    topics: ["Telegram", "Loyalty", "Bots"],
    updated_at: new Date().toISOString()
  }
];

export function getRepoDisplayName(name: string) {
  return repoDisplayNames[name] ?? name;
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "NeiroBridge-Site (https://neirobridge.ru)"
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`,
      {
        headers,
        next: {
          revalidate: 3600
        }
      }
    );

    if (!response.ok) {
      return fallbackRepos;
    }

    const repos = ((await response.json()) as GitHubRepo[]).filter(
      (repo) => !HIDDEN_REPOS.has(repo.name) && !repo.name.endsWith(".github.io")
    );

    const priority = [
      "RivalScope",
      "MarketVision",
      "deskmate-bot",
      "tasktreker-vk-n8n",
      "neirobridge-site",
      "beanbonus-bot"
    ];

    if (repos.length === 0) return fallbackRepos;

    return repos
      .sort((first, second) => {
        const firstIndex = priority.indexOf(first.name);
        const secondIndex = priority.indexOf(second.name);
        const firstRank = firstIndex === -1 ? 999 : firstIndex;
        const secondRank = secondIndex === -1 ? 999 : secondIndex;
        return firstRank - secondRank;
      })
      .slice(0, 6);
  } catch {
    return fallbackRepos;
  }
}
