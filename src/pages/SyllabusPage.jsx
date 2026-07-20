import { PanelsTopLeft } from 'lucide-react';
import AIQuestionGenerator from '../components/AIQuestionGenerator';
import SyllabusChart from '../components/SyllabusChart';
import SyllabusDetails from '../components/SyllabusDetails';
import Card from '../components/ui/Card';
import { usePrep } from '../context/usePrep';

export default function SyllabusPage() {
  const {
    gemini,
    handleGenerateQuestion,
    selectedDomain,
    selectedDomainData,
    setSelectedDomain,
    studyFocusSummary,
    syllabusData,
  } = usePrep();

  return (
    <section className="scroll-mt-8" id="syllabus-section" aria-labelledby="syllabus-title">
      <div className="mb-6">
        <h2 id="syllabus-title" className="flex items-center gap-2 text-2xl font-bold text-stone-800 dark:text-stone-100">
          <PanelsTopLeft className="h-8 w-8 text-teal-600" aria-hidden="true" />
          Technical Syllabus Breakdown
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-stone-600 dark:text-stone-300">
          Select a domain from the chart to view details and generate a focused practice question.
        </p>
      </div>

      <Card className="flex flex-col items-center gap-8 p-6 md:flex-row">
        <div className="w-full md:w-1/2">
          <SyllabusChart data={syllabusData} onSelectDomain={setSelectedDomain} />
        </div>
        <div className="flex min-h-[400px] w-full flex-col rounded-xl border border-stone-200 bg-stone-50 p-6 dark:border-white/5 dark:bg-slate-900/60 md:w-1/2">
          <div className="flex-1">
            <SyllabusDetails domain={selectedDomain} domainData={selectedDomainData} />
          </div>
          <AIQuestionGenerator
            disabled={gemini.loadingKey !== null}
            domain={selectedDomain}
            gemini={gemini}
            focusSummary={studyFocusSummary}
            isLoading={gemini.isLoading('question')}
            onGenerate={handleGenerateQuestion}
          />
        </div>
      </Card>
    </section>
  );
}
