package model

import "testing"

func TestURLModelCompiles(t *testing.T) {
	u := URL{ID: 1, Original: "https://example.com", ShortCode: "abc"}
	if u.ID != 1 {
		t.Fatalf("expected ID 1, got %d", u.ID)
	}
	if u.Original == "" {
		t.Fatal("expected non-empty Original")
	}
}
