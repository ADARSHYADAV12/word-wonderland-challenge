import React from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Award, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Demo leaderboard data
const leaderboardData = [
  {
    rank: 1,
    name: "Alex Chen",
    points: 12450,
    gamesWon: 47,
    averageTime: "2:34",
    streak: 12,
    badge: "Champion"
  },
  {
    rank: 2,
    name: "Sarah Johnson",
    points: 11890,
    gamesWon: 43,
    averageTime: "2:41",
    streak: 8,
    badge: "Master"
  },
  {
    rank: 3,
    name: "Mike Rodriguez",
    points: 11200,
    gamesWon: 39,
    averageTime: "3:12",
    streak: 15,
    badge: "Expert"
  },
  {
    rank: 4,
    name: "Emma Thompson",
    points: 10750,
    gamesWon: 38,
    averageTime: "2:58",
    streak: 6,
    badge: "Expert"
  },
  {
    rank: 5,
    name: "David Kim",
    points: 10320,
    gamesWon: 35,
    averageTime: "3:45",
    streak: 4,
    badge: "Advanced"
  },
  {
    rank: 6,
    name: "Lisa Wang",
    points: 9890,
    gamesWon: 34,
    averageTime: "3:22",
    streak: 7,
    badge: "Advanced"
  },
  {
    rank: 7,
    name: "James Wilson",
    points: 9456,
    gamesWon: 32,
    averageTime: "4:15",
    streak: 3,
    badge: "Advanced"
  },
  {
    rank: 8,
    name: "Maria Garcia",
    points: 8920,
    gamesWon: 29,
    averageTime: "3:58",
    streak: 5,
    badge: "Intermediate"
  },
  {
    rank: 9,
    name: "Robert Lee",
    points: 8340,
    gamesWon: 27,
    averageTime: "4:32",
    streak: 2,
    badge: "Intermediate"
  },
  {
    rank: 10,
    name: "Jennifer Brown",
    points: 7890,
    gamesWon: 25,
    averageTime: "4:45",
    streak: 6,
    badge: "Intermediate"
  }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />;
    default:
      return <span className="text-muted-foreground font-semibold">#{rank}</span>;
  }
};

const getBadgeVariant = (badge: string) => {
  switch (badge) {
    case "Champion":
      return "default";
    case "Master":
      return "secondary";
    case "Expert":
      return "outline";
    default:
      return "outline";
  }
};

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Leaderboard</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Compete with word search masters from around the world. Climb the ranks and earn your place among the champions!
            </p>
          </div>

          {/* Top 3 Podium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {leaderboardData.slice(0, 3).map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className={`text-center p-6 rounded-lg border-2 ${
                      player.rank === 1 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-muted/30"
                    }`}
                  >
                    <div className="flex justify-center mb-4">
                      {getRankIcon(player.rank)}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{player.name}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="text-2xl font-bold text-foreground">{player.points.toLocaleString()}</p>
                      <p>points</p>
                      <Badge variant={getBadgeVariant(player.badge)} className="mt-2">
                        {player.badge}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Full Leaderboard Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Complete Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                      <TableHead className="text-right hidden sm:table-cell">Games Won</TableHead>
                      <TableHead className="text-right hidden md:table-cell">Avg Time</TableHead>
                      <TableHead className="text-right hidden lg:table-cell">Streak</TableHead>
                      <TableHead className="hidden sm:table-cell">Badge</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboardData.map((player, index) => (
                      <motion.tr
                        key={player.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                        className={`${player.rank <= 3 ? "bg-muted/30" : ""}`}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center justify-center">
                            {getRankIcon(player.rank)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{player.name}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {player.points.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right hidden sm:table-cell">
                          {player.gamesWon}
                        </TableCell>
                        <TableCell className="text-right hidden md:table-cell text-muted-foreground">
                          {player.averageTime}
                        </TableCell>
                        <TableCell className="text-right hidden lg:table-cell">
                          <span className="inline-flex items-center gap-1">
                            🔥 {player.streak}
                          </span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant={getBadgeVariant(player.badge)}>
                            {player.badge}
                          </Badge>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <Card className="text-center p-6">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Total Players</h3>
              <p className="text-2xl font-bold">1,247</p>
            </Card>
            <Card className="text-center p-6">
              <Star className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Active This Week</h3>
              <p className="text-2xl font-bold">892</p>
            </Card>
            <Card className="text-center p-6">
              <Medal className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Champions</h3>
              <p className="text-2xl font-bold">23</p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;