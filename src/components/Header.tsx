
import { Button } from "@/components/ui/button";
import { useLesson } from "@/context/LessonContext";
import { exportToPowerPoint } from "@/utils/pptxExport";
import { Download } from "lucide-react";

export function Header() {
  const { generatedSlides, selectedTopic, selectedGrammarPoint } = useLesson();
  
  const handleExport = () => {
    if (generatedSlides.length === 0) return;
    
    const lessonTitle = selectedTopic && selectedGrammarPoint 
      ? `${selectedTopic.name}: ${selectedGrammarPoint.name}` 
      : "Spanish Lesson";
      
    exportToPowerPoint(generatedSlides, lessonTitle);
  };
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-heading font-bold text-lingua-primary">
            LinguaLessonPro
          </h1>
          <span className="ml-2 text-xs bg-lingua-secondary text-white px-2 py-0.5 rounded-full">
            Beta
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {generatedSlides.length > 0 && (
            <Button 
              onClick={handleExport}
              className="bg-lingua-secondary hover:bg-orange-600"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" /> Export to PowerPoint
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
