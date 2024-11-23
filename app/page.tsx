"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import Page from '@/app/(auth)/sign-in/page'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChefHat, Sparkles, Clock, Book } from 'lucide-react'
import hero from '@/public/hero.jpg'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <ChefHat className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">RecipeAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            About Us
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48" style={{
  background: "url(/hero.jpg)",
  backgroundColor: "rgba(0,0,0,0.5)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundBlendMode: "overlay"
}}





>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create Delicious Recipes with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl dark:text-gray-400">
                  Generate unique, personalized recipes tailored to your preferences and dietary needs in seconds.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/sign-in">Get Started</Link>
                </Button>
                <Button variant="outline" asChild className="border border-gray-400">
                  <Link href="/about-us">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <Sparkles className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">AI-Powered Recipes</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Our advanced AI generates unique recipes based on your preferences and available ingredients.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Clock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Quick and Easy</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Get personalized recipe suggestions in seconds, saving you time and effort in meal planning.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Book className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Customizable Cookbook</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Save and organize your favorite AI-generated recipes in your personal digital cookbook.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">1</div>
                <h3 className="text-xl font-bold">Input Preferences</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Tell us about your dietary restrictions, favorite cuisines, and available ingredients.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">2</div>
                <h3 className="text-xl font-bold">AI Generation</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Our AI analyzes your inputs and creates unique, personalized recipes just for you.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">3</div>
                <h3 className="text-xl font-bold">Cook and Enjoy</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Follow the generated recipe to create a delicious meal tailored to your tastes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Transform Your Cooking?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
                  Join RecipeAI today and discover a world of personalized culinary creations.
                </p>
              </div>
              <Button size="lg" variant="outline" asChild className="border text-black">
                <Link href="/sign-in">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 RecipeAI. All rights reserved.
        </p>
      </footer>
    </div>
  )
}


