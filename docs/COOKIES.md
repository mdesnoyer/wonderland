# Cookies

## In `SESSION`
- at the beginning of a session, AccessToken (used for authentication), RefreshToken (used for authentication), AccountId (unique account identification), (and MasqueradeAccountId (account id of a masquerade account) if applicable) are stored on login
- if the user wants their credentials remembered, credentials stored in RememberMeKey on login
- if the user wants their email remembered on login, email stored in RememberedEmailKey on login

## In `AnalyzeVideoForm`
- videoUrl of the video analyzed/uploaded stored on analyze/upload

## In `VideoGuest`
- shareToken stored on view of a shared link
