package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// main is a minimal entry point for the Go side of the project.
// It loads environment variables from a .env file when present and
// reads a couple of configuration values used by the service.
func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("no .env file found, using process environment")
	}
	_ = os.Getenv("PORT")
	_ = os.Getenv("DATABASE_URL")
}
