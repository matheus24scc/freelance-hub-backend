package model

// URL represents a shortened URL record.
type URL struct {
	ID       uint
	Original string
	ShortCode string
}
