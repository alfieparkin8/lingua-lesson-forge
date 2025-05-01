// src/components/SlidePreview.tsx
import React from "react";
import { Slide } from "@/context/LessonContext";

interface SlidePreviewProps {
  slide: Slide;
}

export const SlidePreview: React.FC<SlidePreviewProps> = ({ slide }) => {
  // Border style to match the PDF images
  const slideStyle = {
    border: '10px solid #FF6B00', // Orange outer border
    boxShadow: '0 0 0 3px #FFFFFF, 0 0 0 6px #FFD949', // White space and yellow inner border
    backgroundColor: '#FFFFFF',
    margin: '0 auto',
    fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", sans-serif'
  };

  const headingStyle = {
    fontFamily: '"Segoe UI Black", "Arial Black", sans-serif',
    fontWeight: 900
  };

  // Function to generate content based on slide type
  const renderContent = () => {
    switch (slide.type) {
      case 'title':
        return renderTitleSlide();
      case 'vocabulary':
        return renderVocabularySlide();
      case 'grammar':
        return renderGrammarSlide();
      case 'practice':
        return renderPracticeSlide();
      case 'activity':
        return renderActivitySlide();
      case 'plenary':
        return renderPlenarySlide();
      default:
        return <p>Unknown slide type</p>;
    }
  };

  const renderTitleSlide = () => (
    <div className="flex flex-col items-center justify-center h-full py-8 text-center">
      <h1 style={{...headingStyle, color: '#FFD949', fontSize: '2.5rem'}} className="mb-8">
        AQA GCSE Spanish
      </h1>
      
      <h2 style={{...headingStyle, color: '#FF6B00', fontSize: '1.8rem'}} className="mb-8">
        {slide.title}
      </h2>
      
      {slide.content.text && (
        <div className="max-w-xl text-center">
          <div className="whitespace-pre-wrap">
            {slide.content.text}
          </div>
        </div>
      )}
    </div>
  );

  const renderVocabularySlide = () => (
    <div className="py-4">
      <h2 style={{...headingStyle, color: '#FFD949', fontSize: '2rem'}} className="mb-6 text-center">
        {slide.title}
      </h2>
      
      {slide.content.items && slide.content.items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {slide.content.items.map((item, index) => {
            const [spanish, english] = item.split(' - ');
            return (
              <div key={index} className="flex justify-between items-center bg-[#FFF6D6] p-3 border-l-2 border-[#FF6B00]">
                <span className="font-medium text-[#FF6B00]">{spanish}</span>
                <span className="text-gray-600">{english}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderGrammarSlide = () => (
    <div className="py-4">
      <h2 style={{...headingStyle, color: '#FFD949', fontSize: '2rem'}} className="mb-4 text-center">
        {slide.title}
      </h2>
      
      {slide.content.text && (
        <div className="mb-6 text-gray-700 whitespace-pre-wrap">
          {slide.content.text}
        </div>
      )}
      
      {slide.content.examples && slide.content.examples.length > 0 && (
        <div className="bg-[#FFF0E6] p-4 border-l-4 border-[#FF6B00] mb-6">
          <h3 style={headingStyle} className="text-[#FF6B00] mb-2">Examples:</h3>
          <ul className="space-y-2">
            {slide.content.examples.map((example, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#FF6B00] font-medium mr-2">{index + 1}.</span>
                <span className="italic text-[#FF6B00]">{example}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderPracticeSlide = () => (
    <div className="py-4">
      <h2 style={{...headingStyle, color: '#FFD949', fontSize: '2rem'}} className="mb-4 text-center">
        {slide.title}
      </h2>
      
      {slide.content.text && (
        <div className="mb-6 text-gray-700 whitespace-pre-wrap">
          {slide.content.text}
        </div>
      )}
      
      {slide.content.items && slide.content.items.length > 0 && (
        <div className="bg-[#FFF6D6] p-6 border-l-4 border-[#FFD949]">
          <ol className="list-decimal list-inside space-y-3">
            {slide.content.items.map((item, index) => (
              <li key={index} className="text-gray-800">{item}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );

  const renderActivitySlide = () => (
    <div className="py-4">
      <h2 style={{...headingStyle, color: '#FFD949', fontSize: '2rem'}} className="mb-4 text-center">
        {slide.title}
      </h2>
      
      {slide.content.text && (
        <div className="mb-6 text-gray-700 whitespace-pre-wrap">
          {slide.content.text}
        </div>
      )}
      
      <div style={{backgroundColor: '#FF9B4D', color: 'white', padding: '1.5rem'}}>
        <h3 style={headingStyle} className="mb-3 text-white">
          {slide.content.activityType === 'speaking' ? '🗣️ Speaking Activity' : '✍️ Writing Activity'}
        </h3>
        
        {slide.content.items && slide.content.items.length > 0 && (
          <ul className="space-y-3">
            {slide.content.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="font-medium text-white mr-2">•</span>
                <span className="text-white">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  const renderPlenarySlide = () => (
    <div className="py-4">
      <h2 style={{...headingStyle, color: '#FFD949', fontSize: '2rem'}} className="mb-4 text-center">
        {slide.title}
      </h2>
      
      {slide.content.text && (
        <div className="mb-6 text-gray-700 font-medium text-center text-xl whitespace-pre-wrap">
          {slide.content.text}
        </div>
      )}
      
      {slide.content.items && slide.content.items.length > 0 && (
        <div className="max-w-xl mx-auto bg-gradient-to-r from-[#FFF6D6] to-[#FFF0E6] p-6">
          <h3 style={headingStyle} className="text-[#FF6B00] mb-3 text-center">What we've learned:</h3>
          <ul className="space-y-3">
            {slide.content.items.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-[#FF6B00] font-bold mr-2">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div style={slideStyle} className="w-full h-full overflow-hidden">
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default SlidePreview;