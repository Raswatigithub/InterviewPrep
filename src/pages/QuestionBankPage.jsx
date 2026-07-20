import QuestionBankGenerator from '../components/QuestionBankGenerator';
import { usePrep } from '../context/usePrep';

export default function QuestionBankPage() {
  const { gemini, handleGenerateQuestionBank, studyFocus } = usePrep();

  return (
    <QuestionBankGenerator
      disabled={gemini.loadingKey !== null}
      gemini={gemini}
      focus={studyFocus}
      isLoading={gemini.isLoading('question-bank')}
      onGenerate={handleGenerateQuestionBank}
    />
  );
}
