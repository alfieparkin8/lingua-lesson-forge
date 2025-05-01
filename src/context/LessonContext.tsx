
import React, { createContext, useContext, useState } from "react";
import { Theme, Topic, GrammarPoint } from "../data/curriculum";
import { curriculumData } from "../data/curriculum";

export interface Slide {
  id: string;
  type: 'title' | 'vocabulary' | 'grammar' | 'practice' | 'plenary';
  title: string;
  content: {
    text?: string;
    items?: string[];
    examples?: string[];
    notes?: string;
  };
}

interface LessonContextType {
  selectedTheme: Theme | null;
  selectedTopic: Topic | null;
  selectedGrammarPoint: GrammarPoint | null;
  generatedSlides: Slide[];
  setSelectedTheme: (theme: Theme | null) => void;
  setSelectedTopic: (topic: Topic | null) => void;
  setSelectedGrammarPoint: (grammarPoint: GrammarPoint | null) => void;
  generateLesson: () => void;
  updateSlide: (slideId: string, updatedContent: Partial<Slide>) => void;
  addSlide: (slideType: Slide['type'], position?: number) => void;
  deleteSlide: (slideId: string) => void;
  themes: Theme[];
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const LessonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedGrammarPoint, setSelectedGrammarPoint] = useState<GrammarPoint | null>(null);
  const [generatedSlides, setGeneratedSlides] = useState<Slide[]>([]);
  
  const generateLesson = () => {
    if (!selectedTopic || !selectedGrammarPoint) return;
    
    // Create a basic lesson structure
    const slides: Slide[] = [
      {
        id: `slide-${Date.now()}-1`,
        type: 'title',
        title: `${selectedTopic.name}: ${selectedGrammarPoint.name}`,
        content: {
          text: `Learning objectives:\n- Understand ${selectedGrammarPoint.name}\n- Learn key vocabulary for ${selectedTopic.name}\n- Practice using ${selectedGrammarPoint.name} in context`
        }
      },
      {
        id: `slide-${Date.now()}-2`,
        type: 'vocabulary',
        title: `Key Vocabulary: ${selectedTopic.name}`,
        content: {
          items: selectedTopic.vocabulary.slice(0, 8).map(item => `${item.spanish} - ${item.english}`)
        }
      },
      {
        id: `slide-${Date.now()}-3`,
        type: 'grammar',
        title: selectedGrammarPoint.name,
        content: {
          text: selectedGrammarPoint.description,
          examples: selectedGrammarPoint.examples
        }
      },
      {
        id: `slide-${Date.now()}-4`,
        type: 'practice',
        title: `Practice: ${selectedGrammarPoint.name}`,
        content: {
          text: `Complete the following sentences using ${selectedGrammarPoint.name}:`,
          items: ['(Exercise examples would be generated here based on grammar point)']
        }
      },
      {
        id: `slide-${Date.now()}-5`,
        type: 'plenary',
        title: 'Recap and Assessment',
        content: {
          text: 'What have we learned today?',
          items: [
            `Key vocabulary for ${selectedTopic.name}`,
            `How to use ${selectedGrammarPoint.name}`,
            'How to apply this grammar in context'
          ]
        }
      }
    ];
    
    setGeneratedSlides(slides);
  };
  
  const updateSlide = (slideId: string, updatedContent: Partial<Slide>) => {
    setGeneratedSlides(slides => 
      slides.map(slide => 
        slide.id === slideId ? { ...slide, ...updatedContent } : slide
      )
    );
  };
  
  const addSlide = (slideType: Slide['type'], position?: number) => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      type: slideType,
      title: `New ${slideType} slide`,
      content: { text: '' }
    };
    
    if (position !== undefined) {
      const newSlides = [...generatedSlides];
      newSlides.splice(position, 0, newSlide);
      setGeneratedSlides(newSlides);
    } else {
      setGeneratedSlides([...generatedSlides, newSlide]);
    }
  };
  
  const deleteSlide = (slideId: string) => {
    setGeneratedSlides(slides => slides.filter(slide => slide.id !== slideId));
  };
  
  const value = {
    selectedTheme,
    selectedTopic,
    selectedGrammarPoint,
    generatedSlides,
    setSelectedTheme,
    setSelectedTopic,
    setSelectedGrammarPoint,
    generateLesson,
    updateSlide,
    addSlide,
    deleteSlide,
    themes: curriculumData,
  };
  
  return <LessonContext.Provider value={value}>{children}</LessonContext.Provider>;
};

export const useLesson = () => {
  const context = useContext(LessonContext);
  if (context === undefined) {
    throw new Error('useLesson must be used within a LessonProvider');
  }
  return context;
};
