package server

import "encoding/base64"

func encodedSpacePathHeaderValue(spacePath string) string {
	return base64.RawURLEncoding.EncodeToString([]byte(spacePath))
}
