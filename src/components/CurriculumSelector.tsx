// src/components/CurriculumSelector.tsx
import { useState } from "react";
import { useLesson } from "@/context/LessonContext";
import { BookOpen, BookText, GraduationCap } from "lucide-react";

export function CurriculumSelector() {
  const { 
    themes, 
    selectedTheme, 
    selectedTopic, 
    selectedGrammarPoint,
    setSelectedTheme, 
    setSelectedTopic, 
    setSelectedGrammarPoint, 
    generateLesson 
  } = useLesson();
  
  const [currentTab, setCurrentTab] = useState("theme");

  const handleThemeChange = (event) => {
    const themeId = event.target.value;
    const theme = themes.find(t => t.id === themeId) || null;
    setSelectedTheme(theme);
    setSelectedTopic(null);
    setSelectedGrammarPoint(null);
    
    // Auto advance to next tab
    if (theme) {
      setCurrentTab("topic");
    }
  };

  const handleTopicChange = (event) => {
    if (!selectedTheme) return;
    const topicId = event.target.value;
    const topic = selectedTheme.topics.find(t => t.id === topicId) || null;
    setSelectedTopic(topic);
    setSelectedGrammarPoint(null);
    
    // Auto advance to next tab
    if (topic) {
      setCurrentTab("grammar");
    }
  };

  const handleGrammarChange = (event) => {
    if (!selectedTopic) return;
    const grammarId = event.target.value;
    const grammar = selectedTopic.grammarPoints.find(g => g.id === grammarId) || null;
    setSelectedGrammarPoint(grammar);
  };

  const disableGenerate = !selectedTheme || !selectedTopic || !selectedGrammarPoint;

  const cardStyle = {
    border: '10px solid #FF6B00',
    boxShadow: '0 0 0 3px #FFFFFF, 0 0 0 6px #FFD949',
    height: '100%',
    background: 'white'
  };

  const headingStyle = {
    fontFamily: '"Segoe UI Black", "Arial Black", sans-serif',
    fontWeight: 900,
    color: 'white'
  };

  return (
    <div style={cardStyle}>
      <div style={{backgroundColor: '#FF6B00', padding: '0.75rem 1rem'}}>
        <h2 style={headingStyle}>
          Create Spanish Lesson
        </h2>
      </div>
      
      <div className="p-4">
        <div className="flex border-b">
          <button 
            className={`px-4 py-2 text-sm font-medium ${currentTab === "theme" ? 'border-b-2 border-[#FF6B00] text-[#FF6B00]' : 'text-gray-500'}`}
            onClick={() => setCurrentTab("theme")}
            disabled={currentTab !== "theme" && !selectedTheme}
          >
            <BookOpen className="inline-block mr-2 h-4 w-4" />
            Theme
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${currentTab === "topic" ? 'border-b-2 border-[#FF6B00] text-[#FF6B00]' : 'text-gray-500'}`}
            onClick={() => setCurrentTab("topic")}
            disabled={!selectedTheme}
          >
            <BookText className="inline-block mr-2 h-4 w-4" />
            Topic
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${currentTab === "grammar" ? 'border-b-2 border-[#FF6B00] text-[#FF6B00]' : 'text-gray-500'}`}
            onClick={() => setCurrentTab("grammar")}
            disabled={!selectedTopic}
          >
            <GraduationCap className="inline-block mr-2 h-4 w-4" />
            Grammar
          </button>
        </div>
        
        <div className="pt-4">
          {currentTab === "theme" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select a Theme</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={selectedTheme?.id || ""}
                  onChange={handleThemeChange}
                >
                  <option value="">Choose a theme</option>
                  {themes.map(theme => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          
          {currentTab === "topic" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select a Topic</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={selectedTopic?.id || ""}
                  onChange={handleTopicChange}
                  disabled={!selectedTheme}
                >
                  <option value="">Choose a topic</option>
                  {selectedTheme?.topics.map(topic => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          
          {currentTab === "grammar" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select a Grammar Point</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={selectedGrammarPoint?.id || ""}
                  onChange={handleGrammarChange}
                  disabled={!selectedTopic}
                >
                  <option value="">Choose a grammar point</option>
                  {selectedTopic?.grammarPoints.map(grammar => (
                    <option key={grammar.id} value={grammar.id}>
                      {grammar.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        {selectedGrammarPoint && (
          <div className="mt-6 bg-[#FFF6D6] p-4 border-l-4 border-[#FFD949]">
            <h3 className="text-[#FF6B00] font-bold mb-2" style={{fontFamily: '"Segoe UI Black", "Arial Black", sans-serif'}}>Selected Content</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex items-center">
                <span className="font-medium w-24">Theme:</span>
                <span>{selectedTheme?.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-24">Topic:</span>
                <span>{selectedTopic?.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-24">Grammar:</span>
                <span>{selectedGrammarPoint?.name}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="pt-6">
          <button 
            className="w-full bg-[#FF6B00] hover:bg-[#E56000] text-white font-medium px-4 py-2 rounded-md"
            disabled={disableGenerate}
            onClick={generateLesson}
          >
            Generate Spanish Lesson
          </button>
        </div>
        
        {selectedTopic && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 uppercase mb-2">Preview Vocabulary</h3>
            <div className="h-36 overflow-y-auto rounded-md border p-2">
              <div className="space-y-1">
                {selectedTopic.vocabulary.slice(0, 10).map((vocab, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="font-medium text-[#FF6B00]">{vocab.spanish}</span>
                    <span className="text-gray-600">{vocab.english}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurriculumSelector;