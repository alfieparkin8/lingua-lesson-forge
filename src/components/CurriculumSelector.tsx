
import { useLesson } from "@/context/LessonContext";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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

  const handleThemeChange = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId) || null;
    setSelectedTheme(theme);
    setSelectedTopic(null);
    setSelectedGrammarPoint(null);
  };

  const handleTopicChange = (topicId: string) => {
    if (!selectedTheme) return;
    const topic = selectedTheme.topics.find(t => t.id === topicId) || null;
    setSelectedTopic(topic);
    setSelectedGrammarPoint(null);
  };

  const handleGrammarChange = (grammarId: string) => {
    if (!selectedTopic) return;
    const grammar = selectedTopic.grammarPoints.find(g => g.id === grammarId) || null;
    setSelectedGrammarPoint(grammar);
  };

  const disableGenerate = !selectedTheme || !selectedTopic || !selectedGrammarPoint;

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-heading font-semibold text-lingua-dark">Curriculum Selection</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
          <Select onValueChange={handleThemeChange} value={selectedTheme?.id}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Themes</SelectLabel>
                {themes.map(theme => (
                  <SelectItem key={theme.id} value={theme.id}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
          <Select 
            onValueChange={handleTopicChange} 
            value={selectedTopic?.id} 
            disabled={!selectedTheme}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Topics</SelectLabel>
                {selectedTheme?.topics.map(topic => (
                  <SelectItem key={topic.id} value={topic.id}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Grammar Point</label>
          <Select 
            onValueChange={handleGrammarChange} 
            value={selectedGrammarPoint?.id}
            disabled={!selectedTopic}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a grammar point" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Grammar Points</SelectLabel>
                {selectedTopic?.grammarPoints.map(grammar => (
                  <SelectItem key={grammar.id} value={grammar.id}>
                    {grammar.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          className="w-full bg-lingua-primary text-white hover:bg-blue-700"
          disabled={disableGenerate}
          onClick={generateLesson}
        >
          Generate Lesson
        </Button>
      </div>
    </div>
  );
}
