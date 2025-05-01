
import { Header } from "@/components/Header";
import { CurriculumSelector } from "@/components/CurriculumSelector";
import { SlideEditor } from "@/components/SlideEditor";
import { LessonProvider } from "@/context/LessonContext";
import { useLesson } from "@/context/LessonContext";

function IndexContent() {
  const { generatedSlides } = useLesson();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="lg:w-1/3 p-6">
          <CurriculumSelector />
        </div>
        
        <div className="flex-1 lg:border-l border-gray-200">
          {generatedSlides.length > 0 ? (
            <SlideEditor />
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <h2 className="text-2xl font-heading font-semibold text-lingua-dark mb-2">
                  Welcome to LinguaLessonPro
                </h2>
                <p className="text-gray-600 mb-4">
                  Select your curriculum options on the left and generate a customized Spanish lesson in seconds.
                </p>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-left">
                  <h3 className="font-medium mb-2">Quick Start:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Select a Theme from the dropdown</li>
                    <li>Choose a Topic related to your theme</li>
                    <li>Pick a Grammar Point to focus on</li>
                    <li>Click "Generate Lesson" to create your slides</li>
                    <li>Edit the content as needed and export to PowerPoint</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          LinguaLessonPro &copy; {new Date().getFullYear()} | GCSE Spanish Lesson Generator
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
