// Mock Data for the DSA Analytics Portal

export const currentUser = {
  name: "Alex Coder",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  rank: 42,
  totalSolved: 345,
  accuracy: 78.5,
  streak: 12,
  xp: 15400,
};

export const rewards = [
  {
    id: 1,
    title: "1 Month Free Cursor Pro",
    description: "Get full access to Cursor Pro AI code editor for one month",
    xpCost: 1500,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    category: "Subscription"
  },
  {
    id: 2,
    title: "1 Month Free LinkedIn Premium",
    description: "Unlock LinkedIn Premium features including InMail and advanced insights",
    xpCost: 1800,
    image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=400&h=300&fit=crop",
    category: "Subscription"
  },
  {
    id: 3,
    title: "1 Month Free GitHub Copilot",
    description: "AI-powered code completion and suggestions in your IDE",
    xpCost: 1600,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop",
    category: "Subscription"
  },
  {
    id: 4,
    title: "1 Month Free ChatGPT Plus",
    description: "Access GPT-4 with priority access and faster response times",
    xpCost: 1200,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    category: "Subscription"
  },
  {
    id: 5,
    title: "1 Month Free Gemini Advanced",
    description: "Get Google's most capable AI model with extended features",
    xpCost: 2000,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    category: "Subscription"
  },
  {
    id: 6,
    title: "1 Month Free LeetCode Premium",
    description: "Access premium interview questions and company-specific content",
    xpCost: 2500,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    category: "Subscription"
  }
];

export const stats = {
  dailyGoal: 5,
  solvedToday: 3,
  weakTopics: ["Dynamic Programming", "Graphs", "Bit Manipulation"],
  strongTopics: ["Arrays", "Strings", "Hash Maps"],
  totalQuestions: 1200,
};

export const recentActivity = [
  { date: "2023-10-25", count: 5 },
  { date: "2023-10-26", count: 8 },
  { date: "2023-10-27", count: 2 },
  { date: "2023-10-28", count: 10 },
  { date: "2023-10-29", count: 4 },
  { date: "2023-10-30", count: 7 },
  { date: "2023-10-31", count: 3 },
];

export const leaderboardData = [
  { rank: 1, name: "Sarah J.", score: 2500, solved: 500, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { rank: 2, name: "Mike T.", score: 2450, solved: 490, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
  { rank: 3, name: "Emma W.", score: 2300, solved: 460, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
  { rank: 4, name: "James L.", score: 2100, solved: 420, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" },
  { rank: 5, name: "You", score: 1540, solved: 345, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", isCurrentUser: true },
];

export const recommendedQuestions = [
  { 
    id: 1, 
    title: "Merge K Sorted Lists", 
    difficulty: "Hard", 
    topic: "Heap", 
    acceptance: "45%",
    link: "https://leetcode.com/problems/merge-k-sorted-lists/"
  },
  { 
    id: 2, 
    title: "Longest Palindromic Substring", 
    difficulty: "Medium", 
    topic: "DP", 
    acceptance: "32%",
    link: "https://leetcode.com/problems/longest-palindromic-substring/"
  },
  { 
    id: 3, 
    title: "Valid Parentheses", 
    difficulty: "Easy", 
    topic: "Stack", 
    acceptance: "80%",
    link: "https://leetcode.com/problems/valid-parentheses/"
  },
];

export const topics = [
  { name: "Arrays", progress: 85, total: 150 },
  { name: "DP", progress: 30, total: 120 },
  { name: "Graphs", progress: 45, total: 100 },
  { name: "Trees", progress: 60, total: 110 },
];
