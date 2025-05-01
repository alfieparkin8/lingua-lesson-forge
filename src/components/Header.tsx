// src/components/Header.tsx
import { Button } from "@/components/ui/button";
import { useLesson } from "@/context/LessonContext";
import { Download, Book, HelpCircle } from "lucide-react";

export function Header() {
  const { generatedSlides, selectedTopic, selectedGrammarPoint } = useLesson();
  
  return (
    <header className="bg-gradient-to-r from-[#FF6B00] to-[#FF9B4D] text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Book className="h-8 w-8 mr-3 text-[#FFD949]" />
            <div>
              <h1 className="text-2xl font-bold" style={{fontFamily: '"Segoe UI Black", "Arial Black", sans-serif'}}>
                LinguaLessonPro
              </h1>
              <p className="text-xs text-yellow-100">GCSE Spanish Lesson Generator</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedTopic && selectedGrammarPoint && (
              <div className="hidden md:block bg-[#FF4D00] rounded-md px-3 py-1 text-sm">
                <span className="font-medium">{selectedTopic.name}: </span>
                <span>{selectedGrammarPoint.name}</span>
              </div>
            )}
            
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-[#FF6B00] hover:bg-yellow-50"
            >
              <HelpCircle className="mr-1 h-4 w-4" /> Help
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;