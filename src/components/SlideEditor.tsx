// src/components/SlideEditor.tsx
import { useLesson, Slide } from "@/context/LessonContext";
import { useState } from "react";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Plus, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  Pencil,
  Eye,
  Image,
  MessageSquare,
  Edit3,
  Languages,
  BookOpen,
  FileText as BookText, // Renamed to what's available in lucide-react
  CheckSquare,
  Table2 as Table, // Renamed to what's available in lucide-react
  LineChart,
  Link as FileSymlink // Renamed to what's available in lucide-react
} from "lucide-react";
import { SlidePreview } from "@/components/SlidePreview";
import { exportToPowerPoint } from "@/utils/pptxExport";

export function SlideEditor() {
  const { 
    generatedSlides, 
    updateSlide, 
    addSlide, 
    deleteSlide, 
    selectedTopic, 
    selectedGrammarPoint 
  } = useLesson();
  
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(true);
  
  const currentSlide = generatedSlides[activeSlideIndex];

  if (generatedSlides.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-gray-500 text-center">
          No slides generated yet. Please select curriculum options and click "Generate Lesson".
        </p>
      </div>
    );
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentSlide) return;
    updateSlide(currentSlide.id, { title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!currentSlide) return;
    updateSlide(currentSlide.id, { 
      content: { ...currentSlide.content, text: e.target.value } 
    });
  };

  const handleItemChange = (index: number, value: string) => {
    if (!currentSlide || !currentSlide.content.items) return;
    const newItems = [...currentSlide.content.items];
    newItems[index] = value;
    updateSlide(currentSlide.id, { 
      content: { ...currentSlide.content, items: newItems } 
    });
  };

  const handleExampleChange = (index: number, value: string) => {
    if (!currentSlide || !currentSlide.content.examples) return;
    const newExamples = [...currentSlide.content.examples];
    newExamples[index] = value;
    updateSlide(currentSlide.id, { 
      content: { ...currentSlide.content, examples: newExamples } 
    });
  };

  const handleActivityTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!currentSlide) return;
    // Make sure we only pass allowed activity types
    const activityType = e.target.value as "matching" | "fillblanks" | "translation" | "writing" | "speaking";
    updateSlide(currentSlide.id, { 
      content: { ...currentSlide.content, activityType } 
    });
  };

  const addItem = () => {
    if (!currentSlide) return;
    const items = currentSlide.content.items || [];
    updateSlide(currentSlide.id, { 
      content: { ...currentSlide.content, items: [...items, "New item"] } 
    });
  };

  const addExample = () => {
    if (!currentSlide) return;
    const examples = currentSlide.content.examples || [];
    updateSlide(currentSlide.id, { 
      content: { ...currentSlide.content, examples: [...examples, "New example"] } 
    });
  };

  const addFormattingToText = (format: string) => {
    if (!currentSlide) return;
    
    const textArea = document.getElementById('content-text') as HTMLTextAreaElement;
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const text = textArea.value;
    
    let prefix = "";
    let suffix = "";
    
    switch (format) {
      case 'bold':
        prefix = "**";
        suffix = "**";
        break;
      case 'italic':
        prefix = "*";
        suffix = "*";
        break;
      case 'list':
        prefix = "• ";
        break;
      case 'ordered-list':
        const selectedText = text.substring(start, end);
        const lines = selectedText.split('\n');
        const numberedLines = lines.map((line, i) => `${i+1}. ${line}`).join('\n');
        
        const newText = text.substring(0, start) + numberedLines + text.substring(end);
        handleContentChange({ target: { value: newText } } as React.ChangeEvent<HTMLTextAreaElement>);
        return;
    }
    
    const newText = text.substring(0, start) + prefix + text.substring(start, end) + suffix + text.substring(end);
    handleContentChange({ target: { value: newText } } as React.ChangeEvent<HTMLTextAreaElement>);
    
    // Set selection to appropriate position after formatting
    setTimeout(() => {
      textArea.focus();
      textArea.selectionStart = start + prefix.length;
      textArea.selectionEnd = end + prefix.length;
    }, 0);
  };

  const handleDeleteSlide = () => {
    if (!currentSlide || generatedSlides.length <= 1) return;
    
    const newIndex = activeSlideIndex === generatedSlides.length - 1 
      ? activeSlideIndex - 1 
      : activeSlideIndex;
    
    deleteSlide(currentSlide.id);
    setActiveSlideIndex(newIndex);
  };

  const handleAddSlide = (type: Slide['type']) => {
    const position = activeSlideIndex + 1;
    addSlide(type, position);
  };

  const navigateSlide = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && activeSlideIndex > 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
    } else if (direction === 'next' && activeSlideIndex < generatedSlides.length - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
    }
  };

  const handleExport = () => {
    if (generatedSlides.length === 0) return;
    
    const lessonTitle = selectedTopic && selectedGrammarPoint 
      ? `${selectedTopic.name}: ${selectedGrammarPoint.name}` 
      : "Spanish Lesson";
      
    exportToPowerPoint(generatedSlides, lessonTitle);
  };

  // Slide type icons
  const slideTypeIcons = {
    'title': <BookOpen size={16} />,
    'vocabulary': <Languages size={16} />,
    'grammar': <BookText size={16} />,
    'practice': <Edit3 size={16} />,
    'activity': <MessageSquare size={16} />,
    'plenary': <CheckSquare size={16} />
  };

  // Bordered card style for Spanish theme
  const cardStyle = {
    border: '10px solid #FF6B00',
    boxShadow: '0 0 0 3px #FFFFFF, 0 0 0 6px #FFD949',
    margin: '0.5rem',
    backgroundColor: 'white'
  };

  // Heading style for Spanish theme
  const headingStyle = {
    fontFamily: '"Segoe UI Black", "Arial Black", sans-serif',
    fontWeight: 900
  };

  if (!currentSlide) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Header with slide controls */}
      <div style={{backgroundColor: '#FFD949'}} className="border-b p-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button 
            className="px-2 py-1 bg-white text-[#FF6B00] rounded border border-[#FF6B00] flex items-center"
            onClick={() => navigateSlide('prev')}
            disabled={activeSlideIndex === 0}
          >
            <ChevronLeft size={18} />
          </button>
          <span className="px-2 py-1 bg-white rounded text-sm font-medium">
            {activeSlideIndex + 1} / {generatedSlides.length}
          </span>
          <button 
            className="px-2 py-1 bg-white text-[#FF6B00] rounded border border-[#FF6B00] flex items-center"
            onClick={() => navigateSlide('next')}
            disabled={activeSlideIndex === generatedSlides.length - 1}
          >
            <ChevronRight size={18} />
          </button>
        </div>
        
        <div className="flex gap-2">
          <button 
            className={`px-3 py-1.5 rounded flex items-center gap-1 ${editMode ? 'bg-[#FF6B00] text-white' : 'bg-white text-[#FF6B00] border border-[#FF6B00]'}`}
            onClick={() => setEditMode(true)}
          >
            <Pencil size={16} /> Edit
          </button>
          <button 
            className={`px-3 py-1.5 rounded flex items-center gap-1 ${!editMode ? 'bg-[#FF6B00] text-white' : 'bg-white text-[#FF6B00] border border-[#FF6B00]'}`}
            onClick={() => setEditMode(false)}
          >
            <Eye size={16} /> Preview
          </button>
        </div>
        
        <div className="flex gap-2">
          <div className="relative group">
            <button 
              className="px-3 py-1.5 bg-white text-[#FF6B00] rounded border border-[#FF6B00] flex items-center gap-1"
            >
              <Plus size={16} /> Add Slide
            </button>
            <div className="absolute right-0 mt-1 hidden group-hover:block bg-white shadow-lg rounded p-2 z-10 border border-gray-200">
              <div className="flex flex-col gap-1">
                <button 
                  className="px-3 py-1.5 text-sm text-left hover:bg-[#FFF6D6] flex items-center"
                  onClick={() => handleAddSlide('title')}
                >
                  <BookOpen className="mr-2 h-4 w-4 text-[#FF6B00]" /> Title Slide
                </button>
                <button 
                  className="px-3 py-1.5 text-sm text-left hover:bg-[#FFF6D6] flex items-center"
                  onClick={() => handleAddSlide('vocabulary')}
                >
                  <Languages className="mr-2 h-4 w-4 text-[#FF6B00]" /> Vocabulary
                </button>
                <button 
                  className="px-3 py-1.5 text-sm text-left hover:bg-[#FFF6D6] flex items-center"
                  onClick={() => handleAddSlide('grammar')}
                >
                  <BookText className="mr-2 h-4 w-4 text-[#FF6B00]" /> Grammar
                </button>
                <button 
                  className="px-3 py-1.5 text-sm text-left hover:bg-[#FFF6D6] flex items-center"
                  onClick={() => handleAddSlide('practice')}
                >
                  <Edit3 className="mr-2 h-4 w-4 text-[#FF6B00]" /> Practice
                </button>
                <button 
                  className="px-3 py-1.5 text-sm text-left hover:bg-[#FFF6D6] flex items-center"
                  onClick={() => handleAddSlide('activity')}
                >
                  <MessageSquare className="mr-2 h-4 w-4 text-[#FF6B00]" /> Activity
                </button>
                <button 
                  className="px-3 py-1.5 text-sm text-left hover:bg-[#FFF6D6] flex items-center"
                  onClick={() => handleAddSlide('plenary')}
                >
                  <CheckSquare className="mr-2 h-4 w-4 text-[#FF6B00]" /> Plenary
                </button>
              </div>
            </div>
          </div>
          
          {generatedSlides.length > 1 && (
            <button 
              className="px-3 py-1.5 bg-white text-red-500 rounded border border-red-500 flex items-center gap-1"
              onClick={handleDeleteSlide}
            >
              <Trash2 size={16} /> Delete
            </button>
          )}
          <button 
            className="px-3 py-1.5 bg-[#FF6B00] text-white rounded flex items-center gap-1"
            onClick={handleExport}
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Slide Thumbnails */}
        <div className="w-64 bg-[#FFF6D6] p-4 overflow-y-auto border-r">
          <h3 className="font-medium mb-3 text-[#FF6B00]" style={headingStyle}>Slide Navigator</h3>
          <div className="h-[calc(100vh-220px)] overflow-y-auto">
            <div className="space-y-2">
              {generatedSlides.map((slide, index) => (
                <div 
                  key={slide.id}
                  className={`p-2 cursor-pointer hover:bg-[#FFF0E6] transition border ${activeSlideIndex === index ? 'border-[#FF6B00] bg-[#FFF0E6]' : 'border-transparent'}`}
                  onClick={() => setActiveSlideIndex(index)}
                  style={{backgroundColor: activeSlideIndex === index ? '#FFF0E6' : 'white'}}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-[#FF6B00]">Slide {index + 1}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded text-white flex items-center" style={{
                      backgroundColor: slide.type === 'activity' ? '#FF9B4D' : '#FF6B00'
                    }}>
                      {slideTypeIcons[slide.type as keyof typeof slideTypeIcons]} 
                      <span className="ml-1">{slide.type}</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 truncate mt-1">{slide.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editor/Preview Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {editMode ? (
            // Edit Mode
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slide Title</label>
                <input 
                  value={currentSlide.title} 
                  onChange={handleTitleChange} 
                  className="w-full px-3 py-2 border border-[#FF6B00] rounded focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <div className="flex gap-1">
                    <button 
                      className="h-8 w-8 border border-[#FF6B00] rounded flex items-center justify-center text-[#FF6B00]" 
                      onClick={() => addFormattingToText('bold')}
                    >
                      <Bold size={16} />
                    </button>
                    <button 
                      className="h-8 w-8 border border-[#FF6B00] rounded flex items-center justify-center text-[#FF6B00]" 
                      onClick={() => addFormattingToText('italic')}
                    >
                      <Italic size={16} />
                    </button>
                    <button 
                      className="h-8 w-8 border border-[#FF6B00] rounded flex items-center justify-center text-[#FF6B00]" 
                      onClick={() => addFormattingToText('list')}
                    >
                      <List size={16} />
                    </button>
                    <button 
                      className="h-8 w-8 border border-[#FF6B00] rounded flex items-center justify-center text-[#FF6B00]" 
                      onClick={() => addFormattingToText('ordered-list')}
                    >
                      <ListOrdered size={16} />
                    </button>
                  </div>
                </div>
                {currentSlide.content.text !== undefined && (
                  <textarea 
                    id="content-text"
                    value={currentSlide.content.text} 
                    onChange={handleContentChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-[#FF6B00] rounded focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                  />
                )}
                
                {currentSlide.type === 'activity' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                    <select 
                      value={currentSlide.content.activityType || 'speaking'} 
                      onChange={handleActivityTypeChange}
                      className="w-full px-3 py-2 border border-[#FF6B00] rounded focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                    >
                      <option value="speaking">Speaking Activity</option>
                      <option value="writing">Writing Activity</option>
                      <option value="reading">Reading Activity</option>
                      <option value="listening">Listening Activity</option>
                      <option value="matching">Matching Activity</option>
                      <option value="translation">Translation Activity</option>
                      <option value="role-play">Role-Play Activity</option>
                      <option value="game">Game Activity</option>
                    </select>
                  </div>
                )}
                
                {currentSlide.content.items && (
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700">List Items</label>
                      <button 
                        className="px-2 py-1 bg-[#FFD949] text-[#FF6B00] rounded border border-[#FF6B00] flex items-center text-sm"
                        onClick={addItem}
                      >
                        <Plus size={14} className="mr-1" /> Add Item
                      </button>
                    </div>
                    {currentSlide.content.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#FF6B00] min-w-5">
                          {index + 1}.
                        </span>
                        <input 
                          value={item} 
                          onChange={(e) => handleItemChange(index, e.target.value)} 
                          placeholder={`Item ${index + 1}`}
                          className="w-full px-3 py-2 border border-[#FF6B00] rounded focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                {currentSlide.content.examples && (
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700">Examples</label>
                      <button 
                        className="px-2 py-1 bg-[#FFD949] text-[#FF6B00] rounded border border-[#FF6B00] flex items-center text-sm"
                        onClick={addExample}
                      >
                        <Plus size={14} className="mr-1" /> Add Example
                      </button>
                    </div>
                    {currentSlide.content.examples.map((example, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#FF9B4D] min-w-5">
                          Ex {index + 1}:
                        </span>
                        <input 
                          value={example} 
                          onChange={(e) => handleExampleChange(index, e.target.value)} 
                          placeholder={`Example ${index + 1}`}
                          className="w-full px-3 py-2 border border-[#FF6B00] rounded focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Graphics section */}
              <div className="mt-8 border-t border-[#FFD949] pt-4">
                <h3 className="font-medium text-[#FF6B00] mb-3" style={headingStyle}>
                  Visual Elements
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <button className="p-2 border border-[#FF6B00] rounded flex flex-col items-center gap-1 text-[#FF6B00] hover:bg-[#FFF6D6]">
                    <Image size={24} />
                    <span className="text-xs">Add Image</span>
                  </button>
                  <button className="p-2 border border-[#FF6B00] rounded flex flex-col items-center gap-1 text-[#FF6B00] hover:bg-[#FFF6D6]">
                    <Table size={24} />
                    <span className="text-xs">Add Table</span>
                  </button>
                  <button className="p-2 border border-[#FF6B00] rounded flex flex-col items-center gap-1 text-[#FF6B00] hover:bg-[#FFF6D6]">
                    <LineChart size={24} />
                    <span className="text-xs">Add Chart</span>
                  </button>
                  <button className="p-2 border border-[#FF6B00] rounded flex flex-col items-center gap-1 text-[#FF6B00] hover:bg-[#FFF6D6]">
                    <FileSymlink size={24} />
                    <span className="text-xs">Add Link</span>
                  </button>
                </div>
              </div>
              
              {/* Activity templates */}
              {currentSlide.type === 'activity' && (
                <div className="mt-4">
                  <h3 className="font-medium text-[#FF6B00] mb-3" style={headingStyle}>
                    Activity Templates
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 border border-[#FF9B4D] rounded bg-[#FFF0E6] hover:bg-[#FFE0CC] text-left">
                      <h4 className="font-medium text-[#FF6B00] mb-1">Fill in the Blanks</h4>
                      <p className="text-xs text-gray-600">Students complete sentences using vocabulary or grammar</p>
                    </button>
                    <button className="p-3 border border-[#FF9B4D] rounded bg-[#FFF0E6] hover:bg-[#FFE0CC] text-left">
                      <h4 className="font-medium text-[#FF6B00] mb-1">Matching Exercise</h4>
                      <p className="text-xs text-gray-600">Students match words with definitions or translations</p>
                    </button>
                    <button className="p-3 border border-[#FF9B4D] rounded bg-[#FFF0E6] hover:bg-[#FFE0CC] text-left">
                      <h4 className="font-medium text-[#FF6B00] mb-1">Role-Play Scenario</h4>
                      <p className="text-xs text-gray-600">Students practice conversations in different situations</p>
                    </button>
                    <button className="p-3 border border-[#FF9B4D] rounded bg-[#FFF0E6] hover:bg-[#FFE0CC] text-left">
                      <h4 className="font-medium text-[#FF6B00] mb-1">Translation Challenge</h4>
                      <p className="text-xs text-gray-600">Students translate phrases between Spanish and English</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Preview Mode
            <div className="flex justify-center">
              <div className="w-full max-w-3xl min-h-[450px]">
                <SlidePreview slide={currentSlide} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SlideEditor;