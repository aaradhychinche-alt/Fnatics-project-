import React, { createContext, useContext, useState } from 'react';
import { stats as initialStats, topics as initialTopics } from '../mockData';

const MockDataContext = createContext();

export const useMockData = () => useContext(MockDataContext);

export const MockDataProvider = ({ children }) => {
    // Stats State
    const [stats, setStats] = useState(initialStats);
    const [topics, setTopics] = useState(initialTopics);

    // Mock DSA Questions Data
    // In a real app, this would be fetched from a backend API (e.g., /api/questions)
    const [dsaQuestions, setDsaQuestions] = useState([
        { id: 101, title: "Implement Binary Search", topic: "Arrays", subtopic: "Searching", difficulty: "Easy", classDate: "2023-11-01", status: "pending", externalLink: "https://learn.vedam.org/course-item?item-id=68efdb4d82c2287143b3b028" },
        { id: 102, title: "Java Arrays Majority Element", topic: "LinkedList", subtopic: "Basics", difficulty: "Medium", classDate: "2023-11-03", status: "completed", externalLink: "https://learn.vedam.org/course-item?item-id=6927e9a8ab219321a5b3d8fb" },
        { id: 103, title: "Reverse String", topic: "Strings", subtopic: "Hash Map", difficulty: "Easy", classDate: "2023-11-05", status: "pending", externalLink: "https://learn.vedam.org/course-item?item-id=69078863c1e78bb048c1557c" },
        { id: 104, title: "BITS OddEven", topic: "Trees", subtopic: "Bit Manipulation", difficulty: "Medium", classDate: "2023-11-08", status: "pending", externalLink: "https://learn.vedam.org/course-item?item-id=691b27edf95b36d02d1467d8" },
        { id: 105, title: "Find Median from Data Stream", topic: "PQ", subtopic: "PQ1", difficulty: "Hard", classDate: "2023-11-10", status: "completed", externalLink: "https://learn.vedam.org/course-item?item-id=6915e171c0902820c4739345" },
    ]);

    // Mock LeetCode Recommendations Data
    const [leetCodeQuestions, setLeetCodeQuestions] = useState([
        { id: 201, title: "Two Sum", difficulty: "Easy", acceptance: "52%", link: "https://leetcode.com/problems/two-sum/", reason: "Fundamental array problem", status: "completed" },
        { id: 202, title: "Group Anagrams", difficulty: "Medium", acceptance: "68%", link: "https://leetcode.com/problems/group-anagrams/", reason: "Great for mastering Hash Maps", status: "pending" },
        { id: 203, title: "Top K Frequent Elements", difficulty: "Medium", acceptance: "63%", link: "https://leetcode.com/problems/top-k-frequent-elements/", reason: "Practice Heap/Priority Queue", status: "pending" },
        { id: 204, title: "Trapping Rain Water", difficulty: "Hard", acceptance: "60%", link: "https://leetcode.com/problems/trapping-rain-water/", reason: "Advanced Two Pointers challenge", status: "pending" },
    ]);

    // Function to toggle DSA Question status
    const toggleDsaQuestionStatus = (id) => {
        setDsaQuestions(prev => prev.map(q => {
            if (q.id === id) {
                const newStatus = q.status === "completed" ? "pending" : "completed";
                updateStats(newStatus === "completed");
                return { ...q, status: newStatus };
            }
            return q;
        }));
    };

    // Function to toggle LeetCode Question status
    const toggleLeetCodeStatus = (id) => {
        setLeetCodeQuestions(prev => prev.map(q => {
            if (q.id === id) {
                const newStatus = q.status === "completed" ? "pending" : "completed";
                updateStats(newStatus === "completed");
                return { ...q, status: newStatus };
            }
            return q;
        }));
    };

    // Helper to update global stats
    const updateStats = (isIncrement) => {
        setStats(prev => ({
            ...prev,
            solvedToday: isIncrement ? prev.solvedToday + 1 : Math.max(0, prev.solvedToday - 1),
            totalQuestions: isIncrement ? prev.totalQuestions + 1 : Math.max(0, prev.totalQuestions - 1),
        }));

        // Randomly update a topic progress for visual effect
        setTopics(prev => prev.map(t => ({
            ...t,
            progress: Math.min(100, t.progress + (isIncrement ? 1 : -1))
        })));
    };

    return (
        <MockDataContext.Provider value={{
            stats,
            topics,
            dsaQuestions,
            leetCodeQuestions,
            toggleDsaQuestionStatus,
            toggleLeetCodeStatus
        }}>
            {children}
        </MockDataContext.Provider>
    );
};
