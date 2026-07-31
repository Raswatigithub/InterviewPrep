import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logisticsData } from '../data/logisticsData';
import { syllabusData } from '../data/syllabusData';
import { defaultStudyFocus, formatStudyFocus } from '../data/topicData';
import { useGemini } from '../hooks/useGemini';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PrepContext } from './PrepContextCore';

const prompts = {
  explain: (code) =>
    `Explain the logic of this code in plain English for a student preparing for an exam:\n\n${code}`,
  optimize: (code) =>
    `Identify performance bottlenecks and suggest 2-3 specific optimizations for this code snippet. Provide the improved version:\n\n${code}`,
  debug: (code) =>
    `Act as a senior QA engineer. Find any bugs, edge case failures, or security issues in this code. Explain them and provide a fixed version:\n\n${code}`,
};

export function PrepProvider({ children }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useLocalStorage('exam-prep-active-tab', 'ai-review');
  const [checkedItems, setCheckedItems] = useLocalStorage('exam-prep-checklist', {});
  const [code, setCode] = useLocalStorage('exam-prep-code', '');
  const [darkMode, setDarkMode] = useLocalStorage('exam-prep-dark-mode', false);
  const [studyFocus, setStudyFocus] = useLocalStorage('exam-prep-study-focus', defaultStudyFocus);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [questionOutput, setQuestionOutput] = useState('');
  const [questionBankOutput, setQuestionBankOutput] = useState('');
  const [reviewOutput, setReviewOutput] = useState('');
  const [concept, setConcept] = useState('');
  const [conceptOutput, setConceptOutput] = useState('');
  const [plannerDays, setPlannerDays] = useState('');
  const [plannerHours, setPlannerHours] = useState('');
  const [plannerOutput, setPlannerOutput] = useState('');
  const [toast, setToast] = useState(null);
  const gemini = useGemini();

  const selectedDomainData = selectedDomain ? syllabusData[selectedDomain] : null;
  const readyCount = logisticsData.filter((item) => checkedItems[item.id]).length;
  const studyFocusSummary = formatStudyFocus(studyFocus);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(null), 5200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const notify = (message, type = 'info') => setToast({ message, type });

  const copyGeneratedText = async (text, label = 'content') => {
    if (!text?.trim()) {
      notify(`No ${label} available to copy.`, 'error');
      return false;
    }

    if (typeof window === 'undefined' || !window.navigator?.clipboard) {
      notify('Copy is not available in this browser right now.', 'error');
      return false;
    }

    try {
      await window.navigator.clipboard.writeText(text);
      notify(`${label.charAt(0).toUpperCase() + label.slice(1)} copied.`, 'success');
      return true;
    } catch {
      notify('Copy failed. Please try again.', 'error');
      return false;
    }
  };

  const runGemini = async ({ key, prompt, systemPrompt, forceRefresh = false, onSuccess }) => {
    try {
      const result = await gemini.generate({ key, prompt, systemPrompt, forceRefresh });
      onSuccess(result);
      notify('AI response generated.', 'success');
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  const handleGenerateQuestion = (options = {}) => {
    const { forceRefresh = false } = options || {};
    if (!selectedDomain) {
      notify('Select a syllabus domain first.', 'error');
      return;
    }

    navigate('/materials?tab=practice-question');
    setQuestionOutput('');
    runGemini({
      key: 'question',
      forceRefresh,
      prompt: `Generate one polished interview-preparation item for a Full-Stack developer.

Syllabus domain: ${selectedDomain}
Selected study focus: ${studyFocusSummary}

Requirements:
1. Start with a clear title line
2. Write one realistic interview question aligned to the selected stack
3. Match the selected difficulty and question type when possible
4. Add "Why interviewers ask this"
5. Add "Strong answer points" with 4-6 bullets
6. Add "Common mistakes to avoid" with 2-4 bullets
7. Add one short follow-up question

Keep it practical, concise, and interview-specific. Do not give generic advice.`,
      systemPrompt: 'You are a strict technical recruiter for a high-performance software company.',
      onSuccess: setQuestionOutput,
    });
  };

  const handleGenerateQuestionBank = (options = {}) => {
    const { forceRefresh = false } = options || {};
    navigate('/materials?tab=question-bank');
    setQuestionBankOutput('');
    runGemini({
      key: 'question-bank',
      forceRefresh,
      prompt: `Generate a targeted interview question bank for this study focus:

${studyFocusSummary}

Create 8 targeted, high-yield interview questions for this exact stack and difficulty.

Format each question neatly as follows:
### Question [N]: [Title]
**Question**: [Detailed question text]
**Why Ask This**: [Brief explanation]
**Key Answer Points**:
- [Point 1]
- [Point 2]
- [Point 3]
**Common Pitfall**: [Main mistake to avoid]
**Follow-Up**: [Related follow-up question]

Keep answers focused and bulleted so all 8 questions fit clearly into the response.`,
      systemPrompt:
        'You are a senior technical interviewer creating practical interview preparation material for software developers.',
      onSuccess: setQuestionBankOutput,
    });
  };

  const handleCodeReview = (actionType) => {
    if (!code.trim()) {
      notify('Please paste some code first.', 'error');
      return;
    }

    setReviewOutput('');
    runGemini({
      key: actionType,
      prompt: prompts[actionType](code),
      systemPrompt: 'You are an expert software architect providing concise mentorship.',
      onSuccess: setReviewOutput,
    });
  };

  const handleExplainConcept = () => {
    if (!concept.trim()) {
      notify('Please enter a concept first.', 'error');
      return;
    }

    setConceptOutput('');
    runGemini({
      key: 'eli5',
      prompt: `Explain the technical concept "${concept}" as if I am 5 years old. Use a fun, simple analogy. Keep it under 3 short paragraphs.`,
      systemPrompt: 'You are a friendly, encouraging computer science teacher.',
      onSuccess: (result) => setConceptOutput(`Concept: ${concept}\n\n${result}`),
    });
  };

  const handleGeneratePlan = () => {
    if (!plannerDays || !plannerHours) {
      notify('Please enter both days and hours.', 'error');
      return;
    }

    navigate('/materials?tab=study-plan');
    setPlannerOutput('');
    runGemini({
      key: 'planner',
      prompt: `Create a personalized interview study plan for a software developer.

Selected study focus: ${studyFocusSummary}
I have ${plannerDays} days left and can study ${plannerHours} hours per day.

Build a realistic day-by-day plan that helps the user prepare for likely interviews on this stack.

Output format:
1. Preparation Summary
2. Priority Topics
3. Day-by-day schedule
4. Practice question checkpoints
5. Revision strategy
6. Final mock interview plan

Rules:
- Tailor the plan to the selected language, frameworks, topic, difficulty, and question type
- Keep each day practical for the available study hours
- Include focused revision and interview practice
- Highlight what should be prioritized if time runs short
- Use clean headings and bullets so it reads like a real preparation guide`,
      systemPrompt: 'You are an expert technical study planner.',
      onSuccess: setPlannerOutput,
    });
  };

  const value = {
    activeTab,
    checkedItems,
    code,
    concept,
    conceptOutput,
    copyGeneratedText,
    darkMode,
    gemini,
    handleCodeReview,
    handleExplainConcept,
    handleGeneratePlan,
    handleGenerateQuestion,
    handleGenerateQuestionBank,
    logisticsData,
    notify,
    plannerDays,
    plannerHours,
    plannerOutput,
    questionBankOutput,
    questionOutput,
    readyCount,
    reviewOutput,
    selectedDomain,
    selectedDomainData,
    setActiveTab,
    setCheckedItems,
    setCode,
    setConcept,
    setDarkMode,
    setPlannerDays,
    setPlannerHours,
    setSelectedDomain,
    setStudyFocus,
    setToast,
    studyFocus,
    studyFocusSummary,
    syllabusData,
    toast,
  };

  return <PrepContext.Provider value={value}>{children}</PrepContext.Provider>;
}
