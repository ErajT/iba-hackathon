import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const flashcards = [
  { question: "What drove the resurgence of AI in the 21st century?", answer: "Advances in machine learning, big data, and increased computing power." },
  { question: "What branch of AI enables machines to understand, interpret, and generate human language?", answer: "Natural Language Processing (NLP)" },
  // ... other flashcards
];

export default function FlashcardPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [flashcards,setFlashcards] = useState([])
const [isLoading,setIsLoading] = useState(false)

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const {id} = useParams()

  useEffect(()=>{
const fetch = async ()=>{

try{
    setIsLoading(true)
const res = await axios.get(`http://localhost:2000/flashcard/generateFlashcard/${id}`)
console.log(res.data)
setFlashcards(res.data.flashcards.flashcards)
setIsLoading(false)
}
catch(e){
console.log(e)
}

}

fetch()
  },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <p>Flashcards</p>
        {isLoading?"Cooking Flashcards...":  <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
      <div className="perspective-1000">
          <motion.div
            className="relative w-full h-64"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            onClick={handleFlip}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Card className="absolute w-full h-full flex items-center justify-center bg-white dark:bg-[#0f262c]  rounded-2xl shadow-2xl" style={{ backfaceVisibility: 'hidden' }}> 
            
            
              <CardContent className="text-xl text-gray-800  dark:text-gray-100">Q. {flashcards.length>0&&flashcards[currentIndex].question}</CardContent>
            </Card>
            <Card className="absolute w-full h-full flex items-center justify-center bg-white dark:bg-[#0f262c] rounded-2xl shadow-2xl" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}> 
              <CardContent className="text-xl text-gray-800 dark:text-gray-100">Ans. {flashcards.length>0&&flashcards[currentIndex].answer}</CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="flex justify-between mt-4">
          <Button onClick={handlePrev} className="btn-green">Previous</Button>
          <Button onClick={handleNext} className="btn-green">Next</Button>
        </div>
      </motion.div> }
    </div>
  );
}
