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

const fallbackRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "RivalScope",
    description:
      "AI-powered competitor intelligence dashboard for analyzing websites, texts, images and market positioning.",
    html_url: "https://github.com/bazhen82/RivalScope",
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
    html_url: "https://github.com/bazhen82/MarketVision",
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    topics: ["AI", "Ecommerce", "GigaChat"],
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "anonspost",
    description: "AnonsPost — manual email mailing panel built with Flask and SMTP.",
    html_url: "https://github.com/bazhen82/anonspost",
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    topics: ["Flask", "SMTP", "Automation"],
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    name: "presentBot",
    description: "Python bot project for automating routine workflows.",
    html_url: "https://github.com/bazhen82/presentBot",
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    topics: ["Python", "Bots", "AI"],
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    name: "tasktreker-vk-n8n",
    description:
      "VK task tracker bot on n8n with GigaChat deadlines, Data Tables, Kaiten sync and reminders.",
    html_url: "https://github.com/bazhen82/tasktreker-vk-n8n",
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: "n8n",
    topics: ["n8n", "GigaChat", "VK", "Kaiten"],
    updated_at: new Date().toISOString()
  }
];

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch("https://api.github.com/users/bazhen82/repos?sort=updated&per_page=6", {
      headers: {
        Accept: "application/vnd.github+json"
      },
      next: {
        revalidate: 3600
      }
    });

    if (!response.ok) {
      return fallbackRepos;
    }

    const repos = (await response.json()) as GitHubRepo[];
    const priority = ["RivalScope", "MarketVision", "tasktreker-vk-n8n", "neirobridge-site"];

    return repos.length > 0
      ? repos.sort((first, second) => {
          const firstIndex = priority.indexOf(first.name);
          const secondIndex = priority.indexOf(second.name);
          const firstRank = firstIndex === -1 ? 999 : firstIndex;
          const secondRank = secondIndex === -1 ? 999 : secondIndex;

          return firstRank - secondRank;
        })
      : fallbackRepos;
  } catch {
    return fallbackRepos;
  }
}
