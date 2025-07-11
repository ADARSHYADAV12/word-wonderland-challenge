import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  MousePointer, 
  Timer, 
  Trophy, 
  Lightbulb, 
  Target,
  CheckCircle,
  Star,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";

const HowToPlay = () => {
  const gameSteps = [
    {
      step: 1,
      title: "Choose Your Challenge",
      description: "Select from daily challenges or explore our archive of themed puzzles.",
      icon: <Target className="h-8 w-8 text-primary" />,
      tips: ["Daily challenges reset every 24 hours", "Archive puzzles are organized by themes", "Difficulty ranges from easy to expert"]
    },
    {
      step: 2,
      title: "Find Hidden Words",
      description: "Words can be hidden horizontally, vertically, or diagonally in any direction.",
      icon: <Search className="h-8 w-8 text-primary" />,
      tips: ["Words can go forwards or backwards", "Look for diagonal patterns", "Check all 8 directions from each letter"]
    },
    {
      step: 3,
      title: "Select and Mark Words",
      description: "Click and drag from the first letter to the last letter of each word.",
      icon: <MousePointer className="h-8 w-8 text-primary" />,
      tips: ["Hold down mouse button and drag", "Words highlight when correctly selected", "Found words are marked in the word list"]
    },
    {
      step: 4,
      title: "Complete the Puzzle",
      description: "Find all words to complete the challenge and earn points!",
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      tips: ["Faster completion = bonus points", "Use hints if you're stuck", "Share your achievements with friends"]
    }
  ];

  const scoringRules = [
    {
      title: "Base Points",
      description: "Earn points for each word found",
      points: "50-200",
      icon: <Star className="h-6 w-6 text-yellow-500" />
    },
    {
      title: "Speed Bonus",
      description: "Complete puzzles quickly for extra points",
      points: "Up to 500",
      icon: <Zap className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Difficulty Multiplier",
      description: "Harder puzzles give more points",
      points: "1x - 3x",
      icon: <Trophy className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Perfect Score",
      description: "Find all words without hints",
      points: "+1000",
      icon: <Target className="h-6 w-6 text-green-500" />
    }
  ];

  const difficultyLevels = [
    {
      name: "Easy",
      gridSize: "6x6",
      wordCount: "6-8 words",
      features: ["Shorter words", "Clear patterns", "Beginner friendly"],
      color: "bg-green-100 text-green-800 border-green-300"
    },
    {
      name: "Medium", 
      gridSize: "8x8",
      wordCount: "8-12 words",
      features: ["Mixed word lengths", "Some overlapping", "Moderate challenge"],
      color: "bg-yellow-100 text-yellow-800 border-yellow-300"
    },
    {
      name: "Hard",
      gridSize: "10x10",
      wordCount: "12-15 words",
      features: ["Longer words", "Complex patterns", "Expert level"],
      color: "bg-red-100 text-red-800 border-red-300"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Lightbulb className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">How to Play</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Master the art of word searching with our comprehensive guide. Learn the rules, scoring system, and pro tips to become a champion!
            </p>
          </div>

          {/* Game Steps */}
          <section>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold mb-8 text-center"
            >
              Getting Started
            </motion.h2>
            
            <div className="space-y-8">
              {gameSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className={`grid md:grid-cols-2 gap-6 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                        <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                              {step.icon}
                            </div>
                            <div>
                              <Badge variant="outline" className="mb-2">Step {step.step}</Badge>
                              <h3 className="text-xl font-semibold">{step.title}</h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {step.description}
                          </p>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Pro Tips:</h4>
                            <ul className="space-y-1">
                              {step.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className={`bg-muted/50 rounded-lg p-6 ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                          <div className="text-center">
                            <div className="text-6xl font-bold text-primary/20 mb-2">{step.step}</div>
                            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                              {step.icon}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Difficulty Levels */}
          <section>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-3xl font-bold mb-8 text-center"
            >
              Difficulty Levels
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {difficultyLevels.map((level, index) => (
                <motion.div
                  key={level.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{level.name}</span>
                        <Badge className={level.color}>{level.name}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Grid Size:</span>
                          <p className="font-medium">{level.gridSize}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Words:</span>
                          <p className="font-medium">{level.wordCount}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {level.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Scoring System */}
          <section>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="text-3xl font-bold mb-8 text-center"
            >
              Scoring System
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {scoringRules.map((rule, index) => (
                <motion.div
                  key={rule.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        {rule.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{rule.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{rule.description}</p>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {rule.points}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Tips Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Expert Tips for Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Search Strategies:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Start with the longest words first
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Look for uncommon letters (Q, X, Z) as starting points
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Scan systematically row by row, then column by column
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Check diagonal patterns last
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Time Management:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Timer className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        Set a target time for each difficulty level
                      </li>
                      <li className="flex items-start gap-2">
                        <Timer className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        Use hints sparingly to maintain bonus points
                      </li>
                      <li className="flex items-start gap-2">
                        <Timer className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        Practice daily to improve your speed
                      </li>
                      <li className="flex items-start gap-2">
                        <Timer className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        Take breaks between challenging puzzles
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default HowToPlay;