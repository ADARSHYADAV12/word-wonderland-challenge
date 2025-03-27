
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-5xl pt-12 pb-24 px-4 flex flex-col items-center justify-center">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={40} className="text-muted-foreground" />
          </div>
          
          <h1 className="text-4xl font-bold mb-3">Page Not Found</h1>
          
          <p className="text-muted-foreground mb-8">
            We couldn't find the page you were looking for. The page might have been moved, 
            deleted, or perhaps there was a typo in the URL.
          </p>
          
          <Button asChild size="lg" className="rounded-full">
            <Link to="/" className="flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFound;
