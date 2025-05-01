// src/pages/Index.tsx
import { Header } from "@/components/Header";
import { CurriculumSelector } from "@/components/CurriculumSelector";
import { SlideEditor } from "@/components/SlideEditor";
import { LessonProvider } from "@/context/LessonContext";
import { useLesson } from "@/context/LessonContext";
import { 
  GraduationCap, 
  Book, 
  BookOpen, 
  Edit3, 
  Download 
} from "lucide-react";

function IndexContent() {
  const { generatedSlides } = useLesson();
  
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF6D6] bg-opacity-50">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <CurriculumSelector />
          </div>
          
          <div className="flex-1">
            {generatedSlides.length > 0 ? (
              <div className="shadow-lg h-full bg-white overflow-hidden">
                <SlideEditor />
              </div>
            ) : (
              <div className="shadow-lg h-full bg-white" style={{
                border: '10px solid #FF6B00',
                boxShadow: '0 0 0 3px #FFFFFF, 0 0 0 6px #FFD949'
              }}>
                <div className="p-6">
                  <div className="text-center max-w-2xl mx-auto py-10">
                    <h2 className="text-3xl mb-4" style={{
                      fontFamily: '"Segoe UI Black", "Arial Black", sans-serif',
                      fontWeight: 900,
                      color: '#FFD949'
                    }}>
                      AQA GCSE Spanish
                    </h2>
                    <h3 className="text-2xl mb-8" style={{
                      fontFamily: '"Segoe UI Black", "Arial Black", sans-serif',
                      fontWeight: 900,
                      color: '#FF6B00'
                    }}>
                      Welcome to LinguaLessonPro
                    </h3>
                    <p className="text-lg text-gray-600 mb-8" style={{
                      fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", sans-serif'
                    }}>
                      Generate curriculum-aligned Spanish lessons for GCSE in just a few clicks
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-[#FFF6D6] p-6 border-l-4 border-[#FFD949] text-left">
                        <div className="mb-4 flex items-center">
                          <div className="rounded-full bg-[#FFD949] p-2 mr-3">
                            <BookOpen className="h-6 w-6 text-[#FF6B00]" />
                          </div>
                          <h3 className="text-xl" style={{
                            fontFamily: '"Segoe UI Black", "Arial Black", sans-serif',
                            fontWeight: 900,
                            color: '#FF6B00'
                          }}>How It Works</h3>
                        </div>
                        <ol className="list-decimal list-inside space-y-3 text-gray-700">
                          <li>Select a curriculum theme</li>
                          <li>Choose a specific topic</li>
                          <li>Pick a grammar point to focus on</li>
                          <li>Generate your complete lesson</li>
                          <li>Customize as needed</li>
                        </ol>
                      </div>
                      
                      <div className="bg-[#FFF0E6] p-6 border-l-4 border-[#FF6B00] text-left">
                        <div className="mb-4 flex items-center">
                          <div className="rounded-full bg-[#FF9B4D] p-2 mr-3">
                            <GraduationCap className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl" style={{
                            fontFamily: '"Segoe UI Black", "Arial Black", sans-serif',
                            fontWeight: 900,
                            color: '#FF6B00'
                          }}>Features</h3>
                        </div>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-center">
                            <Book className="h-4 w-4 text-[#FF6B00] mr-2" />
                            <span>GCSE-aligned content</span>
                          </li>
                          <li className="flex items-center">
                            <Edit3 className="h-4 w-4 text-[#FF6B00] mr-2" />
                            <span>Fully customizable slides</span>
                          </li>
                          <li className="flex items-center">
                            <Download className="h-4 w-4 text-[#FF6B00] mr-2" />
                            <span>Export to PowerPoint</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-10 p-4 bg-[#FF6B00] text-white rounded-lg inline-block">
                      Start by selecting a theme on the left →
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <footer className="bg-gray-800 text-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpen className="h-5 w-5 mr-2 text-[#FFD949]" />
              <span className="text-sm">
                LinguaLessonPro | GCSE Spanish Lesson Generator
              </span>
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} | Based on AQA GCSE Spanish Curriculum
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const Index = () => {
  return (
    <LessonProvider>
      <IndexContent />
    </LessonProvider>
  );
};

export default Index;