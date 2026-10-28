import axios from "axios";

const getLatestRepos = async (data, token = process.env.GITHUB_AUTH_TOKEN) => {
  try {
    const { data: repos } = await axios.get(
      `https://api.github.com/users/${encodeURIComponent(data.githubUsername)}/repos`,
      {
        params: { sort: "pushed", direction: "desc", per_page: 100 },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        timeout: 5000,
      },
    );
    return repos.filter((repo) => !repo.private && !repo.fork && !repo.archived).slice(0, 6);
  } catch (err) {
    console.error("Unable to load public GitHub repositories:", err.message);
    return [];
  }
};

export default getLatestRepos;
