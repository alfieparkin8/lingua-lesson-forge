import React, { createContext, useContext, useState } from "react";
import { Theme, Topic, GrammarPoint } from "../data/curriculum";
import { curriculumData } from "../data/curriculum";

export interface Slide {
  id: string;
  type: 'title' | 'vocabulary' | 'grammar' | 'practice' | 'plenary' | 'activity';
  title: string;
  content: {
    text?: string;
    items?: string[];
    examples?: string[];
    notes?: string;
    imageUrl?: string;
    activityType?: 'matching' | 'fillblanks' | 'translation' | 'writing' | 'speaking';
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
    
    // Create a more comprehensive lesson structure inspired by the PDF
    const slides: Slide[] = [
      {
        id: `slide-${Date.now()}-1`,
        type: 'title',
        title: `${selectedTopic.name}: ${selectedGrammarPoint.name}`,
        content: {
          text: `Learning objectives:\n• Understand and use ${selectedGrammarPoint.name}\n• Learn key vocabulary for ${selectedTopic.name}\n• Practice using ${selectedGrammarPoint.name} in context`
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
        title: `¡Practiquemos! (Let's Practice!)`,
        content: {
          text: `Complete the following activities using ${selectedGrammarPoint.name}:`,
          items: generatePracticeItems(selectedGrammarPoint, selectedTopic)
        }
      },
      {
        id: `slide-${Date.now()}-5`,
        type: 'activity',
        title: `Activity: ${selectedGrammarPoint.name}`,
        content: {
          text: `Work with a partner to practice using ${selectedGrammarPoint.name}.`,
          activityType: 'speaking',
          items: generateActivityPrompts(selectedGrammarPoint, selectedTopic)
        }
      },
      {
        id: `slide-${Date.now()}-6`,
        type: 'plenary',
        title: 'Recap and Assessment',
        content: {
          text: '¿Qué hemos aprendido hoy? (What have we learned today?)',
          items: [
            `Key vocabulary for ${selectedTopic.name}`,
            `How to use ${selectedGrammarPoint.name}`,
            'How to apply this grammar in real-life contexts',
            'Practice speaking and writing skills'
          ]
        }
      }
    ];
    
    setGeneratedSlides(slides);
  };

  // Helper function to generate practice items based on grammar point
  const generatePracticeItems = (grammarPoint: GrammarPoint, topic: Topic): string[] => {
    const examples = grammarPoint.examples;
    const vocabulary = topic.vocabulary;
    
    // Use the grammar examples as a base and create practice exercises
    switch(grammarPoint.id) {
      case 'present-tense':
        return [
          "1. Yo _____ español todos los días. (hablar)",
          "2. Tú _____ con tus amigos. (comer)",
          "3. Ella _____ en Madrid. (vivir)",
          "4. Nosotros _____ al cine los fines de semana. (ir)",
          "5. Complete the sentences using the correct form of the present tense."
        ];
      case 'ser-estar':
        return [
          "1. Mi hermano _____ alto. (ser/estar)",
          "2. Nosotros _____ en la escuela ahora. (ser/estar)",
          "3. La casa _____ grande pero _____ sucia hoy. (ser/estar)",
          "4. ¿_____ tú español? No, yo _____ inglés. (ser/estar)",
          "5. Choose between ser and estar for each sentence."
        ];
      case 'adjective-agreement':
        return [
          "1. La casa _____ (rojo/roja/rojos/rojas)",
          "2. Los libros _____ (interesante/interesantes)",
          "3. Las chicas _____ (alto/alta/altos/altas)",
          "4. El coche _____ (azul/azules)",
          "5. Choose the correct form of the adjective."
        ];
      default:
        // Generate generic exercises if specific grammar isn't matched
        return [
          "1. Complete the following sentence: _____",
          "2. Translate this phrase to Spanish: _____",
          "3. Fill in the missing words: _____",
          "4. Create your own example using this grammar point.",
          "5. Practice with the vocabulary from this topic."
        ];
    }
  };

  // Helper function to generate activity prompts
  const generateActivityPrompts = (grammarPoint: GrammarPoint, topic: Topic): string[] => {
    const topicName = topic.name.toLowerCase();
    
    if (topicName.includes("family") || topicName.includes("friends")) {
      return [
        "Describe your family members using the grammar we learned",
        "Ask your partner questions about their family",
        "Compare your family to your partner's family"
      ];
    } else if (topicName.includes("home") || topicName.includes("town")) {
      return [
        "Describe your house or neighborhood",
        "Give directions to your school from your home",
        "Ask your partner questions about where they live"
      ];
    } else if (topicName.includes("school") || topicName.includes("studies")) {
      return [
        "Talk about your favorite subjects",
        "Describe your school day",
        "Compare different subjects using the grammar we learned"
      ];
    } else {
      // Default activities
      return [
        "Practice conversations using the new vocabulary",
        "Create sentences using the grammar point",
        "Work with your partner to create a short dialogue",
        "Ask and answer questions about the topic"
      ];
    }
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
      title: getDefaultTitleForType(slideType),
      content: getDefaultContentForType(slideType)
    };
    
    if (position !== undefined) {
      const newSlides = [...generatedSlides];
      newSlides.splice(position, 0, newSlide);
      setGeneratedSlides(newSlides);
    } else {
      setGeneratedSlides([...generatedSlides, newSlide]);
    }
  };
  
  const getDefaultTitleForType = (type: Slide['type']): string => {
    switch(type) {
      case 'title': return 'Lesson Title';
      case 'vocabulary': return 'Key Vocabulary';
      case 'grammar': return 'Grammar Explanation';
      case 'practice': return 'Practice Activities';
      case 'activity': return 'Interactive Activity';
      case 'plenary': return 'Recap and Review';
      default: return 'New Slide';
    }
  };
  
  const getDefaultContentForType = (type: Slide['type']): Slide['content'] => {
    switch(type) {
      case 'title':
        return { 
          text: 'Learning objectives:\n• Objective 1\n• Objective 2\n• Objective 3' 
        };
      case 'vocabulary':
        return { 
          items: ['Spanish term - English meaning', 'Add vocabulary items here'] 
        };
      case 'grammar':
        return { 
          text: 'Explain the grammar point here',
          examples: ['Example 1', 'Example 2']
        };
      case 'practice':
        return { 
          text: 'Complete these exercises:',
          items: ['Exercise 1', 'Exercise 2', 'Exercise 3'] 
        };
      case 'activity':
        return { 
          text: 'Work with a partner:',
          activityType: 'speaking',
          items: ['Activity instruction 1', 'Activity instruction 2'] 
        };
      case 'plenary':
        return { 
          text: 'What have we learned today?',
          items: ['Key point 1', 'Key point 2', 'Key point 3'] 
        };
      default:
        return { text: '' };
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