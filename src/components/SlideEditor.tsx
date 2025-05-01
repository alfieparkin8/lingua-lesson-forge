
import { useLesson, Slide } from "@/context/LessonContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Plus, 
  Save, 
  Trash2 
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function SlideEditor() {
  const { generatedSlides, updateSlide, addSlide, deleteSlide } = useLesson();
  const [activeSlide, setActiveSlide] = useState<string>(generatedSlides[0]?.id || "");
  
  const currentSlide = generatedSlides.find(slide => slide.id === activeSlide);
  const currentSlideIndex = generatedSlides.findIndex(slide => slide.id === activeSlide);

  if (generatedSlides.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-gray-500 text-center">
          No slides generated yet. Please select curriculum options and click "Generate Lesson".
        </p>
      </div>
    );
  }

  const handleTitleChange = (title: string) => {
    if (!currentSlide) return;
    updateSlide(currentSlide.id, { title });
  };

  const handleContentChange = (text: string) => {
    if (!currentSlide) return;
    updateSlide(currentSlide.id, { 
      content: { ...currentSlide.content, text } 
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
        handleContentChange(newText);
        return;
    }
    
    const newText = text.substring(0, start) + prefix + text.substring(start, end) + suffix + text.substring(end);
    handleContentChange(newText);
    
    // Set selection to appropriate position after formatting
    setTimeout(() => {
      textArea.focus();
      textArea.selectionStart = start + prefix.length;
      textArea.selectionEnd = end + prefix.length;
    }, 0);
  };

  const handleDeleteSlide = () => {
    if (!currentSlide || generatedSlides.length <= 1) return;
    
    const currentIndex = generatedSlides.findIndex(slide => slide.id === currentSlide.id);
    const nextSlideIndex = currentIndex === generatedSlides.length - 1 ? currentIndex - 1 : currentIndex;
    
    deleteSlide(currentSlide.id);
    
    if (generatedSlides[nextSlideIndex]) {
      setActiveSlide(generatedSlides[nextSlideIndex].id);
    }
  };

  const handleAddSlide = (type: Slide['type']) => {
    const position = currentSlideIndex + 1;
    addSlide(type, position);
  };

  if (!currentSlide) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <h2 className="text-xl font-heading font-semibold">Slide Editor</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleAddSlide('title')}
          >
            <Plus size={16} className="mr-1" /> Add Slide
          </Button>
          {generatedSlides.length > 1 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDeleteSlide}
            >
              <Trash2 size={16} className="mr-1" /> Delete Slide
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Slide Thumbnails */}
        <div className="w-1/4 bg-gray-50 p-4 overflow-y-auto">
          <h3 className="font-medium mb-3 text-gray-700">Slides</h3>
          <div className="space-y-2">
            {generatedSlides.map((slide, index) => (
              <Card 
                key={slide.id}
                className={`p-3 cursor-pointer hover:bg-gray-100 transition ${activeSlide === slide.id ? 'ring-2 ring-lingua-primary' : ''}`}
                onClick={() => setActiveSlide(slide.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{index + 1}. {slide.type}</span>
                </div>
                <p className="text-xs text-gray-600 truncate mt-1">{slide.title}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {currentSlide && (
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input 
                    value={currentSlide.title} 
                    onChange={(e) => handleTitleChange(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => addFormattingToText('bold')}
                      >
                        <Bold size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => addFormattingToText('italic')}
                      >
                        <Italic size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => addFormattingToText('list')}
                      >
                        <List size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => addFormattingToText('ordered-list')}
                      >
                        <ListOrdered size={16} />
                      </Button>
                    </div>
                  </div>
                  {currentSlide.content.text !== undefined && (
                    <Textarea 
                      id="content-text"
                      value={currentSlide.content.text} 
                      onChange={(e) => handleContentChange(e.target.value)}
                      rows={5}
                    />
                  )}
                  
                  {currentSlide.content.items && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">Items</label>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={addItem}
                        >
                          <Plus size={16} className="mr-1" /> Add Item
                        </Button>
                      </div>
                      {currentSlide.content.items.map((item, index) => (
                        <Input 
                          key={index} 
                          value={item} 
                          onChange={(e) => handleItemChange(index, e.target.value)} 
                          placeholder={`Item ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {currentSlide.content.examples && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">Examples</label>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={addExample}
                        >
                          <Plus size={16} className="mr-1" /> Add Example
                        </Button>
                      </div>
                      {currentSlide.content.examples.map((example, index) => (
                        <Input 
                          key={index} 
                          value={example} 
                          onChange={(e) => handleExampleChange(index, e.target.value)} 
                          placeholder={`Example ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="preview">
                <div className="border rounded-lg p-6 min-h-[300px] bg-white shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">{currentSlide.title}</h2>
                  
                  {currentSlide.content.text && (
                    <div className="mb-4 whitespace-pre-wrap">{currentSlide.content.text}</div>
                  )}
                  
                  {currentSlide.content.items && currentSlide.content.items.length > 0 && (
                    <ul className="list-disc list-inside space-y-2 mb-4">
                      {currentSlide.content.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {currentSlide.content.examples && currentSlide.content.examples.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Examples:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {currentSlide.content.examples.map((example, index) => (
                          <li key={index} className="text-lingua-primary">{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}
